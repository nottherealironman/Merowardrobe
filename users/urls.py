from django.conf.urls import url
from django.conf import settings
from . import views
from django.conf.urls.static import static
from django.urls import include, path

app_name = 'users'

urlpatterns = [
	# url(r'^$', views.index, name='index'),
	# url(r'^login/$', views.login_user, name='login_user'),
    # url(r'^logout/$', views.logout_user, name='logout_user'),
	# url(r'^signup/$', views.signup_user, name='signup_user'),
    # url(r'^edit_user/(?P<id>\d+)/$', views.edit_user, name='edit_user'),
    # url(r'^billing_detail$', views.billing_detail, name='billing_detail'),
    # url(r'^billing_detail/(?P<id>\d+)/$', views.billing_detail, name='billing_detail'),
    # url(r'^dashboard/$', views.user_dashboard, name='user_dashboard'),
    #path('api/', views.UserListCreate.as_view()),
    path('api/current_user/', views.current_user),
    path('api/signup/', views.UserSignup.as_view()),
] + static(settings.STATIC_URL)
