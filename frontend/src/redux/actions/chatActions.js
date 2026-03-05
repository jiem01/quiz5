import api from '../../services/api';
import { generateResponse } from '../../services/aiService';
import {
  CHAT_SEND_REQUEST,
  CHAT_SEND_SUCCESS,
  CHAT_SEND_FAIL,
  CHAT_CLEAR,
} from '../constants/chatConstants';
import { listConversations } from './conversationActions';

const getUserId = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo).user.id;
  }
  return null;
};

export const sendMessage = (conversationId, prompt) => async (dispatch) => {
  try {
    dispatch({ type: CHAT_SEND_REQUEST });

    const userId = getUserId();
    let activeConversationId = conversationId;

    if (!activeConversationId) {
      const title = prompt.length > 50 ? prompt.substring(0, 50) : prompt;
      const conversation = await api.conversations.create(userId, title);
      activeConversationId = conversation.id;
    }

    const aiResponse = generateResponse(prompt);

    const data = await api.chat.send(
      activeConversationId,
      userId,
      prompt,
      aiResponse
    );

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
