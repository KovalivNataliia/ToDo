from rest_framework.routers import DefaultRouter

from api.views import TaskViewSet

todo_router = DefaultRouter()
todo_router.register(r'tasks', TaskViewSet)


urlpatterns = todo_router.urls
