import pytest

from django.contrib.auth import get_user_model

from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import AccessToken

from Orders.models import Order


# ============================================================
# FIXTURES
# ============================================================

@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def admin_token():
    token = AccessToken()

    token["email"] = "admin@gmail.com"
    token["role"] = "admin"

    return str(token)


@pytest.fixture
def user_token():
    token = AccessToken()

    token["email"] = "user@gmail.com"
    token["role"] = "user"

    return str(token)


@pytest.fixture
def admin_client(api_client, admin_token):
    api_client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {admin_token}"
    )

    return api_client


@pytest.fixture
def user_client(api_client, user_token):
    api_client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {user_token}"
    )

    return api_client


# ============================================================
# USER FIXTURE
# ============================================================

@pytest.fixture
def test_user(db):
    User = get_user_model()

    return User.objects.create_user(
        username="testuser",
        email="user@gmail.com",
        password="user123",
    )


# ============================================================
# ORDER FIXTURE
# ============================================================

@pytest.fixture
def order(test_user):

    return Order.objects.create(
        user=test_user,

        full_name="Test User",
        phone="03001234567",
        email="user@gmail.com",

        country="Pakistan",
        state="KPK",
        city="Abbottabad",
        postal_code="22010",
        address="Main Street",
        apartment="",
        notes="",

        delivery_method="standard",
        delivery_days=5,
        delivery_fee=200,

        payment_method="cod",
        payment_status="pending",

        subtotal=5000,
        shipping=200,
        tax=250,
        discount=0,

        total=5450,

        status="pending",
    )


# ============================================================
# GET ALL ORDERS
# ============================================================

@pytest.mark.django_db
def test_admin_can_get_all_orders(
    admin_client,
    order,
):

    response = admin_client.get(
        "/api/admin/orders/"
    )

    assert response.status_code == 200

    assert isinstance(
        response.data,
        list
    )

    assert len(response.data) >= 1

    order_data = next(
        item
        for item in response.data
        if item["id"] == order.id
    )

    assert order_data["id"] == order.id
    assert order_data["full_name"] == "Test User"
    assert order_data["email"] == "user@gmail.com"
    assert order_data["status"] == "pending"


# ============================================================
# GET SINGLE ORDER
# ============================================================

@pytest.mark.django_db
def test_admin_can_get_single_order(
    admin_client,
    order,
):

    response = admin_client.get(
        f"/api/admin/orders/{order.id}/"
    )

    assert response.status_code == 200

    assert response.data["id"] == order.id
    assert response.data["full_name"] == "Test User"
    assert response.data["status"] == "pending"


# ============================================================
# GET NON-EXISTING ORDER
# ============================================================

@pytest.mark.django_db
def test_admin_get_non_existing_order(
    admin_client,
):

    response = admin_client.get(
        "/api/admin/orders/999999/"
    )

    assert response.status_code == 404

    assert response.data["detail"] == (
        "Order not found."
    )


# ============================================================
# PATCH ORDER STATUS
# ============================================================

@pytest.mark.django_db
def test_admin_can_update_order_status(
    admin_client,
    order,
):

    response = admin_client.patch(
        f"/api/admin/orders/{order.id}/",
        {
            "status": "shipped"
        },
        format="json",
    )

    assert response.status_code == 200

    assert response.data["message"] == (
        "Order status updated successfully."
    )

    assert response.data["order"]["status"] == "shipped"

    order.refresh_from_db()

    assert order.status == "shipped"


# ============================================================
# PATCH INVALID STATUS
# ============================================================

@pytest.mark.django_db
def test_admin_cannot_update_invalid_status(
    admin_client,
    order,
):

    response = admin_client.patch(
        f"/api/admin/orders/{order.id}/",
        {
            "status": "invalid_status"
        },
        format="json",
    )

    assert response.status_code == 400

    assert response.data["detail"] == (
        "Invalid order status."
    )

    assert "valid_statuses" in response.data

    order.refresh_from_db()

    assert order.status == "pending"


# ============================================================
# PATCH NON-EXISTING ORDER
# ============================================================

@pytest.mark.django_db
def test_admin_update_non_existing_order(
    admin_client,
):

    response = admin_client.patch(
        "/api/admin/orders/999999/",
        {
            "status": "shipped"
        },
        format="json",
    )

    assert response.status_code == 404

    assert response.data["detail"] == (
        "Order not found."
    )


# ============================================================
# NO AUTHENTICATION
# ============================================================

@pytest.mark.django_db
def test_admin_orders_without_authentication(
    api_client,
):

    response = api_client.get(
        "/api/admin/orders/"
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_admin_order_detail_without_authentication(
    api_client,
    order,
):

    response = api_client.get(
        f"/api/admin/orders/{order.id}/"
    )

    assert response.status_code == 403


# ============================================================
# INVALID TOKEN
# ============================================================

@pytest.mark.django_db
def test_admin_orders_with_invalid_token(
    api_client,
):

    api_client.credentials(
        HTTP_AUTHORIZATION="Bearer invalid.token.value"
    )

    response = api_client.get(
        "/api/admin/orders/"
    )

    assert response.status_code == 403


# ============================================================
# NORMAL USER
# ============================================================

@pytest.mark.django_db
def test_normal_user_cannot_access_admin_orders(
    user_client,
):

    response = user_client.get(
        "/api/admin/orders/"
    )

    assert response.status_code == 403


@pytest.mark.django_db
def test_normal_user_cannot_access_admin_order_detail(
    user_client,
    order,
):

    response = user_client.get(
        f"/api/admin/orders/{order.id}/"
    )

    assert response.status_code == 403


# ============================================================
# NORMAL USER CANNOT PATCH
# ============================================================

@pytest.mark.django_db
def test_normal_user_cannot_update_order_status(
    user_client,
    order,
):

    response = user_client.patch(
        f"/api/admin/orders/{order.id}/",
        {
            "status": "shipped"
        },
        format="json",
    )

    assert response.status_code == 403

    order.refresh_from_db()

    assert order.status == "pending"