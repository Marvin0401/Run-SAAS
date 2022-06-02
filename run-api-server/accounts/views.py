import json

from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

from sites.serializers import *
from sites.models import *
from .serializers import *
from django.contrib.auth.hashers import check_password

from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from rest_framework.views import APIView
from rest_framework import parsers, renderers, status
from rest_framework.response import Response
from .serializers import CustomTokenSerializer
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import get_password_reset_token_expiry_time
from django.utils import timezone
from datetime import timedelta
import boto3
import sendgrid
from sendgrid.helpers.mail import Email, Mail, Personalization
from urllib.request import pathname2url
from sites.dynamoDB import SitesDB
from .utils import *
from media.views import get_site_data_from_s3
import os
from zoho.views import *
import logging


class Ping(APIView):

    def get(self, request):
        return Response({
            "message": "pong",
        })


class AccountRegisterView(APIView):

    def post(self, request):
        try:
            try:
                user = User.objects.get(email=request.data['email'])
                user_data = UsersSerializer(user)
                return Response({
                    "message": "User already exist.",
                }, status=status.HTTP_400_BAD_REQUEST)
            except User.DoesNotExist:
                if request.data.get('domain'):
                    domain = Sites.objects.filter(domain=request.data.get('domain'))
                    if domain:
                        return Response({
                            "message": "domain is already token.",
                        }, status=status.HTTP_400_BAD_REQUEST)
                zohores = create_customer_zoho(first_name=request.data.get('first_name'),
                                               last_name=request.data.get('last_name'), email=request.data.get('email'),
                                               phone=request.data.get('phone'), company=request.data.get('company'),
                                               website=request.data.get('website'))
                if zohores.status_code != 201:
                    logging.error("Failed to create the customer zoho, reason: {0}".format(zohores.json()['message']))
                    return Response({
                        "message": zohores.json()['message'],
                    })
                request.data['zoho_id'] = zohores.json()['customer']['customer_id']
                user_serializer = RegisterUserSerializer(data=request.data)
                if user_serializer.is_valid():
                    user = user_serializer.save()
                    user_data = UsersSerializer(user)

                    account = Account.objects.create(
                        user=user,
                        political_party=request.data.get('political_party'),
                        campaign_name=request.data.get('campaign_name'),
                        display_name=request.data.get('display_name'),
                        bio=request.data.get('bio')
                    )
                    if request.data.get('domain'):
                        domain = Sites.objects.filter(domain=request.data.get('domain'))
                        if domain:
                            return Response({
                                "message": "domain is already token.",
                            }, status=status.HTTP_400_BAD_REQUEST)
                        site = Sites.objects.create(
                            account=account,
                            title=request.data.get('campaign_name'),
                            domain=request.data.get('domain'),
                        )
                        site = SitesSerializer(site).data
                    else:
                        site = Sites.objects.create(
                            account=account,
                            title=request.data.get('campaign_name'),
                        )
                        site = SitesSerializer(site).data
                    account = AccountSerializer(account).data
                    route53_domain = create_route53_for_site(site.get('id'))
                    tokenr = TokenObtainPairSerializer().get_token(user)
                    tokena = AccessToken().for_user(user)

                    site_data = json.loads(get_site_data_from_s3())
                    draft_data = json.loads(get_site_data_from_s3())
                    site_data.update({'id': site.get('id')})
                    draft_data.update({'id': '{id}-draft'.format(id=site.get('id'))})
                    SitesDB.add_site_data(site_data)
                    SitesDB.add_site_data(draft_data)

                    sg = sendgrid.SendGridAPIClient(
                        api_key=str(os.environ["SENDGRID_API_KEY"]))
                    personalization = Personalization()
                    personalization.add_to(Email(str(user.email)))
                    mail = Mail()
                    mail.from_email = Email(str(os.environ["SENDGRID_FROM_EMAIL"]))
                    mail.subject = "Welcome to Run!"
                    mail.add_personalization(personalization)
                    mail.template_id = "d-bdf4e07827af4c07a0bd7e52c20fe136"
                    try:
                        response = sg.client.mail.send.post(
                            request_body=mail.get())
                    except Exception as e:
                        logging.error("Successed to register a account, but failed to send the confirmation email: {0}".format(str(e)))
                        Response({
                            "message": "User created successfully but not able to send the email",
                            'account': account,
                            'user': user_data.data,
                            'site': site,
                            'route53_domain': route53_domain,
                            'refresh': str(tokenr),
                            'token': str(tokena)
                        }, status=status.HTTP_201_CREATED)
                return Response({
                    "message": "User created successfully.",
                    'account': account,
                    'user': user_serializer.data,
                    'site': site,
                    'route53_domain': route53_domain,
                    'refresh': str(tokenr),
                    'token': str(tokena)
                }, status=status.HTTP_201_CREATED)
        except Exception as e:
            logging.error("Failed to register a account: {0}".format(str(e)))
            return Response(
                data={
                    "message": "The Invite Key could not be created.",
                    "error": e},
                status=status.HTTP_400_BAD_REQUEST)


