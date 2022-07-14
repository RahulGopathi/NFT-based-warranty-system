from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Item
from users.models import Owner
from .serializers import ProductSerializer, ItemSerializer, UpdateItemSerializer
# Create your views here.


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    # permission_classes = [permission.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = dict(request.data)
        data['owner'] = data['owner']['id']
        print(data['owner'])
        serializer = UpdateItemSerializer(instance, data=data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    def partial_update(self, request, *args, **kwargs):
        instance = self.get_object()
        data = dict(request.data)
        serializer = UpdateItemSerializer(instance, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def add_nft(self, request, pk=None):
        item = self.get_object()
        item.nft_id = request.data['nft_id']
        item.save()
        return Response(ItemSerializer(item).data, status=201)

    @action(detail=True, methods=['post'])
    def issue_user(self, request, pk=None):
        item = self.get_object()
        owner_data = request.data['owner']
        owner, _ = Owner.objects.get_or_create(**owner_data)
        item.owner = owner
        item.save()
        return Response(ItemSerializer(item).data, status=201)
