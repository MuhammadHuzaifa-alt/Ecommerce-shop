from rest_framework import generics
from rest_framework.parsers import (
    MultiPartParser,
    FormParser
)

from .models import Blog, BlogCategory
from .serializers import (
    BlogSerializer,
    BlogCategorySerializer
)


# ==========================================================
# ADMIN BLOG CATEGORY LIST + CREATE
# ==========================================================

class AdminBlogCategoryListCreateView(
    generics.ListCreateAPIView
):

    queryset = BlogCategory.objects.all().order_by("name")

    serializer_class = BlogCategorySerializer


# ==========================================================
# ADMIN BLOG CATEGORY DETAIL
# ==========================================================

class AdminBlogCategoryDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = BlogCategory.objects.all()

    serializer_class = BlogCategorySerializer


# ==========================================================
# ADMIN BLOG LIST + CREATE
# ==========================================================

class AdminBlogListCreateView(
    generics.ListCreateAPIView
):

    queryset = Blog.objects.all().order_by("-id")

    serializer_class = BlogSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]


# ==========================================================
# ADMIN BLOG DETAIL + UPDATE + DELETE
# ==========================================================

class AdminBlogDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Blog.objects.all()

    serializer_class = BlogSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]


# ==========================================================
# CUSTOMER BLOG LIST
# ==========================================================

class BlogListView(
    generics.ListAPIView
):

    queryset = Blog.objects.all().order_by("-id")

    serializer_class = BlogSerializer


# ==========================================================
# CUSTOMER SINGLE BLOG
# ==========================================================

class BlogDetailView(
    generics.RetrieveAPIView
):

    queryset = Blog.objects.all()

    serializer_class = BlogSerializer


# ==========================================================
# CUSTOMER BLOG CATEGORIES
# ==========================================================

class BlogCategoryListView(
    generics.ListAPIView
):

    queryset = BlogCategory.objects.all().order_by("name")

    serializer_class = BlogCategorySerializer


# ==========================================================
# CUSTOMER BLOGS BY CATEGORY
# ==========================================================

class BlogByCategoryView(
    generics.ListAPIView
):

    serializer_class = BlogSerializer

    def get_queryset(self):

        category = self.kwargs["category"]

        return Blog.objects.filter(
            category__name__iexact=category
        ).order_by("-id")