from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.urls import reverse
from datetime import datetime, timedelta
import os

from .models import *

## method to load necessary data
def load_data(request):
    cart = Cart.objects.get(id=request.session["cart"])
    Items = Menu_Item.objects.all()

    entries = cart.items.all()
    entry_dict = {}

    for entry in entries:
        bd = entry.bread.all()
        opt = entry.options.all()
        add = entry.addons.all()
        ent = [bd, opt, add]

        entry_dict[entry] = ent

    option_dict = {}
    Options = Option.objects.all()
    for option in Options:
        option_dict[option] = option.menu_item_set.all()

    addon_dict = {}
    Addons = Add_On.objects.all()
    for addon in Addons:
        addon_dict[addon] = addon.menu_item_set.all()

    bread_dict = {}
    breads = breadType.objects.all()
    for bread in breads:
        bread_dict[bread] = bread.menu_item_set.all()

    type_dict = {}
    types = Item_Type.objects.all()
    for type in types:
        type_dict[type] = type.menu_item_set.all()

    data ={
        "cart": cart,
        "Items": Items,
        "types": types,
        "entries": entries,
        "breads": breads,
        "Options": Options,
        "Addons": Addons,
        "entry_dict": entry_dict,
        "option_dict": option_dict,
        "addon_dict": addon_dict,
        "bread_dict": bread_dict,
        "type_dict": type_dict,
    }
    return data

def build_receipt(cart, refund = False):
    items = {}
    opt = {}
    # loads all items into items dictionary, with inventory and price (for 1), using item name as key
    for entry in cart.items.all():
        if entry.item.name in items:
            items[entry.item.name][0] = items[entry.item.name][0] + 1
        else:
            if entry.item.price:
                price = entry.item.price
            else:
                price = entry.item.type.price
            items[entry.item.name] = [1, price]

        # any priced addons, options, bread type is added to separate dictionary
        for option in entry.options.all():
            if option.price_change:
                if option.name in opt:
                    opt[option.name][0] = opt[option.name][0] + 1
                else:
                    opt[option.name] = [1, option.price_change]
        for addon in entry.addons.all():
            if addon.price_change:
                if addon.name in opt:
                    opt[addon.name][0] = opt[addon.name][0] + 1
                else:
                    opt[addon.name] = [1, addon.price_change]
        for bread in entry.bread.all():
            if bread.price_change:
                if bread.name in opt:
                    opt[bread.name][0] = opt[bread.name][0] + 1
                else:
                    opt[bread.name] = [1, bread.price_change]

    # writes data to outfile, ready for printing
    if refund:
        outfile = open("refund.txt", "w+")
    else:
        outfile = open("receipt.txt", "w+")

    if refund:
        outfile.write("*" * 45 + "\n\n")
        s = "RECEIPT REFUNDED"
        outfile.write(f"{s:^45}\n\n")
        outfile.write("*" * 45 + "\n\n")

    # file header, including address, telephone etc
    s = "Discovery Cafe"
    outfile.write(f"{s:^45}\n\n")
    if not refund:
        s = "EastLake St, Plymouth, PL1 1BA"
        outfile.write(f"{s:^45}\n")
        s = "Telephone: 01752 266300"
        outfile.write(f"{s:^45}\n")
        s = "e-mail: discoverycafepmch@outlook.com"
        outfile.write(f"{s:^45}\n\n")
    s = datetime.now().strftime("%B %d, %Y -- %H:%M:%S")
    outfile.write(f"{s:^45}\n")
    s = f"Cart ID - {cart.id}"
    outfile.write(f"{s:^45}\n\n")
    outfile.write("*" * 45 + "\n\n")

    for key, value in items.items():
        s = f"{value[0]:3}" + " x " + f"{key:<32}" + f"{value[1]:>7.2f}"
        outfile.write(s + "\n")
        if value[0] > 1:
            subtotal = value[0] * value[1]
            outfile.write(" " * 28 + "subtotal: " + f"{subtotal:>7.2f}\n")
    if len(opt) > 0:
        outfile.write("Priced Addons:\n")
        for key, value in opt.items():
            s = f"{value[0]:3} x {key:<32}{value[1]:>7.2f}\n"
            outfile.write(s)
            if value[0] > 1:
                subtotal = value[0] * value[1]
                outfile.write(" " * 28 + "subtotal: " + f"{subtotal:>7.2f}\n")

    s = "_" * 41
    outfile.write(f"\n{s:^45}")
    outfile.write("\n\n")
    s = f"Total -- {cart.total:.2f}"
    outfile.write(f"{s:^45}\n\n\n")

    # footer, says thank you
    if refund:
        s = "We're sorry you had this experience :("
    else:
        s = "Thank you for coming to Discovery Cafe"
    outfile.write(f"{s:^45}\n")
    s = "Have a wonderful day"
    outfile.write(f"{s:^45}\n\n")

    ## prints the receipt and closes
    if refund:
        os.startfile("refund.txt", "print")
    else:
        os.startfile("receipt.txt", "print")
    outfile.close()

