from rest_framework import viewsets
# from rest_framework.response import Response
# from rest_framework.decorators import action
from .models import Product, Item
from .serializers import ProductSerializer, ItemSerializer
# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
