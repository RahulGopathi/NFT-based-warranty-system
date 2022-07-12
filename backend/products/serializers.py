from rest_framework import serializers
from .models import Product, Item
from users.models import Owner
from users.serializers import OwnerSerializer


class ProductSerializer(serializers.ModelSerializer):
    retailer_name = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = '__all__'

    def get_retailer_name(self, obj):
        return obj.retailer.name


class ItemSerializer(serializers.ModelSerializer):
    owner = OwnerSerializer()

    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')

    def create(self, validated_data):
        owner_data = validated_data.pop('owner')
        owner = Owner.objects.create(**owner_data)
        item = Item.objects.create(owner=owner, **validated_data)
        return item

class UpdateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')