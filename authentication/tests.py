from django.test import TestCase
from .models import CustomUser

TEST_EMAIL = 'test@gmail.com'
TEST_EMAIL2 = 'test1@gmail.com'


class CustomUserTestCase(TestCase):

    def set_up(self):
        CustomUser.objects.create(email=TEST_EMAIL, password='test', name='test name')
        CustomUser.objects.create(email=TEST_EMAIL2, password='test', name='test name')

    def test_users_created(self):
        self.set_up()
        test1 = CustomUser.objects.get(email=TEST_EMAIL)
        test2 = CustomUser.objects.get(email=TEST_EMAIL2)
        self.assertEqual(str(test1), TEST_EMAIL)
        self.assertEqual(str(test2), TEST_EMAIL2)
