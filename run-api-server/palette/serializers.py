from .models import *
from rest_framework import serializers


class ColorCategoryWithAllSerializers(serializers.ModelSerializer):
    class Meta:
        model = ColorCategory
        fields = '__all__'


class PalettesWithAllSerializers(serializers.ModelSerializer):
    class Meta:
        model = Palettes
        fields = '__all__'


class ColorSerializers(serializers.ModelSerializer):
    class Meta:
        model = Colors
        exclude = ('palettes',)


class PaletteSerializers(serializers.ModelSerializer):
    colors = ColorSerializers(read_only=True)

    class Meta:
        model = Palettes
        fields = ['id', 'is_active', 'title', 'created_on', 'updated_on', 'colors']


class ColorCategorySerializers(serializers.ModelSerializer):
    palettes = PaletteSerializers(read_only=True)

    class Meta:
        model = ColorCategory
        fields = ['id', 'is_visible', 'order', 'created_on', 'updated_on', 'title', 'palettes']


class PaletteAndColorsSerializers(serializers.ModelSerializer):
    colors = ColorSerializers(read_only=True, many=True)

    class Meta:
        model = Palettes
        fields = ['id', 'is_active', 'title', 'created_on', 'updated_on', 'colors', 'blockTheme']


class PalettesColorCategoryAndColorsSerializers(serializers.ModelSerializer):
    categories = ColorCategorySerializers(read_only=True)

    class Meta:
        model = Palettes
        fields = '__all__'


class GetPaletteSerializers(serializers.ModelSerializer):
    categories = ColorCategorySerializers(read_only=True)

    class Meta:
        model = Palettes
        fields = '__all__'


class GetPaletteWithCategoriesManySerializers(serializers.ModelSerializer):
    palettes = PaletteAndColorsSerializers(read_only=True, many=True)

    class Meta:
        model = ColorCategory
        fields = ['id', 'is_visible', 'order', 'created_on', 'updated_on', 'title', 'palettes']
