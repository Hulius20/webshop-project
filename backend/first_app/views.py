from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from .permissions import IsOwnerOrReadOnly
from .models import Product
from .serializer import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['seller', 'for_sale', 'buyer', 'is_purchased']  # Updated filter fields

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return [AllowAny()]
        else:
            return [IsAuthenticated()]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user)

    @action(detail=True, methods=['post'])
    def toggle_sale(self, request, pk=None):
        product = self.get_object()
        if product.seller != request.user:
            return Response({'error': 'Not authorized'}, status=403)
        if product.is_purchased:
            return Response({'error': 'Cannot modify purchased product'}, status=400)
        
        product.for_sale = not product.for_sale
        product.save()
        
        serializer = self.get_serializer(product)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def purchase(self, request, pk=None):
        product = self.get_object()
        if product.is_purchased:
            return Response({'error': 'Product already purchased'}, status=400)
        if product.seller == request.user:
            return Response({'error': 'Cannot purchase your own product'}, status=400)
        
        product.buyer = request.user
        product.is_purchased = True
        product.for_sale = False
        product.purchased_at = timezone.now()
        product.save()
        
        serializer = self.get_serializer(product)
        return Response(serializer.data)