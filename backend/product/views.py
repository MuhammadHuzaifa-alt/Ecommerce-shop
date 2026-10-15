from rest_framework import generics
from adminproduct.models import Product
from .seralizers import CustomerProductSerializer


class ClientProductListView(generics.ListAPIView):
    queryset = Product.objects.all().order_by("-id")
    serializer_class = CustomerProductSerializer