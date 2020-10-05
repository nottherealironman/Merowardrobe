from django.conf.urls import url
from . import views
from django.urls import include, path
from rest_framework.routers import DefaultRouter

app_name = 'product'

router = DefaultRouter()
router.register(r'api/v1', views.ProductViewset, base_name='product')
#router.register(r'api/v1/user_products', views.UserProducstViewset, base_name='userproducts')
router.register(r'productdetails/api/v1', views.ProductDetailsViewset, base_name='productdetails')
#router.register(r'api/v1/product_uploads', views.product_uploads, base_name='product')
urlpatterns = router.urls

urlpatterns += [
    url(r'^$', views.index, name='index'),
    url(r'^create_product$', views.create_product, name='create_product'),
    #url(r'^update_product/(?P<id>[0-9]+)/$', views.update_product, name='update_product'),
    url(r'^add_product_details', views.add_product_details, name='add_product_details'),
    url(r'^load_subcategories', views.load_subcategories, name='load_subcategories'),
    #url(r'^product_uploads', views.product_uploads, name='product_uploads'),
    #url(r'^remove_product_uploads', views.remove_product_uploads, name='remove_product_uploads'),
    #url(r'^verify_product_uploads', views.verify_product_uploads, name='verify_product_uploads'),
    #url(r'^remove_product$', views.remove_product, name='remove_product'),

    url(r'^api/v1/fetch_data', views.fetch_data, name='fetch_data'),
    url(r'^api/v1/product_uploads', views.product_uploads, name='product_uploads'),
    url(r'^api/v1/fetch_productinfo/(?P<id>[0-9]+)', views.fetch_productinfo, name='fetch_productinfo'),
    url(r'^api/v1/user_products/(?P<id>[0-9]+)', views.UserProduct.as_view(), name='user_products'),

]
