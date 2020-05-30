from rest_framework import serializers
from .models import CourseLessonSlideMaster 


class CourseLessonSlideMasterSerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseLessonSlideMaster
		fields = '__all__' 


class CorrectAnswerToS3Serializer(serializers.ModelSerializer):
	class Meta:
		model = CourseLessonSlideMaster
		fields = ['cls', 'correctAnswer']


class UpdateHTMLBodySerializer(serializers.ModelSerializer):
	class Meta:
		model = CourseLessonSlideMaster
		fields = ['cls', 'htmlBody']
