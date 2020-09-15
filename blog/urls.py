from django.urls import path
from . import views

urlpatterns = [
    path("posts", views.NewBlogPost.as_view()),
    path("posts/content", views.UpdateBlogPostContent.as_view()),
    path("posts/content", views.GetBlogPostContent.as_view()),
]
