from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import json
from django.contrib.auth import authenticate, login
from django.shortcuts import render, redirect


def index(request):
    return HttpResponse("Welcome to BetterSwipe!")


@csrf_exempt
def signup(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            #may add data validation here
            user = User.objects.create(
                username=data['username'],
                email=data['email'],
                password=make_password(data['password']) #this will securely hash the password to attempt to prevent any vulnerabilities
            )
            user.save() #this saves the user to the database
            return JsonResponse({"message": "User created successfully"}, status=201)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=400)
    else:
        return JsonResponse({"error": "Invalid request"}, status=405)


@csrf_exempt
def login_user(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))
        username = data.get('username')
        password = data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return JsonResponse({"success": True, "message": "Login successful"})
        else:
            return JsonResponse({"success": False, "message": "Invalid username or password"}, status=401)
    else:
        return JsonResponse({"error": "Only POST requests are accepted."}, status=405)
