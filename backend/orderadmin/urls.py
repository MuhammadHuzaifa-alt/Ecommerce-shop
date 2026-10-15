from django.urls import path

from .views import (
    AdminOrdersView,
    AdminOrderDetailView,
)


urlpatterns = [

    # GET ALL ORDERS
    path(
        "",
        AdminOrdersView.as_view(),
        name="admin-orders",
    ),

    # GET SINGLE ORDER
    # PATCH ORDER STATUS
    path(
        "<int:pk>/",
        AdminOrderDetailView.as_view(),
        name="admin-order-detail",
    ),
]