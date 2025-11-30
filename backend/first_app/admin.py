from django.contrib import admin
from .models import Product

@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ('id', 'title', 'price', 'seller', 'created_at')
    search_fields = ('title', 'description', 'seller__username')
    list_filter = ('created_at',)
# Register your models here.
