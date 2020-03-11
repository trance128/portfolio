from django.db import models
from django.contrib.auth.models import User

class Menu_Items(models.Model):
    name = models.CharField(max_length = 100)
    type = models.ForeignKey('Item_Types', on_delete = models.SET_NULL, blank = True, null = True)
    price = models.FloatField()
    active_status = models.CharField(max_length = 32, default="Active")
    options = models.ManyToManyField('Options', blank=True)
    addons = models.ManyToManyField('Add_Ons', blank=True)
    bread_type = models.ManyToManyField('Bread_Types', blank=True)

    def __str__(self):
        return f"{self.name}"

class Item_Types(models.Model):
    name = models.CharField(max_length = 100)
    menu_type = models.ForeignKey('Menu_Types', max_length = 32, on_delete = models.PROTECT)

    def __str__(self):
        return f"{self.name}"

class Menu_Types(models.Model):
    name = models.CharField(max_length = 100)

    def __str__(self):
        return f"{self.name}"


class Options(models.Model):
    name = models.CharField(max_length = 100)
    price_change = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

class Add_Ons(models.Model):
    name = models.CharField(max_length = 100)
    price_change = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

class Bread_Types(models.Model):
    name = models.CharField(max_length = 100)
    price_change = models.FloatField(blank=True, null=True)

    def __str__(self):
        return f"{self.name}"

class Carts(models.Model):
    total = models.FloatField()
    status = models.CharField(max_length = 64, default="Processing")
    employee = models.ForeignKey(User, on_delete = models.PROTECT, blank=True, null=True)
    time_of_order = models.DateTimeField(auto_now_add = True)
    entries = models.ManyToManyField('Cart_Entries', blank=True)
    payment_method = models.CharField(max_length = 64, blank = True, null = True)

    def __str__(self):
        return f"{self.pk} | {self.employee} | {self.time_of_order.strftime('%H:%M - %d/%m/%y')} | {self.status}"

class Cart_Entries(models.Model):
    item = models.ForeignKey('Menu_Items', on_delete = models.PROTECT)
    bread = models.ManyToManyField('Bread_Types', blank = True)
    options = models.ManyToManyField('Options', blank = True)
    addons = models.ManyToManyField('Add_Ons', blank = True)
    notes = models.CharField(max_length = 512, blank = True, null = True)
    price = models.FloatField()
