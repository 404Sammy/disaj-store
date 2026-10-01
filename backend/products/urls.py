from django.urls import path
from .views import ProductListAPIView, ProductDetailAPIView, CheckoutAPIView

urlpatterns = [
    path('products/', ProductListAPIView.as_view(), name='product-list'),
    path('products/<slug:slug>/', ProductDetailAPIView.as_view(), name='product-detail'),
    path('checkout/', CheckoutAPIView.as_view(), name='checkout'),
]