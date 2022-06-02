from rest_framework.response import Response
from django.core import serializers
from .models import *
from rest_framework.views import APIView
from .serializers import *
import json
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from .serializers import *
from django.db.models import Q
from django.conf import settings as Config
import logging


class getPal(APIView):

    def get(self, request):
        colors = ColorCategory.objects.all()
        data = []
        for col in colors:
            data.append({"pal": col.title, 'pal2': col.get_palettes().first()})

        return Response(data)


class CreatePalette(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        try:
            color_category = ColorCategory.objects.filter(Q(id=request.data.get('color_category_id')) |
                                                          Q(title=request.data.get('color_category_title'))).first()
            if not color_category and request.data.get('color_category_title'):
                color_category = ColorCategory.objects.create(
                    title=request.data.get('color_category_title'))
            palette = Palettes.objects.filter(
                title=request.data.get('title')).first()
            if not palette:
                palette = Palettes.objects.create(title=request.data.get('title'),
                                                  blockTheme=request.data.get('blockTheme'))
                palette.categories.add(color_category)
            else:
                palette.categories.add(color_category)
            if request.data.get('colors'):
                if len(request.data.get('colors')):
                    for color in request.data.get('colors'):
                        try:
                            Colors.objects.get(name=color.get('name'), hex=color.get('hex'),
                                               css_var=color.get('css_var'), palettes=palette)
                        except Colors.DoesNotExist:
                            Colors.objects.create(name=color.get('name'), hex=color.get('hex'),
                                                  css_var=color.get('css_var'),
                                                  palettes=palette)
            return Response({
                "message": "success",
            }, status=status.HTTP_202_ACCEPTED)
        except Exception as e:
            logging.error("Failed to create the Palette: {0}".format(str(e)))
            return Response(
                data={
                    "message": "The Invite Key could not be created.",
                    "error": e},
                status=status.HTTP_400_BAD_REQUEST)


# class ColorCategoryView(APIView):
#
#     def get(self, request):
#         try:
#             color_category = ColorCategory.objects.all()
#             color_category = ColorCategorySerializers(color_category, many=True)
#             if not len(color_category.data):
#                 return Response({
#                     "message": "Not Site Found",
#                     'color_category': color_category.data
#                 }, status=status.HTTP_204_NO_CONTENT)
#
#             return Response({
#                 "message": "Fetched Successfully",
#                 'color_category': color_category.data
#             }, status=status.HTTP_200_OK)
#         except Exception as e:
#             print(e)
#             return Response({
#                 "message": "Error",
#             }, status=status.HTTP_400_BAD_REQUEST)


class GetAllPalettes(APIView):
    def get(self, request):
        cat_data = ColorCategory.objects.all()
        color_categories = GetPaletteWithCategoriesManySerializers(cat_data, many=True).data
        logging.warning("+++++++++++++++++++++++++++++++++++++")
        logging.debug(color_categories)
        return Response({
            "message": "Fetched Successfully",
            "color_categories": color_categories
        }, status=status.HTTP_200_OK)


class UpdateCategory(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        obj = ColorCategory.objects.filter(id=pk).first()
        if not obj or request.data.get('order'):
            logging.error("Failed to get color categories with requested params: {0}, {1}".format(pk, request.data))
            return Response({
                "message": "Bad request",
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = ColorCategoryWithAllSerializers(instance=obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "success",
                "color_categories": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            logging.error("Failed to serialize the ColorCategory")


class UpdatePalettes(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):

        obj = Palettes.objects.filter(id=pk).first()
        if not obj:
            logging.error("Failed to get Palettes object with requested params: {0}, {1}".format(pk, request.data))
            return Response({
                "message": "Bad request",
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = PalettesWithAllSerializers(instance=obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "success",
                "palette": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            logging.error("Failed to serialize the Palettes")


class UpdateColors(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        obj = Colors.objects.filter(id=pk, palettes__id=request.data.get('palette_id')).first()
        if not obj or request.data.get('order'):
            logging.error("Failed to get Colors object with requested params: {0}, {1}".format(pk, request.data))
            return Response({
                "message": "Bad request",
            }, status=status.HTTP_400_BAD_REQUEST)
        serializer = ColorSerializers(instance=obj, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "message": "success",
                "palette": serializer.data
            }, status=status.HTTP_200_OK)
        else:
            logging.error("Failed to serialize the Colors")


class MoveColorOrder(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, pk):
        try:
            obj = Colors.objects.get(id=pk)
            if not obj:
                logging.error("Failed to get Colors object with requested params: {0}".format(pk))
                return Response({
                    "message": "Bad request",
                })
            Colors.objects.move(obj, request.data.get('new_order'))
            return Response({
                "message": "updated",
            })
        except Exception as e:
            logging.error("Failed to move the Colors order: {0}".format(str(e)))
            return Response({
                "message": "something went wrong",
            })


class deleteColorPalette(APIView):
    permission_classes = [IsAuthenticated]

    def delete(self, request, pk):
        try:
            pale = Palettes.objects.get(id=pk)
            if not pale:
                logging.error("Failed to delete Color Palette with requested params: {0}".format(pk))
                return Response({
                    "message": "Bad request",
                })
            Colors.objects.filter(palettes__id=pk).delete()
            pale.delete()
            return Response({
                "message": "deleted",
            })
        except Exception as e:
            logging.error("Failed to delete the Color Palette: {0}".format(str(e)))
            return Response({
                "message": "something went wrong",
            })