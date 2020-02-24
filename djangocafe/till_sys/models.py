from django.db import models
from django.contrib.auth.models import User
from django.dispatch import receiver
from django.db.models.signals import post_save
from datetime import datetime

# Main Menu Items.  Includes price, name, description and so on
class Menu_Item(models.Model):
    name = models.CharField(max_length = 64)                            # Item name
    description = models.TextField(blank = True, null = True)                        # describe the item
    type = models.ForeignKey('Item_type', on_delete=models.SET_NULL, blank = True, null = True)    # Main Meal / Starter etc -- link to Item_type
    price = models.FloatField(blank = True, null = True)                                         # Price of item, if different than that type of meal
    allergy_info = models.CharField(max_length = 200, blank = True, null = True)      # Any allergy precautions?
    active_status = models.CharField(max_length = 32, default="Active")                   # Is item still available?  Discontinued?
    options = models.ManyToManyField('Option', blank = True,)                           # Anything we have to choose?
    addons = models.ManyToManyField('Add_On', blank = True,)                            # Anything that's extra?
    breadType = models.ManyToManyField('breadType', blank = True,)
    min_options = models.IntegerField(default = 0)                                       # minimum options that need be selected.  Employee cannot move forward until that many have been chosen
    max_options = models.IntegerField(default = 0)                                       # max options

    def __str__(self):
        return f"{self.name}"

class Item_Type(models.Model):
    name = models.CharField(max_length = 64)
    price = models.FloatField(blank = True, null = True)                             # Use this if the entire class has a price.  Can be overridden in Item field
    menu_type = models.CharField(max_length = 32)               # breakfast or lunch?

    def __str__(self):
        return self.name

# Optional changes to menu items.  Includes things like type of break, price change and such
class Option(models.Model):
    name = models.CharField(max_length = 64)                            # Name of the option
    price_change = models.FloatField(blank = True, null = True)                      # does the price change with this option?

    def __str__(self):
        return f"{self.name}"

class Add_On(models.Model):
    name = models.CharField(max_length = 64)
    price_change = models.FloatField(blank = True, null = True)                      # does the price change?

    def __str__(self):
        return f"{self.name}"

class breadType(models.Model):
    name = models.CharField(max_length = 64)
    price_change = models.FloatField(blank = True, null = True)

    def __str__(self):
        return f"{self.name}"

class Cart(models.Model):
    total = models.FloatField()
    status = models.CharField(max_length = 64, default="Processing")
    employee = models.ForeignKey(User, on_delete = models.PROTECT)
    time_of_order = models.DateTimeField(default=datetime.now())
    items = models.ManyToManyField('Cart_Entry', blank = True, )
    payment_method = models.CharField(max_length = 64, blank = True, null = True, )

    def __str__(self):
        return f"{self.pk} | {self.employee} | {self.time_of_order.strftime('%H:%M - %d/%m/%Y')} | {self.status}"

# used to populate the model item.
class Cart_Entry(models.Model):
    item = models.ForeignKey('Menu_Item', on_delete = models.PROTECT)
    bread = models.ManyToManyField('BreadType', blank = True, )
    options = models.ManyToManyField('Option', blank = True, )
    addons = models.ManyToManyField('Add_On', blank = True, )
    notes = models.CharField(max_length = 64, blank = True, null = True)
    price = models.FloatField()
