from django.db import models

# Create your models here.
class CardList(models.Model):
    card_name = models.CharField(max_length=255, primary_key=True)
    issuer = models.CharField(max_length=255)
    travel_reward = models.IntegerField()
    dining_reward = models.IntegerField()
    grocery_reward = models.IntegerField()
    gas_reward = models.IntegerField()
    entertainment_reward = models.IntegerField()
    other_reward = models.IntegerField()
    interest_rate = models.IntegerField()
    annual_fee = models.IntegerField()

    def __str__(self):
        return self.card_name

class UserList(models.Model):
    username = models.CharField(max_length=255, unique= True)
    last_name = models.CharField(max_length=255)
    first_name = models.CharField(max_length=255)
    email = models.CharField(max_length=255, unique=True)
    password = models.CharField(max_length=255)

    #We are hashing the password for security purposes to avoid storing plain text passwords
    def save(self, *args, **kwargs):
        self.password = make_password(self.password)
        super(UserList, self).save(*args, **kwargs)

    def __str__(self):
        return self.username

class Expenses(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    transaction_date = models.DateField()
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

class CardRecommendations(models.Model):
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    card_name_1 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_1')
    card_name_2 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_2')
    card_name_3 = models.ForeignKey(CardList, on_delete=models.CASCADE, related_name='card_name_3')
    date_of_rec = models.DateField()

class OwnedCards(models.Model):
    card_name = models.ForeignKey(CardList, on_delete=models.CASCADE, primary_key=True)
    user = models.ForeignKey(UserList, on_delete=models.CASCADE)
    travel_reward = models.IntegerField()
    dining_reward = models.IntegerField()
    grocery_reward = models.IntegerField()
    gas_reward = models.IntegerField()
    entertainment_reward = models.IntegerField()
    other_reward = models.IntegerField()
