from django.shortcuts import render
from .models import *
from .serializers import *
from rest_framework import generics
from rest_framework import viewsets

class Menu_Items_ListCreate(generics.ListCreateAPIView):
    queryset = Menu_Items.objects.all()
    serializer_class = Menu_Items_Serializer

class Item_Types_ListCreate(generics.ListCreateAPIView):
    queryset = Item_Types.objects.all()
    serializer_class = Item_Types_Serializer

class Menu_Types_ListCreate(generics.ListCreateAPIView):
    queryset = Menu_Types.objects.all()
    serializer_class = Menu_Types_Serializer

class Options_ListCreate(generics.ListCreateAPIView):
    queryset = Options.objects.all()
    serializer_class = Options_Serializer

class Add_Ons_ListCreate(generics.ListCreateAPIView):
    queryset = Add_Ons.objects.all()
    serializer_class = Add_Ons_Serializer

class Bread_Types_ListCreate(generics.ListCreateAPIView):
    queryset = Bread_Types.objects.all()
    serializer_class = Bread_Types_Serializer

class Carts_ListCreate(generics.ListCreateAPIView):
    queryset = Carts.objects.all()
    serializer_class = Carts_Serializer

class Carts_Viewset(viewsets.ModelViewSet):
    queryset = Carts.objects.all
    serializer_class = Carts_Serializer

class Cart_Entries_ListCreate(generics.ListCreateAPIView):
    queryset = Cart_Entries.objects.all()
    serializer_class = Cart_Entries_Serializer
