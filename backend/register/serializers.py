from rest_framework import serializers
from .models import Register


class RegisterSerializer(serializers.ModelSerializer):

    confirmPassword = serializers.CharField(
        write_only=True
    )

    class Meta:
        model = Register

        fields = [
            "fullname",
            "email",
            "phone",
            "password",
            "confirmPassword",
        ]

        extra_kwargs = {
            "password": {
                "write_only": True
            }
        }

    def validate(self, data):

        if data["password"] != data["confirmPassword"]:
            raise serializers.ValidationError(
                "Passwords do not match."
            )

        return data

    def create(self, validated_data):

        validated_data.pop("confirmPassword")

        user = Register(
            username=validated_data["email"],
            fullname=validated_data["fullname"],
            email=validated_data["email"],
            phone=validated_data["phone"],
        )

        user.set_password(
            validated_data["password"]
        )

        user.save()

        return user


class LoginSerializer(serializers.Serializer):

    email = serializers.EmailField()

    password = serializers.CharField(
        write_only=True
    )