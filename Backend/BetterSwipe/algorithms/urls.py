from django.urls import path
from . import views
from .views import login_user

##urlpatterns = [
        #path('', views.index, name="index"), ]

urlpatterns = {
    path('', views.index, name='index'),
    path('signup/', views.signup, name='signup'), #this line is for the signup URL
    #path for login to be implemented in Django soon
    path('api/login/', views.login, name= 'api_login' ),
    #path for logout to be implemented in Django soon
    #path('logout/', views.logout, name='logout')
}