from rest_framework import viewsets

from api.serializers import TaskSerializer
from apps.core.models import TaskModel


class TaskViewSet(viewsets.ModelViewSet):
    queryset = TaskModel.objects.all()
    serializer_class = TaskSerializer
