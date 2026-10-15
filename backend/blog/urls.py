from django.urls import path

from .views import (AdminBlogCategoryListCreateView,AdminBlogCategoryDetailView,AdminBlogListCreateView,
AdminBlogDetailView,BlogListView,BlogDetailView,BlogCategoryListView,BlogByCategoryView,)


urlpatterns = [

    # ======================================================
    # ADMIN BLOG CATEGORIES
    # ======================================================

    path("admin/blog-categories/",AdminBlogCategoryListCreateView.as_view(),name="admin-blog-category-list-create",),
    path("admin/blog-categories/<int:pk>/",AdminBlogCategoryDetailView.as_view(),name="admin-blog-category-detail",),


    # ======================================================
    # ADMIN BLOGS
    # ======================================================

    path("admin/blogs/",AdminBlogListCreateView.as_view(),name="admin-blog-list-create",),
    path("admin/blogs/<int:pk>/",AdminBlogDetailView.as_view(),name="admin-blog-detail",),

    # ======================================================
    # CUSTOMER BLOGS
    # ======================================================

    path("blogs/",BlogListView.as_view(),name="blog-list",),
    path("blogs/<int:pk>/",BlogDetailView.as_view(),name="blog-detail",),
    path("blog-categories/",BlogCategoryListView.as_view(),name="blog-category-list",),
    path("blogs/category/<str:category>/",BlogByCategoryView.as_view(),name="blog-by-category",),
]