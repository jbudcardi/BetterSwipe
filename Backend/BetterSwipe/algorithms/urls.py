from django.urls import path
from . import views
from .views import LoginAPIView

urlpatterns = [
        #path('', views.index, name="index"),
        path('test/', views.test, name='test'),       
        path('register/', views.register, name='register'),
        path('login/', views.login, name='login'),
        #path('login/', views.user_login, name='login'),
        path('logout/', views.logout, name='logout'),
        #path('logout/', views.user_logout, name='logout'),
        path('api/login/', LoginAPIView.as_view(), name='api_login'),
         path('api/login/', views.login_view, name='login'),
         path('api/logout/', views.logout_view, name='logout'),
        ]
