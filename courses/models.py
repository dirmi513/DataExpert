from django.db import models 
from dataexpert.settings import AUTH_USER_MODEL  


class CourseLessonSlideMaster(models.Model):
    """
    Contains a single row for every
    course + lesson + slide combination.
    """
    cls = models.IntegerField(primary_key=True)  # CourseLessonSlide Number 
    course = models.CharField(max_length=100)  # Name of course
    courseNumber = models.IntegerField(default=9)  # cls c portion
    lessonNumber = models.IntegerField(default=9)  # cls l portion
    slideNumber = models.IntegerField(default=9)  # cls s portion 
    lesson = models.CharField(max_length=100)  # Name of lesson
    slide = models.CharField(max_length=100)  # Name of slide 
    defaultCode = models.TextField(default=None, blank=True, null=True)  # Default code for that slide
    htmlBody = models.TextField(default=None, blank=True, null=True)
    codedSlide = models.CharField(max_length=1, default=None, blank=True)  # T or F
    correctAnswer = models.TextField(default=None, blank=True, null=True)
    hint = models.TextField(default=None, blank=True, null=True)

    def get_cls(self):
        return self.cls

    def get_course_num(self):
        return self.courseNumber

    def get_lesson_num(self):
        return self.lessonNumber

    def get_slide_num(self):
        return self.slideNumber

    def get_course(self):
        return self.course 
    
    def get_lesson(self):
        return self.lesson

    def get_slide(self):
        return self.slide

    def get_code(self):
        return self.defaultCode

    def get_html(self):
        return self.htmlBody

    def get_coded_slide(self):
        return self.codedSlide

    def get_correct_answer(self):
        return self.correctAnswer

    def get_hint(self):
        return self.hint 

    def __str__(self):
        return self.course + ', ' + self.lesson + ', ' + self.slide + ', ' + str(self.cls)


class Slides(models.Model):
    """
    For each user, there will be a 
    record in this table with their code
    for that specific slide and whether or 
    not they correctly answered the coding 
    challenge for that slide.
    """
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)  # Get this from Users table
    cls = models.IntegerField()  
    courseNumber = models.IntegerField(default=9) 
    lessonNumber = models.IntegerField(default=9)   
    slideNumber = models.IntegerField(default=9)   
    code = models.TextField()  # Code in the text editor for that user
    completed = models.CharField(max_length=1, default="F", blank=True)  # T or F

    def get_id(self):
        return self.id 

    def get_code(self):
        return self.code 

    def get_completed(self):
        return self.completed

    def get_cls(self):
        return self.cls 

    def get_course_num(self):
        return self.courseNumber

    def get_lesson_num(self):
        return self.lessonNumber

    def get_slide_num(self):
        return self.slideNumber

    def __str__(self):
        return str(self.user) + ', ' +  str(self.cls) + ', ' + str(self.completed)
