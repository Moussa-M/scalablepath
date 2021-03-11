from __future__ import unicode_literals

from django.db import models
from django.conf import settings

class Product(models.Model):
    PRODUCT_CHOICES = [
        ('available', 'Available'),
        ('not_available', 'Not Available'),
    ]
    created_at = models.DateTimeField(auto_now_add=True,null=True, blank=True)
    updated_at = models.DateTimeField(auto_now=True,null=True, blank=True)
    status = models.CharField(max_length=20,choices=PRODUCT_CHOICES,default='available')
    name = models.CharField(max_length=50, null=False, blank=False)
    price = models.FloatField(default=0)
    image = models.CharField(max_length=250,null=False, blank=False)
    deleted_on = models.DateTimeField(null=True, blank=True)
    desc = models.CharField(max_length=250, null=True, blank=True)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='products')  
    