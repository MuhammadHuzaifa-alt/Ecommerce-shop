from rest_framework import serializers

from Orders.models import Order, OrderItem


class AdminOrderItemSerializer(
    serializers.ModelSerializer
):

    class Meta:
        model = OrderItem

        fields = [
            "id",
            "product_id",
            "product_name",
            "product_image",
            "price",
            "quantity",
            "subtotal",
        ]


class AdminOrderSerializer(
    serializers.ModelSerializer
):

    items = AdminOrderItemSerializer(
        many=True,
        read_only=True
    )

    class Meta:
        model = Order

        fields = [
            "id",
            "user",

            "full_name",
            "phone",
            "email",

            "country",
            "state",
            "city",
            "postal_code",
            "address",
            "apartment",
            "notes",

            "delivery_method",
            "delivery_days",
            "delivery_fee",

            "payment_method",
            "payment_status",

            "subtotal",
            "shipping",
            "tax",
            "discount",
            "total",

            "status",

            "created_at",
            "updated_at",

            "items",
        ]