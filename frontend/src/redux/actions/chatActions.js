import api from '../../services/api';
import { generateResponse } from '../../services/aiService';
import {
  CHAT_SEND_REQUEST,
  CHAT_SEND_SUCCESS,
  CHAT_SEND_FAIL,
  CHAT_CLEAR,
} from '../constants/chatConstants';
import { listConversations } from './conversationActions';

export const sendMessage = (conversationId, prompt) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_SEND_REQUEST });

    let activeConversationId = conversationId;
    let userMessage;

    if (!activeConversationId) {
      const title = prompt.length > 50 ? prompt.substring(0, 50) : prompt;
      const conversation = await api.conversations.create(title, prompt);
      activeConversationId = conversation._id;
      userMessage = conversation.messages[0];
    } else {
      userMessage = await api.chat.sendMessage(
        activeConversationId,
        'user',
        prompt
      );
    }

    const aiResponse = generateResponse(prompt);

    const aiMessage = await api.chat.sendMessage(
      activeConversationId,
      'assistant',
      aiResponse
    );

    const data = {
      conversation_id: activeConversationId,
      user_message: userMessage,
      ai_message: aiMessage,
    };

    dispatch({ type: CHAT_SEND_SUCCESS, payload: data });
    dispatch(listConversations());

    return data;
  } catch (error) {
    dispatch({
      type: CHAT_SEND_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message || 'Failed to send message',
    });
  }
};

export const clearChat = () => (dispatch) => {
  dispatch({ type: CHAT_CLEAR });
};
