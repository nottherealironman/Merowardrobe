"""merowardrobe URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls import include, url
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
#from .api import router
from django.urls import include, path
#from django.urls import path
from rest_framework_jwt.views import obtain_jwt_token,refresh_jwt_token


urlpatterns = [
    url('admin/', admin.site.urls),
    url(r'^home/', include('home.urls')),
    url(r'^api/product/', include('product.api.urls', namespace='api-product')),
    url(r'^users/', include('users.urls')),
    url(r'^api/store/', include('store.api.urls', namespace='api-store')),
    url(r'^lookups/', include('lookups.urls')),
    url(r'^frontend/', include('frontend.urls')),
    url(r'^', include('home.urls')),
    path('token-auth/', obtain_jwt_token),
    path('token-auth-refresh/', refresh_jwt_token),
    url(r'^(?:.*)/?$', include('frontend.urls')),
    #path('api/v1/', include(router.urls)),
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.BASE_URL, document_root=settings.BASE_ROOT)
