from django.urls import path
from .views import *



urlpatterns = [
    path('subscriptions-webhook/', ZohoSubscriptionsWebhook.as_view(), name='zoho-subscriptions-webhook'),
]