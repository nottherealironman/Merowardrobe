from django.db import models
from users.models import User
import os
from uuid import uuid4

def custom_uploads(instance, filename):
    upload_to = 'store'
    ext = filename.split('.')[-1]
    # get filename
    if instance.pan:
        filename = '{}.{}'.format(instance.pan, ext)
    else:
        # set filename as random string
        filename = '{}.{}'.format(uuid4().hex, ext)
    # return the whole path to the file
    return os.path.join(upload_to, filename)
    #return 'user_{0}/{1}'.format(instance.user.id, filename)

class Store(models.Model):
    name = models.CharField(max_length=255, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pan = models.IntegerField(blank=False)
    pan_uploads = models.FileField(upload_to=custom_uploads,blank=False,default='store/image.jpg')
    phone = models.CharField(max_length=15, blank=False)
    location = models.CharField(max_length=255, blank=False)
    available_items = models.CharField(max_length=255, blank=False)
    keywords = models.CharField(max_length=255, blank=False)
    description = models.CharField(max_length=255, blank=False)
    created_on = models.DateTimeField(auto_now_add=True)

    # def __init__(self):
    #     return self.name
        