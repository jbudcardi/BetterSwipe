from rest_framework import serializers
from .models import user_list

class user_list_Serializer(serializers.ModelSerializer):
    class Meta:
        model = user_list 
        fields = ('pk', 'username', 'last_name', 'first_name', 'email', 'password')
