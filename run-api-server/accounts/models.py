from django.utils import timezone

from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager
import uuid

from django.utils.translation import gettext_lazy as _


class UserRoles(models.TextChoices):
    ADMIN = 'admin', _('admin')
    SUPERADMIN = 'superadmin', _('superadmin')
    EDITOR = 'editor', _('editor')


# Create your models here.
class CustomUserManager(BaseUserManager):
    """Define a model manager for User model with no username field."""

    def _create_user(self, email, password=None, phone=None, **extra_fields):
        """Create and save a User with the given email and password."""
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, phone=phone, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        user = self.get(email__exact=email)
        if user:
            return user
        else:
            extra_fields.setdefault('is_staff', False)
            extra_fields.setdefault('is_superuser', False)
            return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password=None, **extra_fields):
        """Create and save a SuperUser with the given email and password."""
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_staff') is not True:
            raise ValueError('Superuser must have is_staff=True.')
        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    phone = models.CharField(blank=True, null=True, max_length=250)
    forgot_pswd_status = models.BooleanField(default=False)
    is_paying = models.BooleanField(default=False)
    role = models.CharField(
        max_length=10,
        choices=UserRoles.choices,
        default=UserRoles.ADMIN,
    )
    username = None
    zoho_id = models.CharField(blank=True, null=True, max_length=250)
    company = models.CharField(blank=True, null=True, max_length=250)
    email = models.EmailField(_('email address'), unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    objects = CustomUserManager()


class Account(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(User, on_delete=models.CASCADE, verbose_name='user')
    political_party = models.CharField(blank=True, null=True, max_length=250)
    campaign_name = models.CharField(blank=True, null=True, max_length=250)
    display_name = models.CharField(blank=True, null=True, max_length=250)
    profile_picture_loc = models.CharField(blank=True, null=True, max_length=250)
    subscription_id = models.CharField(blank=True, null=True, max_length=250)
    bio = models.TextField(blank=True, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)
