from django.urls import path
from .views import *



urlpatterns = [
    path('create-color-palette/', CreatePalette.as_view(), name='create-palette'),
    # path('get-color-categories/', ColorCategoryView.as_view(), name='get-color-categories'),
    path('get-color-palettes/', GetAllPalettes.as_view(), name='get-color-palettes'),
    path('update-color-category/<uuid:pk>/', UpdateCategory.as_view(), name='update-color-category'),
    path('update-palettes/<uuid:pk>/', UpdatePalettes.as_view(), name='update-palettes'),
    path('update-color/<uuid:pk>/', UpdateColors.as_view(), name='update-color'),
    path('move-color-order/<uuid:pk>/', MoveColorOrder.as_view(), name='update-color'),
    path('delete/<uuid:pk>/', deleteColorPalette.as_view(), name='delete-color-palette'),
]