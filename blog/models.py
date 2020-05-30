from django.db import models
from django.utils import timezone
from dataexpert.settings import AUTH_USER_MODEL  


class BlogPost(models.Model):
	id = models.IntegerField(primary_key=True)
	title = models.CharField(max_length=100)
	content = models.TextField()
	date_posted = models.DateTimeField(default=timezone.now)
	date_modified = models.DateTimeField(default=timezone.now)
	author = models.ForeignKey(AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True)

	def get_title(self):
		return self.title

	def set_title(self, new_title):
		self.title = new_title
		self.date_modified = timezone.now

	def get_content(self):
		return self.content

	def set_content(self, new_content):
		self.content = new_content
		self.date_modified = timezone.now

	def get_date_posted(self):
		return self.date_posted

	def get_date_modified(self):
		return self.date_modified

	def get_author(self):
		return self.author

	def set_author(self, new_author):
		self.author = new_author
		self.date_modified = timezone.now

	def __str__(self):
		return self.title
