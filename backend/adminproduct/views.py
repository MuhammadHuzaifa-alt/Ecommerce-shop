from rest_framework import generics
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated,AllowAny

from .models import Product, Category
from .serializers import ProductSerializer, CategorySerializer

from authadmin.authentication import AdminJWTAuthentication
from orderadmin.permissions import IsAdminRole


# ==========================================================
# ADMIN CATEGORY LIST + CREATE
# ==========================================================

class AdminCategoryListCreateView(
    generics.ListCreateAPIView
):

    queryset = Category.objects.all().order_by("name")

    serializer_class = CategorySerializer

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]


# ==========================================================
# ADMIN CATEGORY DETAIL + UPDATE + DELETE
# ==========================================================

class AdminCategoryDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Category.objects.all()

    serializer_class = CategorySerializer

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]

class CategoryListView(generics.ListAPIView):
    queryset = Category.objects.all().order_by("name")
    serializer_class = CategorySerializer
    permission_classes = [AllowAny]
    

# ==========================================================
# ADMIN PRODUCT LIST + CREATE
# ==========================================================

class AdminProductListCreateView(
    generics.ListCreateAPIView
):

    queryset = Product.objects.all().order_by("-id")

    serializer_class = ProductSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]


# ==========================================================
# ADMIN PRODUCT DETAIL + UPDATE + DELETE
# ==========================================================

class AdminProductDetailView(
    generics.RetrieveUpdateDestroyAPIView
):

    queryset = Product.objects.all()

    serializer_class = ProductSerializer

    parser_classes = [
        MultiPartParser,
        FormParser,
    ]

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]


# ==========================================================
# CLIENT PRODUCT LIST
# ==========================================================
# GET only
#
# Used by:
# React client Products page
#
# URL:
# /api/products/
# ==========================================================

class ClientProductListView(
    generics.ListAPIView
):

    queryset = Product.objects.all().order_by("-id")

    serializer_class = ProductSerializer