
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



        ## Creating the file to be printed.
        ## Choosing correct header
        outfile = open("report.txt", "w+")
        outfile.write(datetime.now().strftime("%B %d, %Y -- %H:%M:%S") + "\n\n")
        outfile.write("*" * 45 + "\n")

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
        outfile.write("*" * 45 + "\n")

        ## add individual items to receipt
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
        outfile.write("_" * 45 + "\n")
        s = f"Total - {total}"
        outfile.write(f"{s:^37}" + "\n\n")
        outfile.write("_" * 45 + "\n\n")

        # printing grouped items to the file
        s = "Grouped Items"
        outfile.write(f"{s:^45}\n")

        #drinks
        outfile.write(f'{types["Drinks"][0]:3}' + " x " + f"{'Drinks':32}" + f"{types['Drinks'][1]:>7.2f}\n")
        for key, value in dk_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(" " * 4 + "_" * 41 + "\n")
        #breakfast
        outfile.write(f"{types['Breakfast'][0]:3}" + " x " + f"{'Breakfast':32}" + f"{types['Breakfast'][1]:>7.2f}\n")
        for key, value in bk_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(" " * 4 + "_" * 41 + "\n")
        #lunch
        outfile.write(f"{types['Lunch'][0]:3}" + " x " + f"{'Lunch':32}" + f"{types['Lunch'][1]:>7.2f}\n")
        for key, value in ln_types.items():
            outfile.write(f"{value[0]:7}" + " x " + f"{key:28}" + f"{value[1]:>7.2f}\n")
        outfile.write(" " * 4 + "_" * 41 + "\n")

        outfile.write("\n")
        outfile.write("_" * 45 + "\n")

        # listing who sold what
        s = "Users"
        outfile.write(f"{s:^45}\n")
        for key, value in emps.items():
            s2 = str(key)
            outfile.write(" " * 4 + f"{s2:34}" + f"{value:>7.2f}\n")

        ## finished writing, closes the file
        outfile.close()
        ## printing goes here once I have it
    return redirect(index)
