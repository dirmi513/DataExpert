from django.contrib import admin
from .models import CustomUser

class CustomerUserAdmin(admin.ModelAdmin):
	model = CustomUser

admin.site.register(CustomUser, CustomerUserAdmin)