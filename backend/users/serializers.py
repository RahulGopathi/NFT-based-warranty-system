from dataclasses import field, fields
from rest_framework import serializers
from .models import Retailer, Owner
class RetailerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Retailer
        fields = '__all__'