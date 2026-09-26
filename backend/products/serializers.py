from rest_framework import serializers
from .models import Product

class ProductSerializer(serializers.ModelSerializer):
    # This grabs the actual category name instead of just the category ID number
    category_name = serializers.CharField(source='category.name', read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'name', 'brand', 'slug', 'price', 'condition', 'image', 'category_name']