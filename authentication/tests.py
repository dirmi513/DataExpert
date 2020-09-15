from django.test import TestCase
from .models import CustomUser


class CustomUserTestCase(TestCase):
    def test_users_created(self):
        CustomUser.objects.create(email="testing@gmail.com", password="test", name="test name")
        CustomUser.objects.create(email="testing2@gmail.com", password="test", name="test name")
        test1 = CustomUser.objects.get(email="testing@gmail.com")
        test2 = CustomUser.objects.get(email="testing2@gmail.com")
        self.assertEqual(type(test1), CustomUser)
        self.assertEqual(type(test2), CustomUser)
