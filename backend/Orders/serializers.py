from rest_framework import serializers

from .models import Order, OrderItem


class CreateOrderItemSerializer(serializers.Serializer):

    id = serializers.IntegerField()

    name = serializers.CharField(
        max_length=255
    )

    image = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    price = serializers.DecimalField(
        max_digits=10,
        decimal_places=2
    )

    quantity = serializers.IntegerField(
        min_value=1
    )


class CreateOrderSerializer(serializers.Serializer):

    fullName = serializers.CharField(
        max_length=255
    )

    phone = serializers.CharField(
        max_length=30
    )

    email = serializers.EmailField()

    country = serializers.CharField(
        max_length=100
    )

    state = serializers.CharField(
        max_length=100
    )

    city = serializers.CharField(
        max_length=100
    )

    postalCode = serializers.CharField(
        max_length=20
    )

    address = serializers.CharField()

    apartment = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    notes = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    deliveryMethod = serializers.CharField(
        max_length=100
    )

    deliveryDays = serializers.CharField(
        required=False,
        allow_blank=True,
        default=""
    )

    deliveryFee = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )

    paymentMethod = serializers.CharField(
        max_length=100
    )

    subtotal = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )

    shipping = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )

    tax = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )

    discount = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        min_value=0
    )

    items = CreateOrderItemSerializer(
        many=True
    )


class OrderItemSerializer(serializers.ModelSerializer):

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


class OrderSerializer(serializers.ModelSerializer):

    items = OrderItemSerializer(
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

        read_only_fields = [
            "id",
            "user",
            "payment_status",
            "status",
            "created_at",
            "updated_at",
            "items",
        ]