from django.urls import path

from .views import (
    CreateOrderView,
    MyOrdersView,
    MyOrderDetailView,
)


urlpatterns = [

    path(
        "create/",
        CreateOrderView.as_view(),
        name="create-order",
    ),

    path(
        "my-orders/",
        MyOrdersView.as_view(),
        name="my-orders",
    ),

    path(
        "my-orders/<int:pk>/",
        MyOrderDetailView.as_view(),
        name="my-order-detail",
    ),

]