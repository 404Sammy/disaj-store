from django.contrib import admin
from .models import Category, Product

class ProductAdmin(admin.ModelAdmin):
    prepopulated_fields = {'slug': ('name',)} # Change 'name' to 'title' if your Product model uses title

# Register your models
admin.site.register(Category)
admin.site.register(Product, ProductAdmin)