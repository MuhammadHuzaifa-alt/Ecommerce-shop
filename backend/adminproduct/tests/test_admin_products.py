
import pytest

from rest_framework.test import APIClient

from adminproduct.models import Product, Category
from authadmin.authentication import AdminTokenUser


# ============================================================
# FIXTURES
# ============================================================

@pytest.fixture
def api_client():
    """
    Return an authenticated admin API client.

    Admin endpoints require:
        - IsAuthenticated
        - IsAdminRole
    """

    client = APIClient()

    admin_user = AdminTokenUser(
        email="admin@gmail.com",
        role="admin",
    )

    client.force_authenticate(
        user=admin_user
    )

    return client


@pytest.fixture
def category(db):
    return Category.objects.create(
        name="Electronics"
    )


@pytest.fixture
def second_category(db):
    return Category.objects.create(
        name="Laptops"
    )


@pytest.fixture
def product(category):
    return Product.objects.create(
        name="Test Laptop",
        category=category,
        brand="Dell",
        price=100000,
        oldPrice=120000,
        rating=4.5,
        reviews=25,
        stock=10,
        discount=15,
    )


# ============================================================
# CATEGORY LIST
# ============================================================

@pytest.mark.django_db
def test_admin_category_list(
    api_client,
    category,
):
    response = api_client.get(
        "/api/admin/categories/"
    )

    assert response.status_code == 200

    assert isinstance(
        response.data,
        list
    )

    assert len(response.data) >= 1

    category_data = next(
        item
        for item in response.data
        if item["id"] == category.id
    )

    assert category_data["id"] == category.id
    assert category_data["name"] == "Electronics"


# ============================================================
# CATEGORY CREATE
# ============================================================

@pytest.mark.django_db
def test_admin_category_create(
    api_client,
):
    response = api_client.post(
        "/api/admin/categories/",
        {
            "name": "Clothing"
        },
        format="json",
    )

    assert response.status_code == 201

    assert response.data["name"] == "Clothing"

    assert Category.objects.filter(
        name="Clothing"
    ).exists()


# ============================================================
# CATEGORY RETRIEVE
# ============================================================

@pytest.mark.django_db
def test_admin_category_retrieve(
    api_client,
    category,
):
    response = api_client.get(
        f"/api/admin/categories/{category.id}/"
    )

    assert response.status_code == 200

    assert response.data["id"] == category.id
    assert response.data["name"] == "Electronics"


# ============================================================
# CATEGORY UPDATE
# ============================================================

@pytest.mark.django_db
def test_admin_category_update(
    api_client,
    category,
):
    response = api_client.put(
        f"/api/admin/categories/{category.id}/",
        {
            "name": "Updated Electronics"
        },
        format="json",
    )

    assert response.status_code == 200

    assert response.data["name"] == (
        "Updated Electronics"
    )

    category.refresh_from_db()

    assert category.name == "Updated Electronics"


# ============================================================
# CATEGORY PATCH
# ============================================================

@pytest.mark.django_db
def test_admin_category_patch(
    api_client,
    category,
):
    response = api_client.patch(
        f"/api/admin/categories/{category.id}/",
        {
            "name": "Gaming"
        },
        format="json",
    )

    assert response.status_code == 200

    category.refresh_from_db()

    assert category.name == "Gaming"


# ============================================================
# CATEGORY DELETE
# ============================================================

@pytest.mark.django_db
def test_admin_category_delete(
    api_client,
    category,
):
    category_id = category.id

    response = api_client.delete(
        f"/api/admin/categories/{category_id}/"
    )

    assert response.status_code == 204

    assert not Category.objects.filter(
        id=category_id
    ).exists()


# ============================================================
# CATEGORY NOT FOUND
# ============================================================

@pytest.mark.django_db
def test_admin_category_not_found(
    api_client,
):
    response = api_client.get(
        "/api/admin/categories/999999/"
    )

    assert response.status_code == 404


# ============================================================
# PRODUCT LIST
# ============================================================

@pytest.mark.django_db
def test_admin_product_list(
    api_client,
    product,
):
    response = api_client.get(
        "/api/admin/products/"
    )

    assert response.status_code == 200

    assert isinstance(
        response.data,
        list
    )

    assert len(response.data) >= 1

    product_data = next(
        item
        for item in response.data
        if item["id"] == product.id
    )

    assert product_data["id"] == product.id
    assert product_data["name"] == "Test Laptop"
    assert product_data["brand"] == "Dell"
    assert product_data["price"] == "100000.00"
    assert product_data["oldPrice"] == "120000.00"
    assert product_data["stock"] == 10
    assert product_data["discount"] == 15


# ============================================================
# PRODUCT CREATE
# ============================================================

@pytest.mark.django_db
def test_admin_product_create(
    api_client,
    category,
):
    response = api_client.post(
        "/api/admin/products/",
        {
            "name": "Test Phone",
            "category_id": category.id,
            "brand": "Samsung",
            "price": 80000,
            "oldPrice": 90000,
            "rating": 4.3,
            "reviews": 10,
            "stock": 20,
            "discount": 10,
        },
        format="multipart",
    )

    assert response.status_code == 201

    assert response.data["name"] == "Test Phone"
    assert response.data["brand"] == "Samsung"

    assert Product.objects.filter(
        name="Test Phone"
    ).exists()

    created_product = Product.objects.get(
        name="Test Phone"
    )

    assert created_product.category == category
    assert created_product.price == 80000


