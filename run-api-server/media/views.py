from django.contrib.auth import authenticate
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from rest_framework.views import APIView
import json
import boto3
from botocore.config import Config

import os

access_key = os.environ["AWS_ACCESS_KEY_ID"]
access_secret_key = os.environ["AWS_SECRET_ACCESS_KEY"]
bucket_name = os.environ["AWS_STORAGE_BUCKET_NAME"]


class UploadMedia(APIView):
    # permission_classes = [IsAuthenticated]

    def post(self, request):
        final_response = {}
        filename = str(request.data['filename'])
        filetype = str(request.data['filetype'])

        client_s3 = boto3.client(
            's3',
            aws_access_key_id=access_key,
            aws_secret_access_key=access_secret_key,
            config=Config(signature_version='s3v4')
        )
        key = filename
        url = client_s3.generate_presigned_url(
            ClientMethod='put_object',
            Params={
                'Bucket': bucket_name,
                'Key': key
            },
            ExpiresIn=3600)

        final_response['url'] = url
        final_response['key'] = key

        return Response({
            "signedUrl": final_response,
            "message": "Created Successfully",
        }, content_type='application/json', status=201)


def get_site_data_from_s3():
    client_s3 = boto3.client(
        's3',
        aws_access_key_id=access_key,
        aws_secret_access_key=access_secret_key,
        config=Config(signature_version='s3v4')
    )
    s3_object = client_s3.get_object(Bucket=os.environ["SITE_DATA_BUCKET"], Key="siteInit.json")
    body = s3_object['Body']
    return body.read()
