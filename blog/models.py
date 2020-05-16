# from django.db import models
# from django.utils import timezone 
# from django.contrib.auth.models import User 
# from django.urls import reverse  

# class Post(models.Model):
#     title = models.CharField(max_length=100) # Character field
#     content = models.TextField() # Similar to character field, but much longer 
#     date_posted = models.DateTimeField(default=timezone.now)
#     author = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)

#     def __str__(self):
#         return self.title 

#     def get_absolute_url(self):
#         return reverse('post-detail', kwargs={"pk": self.pk})