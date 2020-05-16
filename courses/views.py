import os 
import re 
import json
from django.shortcuts import render
from datetime import date 
from .models import Slides, CourseLessonSlideMaster as CLSM
from django.db.models import Max, Q 
from django.template.loader import render_to_string
from django.http import HttpResponse
from . import aws_lambda
from django.contrib.auth.decorators import login_required 
from django.utils.safestring import mark_safe 
from django.db.models import Max, Min 
from django.urls import reverse 
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAdminUser, IsAuthenticated
from rest_framework.response import Response 
from .utils.slide_utils import *
from rest_framework.generics import GenericAPIView
from rest_framework import serializers , status 
from .serializers import CourseLessonSlideMasterSerializer, CorrectAnswerToS3Serializer, UpdateHTMLBodySerializer
from rest_framework.response import Response  


class PostNewSlide(GenericAPIView):
    """
    """
    permission_classes = (IsAdminUser, )
    serializer_class = CourseLessonSlideMasterSerializer

    def post(self, request, *args, **kwargs):
        try:
            serializer = self.serializer_class(data = request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response('The slide was created successfully.', status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(f'There was an errorL {e}', status=status.HTTP_400_BAD_REQUEST)


class CorrectCodeToS3(GenericAPIView):
    """
    """
    permission_classes = (IsAdminUser, )
    serializer_class = CorrectAnswerToS3Serializer

    def post(self, request, *args, **kwargs): 
        data = request.data.dict()
        _cls = int(data['cls'])
        clsm_inst = CLSM.objects.get(cls=_cls)
        serializer = self.serializer_class(clsm_inst, data = request.data)
        serializer.is_valid(raise_exception=True) 
        serializer.save()
        lambda_response = aws_lambda.execute(data['correctAnswer'], 'F', _cls, 'T') 
        lambda_response_dic = json.loads(lambda_response) 
        upload_status = lambda_response_dic['Status']
        if upload_status == 'Success':
            return Response('Success', status=status.HTTP_200_OK)
        else:
            return Response(f'There was an error: {upload_status}', status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class UpdateHTMLBody(GenericAPIView):
    """
    """
    permission_classes = (IsAdminUser, )
    serializer_class = UpdateHTMLBodySerializer

    def post(self, request, *args, **kwargs): 
        try:
            data = request.data.dict()
            _cls = int(data['cls'])
            clsm_inst = CLSM.objects.get(cls=_cls)
            serializer = self.serializer_class(clsm_inst, data = request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response('Success', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f'There was an error: {e}', status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes((IsAdminUser, ))
def get_html_body(request): 
    """
    """
    try:  
        _cls = request.data['cls'] 
        html = CLSM.objects.filter(cls=_cls).values('htmlBody')[0]['htmlBody']
        return Response(html, status=status.HTTP_200_OK)
    except Exception as e:
        return Response(f'There was an error: {e}', status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def course_info(request):
    """Returns data for each course and its corresponding lessons.  
    
    For each lesson, the link is to the minimum slide within that lesson that 
    the user has not completed yet.  If all slides within the lesson have been 
    completed by the user, a green checkmark will be displayed next to the lesson name.

    Returns: A list of dictionaries, one for each course.
    """
    user = request.user.id
    data = []
    distinct_courses = CLSM.objects.values('course', 'courseNumber').distinct()
    courses = [[dic['course'], dic['courseNumber']] for dic in distinct_courses] 
    courses.sort(key = lambda x: x[1])
    courses = [course[0] for course in courses]
    for index, course in enumerate(courses):
        course_dic = {
            'course': course, 
            'key': index+1
        } 
        lesson_list = []
        lessons = [[dic['lesson'], dic['lessonNumber']] for dic in CLSM.objects.filter(course=course).values('lesson', 'lessonNumber').distinct()] 
        lessons.sort(key = lambda x: x[1])
        lessons = [lesson[0] for lesson in lessons]
        for index, lesson in enumerate(lessons):
            slides_complete = 'F' 
            CLSM_inst = CLSM.objects.get(course=course, lesson=lesson, slideNumber=1)
            lesson_num, course_num = CLSM_inst.get_lesson_num(), CLSM_inst.get_course_num() 
            min_slide = Slides.objects.filter( \
                            user_id=user, \
                            courseNumber=course_num, \
                            lessonNumber=lesson_num, \
                            completed='F') \
                            .aggregate(Min('slideNumber'))['slideNumber__min']
            if not min_slide: 
                num_slides = CLSM.objects.filter(course=course, lesson=lesson).aggregate(Max('slideNumber'))['slideNumber__max'] 
                num_completed = len(Slides.objects.filter( \
                                                        user_id=user, \
                                                        courseNumber=course_num, \
                                                        lessonNumber=lesson_num, \
                                                        completed='T'))
                if num_slides == num_completed:
                    min_slide = num_slides
                    slides_complete = 'T'
                else:
                    min_slide = num_completed + 1
            slide = CLSM.objects.get(course=course, lesson=lesson, slideNumber=min_slide).get_slide()
            url = os.path.join(course, lesson, slide)  
            lesson_list.append({
                'lesson': lesson, 
                'url': url, 
                'completed': slides_complete, 
                'key': index+1
            })
        course_dic['lessons'] = lesson_list
        data.append(course_dic)
    return Response({"courses": data})  


@api_view(['GET']) 
@permission_classes((IsAuthenticated, ))
def lesson_data(request, course, lesson, slide):
    """GETs all of the data for a single lesson.

    Args:
        course: Name of course.
        lesson: Name of lesson.
        slide: Name of slide.

    Returns: A list of dictionaries, one for each slide within the
        lesson.  Each dictionary contains the same keys, but different
        values depending on the slide that the client is viewing.
    """
    user_id = request.user.id
    slides = [slide[0] for slide in CLSM.objects.filter(course=course, lesson=lesson).values_list('slide')]  
    slide_dropdown, num_slides, slide_instances = slide_top_nav_dropdown(user_id, course, lesson)
    lesson_data = []
    for s in slides:
        clsm_instance = CLSM.objects.get(course=course, lesson=lesson, slide=s)
        course_num = clsm_instance.get_course_num()
        lesson_num = clsm_instance.get_lesson_num()
        slide_num = clsm_instance.get_slide_num()
        _cls = clsm_instance.get_cls() 
        default_code = clsm_instance.get_code()
        html_body = clsm_instance.get_html()
        coded = clsm_instance.get_coded_slide()
        correct_ans = clsm_instance.get_correct_answer() 

        # If there is no current record in the slides table for this cls + user combo, create one
        create_slides_record_for_user(_cls, user_id, default_code)

        # What code to display in the text editor
        code = Slides.objects.get(cls=_cls, user_id=user_id).get_code() 
        
        # Bottom nav
        bottom_nav = slide_bottom_nav(slide_num, num_slides, slide_instances, str(_cls))

        data = {
            'correct_answer': correct_ans,
            'slide': s, 
            'code': code,
            'coded': coded,
            'slides' : slide_dropdown,
            'course': course,
            'lesson' : lesson,
            'bottomNav': bottom_nav,
            'html': html_body 
        } 
        
        lesson_data.append(data)

    return Response({lesson: lesson_data})


def get_clsm_slide_inst(course, lesson, slide, user):
    """
    """
    clsm_instance = CLSM.objects.get(course=course, lesson=lesson, slide=slide)
    slide_instance = Slides.objects.get(cls=clsm_instance.get_cls(), user_id=user)
    return clsm_instance, slide_instance


@api_view(['POST']) 
@permission_classes((IsAuthenticated, ))
def code_update(request):
    """
    """    
    try:
        user, data = request.user.id, request.data 
        course, lesson, slide, code = data['course'], data['lesson'], data['slide'], data['code']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.get_id()
        Slides.objects.filter(id=pk).update(code=code)  
        return Response('User\'s code updated successfully')  
    except Exception as e: 
        return Response(f'There was an error updating the user\'s code {e}') 


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def set_slide_no_code_completed(request):
    """
    """
    try: 
        user, data = request.user.id, request.data 
        course, lesson, slide = data['course'], data['lesson'], data['slide']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.get_id()
        completed = Slides.objects.get(id=pk).get_completed() 
        if completed == 'F':
            Slides.objects.filter(id=pk).update(completed='T')  
        return Response('User\'s completed value for this slide updated successfully')  
    except:
        return Response(f'There was an error updating the user\'s completed value for this slide: {e}') 
    

@api_view(['POST']) 
@permission_classes((IsAuthenticated, ))
def code_execution(request):
    """
    """  
    try:   
        user, data = request.user.id , request.data  
        course, lesson, slide, code, grade_code = \
            data['course'], data['lesson'], data['slide'], data['code'], data['submit'] 
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.get_id()   
        Slides.objects.filter(id=pk).update(code=code) 
        _cls = clsm_instance.get_cls()  
        lambda_response = aws_lambda.execute(code, grade_code, _cls, 'F') 
        function_return_dic = json.loads(lambda_response)  
        if 'correct_answer' in function_return_dic:
            if function_return_dic['correct_answer'] == 'T':
                Slides.objects.filter(id=pk).update(completed='T')
        return HttpResponse(lambda_response) 
    except Exception as e: 
        return HttpResponse(f'There was an error executing the user\'s code: {e}')


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def restore_code(request):
    """
    """ 
    try:
        user, data = request.user.id, request.data   
        course, lesson, slide = data['course'], data['lesson'], data['slide']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.get_id() 
        default_code = clsm_instance.get_code()
        Slides.objects.filter(id=pk).update(code=default_code)
        return HttpResponse(f'{{"Default Code": "{default_code}"}}')
    except Exception as e:
        return HttpResponse(f'{{"Response": "There was an error restoring the code {e}"}}')