from django.urls import include, path
from .views import *


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('', UserSitesView.as_view(), name='get-sites'),
    path('<uuid:pk>/', UserSitesView.as_view(), name='set-sites'),
    path('upload/', UploadSiteData.as_view(), name='create-sites'),
    path('upload/font/', UploadFonts.as_view(), name='create-font'),
    path('delete/font/<uuid:pk>/', UploadFonts.as_view(), name='delete-font'),
    path('fonts/', GetAllFonts.as_view(), name='get-all-font'),
    path('get/<str:pk>/', GetUploadSiteData.as_view(), name='get-upload-sites'),
    path('update-ssl/<str:pk>/', UpdateSSL.as_view(), name='update-ssl'),
    path('request/ssl/', RequestSSL.as_view(), name='request-ssl'),
    path('get-twitter-user/<str:username>/', GetTwitterFeed.as_view(), name='get-twitter-user'),
]