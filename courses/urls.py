from django.urls import path 
from . import views

urlpatterns = [  
    path('api/get-courses-info/', views.course_info),
    path('api/<str:course>/<str:lesson>/<str:slide>/', views.lesson_data),
    path('api/code-update/', views.code_update),
    path('api/code-execution/', views.code_execution),
    path('api/restore-code/', views.restore_code),
    path('api/slide-no-code-completed/', views.set_slide_no_code_completed),
    path('api/new-slide/', views.PostNewSlide.as_view()),
    path('api/correct-answer-s3/', views.CorrectAnswerToS3.as_view()),
    path('api/update-html-body/', views.UpdateHTMLBody.as_view()),
    path('api/get-html-body', views.GetHTMLBody.as_view())
] 
