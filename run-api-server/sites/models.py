from django.utils import timezone

from django.db import models
import uuid
from accounts.models import Account

# Create your models here.


class Sites(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(Account, blank=True, null=True, on_delete=models.SET_NULL)
    name = models.CharField(blank=True, null=True, max_length=250)
    is_active = models.BooleanField(default=True)
    title = models.CharField(blank=True, null=True, max_length=250)
    formProvider = models.CharField(blank=True, null=True, max_length=250)
    formApiKey = models.CharField(blank=True, null=True, max_length=250)
    popup = models.CharField(blank=True, null=True, default='on', max_length=250)
    domain = models.CharField(blank=True, null=True, unique=True, max_length=250)
    is_published = models.BooleanField(default=False)
    is_domain_live = models.BooleanField(default=False)
    meta_keywords = models.TextField(blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)
    fav_icon_loc = models.CharField(blank=True, null=True, max_length=250)
    share_title = models.CharField(blank=True, null=True, max_length=250)
    body = models.TextField(blank=True, null=True)
    header = models.TextField(blank=True, null=True)
    footer = models.TextField(blank=True, null=True)
    certificate_arn = models.CharField(blank=True, null=True, max_length=250)
    share_description = models.CharField(blank=True, null=True, max_length=250)
    share_image = models.CharField(blank=True, null=True, max_length=250)
    social_link_facebook = models.CharField(blank=True, null=True, max_length=250)
    social_link_instagram = models.CharField(blank=True, null=True, max_length=250)
    social_link_twitter = models.CharField(blank=True, null=True, max_length=250)
    social_link_youtube = models.CharField(blank=True, null=True, max_length=250)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)


class SiteSettings(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    site = models.OneToOneField(Sites, on_delete=models.CASCADE)
    is_published = models.BooleanField(default=True)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
