from django.urls import include, path
from .views import *


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('upload/', UploadMedia.as_view(), name='upload-media'),
]