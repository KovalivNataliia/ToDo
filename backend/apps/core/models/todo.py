from django.contrib.auth import get_user_model
from django.db import models

User = get_user_model()


class TaskModel(models.Model):
    text = models.CharField(max_length=260)
    is_completed = models.BooleanField(default=False, null=False)
    # author = models.ForeignKey(User, on_delete=models.CASCADE)
