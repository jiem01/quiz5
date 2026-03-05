from django.urls import path, include

urlpatterns = [
    path('', include('conversations.urls')),
    path('', include('authentication.urls')),
]