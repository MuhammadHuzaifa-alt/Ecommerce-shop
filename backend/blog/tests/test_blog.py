import pytest

from rest_framework.test import APIClient

from blog.models import Blog, BlogCategory


# ============================================================
# FIXTURES
# ============================================================

@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def category():
    return BlogCategory.objects.create(
        name="Technology"
    )


@pytest.fixture
def second_category():
    return BlogCategory.objects.create(
        name="Business"
    )


@pytest.fixture
def blog(category):
    return Blog.objects.create(
        title="Introduction to Django",
        description="Learn Django basics.",
        content="Django is a powerful Python web framework.",
        category=category,
        author="Muhammad Huzaifa",
        date="2026-09-01",
        tags="django,python,web",
        views=100,
        readTime=5,  # Integer because model uses PositiveIntegerField
    )


# ============================================================
# ADMIN CATEGORY TESTS
# ============================================================

@pytest.mark.django_db
def test_admin_category_list(api_client, category):
    response = api_client.get(
        "/api/admin/blog-categories/"
    )

    assert response.status_code == 200
    assert len(response.data) == 1
    assert response.data[0]["name"] == "Technology"


@pytest.mark.django_db
def test_admin_category_create(api_client):
    response = api_client.post(
        "/api/admin/blog-categories/",
        {
            "name": "Technology",
        },
        format="json",
    )

    assert response.status_code == 201
    assert response.data["name"] == "Technology"

    assert BlogCategory.objects.filter(
        name="Technology"
    ).exists()


@pytest.mark.django_db
def test_admin_category_detail(api_client, category):
    response = api_client.get(
        f"/api/admin/blog-categories/{category.id}/"
    )

    assert response.status_code == 200
    assert response.data["id"] == category.id
    assert response.data["name"] == "Technology"


@pytest.mark.django_db
def test_admin_category_update(api_client, category):
    response = api_client.put(
        f"/api/admin/blog-categories/{category.id}/",
        {
            "name": "Programming",
        },
        format="json",
    )

    assert response.status_code == 200
    assert response.data["name"] == "Programming"

    category.refresh_from_db()

    assert category.name == "Programming"


@pytest.mark.django_db
def test_admin_category_delete(api_client, category):
    response = api_client.delete(
        f"/api/admin/blog-categories/{category.id}/"
    )

    assert response.status_code == 204

    assert not BlogCategory.objects.filter(
        id=category.id
    ).exists()


@pytest.mark.django_db
def test_admin_category_not_found(api_client):
    response = api_client.get(
        "/api/admin/blog-categories/99999/"
    )

    assert response.status_code == 404


# ============================================================
# ADMIN BLOG TESTS
# ============================================================

