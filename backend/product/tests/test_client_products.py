import pytest

from rest_framework import status
from rest_framework.test import APIClient

from adminproduct.models import Product, Category


# ============================================================
# PRODUCT LIST TEST
# ============================================================

@pytest.mark.django_db
def test_client_product_list_success():

    category = Category.objects.create(
        name="Electronics"
    )

    Product.objects.create(
        name="Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=15,
    )

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 1


# ============================================================
# PRODUCT RESPONSE FIELDS
# ============================================================

@pytest.mark.django_db
def test_client_product_contains_expected_fields():

    category = Category.objects.create(
        name="Electronics"
    )

    Product.objects.create(
        name="Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=15,
    )

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    product = response.data[0]

    expected_fields = [
        "id",
        "name",
        "category",
        "brand",
        "image",
        "price",
        "oldPrice",
        "rating",
        "reviews",
        "stock",
        "discount",
    ]

    for field in expected_fields:
        assert field in product


# ============================================================
# CATEGORY RESPONSE TEST
# ============================================================

@pytest.mark.django_db
def test_client_product_category():

    category = Category.objects.create(
        name="Electronics"
    )

    Product.objects.create(
        name="Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=15,
    )

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    product = response.data[0]

    assert product["category"]["id"] == category.id
    assert product["category"]["name"] == "Electronics"


# ============================================================
# MULTIPLE PRODUCTS TEST
# ============================================================

@pytest.mark.django_db
def test_client_product_list_multiple_products():

    category = Category.objects.create(
        name="Electronics"
    )

    Product.objects.create(
        name="Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=15,
    )

    Product.objects.create(
        name="Phone",
        category=category,
        brand="Samsung",
        price=80000,
        oldPrice=90000,
        rating=4.2,
        reviews=15,
        stock=30,
        discount=10,
    )

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert len(response.data) == 2


# ============================================================
# ORDERING TEST
# ============================================================

@pytest.mark.django_db
def test_client_products_are_ordered_by_id_descending():

    category = Category.objects.create(
        name="Electronics"
    )

    first_product = Product.objects.create(
        name="Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=15,
    )

    second_product = Product.objects.create(
        name="Phone",
        category=category,
        brand="Samsung",
        price=80000,
        oldPrice=90000,
        rating=4.2,
        reviews=15,
        stock=30,
        discount=10,
    )

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data[0]["id"] == second_product.id
    assert response.data[1]["id"] == first_product.id


# ============================================================
# EMPTY PRODUCT LIST
# ============================================================

@pytest.mark.django_db
def test_client_product_list_empty():

    client = APIClient()

    response = client.get(
        "/api/products/"
    )

    assert response.status_code == status.HTTP_200_OK

    assert response.data == []