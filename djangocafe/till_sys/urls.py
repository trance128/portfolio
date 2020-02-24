from django.urls import path
from . import views

urlpatterns = [
    path("", views.index, name="index"),
    path("item/", views.add_item, name="add_item"),
    path("login/", views.login_view, name="login"),
    path("logout/", views.logout_view, name="logout"),
    path("checkout/", views.checkout, name="checkout"),
    path("remove/", views.remove, name="remove"),
    path("undo/", views.undo, name="undo"),
    path("pay/", views.pay, name="pay"),
    path("accounts/login/", views.lg, name="lg"),
    path("admn/", views.admn, name="admin"),
    path("report/", views.report, name="report"),
    path("refund/", views.refund, name="refund"),
    path("ref/<int:cart_id>", views.ref, name="ref"),
    path("pr/<int:card_id>", views.process_refund, name="pr"),
]
