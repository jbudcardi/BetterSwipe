from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
import json

def index(request):
    return HttpResponse("Welcome to BetterSwipe!")


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