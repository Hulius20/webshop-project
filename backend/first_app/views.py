from rest_framework import viewsets
from rest_framework.permissions import AllowAny, IsAuthenticated, IsAuthenticatedOrReadOnly
from .permissions import IsOwnerOrReadOnly
from .models import Product
from .serializer import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['seller', 'for_sale']  # Allow filtering by seller and for_sale status

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_permissions(self):
        if self.action in ['list', 'retrieve']:
            return[AllowAny()]
        else:
            return[IsAuthenticated()]
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user) # Set the seller to the logged-in user