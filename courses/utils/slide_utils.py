from django.db.models import Max, Min
from ..models import Slides, CourseLessonSlideMaster as CLSM
import os


def create_slides_record_for_user(_cls, user_id, default_code):
    """
    If there is no record in the slides table for the given cls and user,
    create a record with defaults.
    """
    if not Slides.objects.filter(cls=_cls, user_id=user_id).exists(): 
        max_id = Slides.objects.all().aggregate(Max('id'))['id__max'] 
        max_id = 0 if max_id is None else max_id 
        Slides.objects.create(cls=_cls, courseNumber=str(_cls)[0], lessonNumber=str(_cls)[1],
                              slideNumber=str(_cls)[2], id=max_id+1, user_id=user_id,
                              code=default_code, completed='F')


def slide_top_nav_dropdown(user_id, course, lesson):
    """
    For each slide page, there is a dropdown in the top navbar for the lesson
    that the slide is a part of. The dropdown displays all slides within
    that lesson. There is a green check next to slides that have already been
    completed by the user.
    """
    slide_instances = CLSM.objects.filter(lesson=lesson)
    num_slides = len(slide_instances)
    slide_dropdown = []
    for index, instance in enumerate(slide_instances):
        instance_cls = instance.cls
        try:
            slide_completed = Slides.objects.get(cls=instance_cls, user_id=user_id).completed
        except: 
            slide_completed = 'F'
        dropdown_number = f'{instance.slideNumber} - '
        slide = instance.slide
        slide_num = instance.slideNumber
        slide_id = f'slide{slide_num}'
        dropdown_dic = {
            'id': slide_id,
            'number': dropdown_number,
            'name': slide, 
            'url': os.path.join(course, lesson, slide),
            'completed': slide_completed
        } 
        slide_dropdown.append(dropdown_dic)
    slide_dropdown.sort(key=lambda x: x['id'])
    return slide_dropdown, num_slides, slide_instances


def slide_bottom_nav(slide_num, num_slides, slide_instances, _cls):
    """
    What to display in the bottom navbar
    of each slide page.
    """
    course_num, lesson_num = int(_cls[0]), int(_cls[1])
    bottom_nav = {
        'middle_element': str(slide_num) + ' / ' + str(num_slides),
        'prev_slide': 'Previous Slide',
        'prev_slide_url': '#',
        'next_slide': 'Next Slide',
        'next_slide_url': '#'
    }
    if slide_num == 1 or (1 < slide_num < num_slides):
        next_slide = slide_instances.filter(slideNumber=slide_num+1)[0]
        next_slide_url = os.path.join("/", next_slide.course, next_slide.lesson,
                                      next_slide.slide)
        bottom_nav['next_slide_url'] = next_slide_url
    if slide_num > 1:
        prev_slide = slide_instances.filter(slideNumber=slide_num-1)[0]
        prev_slide_url = os.path.join("/", prev_slide.course, prev_slide.lesson,
                                      prev_slide.slide)
        bottom_nav['prev_slide_url'] = prev_slide_url
    if slide_num == num_slides:
        # Last slide of lesson
        try:
            # Next lesson
            next_lesson = CLSM.objects.get(courseNumber=course_num, lessonNumber=lesson_num+1, slideNumber=1)
            next_lesson_url = os.path.join("/", next_lesson.course, next_lesson.lesson,
                                           next_lesson.slide)
            bottom_nav['next_slide_url'] = next_lesson_url
            bottom_nav['next_slide'] = 'Next Lesson'
        except CLSM.DoesNotExist:
            # Next course
            try:
                next_course = CLSM.objects.get(courseNumber=course_num+1, lessonNumber=1, slideNumber=1)
                next_course_url = os.path.join("/", next_course.course, next_course.lesson,
                                               next_course.slide)
                bottom_nav['next_slide_url'] = next_course_url
                bottom_nav['next_slide'] = 'Next Course'
            except CLSM.DoesNotExist:
                bottom_nav['next_slide'] = 'Path Complete'
    return bottom_nav
