from django.urls import re_path, path
from . import views


# https://stackoverflow.com/a/59604748
urlpatterns = [
	path('', views.index),
	re_path(r'^.*/$', views.index)
]
