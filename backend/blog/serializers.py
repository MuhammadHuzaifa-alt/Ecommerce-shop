from rest_framework import serializers

from .models import Blog, BlogCategory


# ==========================================================
# BLOG CATEGORY SERIALIZER
# ==========================================================

class BlogCategorySerializer(
    serializers.ModelSerializer
):

    class Meta:

        model = BlogCategory

        fields = [
            "id",
            "name",
        ]


# ==========================================================
# BLOG SERIALIZER
# ==========================================================

class BlogSerializer(
    serializers.ModelSerializer
):

    # ------------------------------------------------------
    # READ CATEGORY
    # ------------------------------------------------------

    category = BlogCategorySerializer(
        read_only=True
    )

    # ------------------------------------------------------
    # WRITE CATEGORY USING ID
    # ------------------------------------------------------

    category_id = serializers.PrimaryKeyRelatedField(
        queryset=BlogCategory.objects.all(),
        source="category",
        write_only=True
    )

    class Meta:

        model = Blog

        fields = [
            "id",
            "title",
            "description",
            "content",
            "image",
            "category",
            "category_id",
            "author",
            "date",
            "tags",
            "views",
            "readTime",
        ]