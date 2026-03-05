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

const initialState = {
  conversations: [],
  activeConversation: null,
  loading: false,
  detailLoading: false,
  error: null,
};

const conversationReducer = (state = initialState, action) => {
  switch (action.type) {
    case CONVERSATION_LIST_REQUEST:
      return { ...state, loading: true, error: null };

    case CONVERSATION_LIST_SUCCESS:
      return { ...state, loading: false, conversations: action.payload };

    case CONVERSATION_LIST_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CONVERSATION_DETAIL_REQUEST:
      return { ...state, detailLoading: true };

    case CONVERSATION_DETAIL_SUCCESS:
      return {
        ...state,
        detailLoading: false,
        activeConversation: action.payload,
      };

    case CONVERSATION_DETAIL_FAIL:
      return { ...state, detailLoading: false, error: action.payload };

    case CONVERSATION_SET_ACTIVE:
      return { ...state, activeConversation: action.payload };

    case CONVERSATION_CLEAR_ACTIVE:
      return { ...state, activeConversation: null };

    default:
      return state;
  }
};

export default conversationReducer;
