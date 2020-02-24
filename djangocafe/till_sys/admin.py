from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import User
from .models import Menu_Item, Item_Type, Option, Add_On, Cart, Cart_Entry, breadType

class Menu_ItemAdmin(admin.ModelAdmin):
    list_display = ('name', 'type', 'price')
    search_field = ('name', 'type', 'active_status', 'price')

# Register your models here.
admin.site.register(Menu_Item, Menu_ItemAdmin)
admin.site.register(Item_Type)
admin.site.register(breadType)
admin.site.register(Option)
admin.site.register(Add_On)
admin.site.register(Cart)
admin.site.register(Cart_Entry)