def index(request):
    if not request.user.is_authenticated:
        return render(request, "till_sys/login.html", {"messages": None})

    try:
        cart = Cart.objects.get(id=request.session["cart"])
    except:
        cart = Cart(total = 0, employee = request.user)
        cart.save()
        request.session["cart"] = cart.id

    data = load_data(request)

    context = {
        "cart": cart,
        "data": data,
    }
    return render(request, "till_sys/index.html", context)

## shows the admin interface, which allows users to create reports or refund items
def admn(request):
    if not request.user.is_authenticated:
        return render(request, "till_sys/login.html", {"messages": None})

    return render(request, "till_sys/admin.html")

## prints a report containing sales info
def report(request):
    if not request.user.is_authenticated:
        return render(request, "till_sys/login.html", {"messages": None})

    ## loads the cart from the appropriate dates, by it today, this week, this month or custom
    if request.method == "POST":
        # loading all carts in selected time frame
        if request.POST["type"] == "day":
            d = datetime.now()
            c = Cart.objects.filter(time_of_order__date = datetime.now())
        elif request.POST["type"] == "week":
            d = datetime.now()
            c = Cart.objects.filter(time_of_order__date__gt = datetime.now() - timedelta(days=7))
        elif request.POST["type"] == "month":
            d = datetime.now()
            c = Cart.objects.filter(time_of_order__year = d.year, time_of_order__month = d.month)
        elif request.POST["type"] == "custom":
            d1 = datetime.strptime(request.POST["start"], "%d-%m-%Y")
            d2 = datetime.strptime(request.POST["end"], "%d-%m-%Y")

            c = Cart.objects.filter(time_of_order__date__gte = d1, time_of_order__date__lte = d2)

        ## loading receipt info
        total = 0
        bk = {}
        lunch = {}
        dk = {}
        opt = {}
        types = {
            "Breakfast": [0, 0],
            "Lunch": [0, 0],
            "Drinks": [0, 0],
        }
        bk_types = {}
        ln_types = {}
        dk_types = {}
        emps = {}

        ## loads individual cart data for the selected time period
        for cart in c:
            ## total money made in this time period
            total = total + cart.total

            # finding out who took the order, adding to their total for the report
            if not cart.employee in emps:
                emps[cart.employee] = cart.total
            else:
                emps[cart.employee] = emps[cart.employee] + cart.total

            ## going through each cart entry...
            for entry in cart.items.all():
                ## keeping track of each individual item.  Item contains how many sold and price (per item) as list
                ## updates item in invoice, adding 1 if we already have it -- if not, adds a new entry in items dict
                if entry.item.type.menu_type == "Breakfast":
                    if entry.item.name in bk:
                        bk[entry.item.name][0] = bk[entry.item.name][0] + 1
                        bk_types[entry.item.type.name][0] = bk_types[entry.item.type.name][0] + 1
                        bk_types[entry.item.type.name][1] = bk_types[entry.item.type.name][1] + price
                    else:
                        if entry.item.price:
                            price = entry.item.price
                        else:
                            price = entry.item.type.price
                        bk[entry.item.name] = [1, price]
                        if entry.item.type.name in bk_types:
                            bk_types[entry.item.type.name][0] = bk_types[entry.item.type.name][0] + 1
                            bk_types[entry.item.type.name][1] = bk_types[entry.item.type.name][1] + price
                        else:
                            bk_types[entry.item.type.name] = [1, price]
                    types["Breakfast"][0] = types["Breakfast"][0] + 1
                    types["Breakfast"][1] = types["Breakfast"][1] + bk[entry.item.name][1]

                ## lunch
                elif entry.item.type.menu_type == "Lunch":
                    if entry.item.name in lunch:
                        lunch[entry.item.name][0] = lunch[entry.item.name][0] + 1
                        ln_types[entry.item.type.name][0] = ln_types[entry.item.type.name][0] + 1
                        ln_types[entry.item.type.name][1] = ln_types[entry.item.type.name][1] + price
                    else:
                        if entry.item.price:
                            price = entry.item.price
                        else:
                            price = entry.item.type.price
                        lunch[entry.item.name] = [1, price]
                        if entry.item.type.name in ln_types:
                            ln_types[entry.item.type.name][0] = ln_types[entry.item.type.name][0] + 1
                            ln_types[entry.item.type.name][1] = ln_types[entry.item.type.name][1] + price
                        else:
                            ln_types[entry.item.type.name] = [1, price]
                    types["Lunch"][0] = types["Lunch"][0] + 1
                    types["Lunch"][1] = types["Lunch"][1] + lunch[entry.item.name][1]

                ## drinks
                elif entry.item.type.menu_type == "Drinks":
                        if entry.item.name in dk:
                            dk[entry.item.name][0] = dk[entry.item.name][0] + 1
                            dk_types[entry.item.type.name][0] = dk_types[entry.item.type.name][0] + 1
                            dk_types[entry.item.type.name][1] = dk_types[entry.item.type.name][1] + price
                        else:
                            if entry.item.price:
                                price = entry.item.price
                            else:
                                price = entry.item.type.price
                            dk[entry.item.name] = [1, price]
                            if entry.item.type.name in dk_types:
                                dk_types[entry.item.type.name][0] = dk_types[entry.item.type.name][0] + 1
                                dk_types[entry.item.type.name][1] = dk_types[entry.item.type.name][1] + price
                            else:
                                dk_types[entry.item.type.name] = [1, price]
                        types["Drinks"][0] = types["Drinks"][0] + 1
                        types["Drinks"][1] = types["Drinks"][1] + dk[entry.item.name][1]

                # only keep track of options, addons etc if there is a change of price associated with it
                for option in entry.options.all():
                    if option.price_change:
                        if option.name in opt:
                            opt[option.name][0] = opt[option.name][0] + 1
                        else:
                            opt[option.name] = [1, option.price_change]
                for addon in entry.addons.all():
                    if addon.price_change:
                        if addon.name in opt:
                            opt[addon.name][0] = opt[addon.name][0] + 1
                        else:
                            opt[addon.name] = [1, addon.price_change]
                for bread in entry.bread.all():
                    if bread.price_change:
                        if bread.name in opt:
                            opt[bread.name][0] = opt[bread.name][0] + 1
                        else:
                            opt[bread.name] = [1, bread.price_change]

        # loading refunded data
        refund_total = 0
        refund_items = {}
        refund_options = {}

        if request.POST["type"] == "day":
            d = datetime.now()
            refund_carts = Cart.objects.filter(time_of_order__date = datetime.now(), status = "refunded")
        elif request.POST["type"] == "week":
            d = datetime.now()
            refund_carts = Cart.objects.filter(time_of_order__date__gt = datetime.now() - timedelta(days=7), status = "refunded")
        elif request.POST["type"] == "month":
            d = datetime.now()
            refund_carts = Cart.objects.filter(time_of_order__year = d.year, time_of_order__month = d.month, status = "refunded")
        elif request.POST["type"] == "custom":
            d1 = datetime.strptime(request.POST["start"], "%d-%m-%Y")
            d2 = datetime.strptime(request.POST["end"], "%d-%m-%Y")

            refund_carts = Cart.objects.filter(time_of_order__date__gte = d1, time_of_order__date__lte = d2, status = "refunded")

        for cart in refund_carts:
            refund_total = refund_total + cart.total

            # loading refunded items
            for entry in cart.items.all():
                if entry.item.name in refund_items:
                    refund_items[entry.item.name][0] = refund_items[entry.item.name][0] + 1
                else:
                    if entry.item.price:
                        price = entry.item.price
                    else:
                        price = entry.item.type.price
                    refund_items[entry.item.name] = [1, price]

                # loading only priced options
                for option in entry.options.all():
                    if option.price_change:
                        if option.name in opt:
                            refund_options[option.name][0] = refund_options[option.name][0] + 1
                        else:
                            refund_options[option.name] = [1, option.price_change]
                for addon in entry.addons.all():
                    if addon.price_change:
                        if addon.name in opt:
                            refund_options[addon.name][0] = refund_options[addon.name][0] + 1
                        else:
                            refund_options[addon.name] = [1, addon.price_change]
                for bread in entry.bread.all():
                    if bread.price_change:
                        if bread.name in opt:
                            refund_options[bread.name][0] = refund_options[bread.name][0] + 1
                        else:
                            refund_options[bread.name] = [1, bread.price_change]



        ## Creating the file to be printed.
        ## Choosing correct header
        outfile = open("report.txt", "w+")
        s = datetime.now().strftime("%B %d, %Y -- %H:%M:%S")
        outfile.write(f"{s:^45}\n\n")
        outfile.write("*" * 45 + "\n\n")

        if request.POST["type"] == "day":
            s = "Daily Report"
            outfile.write(f"{s:^45}\n")
        elif request.POST["type"] == "week":
            s = "Weekly Report"
            outfile.write(f"{s:^45}\n")
        elif request.POST["type"] == "month":
            s = "Monthly Report"
            outfile.write(f"{s:^45}\n")
        elif request.POST["type"] == "custom":
            s = "Custom Report"
            d3 = datetime.strftime(d1, "%d-%m-%Y")
            s3 = "Start: " + d3
            d4 = datetime.strftime(d2, "%d-%m-%Y")
            s4 = "End: " + d4
            outfile.write(f"{s:^45}\n")
            outfile.write(f"{s3:^45}\n")
            outfile.write(f"{s4:^45}\n")
        outfile.write("\n" + "*" * 45 + "\n\n")

        ## add individual items to receipt
        s = "Gross Sales"
        outfile.write(f"{s:^45}\n")
        underline = "---------------------------"
        outfile.write(f"{underline:^45}\n")
        for key, value in bk.items():
            item_total = value[0] * value[1]
            s = f"{value[0]:3}" + " x " + f"{key:<32}" + f"{item_total:>7.2f}"
            outfile.write(s + "\n")
        for key, value in lunch.items():
            item_total = value[0] * value[1]
            s = f"{value[0]:3}" + " x " + f"{key:<32}" + f"{item_total:>7.2f}"
            outfile.write(s + "\n")
        for key, value in dk.items():
            item_total = value[0] * value[1]
            s = f"{value[0]:3}" + " x " + f"{key:<32}" + f"{item_total:>7.2f}"
            outfile.write(s + "\n")
        for key, value in opt.items():
            item_total = value[0] * value[1]
            s = f"{value[0]:3}" + " x " + f"{key:<32}" + f"{item_total:>7.2f}"
            outfile.write(s + "\n")

        # writing new block
        outfile.write(f"\n{underline:^45}\n")
        s = f"Total - {total:.2f}"
        outfile.write(f"{s:^45}" + "\n\n")

        ## refunded items goes here
        outfile.write("*" * 45 + "\n")
        s = "Refunded Items"
        outfile.write(f"{s:^45}\n")
        outfile.write(f"{underline:^45}\n")
        if len(refund_items) == 0 and len(refund_options) == 0:
            s = "No Items Refunded"
            outfile.write(f"{s:^45}\n")
        else:
            for key, value in refund_items.items():
                item_total = value[0] * value[1]
                s = f"{value[0]:3} x {key:<32}{item_total:>7.2f}"
                outfile.write(s + "\n")
            for key, value in refund_options.items():
                item_total = value[0] * value[1]
                s = f"{value[0]:3} x {key:<32}{item_total:>7.2f}"
                outfile.write(s + "\n")
            outfile.write(f"\n{underline:^45}\n")
            s = f"Total Refunded: {refund_total:.2f}"
            outfile.write(f"{s:^45}\n")
        outfile.write("\n" + "*" * 45 + "\n\n")
        s = f"Net Sales: {total - refund_total:.2f}"
        outfile.write(f"{s:^45}\n\n")
        outfile.write("*" * 45 + "\n\n")


        # printing grouped items to the file
        s = "Grouped Items"
        outfile.write(f"{s:^45}\n")
        outfile.write(f"{underline:^45}\n")

        #drinks
        outfile.write(f'{types["Drinks"][0]:3}' + " x " + f"{'Drinks':32}" + f"{types['Drinks'][1]:>7.2f}\n")
        for key, value in dk_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(f"{underline:^45}\n")
        #breakfast
        outfile.write(f"{types['Breakfast'][0]:3}" + " x " + f"{'Breakfast':32}" + f"{types['Breakfast'][1]:>7.2f}\n")
        for key, value in bk_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(f"{underline:^45}\n")
        #lunch
        outfile.write(f"{types['Lunch'][0]:3}" + " x " + f"{'Lunch':32}" + f"{types['Lunch'][1]:>7.2f}\n")
        for key, value in ln_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(f"{underline:^45}\n")

        outfile.write("\n")
        outfile.write("*" * 45 + "\n\n")

        # listing who sold what
        s = "Users"
        outfile.write(f"{s:^45}\n")
        outfile.write(f"{underline:^45}\n")
        for key, value in emps.items():
            s2 = str(key)
            outfile.write(" " * 4 + f"{s2:34}" + f"{value:>7.2f}\n")

        ## print the file and close
        os.startfile("report.txt", "print")
        outfile.close()


    return redirect(index)

