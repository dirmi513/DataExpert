from django.urls import path
from . import views

urlpatterns = [
    path('api/new-blog-post/', views.NewBlogPost.as_view()),
    path('api/update-blog-content/', views.UpdateBlogPostContent.as_view()),
    path('api/get-blog-content', views.GetBlogPostContent.as_view()),
]
