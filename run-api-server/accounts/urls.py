from django.urls import include, path
from rest_framework import routers
from .views import *
router = routers.DefaultRouter()


# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('register/', AccountRegisterView.as_view(), name='user-register'),
    path('login/', AccountLoginView.as_view(), name='user-login'),
    path('update/profile/', UpdateUserProfileAndAccount.as_view(), name='api-update-user-profile-account'),
    path('reset-password/verify-token/', CustomPasswordTokenVerificationView.as_view(), name='password_reset_verify_token'),
    path('profile/reset-password/', ProfileResetPassword.as_view(), name='password_reset_verify_token'),
    path('reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
    # path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]