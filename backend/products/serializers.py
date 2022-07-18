from django.conf import settings
from django.core.files import File
from rest_framework import serializers
from .models import Product, Item
from users.models import Owner
from .utils import serialize_image
import os


class ProductSerializer(serializers.ModelSerializer):
    retailer_name = serializers.SerializerMethodField()
    retailer_id = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def get_retailer_name(self, obj):
        return obj.retailer.first_name + " " + obj.retailer.last_name
    
    def get_retailer_id(self, obj):
        return obj.retailer.id


class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = ('serial_no', 'warranty_period', 'product', 'warranty_image')
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        try:
            owner_data = validated_data.pop('owner')
            owner = Owner.objects.create(**owner_data)
        except KeyError:
            owner = None
        product = validated_data.pop('product')
        image = product.image.path
        item = Item.objects.create(owner=owner, product=product, **validated_data)
        ipfs_hash, image_url = serialize_image(image, validated_data['serial_no'])
        item.image_ipfs = ipfs_hash
        item.warranty_image = File(open(os.path.join(settings.MEDIA_ROOT, image_url), 'rb'), name=image_url.split('/')[-1])
        item.save()
        return item


class UpdateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')
