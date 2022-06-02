from django.db import models
from django.utils import timezone
import uuid
# Create your models here.


class ZohoApi(models.Model):
    access_token = models.CharField(blank=True, null=True, max_length=250)
    refresh_token = models.CharField(blank=True, null=True, max_length=250)
    client_secret = models.CharField(blank=True, null=True, max_length=250)
    client_id = models.CharField(blank=True, null=True, max_length=250)
    expires_at = models.DateTimeField(blank=True, null=True)

