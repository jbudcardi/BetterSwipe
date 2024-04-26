import email
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
from .models import UserList, Expenses, CardList, SpendingSummary, CardRecommendations
from django.contrib.auth import authenticate, login # type: ignore
from rest_framework.views import APIView

from django.db import models
from .models import UserList
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

import numpy as py
import pandas as pd
import matplotlib.pyplot as plt


@api_view(['GET'])
def test(request):
    return Response({'message': "API Test successful!"})

@api_view(['POST'])
def register(request):
    try:
        if UserList.objects.filter(email=request.data.get('email')).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Hash the password before saving
       # hashed_password = make_password(request.data.get('password'))

        user = UserList(
            username=request.data.get('username'),
            last_name=request.data.get('lastName'),
            first_name=request.data.get('firstName'),
            email=request.data.get('email'),
            #password=hashed_password
        )
        user.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'POST':
        data = request.data
        # username = data["username"]
        email = data["email"]
        password = data["password"]
        user = UserList.objects.get(email=email,password=password)
        return Response({'message': "Retrieved: ID ="+ str(user.id) + ", User: " + str(user)})
    return Response({'message': "This is meant for POST requests."})

#Login Functionality location:
@api_view(['POST'])
def logout(request):
    try:
        # Assuming that you are storing the user's ID in the session or token that can be accessed via the request
        email = request.data.get('email')
        if email:
            user = UserList.objects.get(email=email)
            # Here you would invalidate the session or token. Since it's not clear how you manage sessions/tokens, I'll assume you need to delete or deactivate them manually.
            # If using Django's session, you might want to call `logout(request)` to remove the session.
            # However, since it seems you're not using Django's auth system, you might just do something custom here.
            # Example: Remove a custom token from a database or cache (this part is hypothetical)
            # token = CustomTokenModel.objects.get(user=user)
            # token.delete()

            # Proper response after logout
            return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Email not provided'}, status=status.HTTP_400_BAD_REQUEST)
    except UserList.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)
    except Exception as e:
        return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

@api_view(['POST'])
def login_view(request):
    email = request.data.get('email')
    password = request.data.get('password')
    user = authenticate(request, username=email, password=password)
    if user is not None:
        login(request, user)  # Establish a session
        token, _ = Token.objects.get_or_create(user=user)  # Create or get existing token
        return Response({'token': token.key}, status=status.HTTP_200_OK)
    else:
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
    
@api_view(['POST'])
def logout_view(request):
    try:
        # Assuming the token is sent in the header and automatically handled by DRF.
        request.user.auth_token.delete()
    except AttributeError:
        # Handle the case where the token is not found or already deleted
        pass
    logout(request)  # Clear the session
    return Response({'message': 'Logged out successfully'}, status=status.HTTP_200_OK)


#Pandas upload method
@api_view(["POST"])
def upload_transactions(request):
    try:
        csv_file = request.FILES['file']
        user_id = request.data['userId']
        user = UserList.objects.get(pk=user_id)
        df = pd.read_csv(csv_file)

        #Get total
        total_amount = df['amount'].sum()

        #Group and sum by categories
        category_df = df,groupby(['category'], sort=True)['amount'].sum()
        
        #Just for categorized csv, might need to make one traversing whole original CSV
        for i in df.index:
            df_date = df['date'][i]
            df_category = df['category'][i]
            df_amount = df['amount'][i]

            Expenses.objects.create(
                    user = user,
                    transaction_date = date,
                    amount = df_amount,
                    spending_category = df_category
                    )
        
        return JsonResponse({'status': 'success', 'message': 'Transactions processed successfully'}, status=200)
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)}, status=400)

#Function to return amounts by category
def amount_by_category(request):
     #Aggregate the costs grouped by category
     amount_by_category = Expenses.objects.values('spending_category').annotate(total_cost=Sum('amount'))
    
     #Convert the queryset into a dictionary for JSON serialization
     result = {entry['spending_category']: entry['total_cost'] for entry in cost_by_category}
     return JsonResponse(result)

#this is where the registration will go

def user_login(request):
    if request.method == 'POST':
        form = AuthenticationForm(request, data=request.POST)
        if form.is_valid():
            email = form.cleaned_data.get('username')
            password = form.cleaned_data.get('password')
            user = authenticate(username=email, password=password)
            if user:
                login(request, user)
                return redirect('index')  # Ensure we have a URL named 'index'
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
        email = request.data.get('email')
        password = request.data.get('password')
        user = authenticate(username=email, password=password)
        if user:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)
         
        #if user:
            #login(request, user)  # Log in the user
            #token, created=Token.objects.get_or_create(user=user)
            #return Response({'token': token.key, 'redirect':'/dashboard'}, status=status.HTTP_200_OK)
        #return Response({'error': 'Invalid Credentials'}, status=status.HTTP_400_BAD_REQUEST)


