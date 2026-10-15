import pytest

from decimal import Decimal

from rest_framework import status
from rest_framework.test import APIClient
from rest_framework_simplejwt.tokens import RefreshToken

from register.models import Register
from Orders.models import Order, OrderItem


# ============================================================
# HELPERS
# ============================================================


def create_user(
    email="user@example.com",
    fullname="Test User",
    password="TestPassword123!",
    phone="03001234567",
):
    return Register.objects.create_user(
        username=email,
        email=email,
        fullname=fullname,
        phone=phone,
        password=password,
    )


def authenticate_client(user):

    refresh = RefreshToken.for_user(user)

    client = APIClient()

    client.credentials(
        HTTP_AUTHORIZATION=f"Bearer {refresh.access_token}"
    )

    return client


def order_payload():

    return {
        "fullName": "Test User",
        "phone": "03001234567",
        "email": "user@example.com",

        "country": "Pakistan",
        "state": "Sindh",
        "city": "Karachi",
        "postalCode": "74000",
        "address": "Test Address",

        "apartment": "Apartment 1",
        "notes": "Please deliver carefully",

        "deliveryMethod": "Standard",
        "deliveryDays": "3-5 days",
        "deliveryFee": "200.00",

        "paymentMethod": "Cash on Delivery",

        "subtotal": "5000.00",
        "shipping": "200.00",
        "tax": "260.00",
        "discount": "100.00",

        "items": [
            {
                "id": 1,
                "name": "Test Product",
                "image": "",
                "price": "2500.00",
                "quantity": 2,
            }
        ],
    }


# ============================================================
# CREATE ORDER
# ============================================================


