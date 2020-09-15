from django.contrib.auth.base_user import BaseUserManager


class CustomUserManager(BaseUserManager):
	"""Custom user model manager that sets email as the unique identifier
		for authentication instead of Django's default, which is username.
	"""
	def create_user(self, name, email, password, **extra_fields):
		"""Create and save a User with the given name, email and password.
		"""
		if not email:
			raise ValueError('Email must be specified.')
		email = self.normalize_email(email)
		user = self.model(email=email, name=name, **extra_fields)
		user.set_password(password)
		user.save()
		return user 

	def create_superuser(self, name, email, password, **extra_fields):
		"""Create and save a SuperUser with the given name, email and password.
		"""
		extra_fields.setdefault('is_staff', True)
		extra_fields.setdefault('is_superuser', True)
		extra_fields.setdefault('is_active', True)
		if extra_fields.get('is_staff') is not True:
			raise ValueError('Superuser must have is_staff=True.')
		if extra_fields.get('is_superuser') is not True:
			raise ValueError('Superuser must have is_superuser=True.')
		return self.create_user(name, email, password, **extra_fields)
