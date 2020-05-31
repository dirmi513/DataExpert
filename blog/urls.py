from django.urls import path
from . import views

urlpatterns = [
    path('api/new-blog-post/', views.NewBlogPost.as_view()),
    path('api/update-slide-content/', views.UpdateBlogPostContent.as_view()),
    path('api/get-slide-content', views.GetBlogPostContent.as_view()),
]
