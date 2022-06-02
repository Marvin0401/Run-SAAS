# Create your models here.
from django.db import models, transaction
import uuid
from django.utils import timezone
from django.db.models import F, Max


class ColorCategoryStepManager(models.Manager):

    def move(self, obj, new_order):
        """ Move an object to a new order position """

        qs = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                qs.filter(
                    id=obj.id,
                    order__lt=obj.order,
                    order__gte=new_order,
                ).exclude(
                    pk=obj.pk
                ).update(
                    order=F('order') + 1,
                )
            else:
                qs.filter(
                    id=obj.id,
                    order__lte=new_order,
                    order__gt=obj.order,
                ).exclude(
                    pk=obj.pk,
                ).update(
                    order=F('order') - 1,
                )

            obj.order = new_order
            obj.save()

    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # Get our current max order number
            results = self.aggregate(Max('order'))

            # Increment and use it for our new object
            current_order = results['order__max']
            if current_order is None:
                current_order = 0

            value = current_order + 1
            print(value, "value")
            instance.order = value
            instance.save()

            return instance


class ColorsStepManager(models.Manager):

    def move(self, obj, new_order):
        """ Move an object to a new order position """

        qs = self.get_queryset()

        with transaction.atomic():
            if obj.order > int(new_order):
                qs.filter(
                    palettes_id=obj.palettes_id,
                    order__lt=obj.order,
                    order__gte=new_order,
                ).exclude(
                    pk=obj.id
                ).update(
                    order=F('order') + 1,
                )
            else:
                qs.filter(
                    palettes_id=obj.palettes_id,
                    order__lte=new_order,
                    order__gt=obj.order,
                ).exclude(
                    pk=obj.id,
                ).update(
                    order=F('order') - 1,
                )

            obj.order = new_order
            obj.save()

    def create(self, **kwargs):
        instance = self.model(**kwargs)

        with transaction.atomic():
            # Get our current max order number
            results = self.filter(palettes_id=instance.palettes_id).aggregate(
                Max('order')
            )

            # Increment and use it for our new object
            current_order = results['order__max']
            if current_order is None:
                current_order = 0

            value = current_order + 1
            instance.order = value
            instance.save()

            return instance


class PalettesCategoryStepManager(models.Manager):

    def get_colors(self, **kwargs):
        instance = self.model(**kwargs)
        return Colors.objects.filter(palettes__id=instance.id)


class ColorCategory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_visible = models.BooleanField(default=True)
    title = models.CharField(blank=True, null=True, max_length=250)
    order = models.IntegerField(default=1)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-order']

    objects = ColorCategoryStepManager()

    def __unicode__(self):
        return self.id

    def get_palettes(self):
        return Palettes.objects.filter(categories__id=self.id)


class Palettes(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    title = models.CharField(blank=True, null=True, max_length=250)
    categories = models.ManyToManyField(ColorCategory, related_name='palettes')
    blockTheme = models.JSONField(blank=True, null=True)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)

    def __unicode__(self):
        return self.id

    objects = PalettesCategoryStepManager()


class Colors(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_active = models.BooleanField(default=True)
    name = models.CharField(blank=True, null=True, max_length=250)
    hex = models.CharField(blank=True, null=True, max_length=250)
    css_var = models.CharField(blank=True, null=True, max_length=250)
    palettes = models.ForeignKey(Palettes, on_delete=models.CASCADE, related_name='colors', verbose_name='palettes')
    order = models.IntegerField(default=1)
    created_on = models.DateTimeField(default=timezone.now)
    updated_on = models.DateTimeField(default=timezone.now)

    class Meta:
        ordering = ['-order']

    objects = ColorsStepManager()

    def __unicode__(self):
        return self.id
