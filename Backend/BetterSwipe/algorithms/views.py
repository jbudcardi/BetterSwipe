from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.contrib.auth import logout
from django.contrib.auth.forms import AuthenticationForm
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from rest_framework.authtoken.models import Token
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView


@api_view(['GET'])
def register(request):
    return Response({'message': "Welcome to BetterSwipe!"})

#this is where the registration will go
def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            username = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=username, password=password)
            if user:
                login(request, user)
                return redirect('index')  # Ensure you have a URL named 'index'
    else:
        form = AuthenticationForm()
    return render(request, 'login.html', {'form': form})  # Adjust the template name as necessary

def user_logout(request):
    logout(request)
    return redirect('user_login')

class LoginAPIView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # You can include any logic here that needs to be processed during a GET request
        # Example: return a simple message or specific data
        return Response({
            'message': 'GET request received. But this endpoint is primarily for POST requests.'
        }, status=status.HTTP_200_OK)

    
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        user = authenticate(username=username, password=password)
        if user:
            token, _=Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
