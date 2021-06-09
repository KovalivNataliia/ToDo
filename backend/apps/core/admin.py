from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from apps.core.models import CustomUserModel, TaskModel

admin.site.register(CustomUserModel, UserAdmin)


@admin.register(TaskModel)
class TaskAdmin(admin.ModelAdmin):
    pass
