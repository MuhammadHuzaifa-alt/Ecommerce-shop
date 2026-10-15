import pytest

from django.test import RequestFactory

from rest_framework.test import APIClient

from authadmin.authentication import AdminJWTAuthentication


# ============================================================
# FIXTURES
# ============================================================

@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def request_factory():
    return RequestFactory()


# ============================================================
# ADMIN LOGIN TESTS
# ============================================================

@pytest.mark.django_db
def test_admin_login_success(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "admin@gmail.com",
            "password": "admin123",
        },
        format="json",
    )

    assert response.status_code == 200

    assert response.data["success"] is True
    assert response.data["message"] == "Admin login successful"

    assert response.data["admin"]["email"] == "admin@gmail.com"
    assert response.data["admin"]["role"] == "admin"

    assert "access" in response.data
    assert "refresh" in response.data

    assert response.data["access"]
    assert response.data["refresh"]


# ============================================================
# MISSING EMAIL
# ============================================================

@pytest.mark.django_db
def test_admin_login_missing_email(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "password": "admin123",
        },
        format="json",
    )

    assert response.status_code == 400

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Email and password are required."
    )


# ============================================================
# MISSING PASSWORD
# ============================================================

@pytest.mark.django_db
def test_admin_login_missing_password(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "admin@gmail.com",
        },
        format="json",
    )

    assert response.status_code == 400

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Email and password are required."
    )


# ============================================================
# MISSING EMAIL AND PASSWORD
# ============================================================

@pytest.mark.django_db
def test_admin_login_missing_credentials(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {},
        format="json",
    )

    assert response.status_code == 400

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Email and password are required."
    )


# ============================================================
# INVALID EMAIL
# ============================================================

@pytest.mark.django_db
def test_admin_login_invalid_email(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "wrong@gmail.com",
            "password": "admin123",
        },
        format="json",
    )

    assert response.status_code == 401

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Invalid admin email or password."
    )


# ============================================================
# INVALID PASSWORD
# ============================================================

@pytest.mark.django_db
def test_admin_login_invalid_password(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "admin@gmail.com",
            "password": "wrongpassword",
        },
        format="json",
    )

    assert response.status_code == 401

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Invalid admin email or password."
    )


# ============================================================
# INVALID EMAIL + PASSWORD
# ============================================================

@pytest.mark.django_db
def test_admin_login_invalid_credentials(api_client):
    response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "wrong@gmail.com",
            "password": "wrongpassword",
        },
        format="json",
    )

    assert response.status_code == 401

    assert response.data["success"] is False
    assert response.data["message"] == (
        "Invalid admin email or password."
    )


# ============================================================
# HTTP METHOD TEST
# ============================================================

@pytest.mark.django_db
def test_admin_login_get_not_allowed(api_client):
    response = api_client.get(
        "/api/admin/auth/login/"
    )

    assert response.status_code == 405


# ============================================================
# VALID ADMIN TOKEN
# ============================================================

@pytest.mark.django_db
def test_admin_access_token_authentication(
    api_client,
    request_factory,
):
    # --------------------------------------------------------
    # Login first
    # --------------------------------------------------------

    login_response = api_client.post(
        "/api/admin/auth/login/",
        {
            "email": "admin@gmail.com",
            "password": "admin123",
        },
        format="json",
    )

    assert login_response.status_code == 200

    access_token = login_response.data["access"]

    # --------------------------------------------------------
    # Create request with Authorization header
    # --------------------------------------------------------

    request = request_factory.get(
        "/api/admin/test/",
        HTTP_AUTHORIZATION=f"Bearer {access_token}",
    )

    authentication = AdminJWTAuthentication()

    result = authentication.authenticate(request)

    # --------------------------------------------------------
    # Verify authentication result
    # --------------------------------------------------------

    assert result is not None

    admin_user, validated_token = result

    assert admin_user.email == "admin@gmail.com"
    assert admin_user.role == "admin"

    assert admin_user.is_authenticated is True
    assert admin_user.is_active is True

    assert validated_token["email"] == "admin@gmail.com"
    assert validated_token["role"] == "admin"


# ============================================================
# NO AUTHORIZATION HEADER
# ============================================================

@pytest.mark.django_db
def test_admin_authentication_without_token(
    request_factory,
):
    authentication = AdminJWTAuthentication()

    request = request_factory.get(
        "/api/admin/test/"
    )

    result = authentication.authenticate(request)

    assert result is None


# ============================================================
# INVALID AUTHORIZATION HEADER
# ============================================================

@pytest.mark.django_db
def test_admin_authentication_invalid_header(
    request_factory,
):
    authentication = AdminJWTAuthentication()

    request = request_factory.get(
        "/api/admin/test/",
        HTTP_AUTHORIZATION="InvalidToken",
    )

    with pytest.raises(Exception):
        authentication.authenticate(request)


# ============================================================
# INVALID BEARER TOKEN
# ============================================================

@pytest.mark.django_db
def test_admin_authentication_invalid_token(
    request_factory,
):
    authentication = AdminJWTAuthentication()

    request = request_factory.get(
        "/api/admin/test/",
        HTTP_AUTHORIZATION="Bearer invalid.token.value",
    )

    with pytest.raises(Exception):
        authentication.authenticate(request)


# ============================================================
# NON-ADMIN TOKEN
# ============================================================

@pytest.mark.django_db
def test_admin_authentication_rejects_non_admin_token(
    request_factory,
):
    from rest_framework_simplejwt.tokens import AccessToken

    token = AccessToken()

    token["email"] = "user@gmail.com"
    token["role"] = "user"

    request = request_factory.get(
        "/api/admin/test/",
        HTTP_AUTHORIZATION=f"Bearer {str(token)}",
    )

    authentication = AdminJWTAuthentication()

    with pytest.raises(Exception):
        authentication.authenticate(request)


# ============================================================
# TOKEN WITHOUT EMAIL
# ============================================================

@pytest.mark.django_db
def test_admin_authentication_rejects_token_without_email(
    request_factory,
):
    from rest_framework_simplejwt.tokens import AccessToken

    token = AccessToken()

    token["role"] = "admin"

    request = request_factory.get(
        "/api/admin/test/",
        HTTP_AUTHORIZATION=f"Bearer {str(token)}",
    )

    authentication = AdminJWTAuthentication()

    with pytest.raises(Exception):
        authentication.authenticate(request)