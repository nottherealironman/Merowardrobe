from django.conf.urls import url
from django.conf import settings
from . import views
from django.conf.urls.static import static

app_name = 'lookups'

urlpatterns = [
    url(r'^load_districts/$', views.load_districts, name='load_districts'),
]
