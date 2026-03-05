from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Conversation, Message
from .serializers import ConversationSerializer, MessageSerializer


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def chat_view(request):
    user = request.user
    title = request.data.get('title')
    content = request.data.get('content')

    conversation = Conversation.objects.create(
        title=title,
        user=user
    )

    message = Message.objects.create(
        conversation=conversation,
        role='user',
        content=content
    )

    serializer = ConversationSerializer(conversation)

    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_message_view(request, id):
    try:
        conversation = Conversation.objects.get(_id=id, user=request.user)
    except Conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    role = request.data.get('role', 'user')
    content = request.data.get('content')

    message = Message.objects.create(
        conversation=conversation,
        role=role,
        content=content
    )

    conversation.save()

    serializer = MessageSerializer(message)
    return Response(serializer.data, status=status.HTTP_201_CREATED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversation_list_view(request):
    conversations = Conversation.objects.filter(user=request.user).order_by('-created_at')
    serializer = ConversationSerializer(conversations, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def conversation_detail_view(request, id):
    try:
        conversation = Conversation.objects.get(_id=id, user=request.user)
    except Conversation.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    serializer = ConversationSerializer(conversation)
    return Response(serializer.data)