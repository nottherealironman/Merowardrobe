from django.conf.urls import url
from . import views
from django.urls import include, path
from rest_framework.routers import DefaultRouter

app_name = 'product'

router = DefaultRouter()
router.register(r'v1', views.ProductViewset, base_name='product')
#router.register(r'api/v1/user_products', views.UserProducstViewset, base_name='userproducts')
router.register(r'productdetails/api/v1', views.ProductDetailsViewset, base_name='productdetails')
#router.register(r'api/v1/product_uploads', views.product_uploads, base_name='product')
urlpatterns = router.urls

urlpatterns += [
    url(r'^v1/fetch_data', views.fetch_data, name='fetch_data'),
    url(r'^v1/product_uploads', views.product_uploads, name='product_uploads'),
    url(r'^v1/fetch_productinfo/(?P<id>[0-9]+)', views.fetch_productinfo, name='fetch_productinfo'),
    url(r'^v1/user_products/(?P<id>[0-9]+)', views.UserProduct.as_view(), name='user_products'),

]
