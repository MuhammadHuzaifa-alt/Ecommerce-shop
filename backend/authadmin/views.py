from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken


ADMIN_EMAIL = "admin@gmail.com"
ADMIN_PASSWORD = "admin123"


class AdminLoginView(APIView):
    """
    Admin login endpoint.

    Returns:
        - access token
        - refresh token
        - admin information
    """

    authentication_classes = []
    permission_classes = []

    def post(self, request):

        email = request.data.get("email")
        password = request.data.get("password")

        # ======================================================
        # VALIDATION
        # ======================================================

        if not email or not password:
            return Response(
                {
                    "success": False,
                    "message": "Email and password are required.",
                },
                status=status.HTTP_400_BAD_REQUEST,
            )

        # ======================================================
        # ADMIN CREDENTIALS
        # ======================================================

        if (
            email.strip().lower() != ADMIN_EMAIL.lower()
            or password != ADMIN_PASSWORD
        ):
            return Response(
                {
                    "success": False,
                    "message": "Invalid admin email or password.",
                },
                status=status.HTTP_401_UNAUTHORIZED,
            )

        # ======================================================
        # CREATE REFRESH TOKEN
        # ======================================================

        refresh = RefreshToken()

        # Custom admin claims
        refresh["email"] = ADMIN_EMAIL
        refresh["role"] = "admin"

        # ======================================================
        # CREATE ACCESS TOKEN FROM REFRESH TOKEN
        # ======================================================

        access = refresh.access_token

        # ======================================================
        # RESPONSE
        # ======================================================

        return Response(
            {
                "success": True,
                "message": "Admin login successful",

                "admin": {
                    "email": ADMIN_EMAIL,
                    "role": "admin",
                },

                "access": str(access),
                "refresh": str(refresh),
            },
            status=status.HTTP_200_OK,
        )