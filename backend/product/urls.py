from django.urls import path
from .views import ClientProductListView

urlpatterns = [
    # your existing admin URLs

    path(
        "products/",
        ClientProductListView.as_view(),
        name="client-products"
    ),
]