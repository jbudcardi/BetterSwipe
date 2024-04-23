from django.urls import path
from . import views
from .views import LoginAPIView

urlpatterns = [
        #path('', views.index, name="index"),
        path('test/', views.test, name='test'),       
        path('register/', views.register, name='register'),
        # path('login/', views.user_login, name='login'),
        path('login/', views.login, name='login'),
        path('logout/', views.user_logout, name='logout'),
        path('api/login/', LoginAPIView.as_view(), name='api_login'),
        ]
