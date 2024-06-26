from django.urls import path
from . import views
from .views import LoginAPIView
from .views import SignUpAPIView

urlpatterns = [
        #path('', views.index, name="index"),
        path('test/', views.test, name='test'),
        path('signup/', SignUpAPIView.as_view(), name='signup'), #SignUp endpoint       
        path('register/', views.register, name='register'),
        path('login/', views.login, name='login'),
        #path('login/', views.user_login, name='login'),
        path('logout/', views.logout, name='logout'),
        #path('logout/', views.user_logout, name='logout'),
        path('api/login/', LoginAPIView.as_view(), name='api_login'),
        path('api/login/', views.login_view, name='login'),
        path('api/logout/', views.logout_view, name='logout'),

        path('loadcards/', views.add_rewards_cc_cards, name='load_cards'),
        # path('findtopcards/<userId>/', views.findTopCards, name='find_top_cards'), gets called when files are uploaded now
        path('userstopcards/<userId>/', views.usersTopCards, name='users_top_cards'),

        path('dashboard/', views.get_expenditures  , name='Dashboard'),
        path('totalexpenditures/', views.get_total_expenditures  , name='total_expenditures'),
        

        path('upload/<userId>/', views.upload_transactions,  name='upload_csv')
        ]
