from rest_framework import status
from .serializers import *
from .models import *
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView
from rest_framework.response import Response
from sites.dynamoDB import SitesDB
from .utils import *
import boto3
import time
import os
import uuid
from ansible.module_utils._text import to_bytes

access_key = os.environ["AWS_ACCESS_KEY_ID"]
access_secret_key = os.environ["AWS_SECRET_ACCESS_KEY"]
bucket_name = os.environ["AWS_STORAGE_BUCKET_NAME"]
region_name = os.environ["AWS_REGION_NAME"]


class UserSitesView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        try:
            site = Sites.objects.filter(account=request.user.account.id)
            site = SitesSerializer(site, many=True)
            if not len(site.data):
                return Response({
                    "message": "Not Site Found",
                    'sites': site.data
                }, status=status.HTTP_204_NO_CONTENT)

            return Response({
                "message": "Fetched Successfully",
                'sites': site.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                "message": "Error",
            }, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request, pk):
        try:
            try:
                site = Sites.objects.filter(id=pk).filter(account=request.user.account.id)
                if not len(site):
                    return Response({
                        "message": "Site not found with: {0}".format(pk),
                    }, status=status.HTTP_404_NOT_FOUND)
                qs = site[0]
                serialize = SitesSerializer(qs, data=request.data, partial=True)
                if serialize.is_valid(raise_exception=True):
                    serialize.save()
                    return Response(serialize.data)
            except Sites.DoesNotExist:
                return Response({
                    "message": "Invalid site id {0}".format(pk),
                }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            print(e)
            if "domain" in e.get_codes():
                return Response({
                    "message": "Domain is already registered with other website.",
                }, status=status.HTTP_400_BAD_REQUEST)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UploadSiteData(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        if 'draft' in request.data['id']:
            pk = request.data['id'].replace('-draft', '')
        else:
            pk = request.data['id']
        site = Sites.objects.filter(id=pk).filter(account=request.user.account.id)
        if not len(site):
            return Response({
                "message": "Site not found with: {0}".format(pk),
            }, status=status.HTTP_404_NOT_FOUND)
        response = SitesDB.add_site_data(request.data)
        if response:
            return Response({
                "message": "Data Updated Successfully",
            }, status=status.HTTP_202_ACCEPTED)
        else:
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetUploadSiteData(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        try:
            site_id = pk
            if 'draft' in pk:
                site_id = pk.replace('-draft', '')
            site = Sites.objects.filter(id=site_id).filter(account=request.user.account.id)
            if not len(site):
                return Response({
                    "message": "Site not found with: {0}".format(site_id),
                }, status=status.HTTP_404_NOT_FOUND)
            response = SitesDB.get_site_data(pk)
            if len(response):
                return Response({
                    "message": "Data Updated Successfully",
                    "data": response
                }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({
                    "message": "No Data Found",
                }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateSSL(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        qs = Sites.objects.filter(id=pk).filter(account=request.user.account.id).get()
        site_data = SitesSerializer(qs).data
        acm_certificate = AcmCertificate(boto3.client(
            'acm',
            aws_access_key_id=access_key,
            aws_secret_access_key=access_secret_key,
            region_name=region_name
        ))
        lb_client = LoadBalancer(boto3.client(
            'elbv2',
            aws_access_key_id=access_key,
            aws_secret_access_key=access_secret_key,
            region_name=region_name
        ))
        if site_data.get('certificate_arn'):
            lb_client.lb_delete_certificate(listener_arn=os.environ["LISTENER_ARN"],
                                            certificate_arn=site_data.get('certificate_arn'))
            acm_certificate.delete_certificate(certificate_arn=site_data.get('certificate_arn'))

        certificate_arn = acm_certificate.import_certificate(
            certificate_body=to_bytes(request.data['certificate_body']),
            private_key=to_bytes(request.data['private_key']),
            certificate_chain=to_bytes(request.data['chain']))
        link_lb = lb_client.add_listener_certificates(listener_arn=os.environ["LISTENER_ARN"],
                                                      certificate_arn=certificate_arn)
        site = qs.update(certificate_arn=certificate_arn)
        return Response({
            "message": "Data Updated Successfully",
        }, status=status.HTTP_202_ACCEPTED)

        # site = Sites.objects.filter(id=pk).filter(account=request.user.account.id)
        #
        # if not len(site):
        #     return Response({
        #         "message": "Site not found with: {0}".format(pk),
        #     }, status=status.HTTP_404_NOT_FOUND)
        # response = SitesDB.add_site_data(request.data)
        # if response:
        #     return Response({
        #         "message": "Data Updated Successfully",
        #     }, status=status.HTTP_202_ACCEPTED)
        # else:
        #     return Response({
        #         "message": "Something went wrong.",
        #     }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetTwitterFeed(APIView):

    def get(self, request, username):
        try:
            import requests

            url = "https://api.twitter.com/2/users/by/username/{username}?user.fields=id,name,username," \
                  "profile_image_url".format(username=username)

            payload = {}
            headers = {
                'Authorization': 'Bearer {0}'.format(os.environ["twitter_token"]),
            }

            response = requests.request("GET", url, headers=headers, data=payload)
            data = response.json()
            url = "https://api.twitter.com/2/users/{id}/tweets?tweet.fields=id,text,author_id,created_at".format(
                id=data.get('data').get('id'))
            response = requests.request("GET", url, headers=headers, data=payload)

            return Response({"feed": response.json(),
                             "profile": data.get('data')}, status=status.HTTP_200_OK)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UploadFonts(APIView):
    permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request):
        try:
            if request.user.role != 'superadmin':
                return Response({
                    "message": "Not Authorized",
                }, status=status.HTTP_403_FORBIDDEN)
            request.data.update({"id": str(uuid.uuid4())})
            response = SitesDB.upload_fonts(request.data)
            if response:
                return Response({
                    "message": "Data Updated Successfully",
                    "response": response
                }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({
                    "message": "Something went wrong.",
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def put(request):
        try:
            if request.user.role != 'superadmin':
                return Response({
                    "message": "Not Authorized",
                }, status=status.HTTP_403_FORBIDDEN)
            response = SitesDB.upload_fonts(request.data)
            if response:
                return Response({
                    "message": "Data Updated Successfully",
                    "response": response
                }, status=status.HTTP_202_ACCEPTED)
            else:
                return Response({
                    "message": "Something went wrong.",
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    @staticmethod
    def delete(request, pk):
        try:
            if request.user.role != 'superadmin':
                return Response({
                    "message": "Not Authorized",
                }, status=status.HTTP_403_FORBIDDEN)
            response = SitesDB.delete_font_by_id(pk)
            if response:
                return Response({
                    "message": "Deleted successfully",
                }, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "Something went wrong.",
                }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class RequestSSL(APIView):
    # permission_classes = [IsAuthenticated]

    @staticmethod
    def post(request):
        if not request.data.get('domain_name') or not request.data.get('site_id'):
            return Response({
                "message": "required domain_name and site_id",
            }, status=status.HTTP_400_BAD_REQUEST)
        try:
            acm_certificate = AcmCertificate(boto3.client(
                'acm',
                aws_access_key_id=access_key,
                aws_secret_access_key=access_secret_key,
                region_name=region_name
            ))
            lb_client = LoadBalancer(boto3.client(
                'elbv2',
                aws_access_key_id=access_key,
                aws_secret_access_key=access_secret_key,
                region_name=region_name
            ))
            site = Sites.objects.get(id=request.data.get('site_id'))
            site = SitesSerializer(site).data
            if not site:
                return Response({
                    "message": "Site not found",
                }, status=status.HTTP_404_NOT_FOUND)

            if site.get('certificate_arn') and site.get('domain') == request.data.get('domain_name'):
                domain_data = acm_certificate.describe(site.get('certificate_arn'))
                if domain_data.get('Status') == 'ISSUED' and not site.get('is_domain_live'):
                    lb_client.add_listener_certificates(listener_arn=os.environ["LISTENER_ARN"],
                                                        certificate_arn=site.get('certificate_arn'))
                    Sites.objects.filter(id=request.data.get('site_id')).update(is_domain_live=True)
            else:
                acm_certificate_data = acm_certificate.request_certificate(domain_name=request.data.get('domain_name'))
                time.sleep(6)
                domain_data = acm_certificate.describe(certificate_arn=acm_certificate_data.get('CertificateArn'))
                Sites.objects.filter(id=request.data.get('site_id')).update(certificate_arn=
                                                                            acm_certificate_data.get('CertificateArn'))
            data = {
                "certificate_arn": site.get('certificate_arn'),
                "domain_name": domain_data.get('DomainName'),
                "domain_validation_record": [domain_data.get('DomainValidationOptions')[0].get('ResourceRecord'),
                                             {"Name": request.data.get('domain_name'), "Type": "A",
                                              "Value": os.environ.get('LB_IP_ADDRESS') or '35.71.168.113'}],
                "status": domain_data.get('Status'),
            }
            return Response({"message": "Certificate requested successfully", "data": data},
                            status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetAllFonts(APIView):

    def get(self, request):
        try:
            response = SitesDB.get_all_fonts()
            if len(response):
                return Response({"fonts": response, "datalen": len(response)}, status=status.HTTP_200_OK)
            else:
                return Response({
                    "message": "data not found.",
                }, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            print(e)
            return Response({
                "message": "Something went wrong.",
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
