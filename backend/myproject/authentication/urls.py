from django.urls import path
from .views import register_view, MyTokenObtainPairView

urlpatterns = [
    path('auth/signup/', register_view),
    path('auth/signin/', MyTokenObtainPairView.as_view()),
]