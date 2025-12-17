from rest_framework import viewsets, status
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from rest_framework.decorators import action, api_view, permission_classes
from rest_framework.response import Response
from django.utils import timezone
from django.contrib.auth.models import User
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

@api_view(['POST'])
@permission_classes([AllowAny])
def populate_database(request):
    """Populate database with test users and products"""
    try:
        # Clear existing data
        User.objects.all().delete()
        Product.objects.all().delete()
        
        # Create 6 test users (3 sellers, 3 buyers)
        users = []
        for i in range(1, 7):
            user = User.objects.create_user(
                username=f'testuser{i}',
                email=f'testuser{i}@shop.aa',
                password=f'pass{i}'
            )
            users.append(user)
        
        # Create products for first 3 users (sellers)
        products_created = 0
        for seller_idx in range(3):
            seller = users[seller_idx]
            for product_num in range(1, 11):
                Product.objects.create(
                    title=f'Product {product_num} by {seller.username}',
                    description=f'Description for product {product_num}',
                    price=10.00 + (product_num * 5),
                    seller=seller,
                    for_sale=True,
                    is_purchased=False
                )
                products_created += 1
        
        return Response({
            'message': f'Database populated successfully with 6 users and {products_created} products',
            'users_created': 6,
            'products_created': products_created
        }, status=status.HTTP_201_CREATED)
    
    except Exception as e:
        return Response({
            'error': str(e)
        }, status=status.HTTP_400_BAD_REQUEST)