@api_view(["POST"])
def add_rewards_cc_cards(request):
    cards = [
        CardList(card_name="PremierPass Expedia", issuer="Citi", annual_fee=0, travel_reward = 2.4),
        CardList(card_name="PremierPass Expedia Elite", issuer="Citi", annual_fee=75, shopping_reward=1.6,travel_reward=2.4,gas_reward=1.6,grocery_reward=1.6),
        CardList(card_name="Chase Freedom Flex®", issuer="Chase", annual_fee=0, shopping_reward=5, dining_reward=3, travel_reward=3),
        CardList(card_name="Chase Freedom Unlimited®", issuer="Chase", annual_fee=0, travel_reward=7.5, dining_reward=4.5, shopping_reward=4.5),
        CardList(card_name="Umpqua Bank Visa® Everyday Rewards+", issuer="Umpqua Bank", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Twin River Bank Visa® Everyday Rewards+", issuer="Twin River Bank", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Trustco Bank Visa® Everyday Rewards+", issuer="Trustco Bank", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Towne Bank Visa® Everyday Rewards+", issuer="Towne Bank", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Bank of Texas Visa® Everyday Rewards+", issuer="Bank of Texas", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Bank of Oklahoma Visa® Everyday Rewards+", issuer="Bank of Oklahoma", annual_fee=0, dining_reward=4, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Bank of Albuquerque Visa® Everyday Rewards+", issuer="Bank of Albuquerque", annual_fee=0, dining_reward=4, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="BankNewport Visa® Everyday Rewards+", issuer="BankNewport", annual_fee=0, gas_reward=2, grocery_reward=2, entertainment_reward=2),
        CardList(card_name="Spectra Credit Union Visa® Business Cash Preferred", issuer="Spectra Credit Union", annual_fee=0, dining_reward=3, gas_reward=3),
        CardList(card_name="SouthState Bank Visa® Business Cash Preferred", issuer="SouthState Bank", annual_fee=0, dining_reward=3, gas_reward=3),
        CardList(card_name="Southside Bank Visa® Business Cash Preferred", issuer="Southside Bank", annual_fee=0, dining_reward=3, gas_reward=3),
        CardList(card_name="Solidarity Community FCU Visa® Business Cash Preferred", issuer="Solidarity Community FCU", annual_fee=0, dining_reward=3, gas_reward=3),
        CardList(card_name="Centricity Credit Union Visa® Max Cash Preferred", issuer="Centricity Credit Union", annual_fee=0, dining_reward=2, gas_reward=2, grocery_reward=2, travel_reward=2),
        CardList(card_name="Centris Federal Credit Union Visa® Max Cash Preferred", issuer="Centris Federal Credit Union", annual_fee=0, dining_reward=2, gas_reward=2, grocery_reward=2, travel_reward=2),
        CardList(card_name="Chevron Federal Credit Union Visa® Max Cash Preferred", issuer="Chevron Federal Credit Union", annual_fee=0, dining_reward=2, gas_reward=2, grocery_reward=2, travel_reward=2),
        CardList(card_name="Choice Bank Visa® Max Cash Preferred", issuer="Choice Bank", annual_fee=0, dining_reward=2, gas_reward=2, grocery_reward=2, travel_reward=2),
        ]
    for card in cards:
        card.save()
    return Response({'message': 'Load complete'})



@api_view(["POST"])
def findTopCards(request):
    # user
    user_id = request.data['userId']
    # user = UserList.objects.get(pk=user_id)
    user = UserList.objects.get(username=user_id)
    
    
    expenses = SpendingSummary.objects.get(user=user) #order by latest date?
    cards = CardList.objects.all()

    max_scores = [0,0,0]
    card_names = [cards[0], cards[0], cards[0]]

    expenses_by_category = {
        'travel_amount'        : expenses.travel_amount, 
        'dining_amount'        : expenses.dining_amount, 
        'grocery_amount'       : expenses.grocery_amount, 
        'gas_amount'           : expenses.gas_amount, 
        'entertainment_amount' : expenses.entertainment_amount
    }

    for card in cards:
        score = card.travel_reward        * expenses_by_category['travel_amount'       ] \
              + card.dining_reward        * expenses_by_category['dining_amount'       ] \
              + card.grocery_reward       * expenses_by_category['grocery_amount'      ] \
              + card.gas_reward           * expenses_by_category['gas_amount'          ] \
              + card.entertainment_reward * expenses_by_category['entertainment_amount']
        
        for i in range(len(card_names)):
           if (score > max_scores[i]):
              max_scores.insert(i, score)
              card_names.insert(i, card)

              if len(max_scores) > 3:
                  card_names.pop()
                  max_scores.pop()
              print(max_scores)
              break
        recommendations = CardRecommendations(user=user,card_name_1=card_names[0],
                            card_name_2=card_names[1],card_name_3=card_names[2])
        recommendations.save()
    return Response({'message': 'Found top cards' + str(card_names)})
