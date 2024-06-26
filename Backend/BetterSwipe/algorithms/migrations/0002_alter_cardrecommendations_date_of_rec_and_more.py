# Generated by Django 5.0.2 on 2024-05-03 20:05

import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('algorithms', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='cardrecommendations',
            name='date_of_rec',
            field=models.DateField(default=django.utils.timezone.now),
        ),
        migrations.AlterField(
            model_name='expenses',
            name='transaction_date',
            field=models.DateField(default=django.utils.timezone.now),
        ),
    ]
