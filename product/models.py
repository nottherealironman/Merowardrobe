from django.db import models
from django.template.defaultfilters import slugify
from users.models import *
from datetime import datetime
import os
from uuid import uuid4
from django.db.models.signals import post_delete
from django.dispatch import receiver

# Create your models here.
def custom_filename(instance, filename):
    upload_path = 'product'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pk:
        filename = '{}.{}'.format(instance.pk, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_path, filename)
    #return 'user_{0}/{1}'.format(instance.user.id, filename)

class Category(models.Model):
    title = models.CharField(max_length=255)
    slug = models.SlugField(unique=True, max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    @models.permalink
    def get_absolute_url(self):
        return ('category', (),
            {
            'slug': self.slug,
            })

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super(Category, self).save(*args, **kwargs)

    class Meta:
        ordering = ['created_on']

        def __unicode__(self):
            return self.title

    def __str__(self):
        return self.title

class Subcategory(models.Model):
    title = models.CharField(max_length=255)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    slug = models.SlugField(unique=True, max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Brand(models.Model):
    title = models.CharField(max_length=255)
    logo = models.FileField()
    created_on = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title

class Product(models.Model):
    title = models.CharField(max_length=255, blank=True)
    gender = models.CharField(max_length=5, blank=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    subcategory = models.ForeignKey(Subcategory, on_delete=models.CASCADE)
    brand = models.ForeignKey(Brand, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateTimeField(auto_now_add=True)

    def __int__(self):
        return self.id

    @classmethod
    def check_product_auth(self,product_id, user_id):
        try:
            product = Product.objects.filter(id=product_id).filter(user=user_id).count()
            if product > 0:
                return True
        except Product.DoesNotExist:
            return False

class ProductDetails(models.Model):
    product = models.OneToOneField(Product,related_name='producdetails', on_delete=models.CASCADE)
    price = models.FloatField(blank=True, default=0.0)
    size = models.CharField(max_length=50)
    color = models.CharField(max_length=50)
    description = models.TextField(blank=True, max_length=1000)
    specifications = models.TextField(blank=True, max_length=1000)
    status = models.CharField(blank=True,max_length=255)
    created_on = models.DateTimeField(auto_now_add=True)

class ProductUploads(models.Model):
    filename = models.CharField(max_length=255,null=True)
    file = models.ImageField(upload_to=custom_filename, default='product/image.jpg')
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    filetype = models.IntegerField(null=True)
    created_on = models.DateTimeField(default=datetime.now, blank=True)

    # class Meta:
    #     verbose_name = 'photo'
    #     verbose_name_plural = 'photos'

    def __str__(self):
        return self.id

@receiver(post_delete, sender=ProductUploads)
def submission_delete(sender, instance, **kwargs):
    instance.file.delete(False)

class ProductSizes(models.Model):
    title = models.CharField(max_length=10,null=True)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    created_on = models.DateTimeField(default=datetime.now, blank=True)

    def __str__(self):
        return self.title

