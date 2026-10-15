import pytest

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from register.models import Register


# ============================================================
# REGISTER TESTS
# ============================================================

@pytest.mark.django_db
def test_register_user_success():

    client = APIClient()

    response = client.post(
        "/api/auth/register/",
        {
            "fullname": "Test User",
            "email": "test@example.com",
            "phone": "03001234567",
            "password": "TestPassword123!",
            "confirmPassword": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    assert response.data["message"] == "Registration successful"

    assert Register.objects.filter(
        email="test@example.com"
    ).exists()


@pytest.mark.django_db
def test_register_password_mismatch():

    client = APIClient()

    response = client.post(
        "/api/auth/register/",
        {
            "fullname": "Test User",
            "email": "test@example.com",
            "phone": "03001234567",
            "password": "TestPassword123!",
            "confirmPassword": "WrongPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST

    assert not Register.objects.filter(
        email="test@example.com"
    ).exists()


@pytest.mark.django_db
def test_register_missing_confirm_password():

    client = APIClient()

    response = client.post(
        "/api/auth/register/",
        {
            "fullname": "Test User",
            "email": "test@example.com",
            "phone": "03001234567",
            "password": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_register_invalid_email():

    client = APIClient()

    response = client.post(
        "/api/auth/register/",
        {
            "fullname": "Test User",
            "email": "invalid-email",
            "phone": "03001234567",
            "password": "TestPassword123!",
            "confirmPassword": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


@pytest.mark.django_db
def test_register_missing_required_fields():

    client = APIClient()

    response = client.post(
        "/api/auth/register/",
        {},
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ============================================================
# LOGIN TESTS
# ============================================================

@pytest.mark.django_db
def test_login_success():

    Register.objects.create_user(
        username="test@example.com",
        email="test@example.com",
        fullname="Test User",
        phone="03001234567",
        password="TestPassword123!",
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "test@example.com",
            "password": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK

    assert "user" in response.data
    assert "access" in response.data
    assert "refresh" in response.data

    assert response.data["user"]["email"] == "test@example.com"


@pytest.mark.django_db
def test_login_user_not_found():

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "doesnotexist@example.com",
            "password": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_login_invalid_password():

    Register.objects.create_user(
        username="test@example.com",
        email="test@example.com",
        fullname="Test User",
        phone="03001234567",
        password="CorrectPassword123!",
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "test@example.com",
            "password": "WrongPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


@pytest.mark.django_db
def test_login_response_contains_correct_user_data():

    user = Register.objects.create_user(
        username="test@example.com",
        email="test@example.com",
        fullname="Muhammad Test",
        phone="03001234567",
        password="TestPassword123!",
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "test@example.com",
            "password": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data["user"]["id"] == user.id
    assert response.data["user"]["fullname"] == "Muhammad Test"
    assert response.data["user"]["email"] == "test@example.com"
    assert response.data["user"]["phone"] == "03001234567"
    assert response.data["user"]["role"] == "user"


# ============================================================
# ADMIN LOGIN
# ============================================================

@pytest.mark.django_db
def test_admin_login_returns_admin_role():

    Register.objects.create_user(
        username="admin@example.com",
        email="admin@example.com",
        fullname="Admin User",
        phone="03001234567",
        password="AdminPassword123!",
        is_staff=True,
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "admin@example.com",
            "password": "AdminPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data["user"]["role"] == "admin"

    assert "access" in response.data
    assert "refresh" in response.data


@pytest.mark.django_db
def test_normal_user_login_returns_user_role():

    Register.objects.create_user(
        username="user@example.com",
        email="user@example.com",
        fullname="Normal User",
        phone="03001234567",
        password="UserPassword123!",
        is_staff=False,
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "user@example.com",
            "password": "UserPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data["user"]["role"] == "user"


# ============================================================
# JWT TEST
# ============================================================

@pytest.mark.django_db
def test_login_access_token_is_valid():

    Register.objects.create_user(
        username="test@example.com",
        email="test@example.com",
        fullname="Test User",
        phone="03001234567",
        password="TestPassword123!",
    )

    client = APIClient()

    response = client.post(
        "/api/login/",
        {
            "email": "test@example.com",
            "password": "TestPassword123!",
        },
        format="json",
    )

    assert response.status_code == status.HTTP_200_OK

    access_token = response.data["access"]

    token = AccessToken(access_token)

    assert token["user_id"] is not None