@pytest.mark.django_db
def test_admin_blog_list(api_client, blog):
    response = api_client.get(
        "/api/admin/blogs/"
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    assert response.data[0]["title"] == "Introduction to Django"


@pytest.mark.django_db
def test_admin_blog_create(api_client, category):
    response = api_client.post(
        "/api/admin/blogs/",
        {
            "title": "React Testing Guide",
            "description": "Learn how to test React applications.",
            "content": "This article explains React testing.",
            "category_id": category.id,
            "author": "Muhammad Huzaifa",
            "date": "2026-09-02",
            "tags": '["react", "testing", "javascript"]',
            "views": 0,
            "readTime": 7,
        },
        format="multipart",
    )

    assert response.status_code == 201, response.data

    assert response.data["title"] == "React Testing Guide"
    assert response.data["category"]["id"] == category.id
    assert response.data["readTime"] == 7

    assert Blog.objects.filter(
        title="React Testing Guide"
    ).exists()


@pytest.mark.django_db
def test_admin_blog_create_invalid_category(api_client):
    response = api_client.post(
        "/api/admin/blogs/",
        {
            "title": "Invalid Category Blog",
            "description": "Test description",
            "content": "Test content",
            "category_id": 99999,
            "author": "Muhammad Huzaifa",
            "date": "2026-09-02",
            "tags": "test",
            "views": 0,
            "readTime": 5,
        },
        format="multipart",
    )

    assert response.status_code == 400


@pytest.mark.django_db
def test_admin_blog_detail(api_client, blog):
    response = api_client.get(
        f"/api/admin/blogs/{blog.id}/"
    )

    assert response.status_code == 200

    assert response.data["id"] == blog.id
    assert response.data["title"] == "Introduction to Django"
    assert response.data["readTime"] == 5


@pytest.mark.django_db
def test_admin_blog_update(api_client, blog, category):
    response = api_client.put(
        f"/api/admin/blogs/{blog.id}/",
        {
            "title": "Updated Django Guide",
            "description": "Updated description.",
            "content": "Updated content.",
            "category_id": category.id,
            "author": "Muhammad Huzaifa",
            "date": "2026-09-02",
            "tags": '["django", "python"]',
            "views": 150,
            "readTime": 10,
        },
        format="multipart",
    )

    assert response.status_code == 200, response.data

    assert response.data["title"] == "Updated Django Guide"
    assert response.data["readTime"] == 10

    blog.refresh_from_db()

    assert blog.title == "Updated Django Guide"
    assert blog.readTime == 10


@pytest.mark.django_db
def test_admin_blog_delete(api_client, blog):
    response = api_client.delete(
        f"/api/admin/blogs/{blog.id}/"
    )

    assert response.status_code == 204

    assert not Blog.objects.filter(
        id=blog.id
    ).exists()


@pytest.mark.django_db
def test_admin_blog_not_found(api_client):
    response = api_client.get(
        "/api/admin/blogs/99999/"
    )

    assert response.status_code == 404


# ============================================================
# CUSTOMER BLOG TESTS
# ============================================================

@pytest.mark.django_db
def test_blog_list(api_client, blog):
    response = api_client.get(
        "/api/blogs/"
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    assert response.data[0]["title"] == "Introduction to Django"


@pytest.mark.django_db
def test_blog_detail(api_client, blog):
    response = api_client.get(
        f"/api/blogs/{blog.id}/"
    )

    assert response.status_code == 200

    assert response.data["id"] == blog.id
    assert response.data["title"] == "Introduction to Django"


@pytest.mark.django_db
def test_blog_detail_not_found(api_client):
    response = api_client.get(
        "/api/blogs/99999/"
    )

    assert response.status_code == 404


# ============================================================
# CATEGORY TESTS
# ============================================================

@pytest.mark.django_db
def test_blog_category_list(
    api_client,
    category,
    second_category,
):
    response = api_client.get(
        "/api/blog-categories/"
    )

    assert response.status_code == 200
    assert len(response.data) == 2


@pytest.mark.django_db
def test_blog_category_list_sorted(
    api_client,
):
    BlogCategory.objects.create(
        name="Technology"
    )

    BlogCategory.objects.create(
        name="Business"
    )

    BlogCategory.objects.create(
        name="Artificial Intelligence"
    )

    response = api_client.get(
        "/api/blog-categories/"
    )

    assert response.status_code == 200

    names = [
        category["name"]
        for category in response.data
    ]

    assert names == [
        "Artificial Intelligence",
        "Business",
        "Technology",
    ]


# ============================================================
# BLOG BY CATEGORY TESTS
# ============================================================

@pytest.mark.django_db
def test_blog_by_category(
    api_client,
    blog,
    category,
):
    response = api_client.get(
        f"/api/blogs/category/{category.name}/"
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    assert response.data[0]["title"] == (
        "Introduction to Django"
    )


@pytest.mark.django_db
def test_blog_by_category_case_insensitive(
    api_client,
    blog,
    category,
):
    response = api_client.get(
        "/api/blogs/category/technology/"
    )

    assert response.status_code == 200
    assert len(response.data) == 1

    assert response.data[0]["title"] == (
        "Introduction to Django"
    )


@pytest.mark.django_db
def test_blog_by_category_empty(
    api_client,
):
    response = api_client.get(
        "/api/blogs/category/NonExisting/"
    )

    assert response.status_code == 200
    assert len(response.data) == 0


# ============================================================
# BLOG ORDERING TEST
# ============================================================

@pytest.mark.django_db
def test_blog_list_ordered_by_latest_id(
    api_client,
    category,
):
    first_blog = Blog.objects.create(
        title="First Blog",
        description="First description",
        content="First content",
        category=category,
        author="Muhammad Huzaifa",
        date="2026-09-01",
        tags="first",
        views=10,
        readTime=3,  # Integer
    )

    second_blog = Blog.objects.create(
        title="Second Blog",
        description="Second description",
        content="Second content",
        category=category,
        author="Muhammad Huzaifa",
        date="2026-09-02",
        tags="second",
        views=20,
        readTime=4,  # Integer
    )

    response = api_client.get(
        "/api/blogs/"
    )

    assert response.status_code == 200

    assert response.data[0]["id"] == second_blog.id
    assert response.data[1]["id"] == first_blog.id