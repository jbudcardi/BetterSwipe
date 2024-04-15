from django.urls import path
from . import views

urlpatterns = [
        #path('', views.index, name="index"),
        path('', views.test, name="test"),
        path('register/', views.register, name='register'),
        path('login/', views.user_login, name='login'),
        path('logout/', views.user_logout, name='logout'), 
        path('api/register/', RegisterAPIView.as_view(), name='api_register'),
        path('api/login/', LoginAPIView.as_view(), name='api_login'),
        ]
