from django.urls import path
from . import views

urlpatterns = [
    path('api/menuitems/', views.Menu_Items_ListCreate.as_view()),
    path('api/itemtypes/', views.Item_Types_ListCreate.as_view()),
    path('api/menutypes/', views.Menu_Types_ListCreate.as_view()),
    path('api/options/', views.Options_ListCreate.as_view()),
    path('api/addons/', views.Add_Ons_ListCreate.as_view()),
    path('api/breadtypes/', views.Bread_Types_ListCreate.as_view()),
    path('api/carts/', views.Carts_ListCreate.as_view()),
    path('api/cartentries/', views.Cart_Entries_ListCreate.as_view()),
]
