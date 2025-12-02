from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.PrimaryKeyRelatedField(read_only=True)
    image = serializers.URLField(required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'price', 'description', 'image', 'seller','for_sale', 'created_at']
        read_only_fields = ['id','seller', 'created_at']