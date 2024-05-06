from django.contrib import admin
from .models import CardList, UserList, Expenses, SpendingSummary, CardRecommendations, OwnedCards, TotalExpenses
# Register your models here.
admin.site.register(CardList)
admin.site.register(UserList)
admin.site.register(Expenses)
admin.site.register(SpendingSummary)
admin.site.register(CardRecommendations)
admin.site.register(OwnedCards)
admin.site.register(TotalExpenses)