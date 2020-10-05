from django.conf.urls import url
from . import views

app_name = 'frontend'

urlpatterns = [
	# Handle all react route on page refresh
    url(r'^(?:.*)/?$', views.index, name='index'),
]