# log in function
def login_view(request):
    # If the user is already logged in, send them to the index page
    if request.user.is_authenticated:
        return redirect(index)

    if request.method == 'POST':
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect(index)


        # if something went wrong, send message
        else:
            return render(request, "till_sys/login.html", {"message": "Incorrect username or password"})

    return render(request, "till_sys/login.html", {"messages": None})

# logout function
def logout_view(request):
    logout(request)
    return redirect(login_view)

def lg(request):
    return redirect(login_view)

def checkout(request):
        '''
        This method changes the status of the previous cart item, saves payment method, and creates a new cart item
        '''
        if request.POST:
            # gets cart info, updates status to paid
            cart = Cart.objects.get(id=request.session["cart"])

            for k, v in request.POST.items():
                if k == "method":
                    cart.payment_method = v
                    if v in ["cash", "card"]:
                        cart.status = "paid"
                    else:
                        cart.status = "waste"

            cart.save()

            build_receipt(cart)


            ## TODO - Actually prints the file

            # delete prior cart from session, create new, empty cart
            del request.session['cart']
            cart = Cart(total = 0, employee = request.user)
            cart.save()
            request.session["cart"] = cart.id

        # redirect user to till
        return redirect(index)

def pay(request):
    cart = Cart.objects.get(id=request.session["cart"])
    data = load_data(request)

    context = {
        "cart": data["cart"],
        "total": cart.total,
        "entries": data["entries"],
        "entry_dict": data["entry_dict"],
        "ItemsAll": data["Items"],
        "option_dict": data["option_dict"],
        "addon_dict": data["addon_dict"],
        "bread_dict": data["bread_dict"],
    }
    return render(request, "till_sys/pay.html", context)

