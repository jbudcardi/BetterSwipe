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
from .rewardscc import getCardDetails, getCardImage, getCardsInCategory, getCategoryList

from django.db import models
from django.db.models import Sum
from .models import UserList
from django.contrib.auth import get_user_model
from rest_framework.authtoken.models import Token

import numpy as py
import pandas as pd
import matplotlib.pyplot as plt
import datetime


@api_view(['GET'])
def test(request):
    return Response({'message': "API Test successful!"})

@api_view(['POST'])
def register(request):
    if request.method != 'POST':
        return Response({"error": "POST request required."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        if UserList.objects.filter(email=serializer.validated_data['email']).exists():
            return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
        
        serializer.save()
        return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
    else:
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



@api_view(['GET', 'POST'])
def login(request):
    if request.method == 'POST':
        data = request.data
        # username = data["username"]
        email = data["email"]
        password = data["password"]
        user = UserList.objects.get(email=email,password=password)
        return Response({'userId': user.id})
    return Response({'message': "This is meant for POST requests."})

#Login Functionality location:
@api_view(['POST'])
def logout(request):
    try:
        # Assuming that you are storing the user's ID in the session or token that can be accessed via the request
        email = request.data.get('email')
        #password = request.data.get("password") #adding this for debugging purposes
        if email:
            user = UserList.objects.get(email=email,) #putting password here for debugging purposes: password=password
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
def upload_transactions(request, userId):
    try:
        csv_file = request.FILES['csv']
        # user_id = request.data['userId']
        user_id = userId
        
        user = UserList.objects.get(pk=user_id)
        df = pd.read_csv(csv_file)
        
        #Get total
        total_amount = df['amount'].sum()

        #Group and sum by categories
        category_df = df.groupby(['category'], sort=True)['amount'].sum()
        
        monthSummary = 0
        #Just for categorized csv, might need to make one traversing whole original CSV
        for i in df.index:
            df_date = df['date'][i]
            df_category = df['category'][i]
            df_amount = df['amount'][i]
            
            month, day, year = [int(j) for j in df_date.replace('/','-').split('-') if j.isdigit()]

            expense = Expenses(
                    user = user,
                    transaction_date = datetime.datetime(year, month, day),
                    amount = float(df_amount),
                    spending_category = df_category
                    )
            # monthSummary = int(transaction_date.strftime("%m"))
            expense.save()
        
        
        #monthSummary = int(expense.trasnaction_date.strftime("%m"))
        amount_by_category = Expenses.objects.values('spending_category').annotate(total_cost=Sum("amount"))
        #float variables to hold expense totals by category
        
        sumGrocery, sumDining, sumTravel, sumGas, sumEntertainment, sumOther = (0.0,)*6
        
        for item in amount_by_category:
            name = item['spending_category']
            total_cost = item['total_cost']

            if name == 'Grocery':
                sumGrocery += total_cost
            elif name == 'Dining':
                sumDining += total_cost
            elif name == 'Travel':
                sumTravel += total_cost
            elif name == 'Entertainment':
                sumEntertainment += total_cost
            elif name == 'Gas':
                sumGas += total_cost
            else:
                sumOther += total_cost
        
        #Assigning category sums to SpendingSummary model
        summary = SpendingSummary(
               user = user,
               month = month,
               travel_amount = sumTravel,
               dining_amount = sumDining,
               grocery_amount = sumGrocery,
               gas_amount = sumGas,
               entertainment_amount = sumEntertainment,
               other_amount = sumOther
               )
        summary.save()
        
        return Response({'status': 'success', 'message': 'Transactions processed successfully'}, status=200)
    except Exception as e:
        return Response({'status': 'error', 'message': str(e)}, status=400)

#Function to return amounts by category
def amount_by_category(request):
     #Aggregate the costs grouped by category
     amount_by_category = Expenses.objects.values('spending_category').annotate(total_cost=Sum('amount'))
    
     #Convert the queryset into a dictionary for JSON serialization
     result = {entry['spending_category']: entry['total_cost'] for entry in cost_by_category}
     return JsonResponse(result)



@api_view(["POST"])
def get_expenditures(request):
    try:
        data = request.data
        user_id = int(data['userId'])
        user = UserList.objects.get(pk=user_id)

        month = int(data['month'])
        
        # expenses = SpendingSummary.objects.get(user=user)
        expenses = SpendingSummary.objects.filter(user=user, month=month).last()

        expenses_by_category = {
            'travel_amount'        : expenses.travel_amount, 
            'dining_amount'        : expenses.dining_amount, 
            'grocery_amount'       : expenses.grocery_amount, 
            'gas_amount'           : expenses.gas_amount, 
            'entertainment_amount' : expenses.entertainment_amount,
            'other_amount'         : expenses.other_amount,
        }

        return Response(expenses_by_category)
    
    except Exception as e:
        expenses_by_category = {
            'travel_amount'        : 0, 
            'dining_amount'        : 0, 
            'grocery_amount'       : 0, 
            'gas_amount'           : 0, 
            'entertainment_amount' : 0,
            'other_amount'         : 0,
        }

        return Response(expenses_by_category)




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


class SignUpAPIView(APIView):
    print("SIGNUP GOT CALLED")
    
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']

            if UserList.objects.filter(email=email).exists():
                return Response({'error': 'Email already exists'}, status=status.HTTP_400_BAD_REQUEST)
            
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





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
    card_ids = ['citi-premierpassexpedia', 
                'citi-premierpassexpediaelite',
                'chase-freedomflex',
                'chase-freedomunlimited',
                'umquabank-everyday',
                'twinriverbank-everyday',
                'trustcobank-everyday',
                'townebank-everyday',
                'bankoftexas-everyday',
                'bankofoklahoma-everyday',
                'bankofabq-everyday',
                'banknewport-everyday',
                'spectracu-biz-cashpreffered',
                'southstate-biz-cashpreffered',
                'southsidebank-biz-cashpreffered',
                'solidarityfcu-biz-cashpreffered',
                'centricitycu-maxcashpreferred',
                'centrisfcu-maxcashpreferred',
                'chevronfcu-maxcashpreferred',
                'choicebank-maxcashpreferred',
                ]
    for card_id in card_ids:
        card_details = getCardDetails(card_id)[0]
        issuer = card_details['cardIssuer']
        annual_fee = card_details['annualFee']

        # gets percentage of how much was spent back
        percentage_return = card_details['baseSpendAmount'] * card_details['baseSpendEarnCashValue']

        travel_reward = 0
        dining_reward = 0
        grocery_reward = 0
        shopping_reward = 0
        gas_reward = 0
        entertainment_reward = 0
        other_reward = 0

        categories = card_details['spendBonusCategory']

        for category in categories:
            multiplier = category['earnMultiplier']
            reward_amount = multiplier * percentage_return
            match category['spendBonusCategoryGroup']:
                case 'Travel'        : travel_reward        += reward_amount
                case 'Dining'        : dining_reward        += reward_amount
                case 'Auto'          : gas_reward           += reward_amount
                case 'Entertainment' : entertainment_reward += reward_amount
                case 'Shopping'      : shopping_reward      += reward_amount
                case _               : other_reward         += reward_amount
            
            if category['spendBonusSubcategoryGroup'] == 'Grocery':
                shopping_reward -= reward_amount
                grocery_reward = reward_amount

        card = CardList(card_name=card_id, issuer=issuer, annual_fee=annual_fee,
                        travel_reward=travel_reward, dining_reward=dining_reward,grocery_reward=grocery_reward,
                        shopping_reward=shopping_reward, gas_reward=gas_reward,
                        entertainment_reward=entertainment_reward, other_reward=other_reward)
        card.save()
    
    return Response({'message': 'Load complete'})



@api_view(["POST"])
def findTopCards(request, userId):
    # user_id = int(request.data['userId'])
    user_id = userId
    user = UserList.objects.get(pk=user_id)

    # temp hack to prevent database bloat
    try:
        first_recommendation = CardRecommendations.objects.filter(user=user).first()
        first_recommendation.delete()
    except Exception as e:
        "Unassigned string to trick python into doing nothing :)"
    
    try:
        # user = UserList.objects.get(pk=1)
        # user = UserList.objects.get(username=user_id)
        print("Month requested = " + str(request.data['month']))        
        month = int(request.data['month'])

        # expenses = SpendingSummary.objects.filter(user=user).last() #order by latest date?
        expenses = SpendingSummary.objects.filter(user=user, month=month).last()
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
                    break
        
        recommendations = CardRecommendations(user=user,card_name_1=card_names[0],
                            card_name_2=card_names[1],card_name_3=card_names[2])
        recommendations.save()

        cards = card_names
        card_details = [getCardDetails(card.card_name)[0] for card in cards]
        print("cards: " + str(cards))
        return Response({
            'Cards': [{
                'ImageURL' : getCardImage(cards[i].card_name),
                'Name' : card_details[i]['cardName'],
                }for i in range(len(cards))]
            })
        #return Response({'message': 'Found top cards' + str(card_names)})
    except Exception as e:
        print("Error: " + str(e))
        return Response({'Cards': []})

@api_view(["GET"])
def usersTopCards(request, userId):
    try:
        # user_id = int(request.data['userId'])
        user_id = userId
        user = UserList.objects.get(pk=user_id)
        recommendations = CardRecommendations.objects.filter(user=user).last()
        Card1 = recommendations.card_name_1
        Card2 = recommendations.card_name_2
        Card3 = recommendations.card_name_3

        cards = [Card1, Card2, Card3]
        card_details = [getCardDetails(card.card_name)[0] for card in cards]
        return Response({
            'Cards': [{
                'ImageURL' : getCardImage(cards[i].card_name),
                'Name' : card_details[i]['cardName'],
                'Issuer' : card_details[i]['cardIssuer'],
                'Website' : card_details[i]['cardUrl'],
                'CreditScore' : card_details[i]['creditRange'],
                'AnnualFee' : card_details[i]['annualFee'],
                'RewardType' : card_details[i]['baseSpendEarnCurrency'],
                'TravelReward' : cards[i].travel_reward,
                'DiningReward' : cards[i].dining_reward,
                'GroceryReward' : cards[i].grocery_reward,
                'ShoppingReward' : cards[i].shopping_reward,
                'GasReward' : cards[i].gas_reward,
                'EntertainmentReward' : cards[i].entertainment_reward,
                'OtherReward' : cards[i].other_reward,
                }for i in range(len(cards))]
            })
    except Exception as e:
        print("Exception: " + str(e))
        return Response({
            'Cards': []
            })