from django.contrib import admin
from .models import Product, Item, NFT
# Register your models here.
admin.site.register([Product, Item, NFT])
