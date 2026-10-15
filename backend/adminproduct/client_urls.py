from django.urls import path

from .views import ClientProductListView


urlpatterns = [
    path("",ClientProductListView.as_view(),name="client-products",),
]