from django.db import models

# Create your models here.
class Owner(models.Model):
    phno = models.CharField(max_length=10, unique=True)
    name = models.CharField(max_length=100, null=True, blank=True)
    wallet_address = models.CharField(max_length=250, null=True, blank=True)
    def __str__(self):
        return f"{self.name} {self.wallet_address}"

class Retailer(models.Model):
    name = models.CharField(max_length=100)
    wallet_address = models.CharField(max_length=250)
    email = models.EmailField(  null=True, blank=True)
    phno = models.CharField(max_length=10, null=True, blank=True)

    def __str__(self):
        return f"{self.name} -> {self.wallet_address}"