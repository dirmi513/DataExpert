import json
from django.http import HttpResponse
from . import aws_lambda_invoker
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from .utils.slide_utils import *
from rest_framework.generics import GenericAPIView, ListAPIView
from rest_framework import status
from .serializers import \
    CourseLessonSlideMasterSerializer, CorrectAnswerToS3Serializer, UpdateHTMLBodySerializer
from rest_framework.response import Response
from .models import CourseSummary as CS, CourseLessonSlideMaster as CLSM, Slides

ENVIRONMENT = 'dev'


class PostNewSlide(GenericAPIView):
    """Create a new slide.
    """
    permission_classes = (IsAdminUser, )
    serializer_class = CourseLessonSlideMasterSerializer

    def post(self, request):
        try:
            serializer = self.serializer_class(data=request.data)
            serializer.is_valid(raise_exception=True) 
            serializer.save()
            return Response("The slide was created successfully.", status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response(f"There was an error creating the slide: {str(e)}.", status=status.HTTP_400_BAD_REQUEST)


def save_clsm_data(request, serializer_class, return_data=False):
    """Updates an instance of CLSM in the database.

    Returns:
        The HTTP POST request's data and the cls of the instance if specified.
    """
    data = request.data.dict()
    _cls = int(data['cls'])
    clsm_instance = CLSM.objects.get(cls=_cls)
    serializer = serializer_class(clsm_instance, data=request.data)
    serializer.is_valid(raise_exception=True)
    serializer.save()
    return data, _cls if return_data else None


class HTMLBody(ListAPIView):
    """Either returns or updates a certain slide's htmlBody.

    For the GET request, you must specify the cls as a
    parameter when hitting the REST endpoint:
        e.g. http://www.dataexpert.io/app/courses/slide/htmlBody?cls=111
    """
    permission_classes = (IsAdminUser, )
    serializer_class = UpdateHTMLBodySerializer

    def get_queryset(self):
        _cls = self.request.query_params.get('cls')
        if not _cls:
            return None
        self.queryset = CLSM.objects.filter(cls=_cls)
        return self.queryset

    def get(self, request, *args, **kwargs):
        data = self.get_queryset()
        if not data:
            error_message = "CourseLessonSlide identifier is missing from the request."
            return Response({'error': error_message}, status=status.HTTP_400_BAD_REQUEST)
        html_body = data.values('htmlBody')[0]['htmlBody'].replace('\n', '').replace('\r', '').replace(r"\\\\", '')
        return Response({
            'htmlBody': ' '.join(html_body.split())
        }, status=status.HTTP_200_OK)

    def put(self, request):
        try:
            save_clsm_data(request, self.serializer_class)
            return Response('Success', status=status.HTTP_200_OK)
        except Exception as e:
            return Response(f"There was an error updating the slide's htmlBody: {str(e)}",
                            status=status.HTTP_400_BAD_REQUEST)


class CorrectAnswerToS3(GenericAPIView):
    """Saves the correct answer for a slide's coding challenge to the database,
        and uploads the answer to the dataexpert.correct.answers S3 bucket.
    """
    permission_classes = (IsAdminUser, )
    serializer_class = CorrectAnswerToS3Serializer

    def post(self, request):
        data, _cls = save_clsm_data(request, self.serializer_class, True)
        lambda_response = aws_lambda_invoker.invoke_lambda(data['correctAnswer'], 'F', _cls, 'T',  ENVIRONMENT)
        lambda_response_dic = json.loads(lambda_response)
        upload_status = lambda_response_dic['Status']
        if upload_status == 'Success':
            return Response({'status': 'success'}, status=status.HTTP_200_OK)
        return Response({'status': f"There was an error: {upload_status}"},
                        status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['GET'])
@permission_classes((IsAuthenticated, ))
def course_info(request):
    """Returns pertinent data for each course and its corresponding lessons.
    
    For each lesson, the link is to the minimum slide within that lesson that 
    the user has not completed yet.  If all slides within the lesson have been 
    completed by the user, a green checkmark will be displayed next to the lesson name.

    Returns: A list of dictionaries, one for each course.
    """
    user = request.user.id
    data = []
    distinct_courses = CLSM.objects.values('course', 'courseNumber').distinct()
    courses = [[course['course'], course['courseNumber']] for course in distinct_courses]
    courses.sort(key=lambda x: x[1])
    courses = [course[0] for course in courses]
    # Get lesson data for each course
    for i, course in enumerate(courses):
        course_dic = {
            'course': course, 
            'key': i+1,
            'summary': CS.objects.get(courseNumber=i+1).summary
        } 
        lesson_list = []
        distinct_lessons = CLSM.objects.filter(course=course).values('lesson', 'lessonNumber').distinct()
        lessons = [[dic['lesson'], dic['lessonNumber']] for dic in distinct_lessons]
        lessons.sort(key=lambda x: x[1])
        lessons = [lesson[0] for lesson in lessons]
        for j, lesson in enumerate(lessons):
            slides_complete = 'F' 
            CLSM_inst = CLSM.objects.get(course=course, lesson=lesson, slideNumber=1)
            lesson_num, course_num = CLSM_inst.lessonNumber, CLSM_inst.courseNumber
            # Get the minimum slide number that has not yet been completed by the user, aka
            # where completed = F
            min_slide = Slides.objects.filter(user_id=user,
                                              courseNumber=course_num,
                                              lessonNumber=lesson_num,
                                              completed='F').aggregate(Min('slideNumber'))['slideNumber__min']
            # There are no slides with completed = F for this user, which can mean one of three things:
            # 1) The user completed all of the slides
            # 2) The user has not seen any of the slides yet, so no records for
            # that user in the database
            # 3) The user has only been through a few out of all of the slides,
            # so the ones he hasn't seen yet are not in the database
            if not min_slide:
                num_slides = CLSM.objects.filter(course=course, lesson=lesson) \
                    .aggregate(Max('slideNumber'))['slideNumber__max']
                num_slides_completed = len(Slides.objects.filter(user_id=user,
                                                                 courseNumber=course_num,
                                                                 lessonNumber=lesson_num,
                                                                 completed='T'))
                # User completed all of the lesson's slides, case 1 above
                if num_slides == num_slides_completed:
                    min_slide = num_slides
                    slides_complete = 'T'
                # Cases 2 and 3 above
                else:
                    min_slide = num_slides_completed + 1
            slide = CLSM.objects.get(course=course, lesson=lesson, slideNumber=min_slide).slide
            url = os.path.join("/", course, lesson, slide)
            lesson_list.append({
                'lesson': lesson, 
                'url': url, 
                'completed': slides_complete, 
                'key': j+1
            })
        course_dic['lessons'] = lesson_list
        data.append(course_dic)
    return Response({'courses': data})


@api_view(['GET']) 
@permission_classes((IsAuthenticated, ))
def get_lesson_data(request, course, lesson, slide):
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
    slides = CLSM.objects.filter(course=course, lesson=lesson).values_list('slide')
    slides = [slide[0] for slide in slides]
    slide_dropdown, num_slides, slide_instances = slide_top_nav_dropdown(user_id, course, lesson)
    lesson_data = []
    for s in slides:
        # Get CLSM instance and pertinent attributes for slide
        clsm_instance = CLSM.objects.get(course=course, lesson=lesson, slide=s)
        slide_num = clsm_instance.slideNumber
        _cls = clsm_instance.cls
        default_code = clsm_instance.defaultCode
        html_body = clsm_instance.htmlBody
        coded = clsm_instance.codedSlide
        correct_ans = clsm_instance.correctAnswer
        hint = clsm_instance.hint
        # If there is no current record in the slides table for this cls + user combo, create one
        create_slides_record_for_user(_cls, user_id, default_code)
        # What code to display in the text editor
        code = Slides.objects.get(cls=_cls, user_id=user_id).code
        # Bottom nav data
        bottom_nav = slide_bottom_nav(slide_num, num_slides, slide_instances, str(_cls))
        data = {
            "hint": hint,
            "correct_answer": correct_ans,
            "slide": s,
            "code": code,
            "coded": coded,
            "slides": slide_dropdown,
            "course": course,
            "lesson": lesson,
            "bottomNav": bottom_nav,
            "html": html_body
        }
        lesson_data.append(data)
    return Response({
        lesson: lesson_data
    })


def get_clsm_slide_inst(course, lesson, slide, user):
    """Returns a CLSM and Slide instance based on the given arguments.
    """
    clsm_instance = CLSM.objects.get(course=course, lesson=lesson, slide=slide)
    slide_instance = Slides.objects.get(cls=clsm_instance.cls, user_id=user)
    return clsm_instance, slide_instance


@api_view(['POST']) 
@permission_classes((IsAuthenticated, ))
def code_update(request):
    """Updates the code for a User for a particular slide after they have
        made any changes to the default code in the text editor.
    """    
    try:
        user, data = request.user.id, request.data 
        course, lesson, slide, code = data['course'], data['lesson'], data['slide'], data['code']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.id
        Slides.objects.filter(id=pk).update(code=code)  
        return Response("User's code updated successfully")
    except Exception as e: 
        return Response(f"There was an error updating the user's code {e}")


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def set_slide_no_code_completed(request):
    """Whenever a user goes through a slide with no code or coding challenge, then
        set the value of completed for that record in the courses_slides table to T.
    """
    try: 
        user, data = request.user.id, request.data 
        course, lesson, slide = data['course'], data['lesson'], data['slide']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.id
        completed = Slides.objects.get(id=pk).completed
        if completed == 'F':
            Slides.objects.filter(id=pk).update(completed='T')
        return Response("User's completed value for this slide updated successfully")
    except Exception as e:
        return Response(f"There was an error updating the user's completed value for this slide: {e}")


@api_view(['POST']) 
@permission_classes((IsAuthenticated, ))
def code_execution(request):
    """Executes user code by invoking the user-code-executor AWS Lambda function.
    """  
    try:   
        user, data = request.user.id, request.data
        course, lesson, slide, code, grade_code = \
            data['course'], data['lesson'], data['slide'], data['code'], data['submit'] 
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.id
        Slides.objects.filter(id=pk).update(code=code) 
        _cls = clsm_instance.cls
        lambda_response = aws_lambda_invoker.invoke_lambda(code, grade_code, _cls, 'F', ENVIRONMENT)
        response_data = json.loads(lambda_response)
        if 'correct_answer' in response_data and response_data['correct_answer'] == 'T':
            Slides.objects.filter(id=pk).update(completed='T')
        return HttpResponse(lambda_response) 
    except Exception as e:
        return HttpResponse(f"There was an error executing the user's code: {e}")


@api_view(['POST'])
@permission_classes((IsAuthenticated, ))
def restore_code(request):
    """Restores the code field value for a record in courses_slides to the
        default for that slide.
    """ 
    try:
        user, data = request.user.id, request.data   
        course, lesson, slide = data['course'], data['lesson'], data['slide']  
        clsm_instance, slide_instance = get_clsm_slide_inst(course, lesson, slide, user)
        pk = slide_instance.id
        default_code = clsm_instance.defaultCode
        Slides.objects.filter(id=pk).update(code=default_code)
        return HttpResponse(f'{{"Default Code": "{default_code}"}}')
    except Exception as e:
        return HttpResponse(f'{{"Response": "There was an error restoring the code {e}"}}')
