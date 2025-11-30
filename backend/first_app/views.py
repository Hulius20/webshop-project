from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .models import Product
from .serializer import ProductSerializer
from django_filters.rest_framework import DjangoFilterBackend

class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticatedOrReadOnly] # Allow read-only access for unauthenticated users
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['seller']  # Allow filtering by seller 
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user) # Set the seller to the logged-in user