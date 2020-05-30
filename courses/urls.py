from django.urls import path 
from . import views

urlpatterns = [  
    path('api/get-courses-info/', views.course_info, name='get-courses-info'),
    path('api/<str:course>/<str:lesson>/<str:slide>/', views.lesson_data, name='lesson-data'), 
    path('api/code-update/', views.code_update, name='code-update'),
    path('api/code-execution/', views.code_execution, name='code-execution'),
    path('api/restore-code/', views.restore_code, name='restore-code'),
    path('api/slide-no-code-completed/', views.set_slide_no_code_completed, name='slide-no-code-completed'),
    path('api/new-slide/', views.PostNewSlide.as_view(), name='new-slide'),
    path('api/correct-answer-s3/', views.CorrectCodeToS3.as_view(), name='answer-to-s3'),
    path('api/update-html-body/', views.UpdateHTMLBody.as_view(), name='update-html-body'),
    path('api/get-html-body/', views.get_html_body, name='get-html-body')
] 