class AccountLoginView(APIView):
    def post(self, request):
        try:
            if not request.data['email'] and request.data['password']:
                logging.error("Invalid email or password")
                return Response({
                    "message": "Please enter email and password."
                }, status=status.HTTP_400_BAD_REQUEST)
            user = authenticate(email=request.data['email'], password=request.data['password'])
            if user is not None:
                account = Account.objects.get(user=user.id)
                account = AccountSerializer(account)
                user_data = UsersSerializer(user)
                zoho_user = get_customer_zoho(user_data.data.get('zoho_id'))
                zoho_customer = zoho_user.get('customer')
                site = Sites.objects.get(account=account.data.get('id'))
                site = SitesSerializer(site)
                account_data = {'id': account.data.get('id'),
                                'political_party': account.data.get('political_party'),
                                'subscription_id': account.data.get('subscription_id'),
                                'bio': account.data.get('bio'),
                                'campaign_name': zoho_customer.get('campaign_name') or account.data.get(
                                    'campaign_name'),
                                'display_name': zoho_customer.get('display_name') or account.data.get('display_name'), }
                u_data = {
                    'id': user_data.data.get('id'),
                    'is_active': user_data.data.get('is_active'),
                    'is_paying': user_data.data.get('is_paying'),
                    'role': user_data.data.get('role'),
                    'zoho_id': user_data.data.get('zoho_id'),
                    'first_name': zoho_customer.get('first_name') or user_data.data.get('first_name'),
                    'last_name': zoho_customer.get('last_name') or user_data.data.get('last_name'),
                    'email': zoho_customer.get('email') or user_data.data.get('email'),
                    'phone': zoho_customer.get('phone') or user_data.data.get('phone'),
                    'company': zoho_customer.get('company_name') or user_data.data.get('company')}
                tokenr = TokenObtainPairSerializer().get_token(user)
                tokena = AccessToken().for_user(user)
                logging.debug("User logged in successfully.")
                return Response({
                    "message": "User logged in successfully.",
                    'user': u_data,
                    'account': account_data,
                    'site': site.data,
                    'route53_domain': '{0}.{1}'.format(site.data.get('id'), os.environ["route53_Domain"]),
                    'refresh': str(tokenr),
                    'token': str(tokena)
                }, status=status.HTTP_200_OK)
            else:
                logging.error("No User Found")
                return Response({
                    "message": "Login Failed Wrong User Credentials",
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            logging.error("Failed to login a account: {0}".format(str(e)))
            return Response(
                data={
                    "message": "The Invite Key could not be created.",
                    "error": e},
                status=status.HTTP_400_BAD_REQUEST)


class UpdateUserProfileAndAccount(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request):
        try:
            data = json.loads(request.body)
            zoho_response = update_customer_on_zoho(request.user.zoho_id, data)
            if zoho_response.get('code') != 0:
                return Response({
                    "message": "something went wrong",
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            serialize = UsersSerializer(request.user, data=request.data, partial=True)
            accSerialize = AccountSerializer(request.user.account, data=request.data, partial=True)
            if serialize.is_valid(raise_exception=True) and accSerialize.is_valid(raise_exception=True):
                serialize.save()
                accSerialize.save()
                zoho_user = get_customer_zoho(serialize.data.get('zoho_id'))
                zoho_customer = zoho_user.get('customer')
                account_data = {'id': accSerialize.data.get('id'),
                                'political_party': accSerialize.data.get('political_party'),
                                'subscription_id': accSerialize.data.get('subscription_id'),
                                'bio': accSerialize.data.get('bio'),
                                'campaign_name': zoho_customer.get('campaign_name') or accSerialize.data.get(
                                    'campaign_name'),
                                'display_name': zoho_customer.get('display_name') or accSerialize.data.get('display_name'), }
                u_data = {
                    'id': serialize.data.get('id'),
                    'is_active': serialize.data.get('is_active'),
                    'is_paying': serialize.data.get('is_paying'),
                    'role': serialize.data.get('role'),
                    'zoho_id': serialize.data.get('zoho_id'),
                    'first_name': zoho_customer.get('first_name') or serialize.data.get('first_name'),
                    'last_name': zoho_customer.get('last_name') or serialize.data.get('last_name'),
                    'email': zoho_customer.get('email') or serialize.data.get('email'),
                    'phone': zoho_customer.get('phone') or serialize.data.get('phone'),
                    'company': zoho_customer.get('company') or serialize.data.get('company')}
                return Response({
                    "message": "Profile Updated Successfully.",
                    'user': u_data,
                    'account': account_data
                }, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            logging.error("Failed to update the user profile: {0}".format(str(e)))
            if 'email' in e.detail.keys():
                return Response({
                    "message": "user with this email address already exists.",
                }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomPasswordResetView:
    @receiver(reset_password_token_created)
    def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
        """
          Handles password reset tokens
          When a token is created, an e-mail needs to be sent to the user
        """
        try:
            # send an e-mail to the user
            site_url = os.environ.get('FRONT_END_BASE_URL') or 'http://localhost:8000'
            context = {
                'email': reset_password_token.user.email,
                'reset_password_url': "{}password-reset/{}".format(site_url, reset_password_token.key),
                'site_domain': site_url
            }
            sg = sendgrid.SendGridAPIClient(
                api_key=str(os.environ["SENDGRID_API_KEY"]))
            personalization = Personalization()
            personalization.add_to(Email(str(reset_password_token.user.email)))
            mail = Mail()
            mail.from_email = Email(str(os.environ["SENDGRID_FROM_EMAIL"]))
            mail.subject = "Password Reset"
            mail.add_personalization(personalization)
            mail.dynamic_template_data = context
            mail.template_id = "d-09e11d79690549688445a36d27405aac"
            response = sg.client.mail.send.post(request_body=mail.get())
            logging.info("The e-mail for resetting password is already sent")
            return Response({
                "message": "Password reset e-mail sent.",
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logging.error("Failed to reset the user password: {0}".format(str(e)))
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class CustomPasswordTokenVerificationView(APIView):
    """
      An Api View which provides a method to verifiy that a given pw-reset token is valid before actually confirming the
      reset.
    """
    throttle_classes = ()
    permission_classes = ()
    parser_classes = (parsers.FormParser, parsers.MultiPartParser, parsers.JSONParser,)
    renderer_classes = (renderers.JSONRenderer,)
    serializer_class = CustomTokenSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        token = serializer.validated_data['token']

        # get token validation time
        password_reset_token_validation_time = get_password_reset_token_expiry_time()

        # find token
        reset_password_token = ResetPasswordToken.objects.filter(key=token).first()

        if reset_password_token is None:
            return Response({'status': 'invalid'}, status=status.HTTP_404_NOT_FOUND)

        # check expiry date
        expiry_date = reset_password_token.created_at + timedelta(hours=password_reset_token_validation_time)

        if timezone.now() > expiry_date:
            # delete expired token
            reset_password_token.delete()
            return Response({'status': 'expired'}, status=status.HTTP_404_NOT_FOUND)

        # check if user has password to change
        if not reset_password_token.user.has_usable_password():
            return Response({'status': 'irrelevant'})

        return Response({'status': 'OK'})


class ProfileResetPassword(APIView):

    permission_classes = [IsAuthenticated]

    def put(self, request, *args, **kwargs):
            try:
                user = request.user
                if not check_password(request.data['old_password'], user.password):
                    return Response({
                        "message": "Wrong old password"
                    }, status=status.HTTP_400_BAD_REQUEST)
                if user.check_password(request.data['new_password']):
                    return Response({
                        "message": "New password cannot be same as old password."
                    }, status=status.HTTP_400_BAD_REQUEST)

                user.set_password(request.data['new_password'])
                user.save()
                return Response({
                    "message": "Password reset successfully.",
                }, status=status.HTTP_200_OK)
            except Exception as e:
                logging.error("Failed to reset the user profile: {0}".format(str(e)))
                return Response({
                    "message": "Something went wrong.",
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)



def create_route53_for_site(site_uuid):
    if not site_uuid:
        return "site_uuid required"
    try:
        domain = '{0}.{1}'.format(site_uuid, os.environ["route53_Domain"] or "designedtorun.com")
        client = boto3.client(
            'route53',
            aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
            aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"],
        )
        response = client.change_resource_record_sets(
            HostedZoneId='Z0640211JXF718UULD67',
            ChangeBatch={
                'Changes': [
                    {
                        'Action': 'CREATE',
                        'ResourceRecordSet': {
                            'Name': domain,
                            'Type': 'A',
                            'AliasTarget': {
                                'HostedZoneId': 'Z35SXDOTRQ7X7K',
                                'EvaluateTargetHealth': False,
                                'DNSName': 'dualstack.run-varnish-485391214.us-east-1.elb.amazonaws.com',
                            },
                        }
                    },
                ]
            }
        )
        #print(response, "response")
        logging.debug("response {0}".format(response))
        return domain
    except Exception as e:
        logging.error("Failed to create the domain from create_route53_for_site: {0}".format(str(e)))
        return 'Not able to create the domain'