@pytest.mark.django_db
def test_create_order_success():

    user = create_user()

    client = authenticate_client(user)

    response = client.post(
        "/api/orders/create/",
        order_payload(),
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    assert response.data["message"] == "Order created successfully."

    assert "order" in response.data

    assert Order.objects.filter(
        user=user
    ).exists()


# ============================================================
# CREATE ORDER RESPONSE
# ============================================================


@pytest.mark.django_db
def test_create_order_returns_correct_data():

    user = create_user()

    client = authenticate_client(user)

    response = client.post(
        "/api/orders/create/",
        order_payload(),
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    order = response.data["order"]

    assert order["user"] == user.id

    assert order["full_name"] == "Test User"

    assert order["email"] == "user@example.com"

    assert order["city"] == "Karachi"

    assert order["payment_method"] == "Cash on Delivery"

    assert Decimal(str(order["subtotal"])) == Decimal("5000.00")

    assert Decimal(str(order["shipping"])) == Decimal("200.00")

    assert Decimal(str(order["tax"])) == Decimal("260.00")

    assert Decimal(str(order["discount"])) == Decimal("100.00")

    # 5000 + 200 + 200 + 260 - 100 = 5560
    assert Decimal(str(order["total"])) == Decimal("5560.00")


# ============================================================
# CREATE ORDER ITEM
# ============================================================


@pytest.mark.django_db
def test_create_order_creates_order_item():

    user = create_user()

    client = authenticate_client(user)

    response = client.post(
        "/api/orders/create/",
        order_payload(),
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    order = Order.objects.get(
        user=user
    )

    assert OrderItem.objects.filter(
        order=order
    ).count() == 1

    item = OrderItem.objects.get(
        order=order
    )

    assert item.product_id == 1

    assert item.product_name == "Test Product"

    assert item.quantity == 2

    assert Decimal(str(item.price)) == Decimal("2500.00")

    assert Decimal(str(item.subtotal)) == Decimal("5000.00")


# ============================================================
# TOTAL CALCULATION
# ============================================================


@pytest.mark.django_db
def test_create_order_calculates_total_correctly():

    user = create_user()

    client = authenticate_client(user)

    payload = order_payload()

    payload["subtotal"] = "10000.00"
    payload["shipping"] = "500.00"
    payload["deliveryFee"] = "250.00"
    payload["tax"] = "500.00"
    payload["discount"] = "1000.00"

    response = client.post(
        "/api/orders/create/",
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_201_CREATED

    order = response.data["order"]

    # 10000 + 500 + 250 + 500 - 1000
    # = 10250

    assert Decimal(str(order["total"])) == Decimal("10250.00")


# ============================================================
# UNAUTHENTICATED CREATE ORDER
# ============================================================


@pytest.mark.django_db
def test_create_order_requires_authentication():

    client = APIClient()

    response = client.post(
        "/api/orders/create/",
        order_payload(),
        format="json",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


# ============================================================
# INVALID ORDER DATA
# ============================================================


@pytest.mark.django_db
def test_create_order_invalid_email():

    user = create_user()

    client = authenticate_client(user)

    payload = order_payload()

    payload["email"] = "invalid-email"

    response = client.post(
        "/api/orders/create/",
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ============================================================
# INVALID QUANTITY
# ============================================================


@pytest.mark.django_db
def test_create_order_invalid_quantity():

    user = create_user()

    client = authenticate_client(user)

    payload = order_payload()

    payload["items"][0]["quantity"] = 0

    response = client.post(
        "/api/orders/create/",
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ============================================================
# NEGATIVE DELIVERY FEE
# ============================================================


@pytest.mark.django_db
def test_create_order_negative_delivery_fee():

    user = create_user()

    client = authenticate_client(user)

    payload = order_payload()

    payload["deliveryFee"] = "-100.00"

    response = client.post(
        "/api/orders/create/",
        payload,
        format="json",
    )

    assert response.status_code == status.HTTP_400_BAD_REQUEST


# ============================================================
# MY ORDERS
# ============================================================


@pytest.mark.django_db
def test_my_orders_success():

    user = create_user()

    Order.objects.create(
        user=user,
        full_name="Test User",
        phone="03001234567",
        email="user@example.com",

        country="Pakistan",
        state="Sindh",
        city="Karachi",
        postal_code="74000",
        address="Test Address",

        apartment="",
        notes="",

        delivery_method="Standard",
        delivery_days="3-5 days",
        delivery_fee=Decimal("200.00"),

        payment_method="Cash on Delivery",

        subtotal=Decimal("5000.00"),
        shipping=Decimal("200.00"),
        tax=Decimal("260.00"),
        discount=Decimal("100.00"),
        total=Decimal("5560.00"),
    )

    client = authenticate_client(user)

    response = client.get(
        "/api/orders/my-orders/",
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 1

    assert response.data[0]["user"] == user.id


# ============================================================
# MY ORDERS ONLY RETURNS CURRENT USER'S ORDERS
# ============================================================


@pytest.mark.django_db
def test_my_orders_returns_only_current_users_orders():

    user1 = create_user(
        email="user1@example.com",
        phone="03001234567",
    )

    user2 = create_user(
        email="user2@example.com",
        phone="03001234568",
    )

    Order.objects.create(
        user=user1,
        full_name="User One",
        phone="03001234567",
        email="user1@example.com",

        country="Pakistan",
        state="Sindh",
        city="Karachi",
        postal_code="74000",
        address="Address 1",

        delivery_method="Standard",
        delivery_days="3-5 days",
        delivery_fee=Decimal("200.00"),

        payment_method="Cash on Delivery",

        subtotal=Decimal("1000.00"),
        shipping=Decimal("100.00"),
        tax=Decimal("50.00"),
        discount=Decimal("0.00"),
        total=Decimal("1350.00"),
    )

    Order.objects.create(
        user=user2,
        full_name="User Two",
        phone="03001234568",
        email="user2@example.com",

        country="Pakistan",
        state="Sindh",
        city="Karachi",
        postal_code="74000",
        address="Address 2",

        delivery_method="Standard",
        delivery_days="3-5 days",
        delivery_fee=Decimal("200.00"),

        payment_method="Cash on Delivery",

        subtotal=Decimal("2000.00"),
        shipping=Decimal("100.00"),
        tax=Decimal("100.00"),
        discount=Decimal("0.00"),
        total=Decimal("2400.00"),
    )

    client = authenticate_client(user1)

    response = client.get(
        "/api/orders/my-orders/",
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 1

    assert response.data[0]["user"] == user1.id


# ============================================================
# MY ORDERS REQUIRES AUTHENTICATION
# ============================================================


@pytest.mark.django_db
def test_my_orders_requires_authentication():

    client = APIClient()

    response = client.get(
        "/api/orders/my-orders/",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED


# ============================================================
# ORDER DETAIL SUCCESS
# ============================================================


@pytest.mark.django_db
def test_my_order_detail_success():

    user = create_user()

    order = Order.objects.create(
        user=user,
        full_name="Test User",
        phone="03001234567",
        email="user@example.com",

        country="Pakistan",
        state="Sindh",
        city="Karachi",
        postal_code="74000",
        address="Test Address",

        delivery_method="Standard",
        delivery_days="3-5 days",
        delivery_fee=Decimal("200.00"),

        payment_method="Cash on Delivery",

        subtotal=Decimal("5000.00"),
        shipping=Decimal("200.00"),
        tax=Decimal("260.00"),
        discount=Decimal("100.00"),
        total=Decimal("5560.00"),
    )

    client = authenticate_client(user)

    response = client.get(
        f"/api/orders/my-orders/{order.id}/",
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data["id"] == order.id

    assert response.data["user"] == user.id


# ============================================================
# ORDER DETAIL NOT FOUND
# ============================================================


@pytest.mark.django_db
def test_my_order_detail_not_found():

    user = create_user()

    client = authenticate_client(user)

    response = client.get(
        "/api/orders/my-orders/99999/",
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND

    assert response.data["detail"] == "Order not found."


# ============================================================
# USER CANNOT ACCESS ANOTHER USER'S ORDER
# ============================================================


@pytest.mark.django_db
def test_user_cannot_access_another_users_order():

    user1 = create_user(
        email="user1@example.com",
        phone="03001234567",
    )

    user2 = create_user(
        email="user2@example.com",
        phone="03001234568",
    )

    order = Order.objects.create(
        user=user1,
        full_name="User One",
        phone="03001234567",
        email="user1@example.com",

        country="Pakistan",
        state="Sindh",
        city="Karachi",
        postal_code="74000",
        address="Address",

        delivery_method="Standard",
        delivery_days="3-5 days",
        delivery_fee=Decimal("200.00"),

        payment_method="Cash on Delivery",

        subtotal=Decimal("1000.00"),
        shipping=Decimal("100.00"),
        tax=Decimal("50.00"),
        discount=Decimal("0.00"),
        total=Decimal("1350.00"),
    )

    client = authenticate_client(user2)

    response = client.get(
        f"/api/orders/my-orders/{order.id}/",
    )

    assert response.status_code == status.HTTP_404_NOT_FOUND

    assert response.data["detail"] == "Order not found."


# ============================================================
# ORDER DETAIL REQUIRES AUTHENTICATION
# ============================================================


@pytest.mark.django_db
def test_my_order_detail_requires_authentication():

    client = APIClient()

    response = client.get(
        "/api/orders/my-orders/1/",
    )

    assert response.status_code == status.HTTP_401_UNAUTHORIZED