from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Product, Item
from users.models import Owner
from .serializers import ProductSerializer, ItemSerializer, UpdateItemSerializer
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.permissions import IsAuthenticated
from .utils import serialize_image
from django.core.files import File
from django.conf import settings
import os


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ('category',)
    search_fields = ('name',)
    permission_classes = [IsAuthenticated]


class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filterset_fields = ('product', 'warranty_end_date', 'warranty_period', )
    search_fields = ('serial_no', 'owner__name')

    def get_queryset(self):
        return super().get_queryset().filter(owner=Owner.objects.filter(wallet_address=self.request.query_params['wallet_address']).first())

    def create(self, request, *args, **kwargs):
        data = request.data
        serializer = self.get_serializer(data=data)
        serializer.is_valid(raise_exception=True)
        validated_data = serializer.validated_data
        try:
            owner_data = validated_data.pop('owner')
            owner = Owner.objects.create(**owner_data)
        except KeyError:
            owner = None
        product = get_object_or_404(Product, id=data['product'])
        image = product.image.path
        item = Item.objects.create(owner=owner, product=product, **validated_data)
        ipfs_hash, image_url = serialize_image(image, validated_data['serial_no'])
        item.image_ipfs = ipfs_hash
        item.warranty_image = File(open(os.path.join(settings.MEDIA_ROOT, image_url), 'rb'), name=image_url.split('/')[-1])
        item.save()
        return Response(ItemSerializer(item).data)

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
