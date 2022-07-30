from rest_framework import serializers
from .models import Order, Product, Item


class ProductSerializer(serializers.ModelSerializer):
    get_items_bool = True
    retailer_name = serializers.SerializerMethodField()
    retailer_id = serializers.SerializerMethodField()
    items = serializers.SerializerMethodField()

    class Meta:
        model = Product
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        self.get_items_bool = kwargs.pop('get_items', True)
        super().__init__(*args, **kwargs)

    def get_retailer_name(self, obj):
        return obj.retailer.first_name + " " + obj.retailer.last_name

    def get_retailer_id(self, obj):
        return obj.retailer.id

    def get_items(self, obj):
        queryset = Item.objects.filter(product=obj)
        if len(queryset) > 0:
            if self.get_items_bool:
                return ItemSerializer(queryset, many=True).data
        return None


class ItemSerializer(serializers.ModelSerializer):
    product = serializers.SerializerMethodField()

    class Meta:
        model = Item
        fields = ('id', 'serial_no', 'warranty_end_date', 'product', 'warranty_image', 'created_at', 'updated_at', 'owner', 'is_issued')
        read_only_fields = ('created_at', 'updated_at')

    def get_product(self, obj):
        return ProductSerializer(obj.product, get_items=False).data


class UpdateItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at')


class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"

    def validate(self, attrs):
        super().validate(attrs)
        item = attrs.get('item')
        item.is_issued = True
        item.save()
        return attrs
