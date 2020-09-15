from django.urls import path 
from . import views

urlpatterns = [  
    path("data", views.course_info),
    path("<str:course>/<str:lesson>/<str:slide>", views.get_lesson_data),
    path("slide", views.PostNewSlide.as_view()),
    path("slide/code", views.code_update),
    path("slide/completed", views.set_slide_no_code_completed),
    path("slide/htmlBody", views.HTMLBody.as_view()),
    path("slide/htmlBody", views.HTMLBody.as_view()),
    path("code/execute", views.code_execution),
    path("code/restore", views.restore_code),
    path("slide/answer/s3", views.CorrectAnswerToS3.as_view())
] 
