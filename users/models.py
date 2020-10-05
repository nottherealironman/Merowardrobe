from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    email = models.CharField(blank=True, max_length=200)
    group = models.IntegerField(blank=False, default=3)
    def __str__(self):
        return self.email

class Userdetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    first_name = models.CharField(blank=True, max_length=50)
    last_name = models.CharField(blank=True, max_length=50)
    profile_pic = models.TextField(blank=True, max_length=200)
    status = models.IntegerField(blank=True)
    phone_no = models.CharField(blank=True, max_length=20)

    def __str__(self):
        return self.first_name

class BillingDetails(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    country = models.CharField(blank=False, max_length=50)
    state = models.CharField(blank=False, max_length=10)
    district = models.CharField(blank=False, max_length=10)
    city = models.CharField(blank=False, max_length=20)
    ward_no = models.IntegerField(blank=False)
    house_no = models.IntegerField(blank=False)
    landmark = models.CharField(blank=True, max_length=30)
    
    def __str__(self):
        return self.state + " " + self.district +" "+ self.city
        # pass
        