from django.urls import path

from .views import (
    AdminCategoryListCreateView,
    AdminCategoryDetailView,
    AdminProductListCreateView,
    AdminProductDetailView,
    CategoryListView,
)


urlpatterns = [

    # ======================================================
    # CATEGORIES
    # ======================================================

    path("categories/",AdminCategoryListCreateView.as_view(),name="admin-category-list-create",),
    path("categorie/", CategoryListView.as_view(), name="categories"),
    path("categories/<int:pk>/",AdminCategoryDetailView.as_view(),name="admin-category-detail",),

    # ======================================================
    # PRODUCTS
    # ======================================================

    path(
        "products/",
        AdminProductListCreateView.as_view(),
        name="admin-product-list-create",
    ),

    path(
        "products/<int:pk>/",
        AdminProductDetailView.as_view(),
        name="admin-product-detail",
    ),

]