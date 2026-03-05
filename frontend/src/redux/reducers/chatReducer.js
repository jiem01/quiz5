import {
  CHAT_SEND_REQUEST,
  CHAT_SEND_SUCCESS,
  CHAT_SEND_FAIL,
  CHAT_CLEAR,
} from '../constants/chatConstants';

const initialState = {
  loading: false,
  error: null,
  lastResponse: null,
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_SEND_REQUEST:
      return { ...state, loading: true, error: null };

    case CHAT_SEND_SUCCESS:
      return { ...state, loading: false, lastResponse: action.payload };

    case CHAT_SEND_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHAT_CLEAR:
      return { ...initialState };

    default:
      return state;
  }
};

export default chatReducer;
