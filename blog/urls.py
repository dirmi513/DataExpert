from django.urls import path
from . import views

urlpatterns = [
    path('api/create-new-blog-post/', views.NewBlogPost),
    path('api/get-slide-content/', views.GetBlogPostContent),
    path('api/update-slide-content/', views.UpdateBlogPostContent),
]
