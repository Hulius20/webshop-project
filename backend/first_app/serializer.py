from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'image', 'seller', 'created_at']
        read_only_fields = ['id','seller', 'created_at']