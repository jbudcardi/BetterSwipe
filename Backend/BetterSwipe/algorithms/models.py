from django.db import models

# Create your models here.
class user_list(models.Model):
    username = models.CharField(max_length=20, default="", unique=True)
    last_name = models.CharField(max_length=20, default="", unique=False)
    first_name = models.CharField(max_length=20, default="", unique=False)
    email = models.CharField(max_length=20, default="", unique=True)
    password = models.CharField(max_length=20, default="", unique=True)
    
    def __str__(self):
        return self.username