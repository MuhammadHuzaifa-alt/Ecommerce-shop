from rest_framework import serializers

from adminproduct.models import Product


class CustomerProductSerializer(serializers.ModelSerializer):

    category = serializers.SerializerMethodField()

    class Meta:
        model = Product

        fields = [
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

    def get_category(self, obj):
        return {
            "id": obj.category.id,
            "name": obj.category.name,
        }