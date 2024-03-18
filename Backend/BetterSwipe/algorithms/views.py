from django.shortcuts import render
from django.http import HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import user_list
from .serializers import *

#def index(request):
#    return HttpResponse("Welcome to BetterSwipe!")

@api_view(['GET', 'POST'])
def index(request):
    if request.method == 'GET':
        data = user_list.objects.all()
        #serializer = user_list_Serializer(data, context={'request':request}, many=True)
        #return Response(serializer.data)
        return Response({'message' : str(data)})
    
    elif request.method == 'POST':
        serializer = user_list_Serializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        