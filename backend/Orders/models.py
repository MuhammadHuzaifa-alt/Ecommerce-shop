from django.conf import settings
from django.db import models


class Order(models.Model):

    STATUS_CHOICES = [("pending", "Pending"),("confirmed", "Confirmed"),("processing", "Processing"),
    ("shipped", "Shipped"),("delivered", "Delivered"),("cancelled", "Cancelled"),
    ]
    PAYMENT_STATUS_CHOICES = [("pending", "Pending"),("paid", "Paid"),("failed", "Failed"),("refunded", "Refunded"),
    ]

    # ======================================================
    # CUSTOMER
    # ======================================================

    user = models.ForeignKey(settings.AUTH_USER_MODEL,on_delete=models.SET_NULL,null=True,blank=True,related_name="orders",)
    full_name = models.CharField(max_length=255)
    phone = models.CharField(max_length=30)
    email = models.EmailField()

    # ======================================================
    # SHIPPING ADDRESS
    # ======================================================

    country = models.CharField(max_length=100)
    state = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    postal_code = models.CharField(max_length=20)
    address = models.TextField()
    apartment = models.CharField(max_length=255,blank=True,default="")
    notes = models.TextField(blank=True,default="")

    # ======================================================
    # DELIVERY
    # ======================================================

    delivery_method = models.CharField(max_length=100)
    delivery_days = models.CharField(max_length=100,blank=True,default="")
    delivery_fee = models.DecimalField(max_digits=10,decimal_places=2,default=0)

    # ======================================================
    # PAYMENT
    # ======================================================

    payment_method = models.CharField(max_length=100)

    payment_status = models.CharField(max_length=20,choices=PAYMENT_STATUS_CHOICES,default="pending")

    # ======================================================
    # PRICES
    # ======================================================

    subtotal = models.DecimalField(max_digits=10,decimal_places=2)
    shipping = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    tax = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    discount = models.DecimalField(max_digits=10,decimal_places=2,default=0)
    total = models.DecimalField(max_digits=10,decimal_places=2)

    # ======================================================
    # ORDER STATUS
    # ======================================================

    status = models.CharField(max_length=20,choices=STATUS_CHOICES,default="pending")

    # ======================================================
    # DATES
    # ======================================================

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return f"Order #{self.id} - {self.full_name}"


class OrderItem(models.Model):

    order = models.ForeignKey(Order,on_delete=models.CASCADE,related_name="items")

    # Store product ID instead of relying entirely
    # on the product still existing later.
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=255)

    product_image = models.URLField(max_length=1000,blank=True,default="")

    price = models.DecimalField(max_digits=10,decimal_places=2)

    quantity = models.PositiveIntegerField()

    subtotal = models.DecimalField(max_digits=10,decimal_places=2)
    def __str__(self):
        return f"{self.product_name} x {self.quantity}"