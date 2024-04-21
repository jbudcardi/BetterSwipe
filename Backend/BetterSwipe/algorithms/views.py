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
from .models import CardList, SpendingSummary
from django.contrib.auth import authenticate, login
from rest_framework.views import APIView

@api_view(['GET'])
def test(request):
    return Response({'message': "API Test successful!"})

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



def add_rewards_cc_cards():
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


def findTopCards(user):
    # user
    expenses = SpendingSummary.objects.get(pk=user) #order by latest date?
    cards = CardList.objects.all()

    max_scores = [0,0,0]
    card_names = ["","",""]

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
        
        for i in range(len(max_scores)):
           if (score > max_scores[i]):
              max_scores = max_scores.insert(i, score)[:3]
              card_names = card_names.insert(i, card.card_name)[:3]
              break
    return card_names
