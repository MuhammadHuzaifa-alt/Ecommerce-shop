from django.db import models
from django.contrib.auth.models import AbstractUser


class Register(AbstractUser):
    fullname = models.CharField(max_length=100)
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=20, unique=True)
    password = models.CharField(max_length=128)