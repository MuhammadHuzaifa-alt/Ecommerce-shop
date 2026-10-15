from decimal import Decimal

from django.db import transaction

from rest_framework import status
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from .models import Order, OrderItem
from .serializers import (
    OrderSerializer,
    CreateOrderSerializer,
)

@method_decorator(csrf_exempt, name="dispatch")
class CreateOrderView(APIView):

    authentication_classes = [
        JWTAuthentication
    ]

    permission_classes = [
        IsAuthenticated
    ]

    @transaction.atomic
    def post(self, request):

        serializer = CreateOrderSerializer(
            data=request.data
        )

        serializer.is_valid(
            raise_exception=True
        )

        data = serializer.validated_data

        subtotal = data["subtotal"]
        shipping = data["shipping"]
        delivery_fee = data["deliveryFee"]
        tax = data["tax"]
        discount = data["discount"]

        total = (
            subtotal
            + shipping
            + delivery_fee
            + tax
            - discount
        )

        if total < Decimal("0"):
            return Response(
                {
                    "detail": "Invalid order total."
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        order = Order.objects.create(
            user=request.user,

            full_name=data["fullName"],
            phone=data["phone"],
            email=data["email"],

            country=data["country"],
            state=data["state"],
            city=data["city"],
            postal_code=data["postalCode"],
            address=data["address"],

            apartment=data.get("apartment", ""),
            notes=data.get("notes", ""),

            delivery_method=data["deliveryMethod"],
            delivery_days=data.get("deliveryDays", ""),
            delivery_fee=delivery_fee,

            payment_method=data["paymentMethod"],

            subtotal=subtotal,
            shipping=shipping,
            tax=tax,
            discount=discount,
            total=total,
        )

        for item in data["items"]:

            price = Decimal(str(item["price"]))
            quantity = int(item["quantity"])

            item_subtotal = price * quantity

            OrderItem.objects.create(
                order=order,

                product_id=item["id"],

                product_name=item["name"],

                product_image=item.get("image", ""),

                price=price,
                quantity=quantity,
                subtotal=item_subtotal,
            )

        return Response(
            {
                "message": "Order created successfully.",
                "order": OrderSerializer(order).data,
            },
            status=status.HTTP_201_CREATED
        )


class MyOrdersView(APIView):

    authentication_classes = [
        JWTAuthentication
    ]

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request):

        orders = (
            Order.objects
            .filter(user=request.user)
            .prefetch_related("items")
        )

        serializer = OrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data
        )


class MyOrderDetailView(APIView):

    authentication_classes = [
        JWTAuthentication
    ]

    permission_classes = [
        IsAuthenticated
    ]

    def get(self, request, pk):

        try:

            order = (
                Order.objects
                .prefetch_related("items")
                .get(
                    id=pk,
                    user=request.user
                )
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = OrderSerializer(
            order
        )

        return Response(
            serializer.data
        )