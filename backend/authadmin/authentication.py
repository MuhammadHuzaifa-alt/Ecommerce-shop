from rest_framework.authentication import BaseAuthentication
from rest_framework_simplejwt.tokens import UntypedToken
from rest_framework_simplejwt.exceptions import InvalidToken, TokenError


class AdminTokenUser:

    def __init__(self, email, role):

        self.email = email
        self.role = role

        self.is_authenticated = True
        self.is_active = True

    def __str__(self):

        return self.email


class AdminJWTAuthentication(BaseAuthentication):

    def authenticate(self, request):

        # ======================================================
        # GET AUTHORIZATION HEADER
        # ======================================================

        auth_header = request.headers.get("Authorization")

        if not auth_header:
            return None

        parts = auth_header.split()

        if len(parts) != 2:
            raise InvalidToken(
                "Invalid Authorization header."
            )

        if parts[0].lower() != "bearer":
            raise InvalidToken(
                "Authorization must use Bearer token."
            )

        token = parts[1]

        # ======================================================
        # VALIDATE JWT
        # ======================================================

        try:

            validated_token = UntypedToken(token)

        except Exception as exc:

            raise InvalidToken(
                "Invalid or expired admin token."
            )

        # ======================================================
        # READ TOKEN
        # ======================================================

        email = validated_token.get("email")
        role = validated_token.get("role")

        if not email:

            raise InvalidToken(
                "Admin email missing from token."
            )

        if role != "admin":

            raise InvalidToken(
                "Admin role missing from token."
            )

        # ======================================================
        # CREATE ADMIN USER
        # ======================================================

        admin_user = AdminTokenUser(
            email=email,
            role=role
        )

        return (
            admin_user,
            validated_token
        )