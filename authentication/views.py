from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import CustomUserSerializer
from .models import CustomUser
from courses.models import Slides
from django.dispatch import receiver
from django_rest_passwordreset.signals import reset_password_token_created
from django.contrib.auth import authenticate, login, logout
from django.core.mail import send_mail
import os

GUEST_USER_EMAIL = 'guestuser@dataexpert.io'
DATAEXPERT_URL = os.environ['DATAEXPERT_URL']


class LoginView(APIView):
    """Logs a user in given their email address and password.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        """Login POST Request Handler.
        """
        email = request.data.get('email', None)
        password = request.data.get('password', None)
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                if email == GUEST_USER_EMAIL:
                    user = CustomUser.objects.get(email=GUEST_USER_EMAIL)
                    Slides.objects.filter(user_id=user).delete()
                login(request, user)
                return Response("User logged in successfully.", status=status.HTTP_200_OK)
            else:
                return Response("Your account is no longer active. Please create a new account.",
                                status=status.HTTP_403_FORBIDDEN)
        else:
            return Response("Incorrect email and password combination. Please try again.",
                            status=status.HTTP_401_UNAUTHORIZED)


class LogoutView(APIView):
    """Log a user out of his active session.
    """

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class CustomUserCreate(APIView):
    """Creates a new user.
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        if not request.data:
            return Response("Please enter a name, email address, and password.", status=status.HTTP_400_BAD_REQUEST)
        data = {
            'email': request.data.pop('email', None),
            'name': request.data.pop('name', None),
            'password': request.data.pop('password', None)
        }
        emails = [email['email'].lower() for email in CustomUser.objects.values('email').distinct()]
        if data['email'].lower() in emails:
            return Response("This email address is already taken.", status=status.HTTP_400_BAD_REQUEST)
        if data['name'] is None or data['name'].strip() == '':
            return Response("Please enter your name.", status=status.HTTP_400_BAD_REQUEST)
        if data['password'] is None or data['password'].strip() == '':
            return Response("Please enter a valid password.", status=status.HTTP_400_BAD_REQUEST)
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
    reset_password_key = reset_password_token.key
    user_email = reset_password_token.user.email
    user_reset_pwd_url = f"{DATAEXPERT_URL}reset-password/{reset_password_key}"
    email_message = f"Please click the following link to reset your password: {user_reset_pwd_url}"
    email_subject = f"Password Reset for {user_email}"
    send_mail(
        subject=email_subject,
        message=email_message,
        from_email="support@dataexpert.io",
        recipient_list=[user_email],
        fail_silently=False
    )

