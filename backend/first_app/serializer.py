from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    seller_username = serializers.CharField(source='seller.username', read_only=True)
    buyer_username = serializers.CharField(source='buyer.username', read_only=True, allow_null=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price', 'image', 'seller', 'seller_username', 
                  'buyer', 'buyer_username', 'for_sale', 'is_purchased', 'purchased_at', 
                  'created_at', 'updated_at']
        read_only_fields = ['seller', 'buyer', 'is_purchased', 'purchased_at', 'created_at', 'updated_at']