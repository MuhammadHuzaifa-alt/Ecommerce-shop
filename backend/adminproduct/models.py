from django.db import models


class Category(models.Model):

    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name


class Product(models.Model):

    name = models.CharField(max_length=255)

    category = models.ForeignKey(Category,on_delete=models.CASCADE,related_name="products")

    brand = models.CharField(max_length=100)

    image = models.ImageField(upload_to="products/",null=True,blank=True)

    price = models.DecimalField(max_digits=10,decimal_places=2)

    oldPrice = models.DecimalField(max_digits=10,decimal_places=2,default=0)

    rating = models.FloatField(default=0)

    reviews = models.IntegerField(default=0)

    stock = models.IntegerField(default=0)

    discount = models.FloatField(default=0)

    def __str__(self):
        return self.name