from django.test import TestCase
from django.urls import reverse

from .models import Register


class RegisterModelTest(TestCase):

    def test_register_model_exists(self):
        self.assertIsNotNone(Register)