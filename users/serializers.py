from rest_framework import serializers
from .models import User
from rest_framework_jwt.settings import api_settings

class UserSerializer(serializers.ModelSerializer):

	class Meta:
		model = User
		fields = ('id', 'email', 'first_name', 'last_name', 'username', 'group', 'is_active', 'date_joined')

class UserSerializerWithToken(serializers.ModelSerializer):
    token = serializers.SerializerMethodField()

    def get_token(self, obj):
        jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
        jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER

        payload = jwt_payload_handler(obj)
        token = jwt_encode_handler(payload)
        return token

    class Meta:
        model = User
        fields = ('token', 'id', 'email', 'first_name', 'last_name', 'username', 'group', 'is_active', 'date_joined')

class SignupSerializer(serializers.ModelSerializer):

    password = serializers.CharField(write_only=True)
    username = serializers.CharField(write_only=True)
    group = serializers.IntegerField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance

    class Meta:
        model = User
        fields = ('email', 'password','username', 'group')