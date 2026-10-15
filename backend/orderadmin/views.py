from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt

from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from Orders.models import Order

from authadmin.authentication import AdminJWTAuthentication

from .permissions import IsAdminRole
from .serializers import AdminOrderSerializer


# ==========================================================
# ADMIN ORDERS
# ==========================================================

class AdminOrdersView(APIView):

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]

    def get(self, request):

        orders = (
            Order.objects
            .select_related("user")
            .prefetch_related("items")
            .all()
        )

        serializer = AdminOrderSerializer(
            orders,
            many=True
        )

        return Response(
            serializer.data
        )


# ==========================================================
# ADMIN ORDER DETAIL + PATCH
# ==========================================================

@method_decorator(
    csrf_exempt,
    name="dispatch"
)
class AdminOrderDetailView(APIView):

    authentication_classes = [
        AdminJWTAuthentication,
    ]

    permission_classes = [
        IsAuthenticated,
        IsAdminRole,
    ]

    # ======================================================
    # GET SINGLE ORDER
    # ======================================================

    def get(self, request, pk):

        try:

            order = (
                Order.objects
                .select_related("user")
                .prefetch_related("items")
                .get(id=pk)
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = AdminOrderSerializer(
            order
        )

        return Response(
            serializer.data
        )

    # ======================================================
    # PATCH STATUS
    # ======================================================

    def patch(self, request, pk):

        print("================================")
        print("ADMIN ORDER PATCH")
        print("ADMIN:", request.user)
        print("ORDER ID:", pk)
        print("DATA:", request.data)
        print("================================")

        try:

            order = Order.objects.get(
                id=pk
            )

        except Order.DoesNotExist:

            return Response(
                {
                    "detail": "Order not found."
                },
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get(
            "status"
        )

        valid_statuses = [
            choice[0]
            for choice in Order.STATUS_CHOICES
        ]

        if new_status not in valid_statuses:

            return Response(
                {
                    "detail": "Invalid order status.",
                    "valid_statuses": valid_statuses,
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        order.status = new_status

        order.save(
            update_fields=[
                "status",
                "updated_at",
            ]
        )

        serializer = AdminOrderSerializer(
            order
        )

        return Response(
            {
                "message": "Order status updated successfully.",
                "order": serializer.data,
            },
            status=status.HTTP_200_OK
        )