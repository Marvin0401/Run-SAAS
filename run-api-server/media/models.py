from django.db import models
import uuid
from django.utils import timezone

from accounts.models import Account


class Media(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    account = models.ForeignKey(Account, blank=True, null=True, on_delete=models.SET_NULL)
    is_active = models.BooleanField(default=True)
    title = models.CharField(blank=True, null=True, max_length=250)
    file_name = models.CharField(blank=True, null=True, max_length=250)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
