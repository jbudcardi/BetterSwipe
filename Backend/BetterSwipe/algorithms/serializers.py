from collections import UserList
from xml.dom import ValidationErr
from django.contrib.auth.models import User
from .models import UserList

from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers

class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(style={'input_type': 'password'}, write_only=True)
    class Meta:
        model = UserList
        fields = ['id', 'username', 'email', 'password', 'confirm_password', 'first_name', 'last_name']
        extra_kwargs = {'password': {'write_only': True},
                        'first_name': {'required': False},
            'last_name': {'required': False},
            }
    
    def validate_email(self, value):
        if UserList.objects.filter(email=value).exists(): # type: ignore
            raise serializers.ValidationError("A user with that email already exists.")
        return value
   
    def validate_password(self, value):
        try:
            validate_password(value)
        except ValidationErr as e:
            raise serializers.ValidationError("Password Validation error: " + ';'.join(e.messages))
        return value


    def validate(self, data):
        if data['password'] != data['confirm_password']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})
        return data

    def create(self, validated_data):
        validated_data.pop('confirm_password', None)  # Remove confirm_password from data if it's there
        user = UserList.objects.create(**validated_data)
        return user
    
    