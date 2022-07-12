from django.db import models

# Create your models here.


class Product(models.Model):
    name = models.CharField(max_length=100)
    tokenizable_data = models.FileField(upload_to='products/', null=True, blank=True)  # this would be the image or data that we tokenize
    product_data = models.JSONField()  # optional data we want to store like product description etc
    retailer = models.ForeignKey('users.Retailer', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Item(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    owner = models.ForeignKey('users.Owner', on_delete=models.SET_NULL, null=True)
    serial_no = models.CharField(max_length=100)
    warranty_start_date = models.DateField(null=True, blank=True)
    warranty_end_date = models.DateField(null=True, blank=True)
    warranty_period = models.IntegerField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.serial_no}"


class NFT(models.Model):
    item = models.ForeignKey(Item, on_delete=models.CASCADE)
    ipfs = models.URLField(max_length=250)
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.item} - {self.ipfs}"