## Refund functionality
def refund(request):
    ## loads today's carts
    c = Cart.objects.filter(time_of_order__date = datetime.now())

    context = {
        "carts_all": c,
    }
    return render(request, "till_sys/refund.html", context)

def ref(request, cart_id):
    c = Cart.objects.filter(time_of_order__date = datetime.now())

    this_cart = Cart.objects.get(id = cart_id)
    entry_list = []
    for entry in this_cart.items.all():
        entry_list.append([entry.item, entry.bread.all(), entry.options.all(), entry.addons.all()])

    context = {
        "carts_all": c,
        "entry_list": entry_list,
        "this_cart": this_cart,
    }

    return render(request, "till_sys/ref.html", context)

def process_refund(request, card_id):
    this_cart = Cart.objects.get(pk = card_id)
    if this_cart.status == "refunded":
        context = {
            "message": "Receipt already refunded"
        }
        return render(request, "till_sys/error.html", context)
    if this_cart.total < 0.1:
        context = {
            "message": "Cannot refund empty receipts"
        }
        return render(request, "till_sys/error.html", context)

    this_cart.status = "refunded"
    this_cart.save()
    # build receipt, print it
    build_receipt(this_cart, refund = True)

    return redirect(index)


## Allows the user to remove items previously added to the cart
def edit(request):
    data = load_data(request)
    context = {
        "cart": data["cart"],
        "entries": data["entries"],
        "entry_dict": data["entry_dict"],
        "ItemsAll": data["Items"],
        "option_dict": data["option_dict"],
        "addon_dict": data["addon_dict"],
        "bread_dict": data["bread_dict"],
    }
    return render(request, "till_sys/edit.html", context)