# ============================================================
# PRODUCT RETRIEVE
# ============================================================

@pytest.mark.django_db
def test_admin_product_retrieve(
    api_client,
    product,
):
    response = api_client.get(
        f"/api/admin/products/{product.id}/"
    )

    assert response.status_code == 200

    assert response.data["id"] == product.id
    assert response.data["name"] == "Test Laptop"
    assert response.data["brand"] == "Dell"
    assert response.data["price"] == "100000.00"
    assert response.data["oldPrice"] == "120000.00"

    assert response.data["category"]["id"] == (
        product.category.id
    )

    assert response.data["category"]["name"] == (
        "Electronics"
    )


# ============================================================
# PRODUCT UPDATE
# ============================================================

@pytest.mark.django_db
def test_admin_product_update(
    api_client,
    product,
    second_category,
):
    response = api_client.put(
        f"/api/admin/products/{product.id}/",
        {
            "name": "Updated Laptop",
            "category_id": second_category.id,
            "brand": "HP",
            "price": 110000,
            "oldPrice": 125000,
            "rating": 4.7,
            "reviews": 40,
            "stock": 15,
            "discount": 12,
        },
        format="multipart",
    )

    assert response.status_code == 200

    assert response.data["name"] == (
        "Updated Laptop"
    )

    assert response.data["brand"] == "HP"

    product.refresh_from_db()

    assert product.name == "Updated Laptop"
    assert product.category == second_category
    assert product.brand == "HP"
    assert product.price == 110000
    assert product.stock == 15
    assert product.discount == 12


# ============================================================
# PRODUCT PATCH
# ============================================================

@pytest.mark.django_db
def test_admin_product_patch(
    api_client,
    product,
):
    response = api_client.patch(
        f"/api/admin/products/{product.id}/",
        {
            "price": 95000,
            "stock": 5,
        },
        format="multipart",
    )

    assert response.status_code == 200

    product.refresh_from_db()

    assert product.price == 95000
    assert product.stock == 5


# ============================================================
# PRODUCT DELETE
# ============================================================

@pytest.mark.django_db
def test_admin_product_delete(
    api_client,
    product,
):
    product_id = product.id

    response = api_client.delete(
        f"/api/admin/products/{product_id}/"
    )

    assert response.status_code == 204

    assert not Product.objects.filter(
        id=product_id
    ).exists()


# ============================================================
# PRODUCT NOT FOUND
# ============================================================

@pytest.mark.django_db
def test_admin_product_not_found(
    api_client,
):
    response = api_client.get(
        "/api/admin/products/999999/"
    )

    assert response.status_code == 404


# ============================================================
# PRODUCT INVALID CATEGORY
# ============================================================

@pytest.mark.django_db
def test_admin_product_invalid_category(
    api_client,
):
    response = api_client.post(
        "/api/admin/products/",
        {
            "name": "Invalid Product",
            "category_id": 999999,
            "brand": "Test",
            "price": 50000,
            "oldPrice": 60000,
            "rating": 4.0,
            "reviews": 0,
            "stock": 10,
            "discount": 0,
        },
        format="multipart",
    )

    assert response.status_code == 400

    assert "category_id" in response.data


# ============================================================
# PRODUCT SERIALIZER CATEGORY
# ============================================================

@pytest.mark.django_db
def test_product_returns_category_object(
    api_client,
    product,
):
    response = api_client.get(
        f"/api/admin/products/{product.id}/"
    )

    assert response.status_code == 200

    assert "category" in response.data

    assert response.data["category"]["id"] == (
        product.category.id
    )

    assert response.data["category"]["name"] == (
        product.category.name
    )


# ============================================================
# CATEGORY ORDERING
# ============================================================

@pytest.mark.django_db
def test_categories_are_ordered_by_name(
    api_client,
):
    Category.objects.create(
        name="Zebra"
    )

    Category.objects.create(
        name="Apple"
    )

    Category.objects.create(
        name="Mobile"
    )

    response = api_client.get(
        "/api/admin/categories/"
    )

    assert response.status_code == 200

    names = [
        item["name"]
        for item in response.data
    ]

    assert names == sorted(names)


# ============================================================
# PRODUCT ORDERING
# ============================================================

@pytest.mark.django_db
def test_products_are_ordered_by_id_descending(
    api_client,
    category,
):
    product1 = Product.objects.create(
        name="Product One",
        category=category,
        brand="Brand",
        price=1000,
        oldPrice=1200,
        rating=4.0,
        reviews=5,
        stock=10,
        discount=5,
    )

    product2 = Product.objects.create(
        name="Product Two",
        category=category,
        brand="Brand",
        price=2000,
        oldPrice=2500,
        rating=4.5,
        reviews=10,
        stock=20,
        discount=10,
    )

    response = api_client.get(
        "/api/admin/products/"
    )

    assert response.status_code == 200

    ids = [
        item["id"]
        for item in response.data
    ]

    assert ids == sorted(
        ids,
        reverse=True
    )

    assert response.data[0]["id"] == product2.id
    assert response.data[1]["id"] == product1.id
