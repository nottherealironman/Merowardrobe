from django.conf.urls import url
from . import views
from django.urls import include, path
from rest_framework.routers import DefaultRouter

app_name = 'store'

router = DefaultRouter()
router.register(r'v1', views.StoreViewset, base_name='store')
urlpatterns = router.urls

urlpatterns += [
    url(r'^v1/user_store/(?P<id>[0-9]+)', views.UserStore.as_view(), name='user_store'),
]