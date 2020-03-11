from rest_framework import serializers
from .models import *

class Menu_Items_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Menu_Items
        fields = ('pk', 'name', 'type', 'price', 'active_status', 'options', 'addons', 'bread_type')

class Item_Types_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Item_Types
        fields = ('pk', 'name', 'menu_type')

class Menu_Types_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Menu_Types
        fields = ('pk', 'name')

class Options_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Options
        fields = ('pk', 'name', 'price_change')

class Add_Ons_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Add_Ons
        fields = ('pk', 'name', 'price_change')

class Bread_Types_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Bread_Types
        fields = ('pk', 'name', 'price_change')

class Carts_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Carts
        fields = ('pk', 'total', 'status', 'employee', 'time_of_order', 'entries', 'payment_method')

class Cart_Entries_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Cart_Entries
        fields = ('pk', 'item', 'bread', 'options', 'addons', 'notes', 'price')
