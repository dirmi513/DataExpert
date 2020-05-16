from datetime import timedelta
from rest_framework import status, permissions, parsers, renderers
from rest_framework.response import Response 
from rest_framework.views import APIView 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser
from .serializers import CustomUserSerializer 
import pandas as pd 
from django.db import connection 
from django.dispatch import receiver
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string    
from django.utils import timezone
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django_rest_passwordreset.models import ResetPasswordToken
from django_rest_passwordreset.views import get_password_reset_token_expiry_time
from django.contrib.auth import authenticate, login, logout 
			

class LoginView(APIView):
	"""Logs a user in.
	""" 
	permission_classes = (permissions.AllowAny,) 

	def post(self, request, *args, **kwargs):
		email = request.data.get('email', None)
		password = request.data.get('password', None)
		user = authenticate(email=email, password=password)
		if user is not None:
			if user.is_active:
				login(request, user)
				return Response('User logged in successfully.', status=status.HTTP_200_OK)
			else:
				return Response('Your account is no longer active. Please create a new account.', \
								status=status.HTTP_403_FORBIDDEN)
		else:
			return Response('Incorrect email and/or password. Please try again.', \
							status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """Log the user out.
    """
    def post(self, request, *args, **kwargs):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class CustomUserCreate(APIView):
	"""API View to create a new user.
	"""
	permission_classes = (permissions.AllowAny,) 

	def post(self, request, format='json'):  
		if not request.data:
			return Response('Please enter a name, email address, and password.', status=status.HTTP_400_BAD_REQUEST) 
		data = {
			'email': request.data.pop('email', None),
			'name': request.data.pop('name', None),
			'password': request.data.pop('password', None)
		} 
		with connection.cursor() as cur:
			cur.execute('SELECT DISTINCT email from authentication_customuser')
			emails = [email[0].lower() for email in cur.fetchall()] 
		if data['email'].lower() in emails:
			return Response('This email is already taken. Please use a different email.', 
			status=status.HTTP_400_BAD_REQUEST)  
		if data['name'] is None or data['name'].strip() == '': 
			return Response('Please enter your name.', status=status.HTTP_400_BAD_REQUEST)
		if data['password'] is None or data['password'].strip() == '':
			return Response('Please enter a password.', status=status.HTTP_400_BAD_REQUEST) 
		serializer = CustomUserSerializer(data=data) 
		if serializer.is_valid():
			user = serializer.save()
			if user:
				json = serializer.data 
				return Response(json, status=status.HTTP_201_CREATED)   
		return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

 
@receiver(reset_password_token_created)
def password_reset_token_created(sender, reset_password_token, *args, **kwargs):
	"""When a token is created, an e-mail needs to be sent to the user.

		Args:
			sender: View Class that sent the signal 
			reset_password_token: Token Model Object 
	"""
	# send an e-mail to the user 
	reset_password_key = reset_password_token.key
	context = {
		'name': reset_password_token.user.name, 
		'email': reset_password_token.user.email,
		'reset_password_url': f"http://localhost:8000/reset-password/{reset_password_key}"
	}  

	# render email text
	email_html_message = render_to_string('email/user_reset_password.html', context)
	email_plaintext_message = render_to_string('email/user_reset_password.txt', context)

	msg = EmailMultiAlternatives(
		# title:
		"Password Reset for DataExpert",
		# message:
		email_plaintext_message,
		# from:
		"noreply@dataexpert.com",
		# to:
		[reset_password_token.user.email]
	)
	msg.attach_alternative(email_html_message, "text/html")
	msg.send()
