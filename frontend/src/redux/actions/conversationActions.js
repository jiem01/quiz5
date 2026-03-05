import api from '../../services/api';
import {
  CONVERSATION_LIST_REQUEST,
  CONVERSATION_LIST_SUCCESS,
  CONVERSATION_LIST_FAIL,
  CONVERSATION_DETAIL_REQUEST,
  CONVERSATION_DETAIL_SUCCESS,
  CONVERSATION_DETAIL_FAIL,
  CONVERSATION_SET_ACTIVE,
  CONVERSATION_CLEAR_ACTIVE,
} from '../constants/conversationConstants';

const getUserId = () => {
  const userInfo = localStorage.getItem('userInfo');
  if (userInfo) {
    return JSON.parse(userInfo).user.id;
  }
  return null;
};

export const listConversations = () => async (dispatch) => {
  try {
    dispatch({ type: CONVERSATION_LIST_REQUEST });

    const userId = getUserId();
    const data = await api.conversations.list(userId);

    dispatch({ type: CONVERSATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONVERSATION_LIST_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message || 'Failed to load conversations',
    });
  }
};

export const getConversationDetail = (id) => async (dispatch) => {
  try {
    dispatch({ type: CONVERSATION_DETAIL_REQUEST });

    const userId = getUserId();
    const data = await api.conversations.getDetail(id, userId);

    dispatch({ type: CONVERSATION_DETAIL_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: CONVERSATION_DETAIL_FAIL,
      payload:
        error.response && error.response.data.detail
          ? error.response.data.detail
          : error.message || 'Failed to load conversation',
    });
  }
};

export const setActiveConversation = (conversation) => (dispatch) => {
  dispatch({ type: CONVERSATION_SET_ACTIVE, payload: conversation });
};

export const clearActiveConversation = () => (dispatch) => {
  dispatch({ type: CONVERSATION_CLEAR_ACTIVE });
};
