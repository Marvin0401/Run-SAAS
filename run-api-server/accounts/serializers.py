from abc import ABC

from .models import (Account, User)
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer


class UsersSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        exclude = ('password', 'groups', 'user_permissions', 'forgot_pswd_status', 'is_superuser', 'is_staff')


class AccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        exclude = ('user', 'updated_on', 'created_on', 'profile_picture_loc')


class RegisterUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

    def create(self, validated_data):
        user = User.objects.create(
            email=validated_data['email'],
            phone=validated_data['phone'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            company=validated_data['company'],
            zoho_id=validated_data['zoho_id'],
        )

        user.set_password(validated_data['password'])
        user.save()

        return user


class AccountRegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Account
        fields = '__all__'



class CustomTokenSerializer(serializers.Serializer):
    token = serializers.CharField()
