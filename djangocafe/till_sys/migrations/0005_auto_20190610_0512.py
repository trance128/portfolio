# Generated by Django 2.2 on 2019-06-10 04:12

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('till_sys', '0004_auto_20190608_0843'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart',
            name='payment_method',
            field=models.CharField(blank=True, max_length=64, null=True),
        ),
        migrations.AlterField(
            model_name='cart',
            name='time_of_order',
            field=models.DateTimeField(default=datetime.datetime(2019, 6, 10, 5, 12, 58, 990732)),
        ),
    ]
