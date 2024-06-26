from django.db import models
from django.utils.timezone import now
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, PermissionsMixin

# Create your models here.
class CardList(models.Model):
    card_name = models.CharField(max_length=255, primary_key=True)
    issuer = models.CharField(max_length=255)

    image_url = models.CharField(max_length = 255, default = "")
    long_name = models.CharField(max_length = 255, default = "")
    # issuer = models.CharField(max_length = 255)
    website = models.CharField(max_length = 255, default = "")
    creditscore = models.CharField(max_length = 255, default = "")
    # annual_fee = models.IntegerField()
    reward_type = models.CharField(max_length = 255, default = "")

    travel_reward = models.FloatField(default=0)
    dining_reward = models.FloatField(default=0)
    grocery_reward = models.FloatField(default=0)
    shopping_reward = models.FloatField(default=0)
    gas_reward = models.FloatField(default=0)
    entertainment_reward = models.FloatField(default=0)
    other_reward = models.FloatField(default=0)
    # interest_rate = models.IntegerField(default=0)   # rewards cc doesn't seem to have APR or interest rate 
    annual_fee = models.IntegerField()

    def __str__(self):
        return self.card_name

class UserList(models.Model):
    username = models.CharField(max_length=255)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255)
    password = models.CharField(max_length=255)

    def __str__(self):
        return self.username


class Expenses(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    transaction_date = models.DateField(default=now)
    amount = models.IntegerField()
    spending_category = models.CharField(max_length=255)

class SpendingSummary(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    month = models.IntegerField()
    travel_amount = models.IntegerField()
    dining_amount = models.IntegerField()
    grocery_amount = models.IntegerField()
    gas_amount = models.IntegerField()
    entertainment_amount = models.IntegerField()
    other_amount = models.IntegerField()

class TotalExpenses(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    travel_amount = models.IntegerField(default = 0)
    dining_amount = models.IntegerField(default = 0)
    grocery_amount = models.IntegerField(default = 0)
    gas_amount = models.IntegerField(default = 0)
    entertainment_amount = models.IntegerField(default = 0)
    other_amount = models.IntegerField(default = 0)

class CardRecommendations(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    card_name_1 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_1')
    card_name_2 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_2')
    card_name_3 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_3')
    date_of_rec = models.DateField(default=now)


class OwnedCards(models.Model):
    card_name = models.OneToOneField(CardList, on_delete=models.CASCADE, primary_key=True)
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    travel_reward = models.IntegerField()
    dining_reward = models.IntegerField()
    grocery_reward = models.IntegerField()
    gas_reward = models.IntegerField()
    entertainment_reward = models.IntegerField()
    other_reward = models.IntegerField()
