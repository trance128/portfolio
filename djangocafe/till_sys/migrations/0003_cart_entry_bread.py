# Generated by Django 2.2 on 2019-06-05 09:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('till_sys', '0002_auto_20190605_1019'),
    ]

    operations = [
        migrations.AddField(
            model_name='cart_entry',
            name='bread',
            field=models.ManyToManyField(blank=True, to='till_sys.breadType'),
        ),
    ]
