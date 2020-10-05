from django.db import models
from users.models import User
from product.models import Product

class Order(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    quantity = models.IntegerField(blank=False, default=1)
    payment_method = models.IntegerField(blank=False,default=1) #1 = COD, #2 = Card Payment
    remarks = models.TextField(blank=True, max_length=200)
    created_on = models.DateTimeField(auto_now_add=True)
    
