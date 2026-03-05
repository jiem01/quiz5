from django.urls import path
from .views import chat_view, conversation_list_view, conversation_detail_view, send_message_view

urlpatterns = [
    path('conversation/', chat_view),
    path('conversations/', conversation_list_view),
    path('conversations/<int:id>/', conversation_detail_view),
    path('conversations/<int:id>/message/', send_message_view),
]