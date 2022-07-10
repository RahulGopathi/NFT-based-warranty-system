from django.contrib import admin
from .models import Retailer, Owner
# Register your models here.
admin.site.register([Retailer, Owner])
