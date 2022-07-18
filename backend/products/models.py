from django.db import models


class Product(models.Model):
    name = models.CharField(max_length=100)
    image = models.FileField(upload_to='products/')  # this would be the image or data that we tokenize
    product_data = models.JSONField(null=True, blank=True)  # optional data we want to store like product description etc
    retailer = models.ForeignKey('users.Retailer', on_delete=models.CASCADE)

    def __str__(self):
        return self.name


class Item(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    owner = models.ForeignKey('users.Owner', on_delete=models.SET_NULL, null=True)
    image_ipfs = models.CharField(max_length=100, blank=True)
    nft_id = models.CharField(max_length=100, blank=True)
    warranty_image = models.FileField(upload_to='items/', null=True, blank=True)
    serial_no = models.CharField(max_length=100)
    warranty_start_date = models.DateField(null=True, blank=True)
    warranty_end_date = models.DateField(null=True, blank=True)
    warranty_period = models.IntegerField(help_text="Enter the value in months")
    created_at = models.DateTimeField(auto_now=True)
    updated_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.serial_no}"
