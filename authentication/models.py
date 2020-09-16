from django.contrib.auth.models import AbstractUser
from django.db import models 
from .managers import CustomUserManager


class CustomUser(AbstractUser): 
	username = None
	email = models.EmailField(unique=True)
	name = models.CharField(max_length=150, default=None, blank=False, null=False) 
	location = models.TextField(default=None, blank=True, null=True)

	USERNAME_FIELD = 'email'
	REQUIRED_FIELDS = ['name']

	objects = CustomUserManager()  

	def __str__(self):
		return self.email
