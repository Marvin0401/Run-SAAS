import boto3
from django.conf import settings
from boto3.dynamodb.conditions import Key
import os

class SitesDB:
    @staticmethod
    def add_site_data(payload):
        try:
            table_name = 'site_data'
            table = boto3.resource('dynamodb', "us-east-1", aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                                   aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]).Table(table_name)
            response = table.put_item(Item=payload)
            print(response)
            return True
        except Exception as e:
            print(e, "add_site_data")
            return False

    @staticmethod
    def get_site_data(pk):
        try:
            table_name = 'site_data'
            table = boto3.resource('dynamodb', "us-east-1", aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                                   aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]).Table(table_name)
            response = table.query(
                KeyConditionExpression=Key('id').eq(pk)
            )
            return response['Items']
        except Exception as e:
            print(e, "add_site_data")
            return False

    @staticmethod
    def upload_fonts(payload):
        try:
            table_name = 'fonts'
            table = boto3.resource('dynamodb', "us-east-1", aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                                   aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]).Table(table_name)

            response = table.put_item(Item=payload)
            print(response,"upload_fonts")
            return payload
        except Exception as e:
            print(e, " Exception upload_fonts")
        return False

    @staticmethod
    def delete_font_by_id(id):
        try:
            table_name = 'fonts'
            table = boto3.resource('dynamodb', "us-east-1", aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                                   aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]).Table(table_name)
            response = table.delete_item(
                Key={
                    'id': str(id)
                }
            )
            print(response)
            return True
        except Exception as e:
            print(e, "error update_font_by_id")
            return False

    @staticmethod
    def get_all_fonts():
        try:
            table_name = 'fonts'
            table = boto3.resource('dynamodb', "us-east-1", aws_access_key_id=os.environ["AWS_ACCESS_KEY_ID"],
                                   aws_secret_access_key=os.environ["AWS_SECRET_ACCESS_KEY"]).Table(table_name)
            response = table.scan()
            return response['Items']
        except Exception as e:
            print(e, "get_all_fonts")
            return False