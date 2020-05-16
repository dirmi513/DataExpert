from django.urls import path, include   
from .views import CustomUserCreate, LoginView, LogoutView

urlpatterns = [ 
	path('user/create/', CustomUserCreate.as_view(), name='create_user'),   
    path('reset-password/', include('django_rest_passwordreset.urls', namespace='password_reset')),
	path('login/', LoginView.as_view(), name='login'),
	path('logout/', LogoutView.as_view(), name='logout')
]
