from django.db import models 
from dataexpert.settings import AUTH_USER_MODEL  


class CourseLessonSlideMaster(models.Model):
    """
    Contains a single row for every course + lesson + slide combination.
    """
    cls = models.IntegerField(primary_key=True)
    course = models.CharField(max_length=100)
    courseNumber = models.IntegerField(default=-1)
    lessonNumber = models.IntegerField(default=-1)
    slideNumber = models.IntegerField(default=-1)
    lesson = models.CharField(max_length=100)
    slide = models.CharField(max_length=100)
    defaultCode = models.TextField(default=None, blank=True, null=True)
    htmlBody = models.TextField(default=None, blank=True, null=True)
    codedSlide = models.CharField(max_length=1, default=None, blank=True)  # T or F
    correctAnswer = models.TextField(default=None, blank=True, null=True)
    hint = models.TextField(default=None, blank=True, null=True)

    def __str__(self):
        return f'{self.cls}: {self.course}, {self.lesson}, {self.slide}'


class Slides(models.Model):
    """
    For each user, there will be a record in this table with their code
    for that specific slide, and whether or not they correctly answered the coding
    challenge for that slide, if there is one.
    """
    id = models.IntegerField(primary_key=True)
    user = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.CASCADE)
    cls = models.IntegerField()  
    courseNumber = models.IntegerField(default=9) 
    lessonNumber = models.IntegerField(default=9)   
    slideNumber = models.IntegerField(default=9)   
    code = models.TextField()
    completed = models.CharField(max_length=1, default="F", blank=True)  # T or F

    def __str__(self):
        return f'{self.user}, slide: {self.cls}, completed: {self.completed}'
