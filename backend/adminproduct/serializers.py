from rest_framework import serializers

from .models import Product, Category


# ==========================================================
# CATEGORY SERIALIZER
# ==========================================================

class CategorySerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = Category

        fields = [
            "id",
            "name",
        ]


# ==========================================================
# PRODUCT SERIALIZER
# ==========================================================

class ProductSerializer(
    serializers.ModelSerializer
):

    # READ category as an object
    category = CategorySerializer(
        read_only=True
    )

    # WRITE category using its ID
    category_id = serializers.PrimaryKeyRelatedField(
        queryset=Category.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:

        model = Product

        fields = [
            "id",
            "name",
            "category",
            "category_id",
            "brand",
            "image",
            "price",
            "oldPrice",
            "rating",
            "reviews",
            "stock",
            "discount",
        ]