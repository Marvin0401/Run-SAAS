import json

from django.shortcuts import render
from rest_framework.views import APIView

import requests

from sites.models import Sites
from sites.serializers import SitesSerializer
from .models import *
import datetime
import ast
from requests import HTTPError
from rest_framework.response import Response
from rest_framework import status
from accounts.models import *
from accounts.serializers import *


class ZohoSubscriptionsWebhook(APIView):

    def post(self, request):
        print(request.data)
        if request.data.get('event_type') == 'subscription_cancelled' or \
                request.data.get('event_type') == "subscription_expired" or \
                request.data.get('event_type') == "subscription_deleted" or \
                request.data.get('event_type') == "payment_refunded" or \
                request.data.get('event_type') == "payment_declined" or \
                request.data.get('event_type') == "subscription_unpaid":
            subscription = request.data.get('data').get('subscription')
            customer = request.data.get('data').get('subscription').get('customer')
            user = User.objects.get(email=customer.get('email'))
            user.is_paying = False
            user.save()
            user_data = UsersSerializer(user)
            account = Account.objects.get(user=user_data.data.get('id'))
            account.subscription_id = subscription.get('subscription_id')
            account.save()
            account = AccountSerializer(account)
            sites = Sites.objects.filter(account=account.data.get('id')).update(is_active=False)
            return Response({
                "message": "subscription_cancelled Successfully",
                # "sites": sites.data
            }, status=status.HTTP_200_OK)
        elif request.data.get('event_type') == "subscription_created" or \
                request.data.get('event_type') == "subscription_reactivated":
            subscription = request.data.get('data').get('subscription')
            customer = request.data.get('data').get('subscription').get('customer')
            user = User.objects.get(email=customer.get('email'))
            user.is_paying = True
            user.save()
            user_data = UsersSerializer(user)
            account = Account.objects.get(user=user_data.data.get('id'))
            account.subscription_id = subscription.get('subscription_id')
            account.save()
            account = AccountSerializer(account)
            sites = Sites.objects.filter(account=account.data.get('id')).update(is_active=True)
            # sites = SitesSerializer(sites)
            return Response({
                "message": "subscription_created Successfully",
            }, status=status.HTTP_200_OK)
        else:
            return Response({
                "message": "Fetched Successfully",
            }, status=status.HTTP_400_BAD_REQUEST)
