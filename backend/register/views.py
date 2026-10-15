from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import AuthenticationFailed

from rest_framework_simplejwt.tokens import RefreshToken

from .serializers import (
    RegisterSerializer,
    LoginSerializer,
)

from .models import Register


class RegisterView(APIView):

    def post(self, request):

        serializer = RegisterSerializer(
            data=request.data
        )

        if serializer.is_valid():

            user = serializer.save()

            return Response(
                {
                    "message": "Registration successful",
                    "data": serializer.data,
                },
                status=status.HTTP_201_CREATED,
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST,
        )


class LoginView(APIView):

    def post(self, request):

        serializer = LoginSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        email = serializer.validated_data["email"]
        password = serializer.validated_data["password"]

        user = Register.objects.filter(
            email=email
        ).first()

        if user is None:
            raise AuthenticationFailed(
                "User not found."
            )

        if not user.check_password(password):
            raise AuthenticationFailed(
                "Invalid password."
            )

        refresh = RefreshToken.for_user(user)

        return Response(
            {
                "user": {
                    "id": user.id,
                    "fullname": user.fullname,
                    "email": user.email,
                    "phone": user.phone,
                    "role": (
                        "admin"
                        if user.is_staff
                        else "user"
                    ),
                },

                "access": str(
                    refresh.access_token
                ),

                "refresh": str(refresh),
            },

            status=status.HTTP_200_OK,
        )