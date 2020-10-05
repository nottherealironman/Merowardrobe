from django.conf.urls import url
from . import views
from django.urls import include, path
from rest_framework.routers import DefaultRouter

app_name = 'store'

router = DefaultRouter()
router.register(r'api/v1', views.StoreViewset, base_name='store')
urlpatterns = router.urls
#urlpatterns = [
    #url(r'^$', views.index, name='index'),
    # url(r'^create_store$',views.create_store, name='create_store'),
    #path('api/', views.StoreAPI.as_view()),
    # path('api/create/', views.StoreAPI.as_view({'post' : 'create'})),
#]