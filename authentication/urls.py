from django.urls import path, include   
from .views import CustomUserCreate, LoginView, LogoutView


urlpatterns = [ 
	path("users", CustomUserCreate.as_view()),
	path("login", LoginView.as_view()),
	path("logout", LogoutView.as_view()),
	path("reset-password", include("django_rest_passwordreset.urls", namespace="password_reset"))
]