## a user added an item, therefore we add this item to the cart
def add_item(request):
    if request.POST:
        ## associating the cart item with the menu item, and adding any notes if they exist
        item_id = Menu_Item.objects.get(id = int(request.POST["item"]))
        new_entry = Cart_Entry(notes = request.POST["notes"], item = item_id)

        ## setting the price equal to the item price, or if not, the type of item's price
        if new_entry.item.price:
            new_entry.price = new_entry.item.price
        else:
            new_entry.price = new_entry.item.type.price
        new_entry.save()

        ## adding any options or add ons, and changing price if need be
        try:
            if request.POST.items():
                for k, v in request.POST.items():
                    if "bread" in k:
                        brd = breadType.objects.get(pk = v)
                        new_entry.bread.add(brd)

                        if brd.price_change:
                            new_entry.price = new_entry.price + brd.price_change
                    elif "options" in k:
                        opt = Option.objects.get(pk = v)
                        new_entry.options.add(opt)

                        if opt.price_change:
                            new_entry.price = new_entry.price + opt.price_change
                    elif "addons" in k:
                        add = Add_On.objects.get(pk = v)
                        new_entry.addons.add(add)

                        if add.price_change:
                            new_entry.price = new_entry.price + add.price_change
        except:
            pass

        ## saves the entry
        new_entry.save()

        ## connects this item with the main cart... once I figure out how to do that lol.
        try:
            cart = Cart.objects.get(id=request.session["cart"])
        except:
            cart = Cart(total = 0, employee = request.user, time_of_order = datetime.datetime.now())
        cart.save()
        cart.items.add(new_entry)
        cart.total += new_entry.price
        cart.save()

        return redirect(index)

## function that deletes any cart items, in case a mistake was made
def remove(request):
    if request.POST:
        cart = Cart.objects.get(id=request.session["cart"])

        if request.POST.items():
            for k, v in request.POST.items():
                if "entry" in k:
                    ent = Cart_Entry.objects.get(pk = v )
                    cart.total = cart.total - ent.price
                    ent.delete()
        cart.save()

    return redirect(index)

def undo(request):
    if request.POST:
        cart = Cart.objects.get(id=request.session["cart"])
        entries = cart.items.all()
        l = len(entries)

        if not l == 0:
            cart.total = cart.total - entries[l-1].price
            cart.items.remove(entries[l-1])
            cart.save()

    return redirect(index)
