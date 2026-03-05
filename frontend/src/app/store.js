import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import authReducer from '../redux/reducers/authReducer';
import conversationReducer from '../redux/reducers/conversationReducer';
import chatReducer from '../redux/reducers/chatReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  conversation: conversationReducer,
  chat: chatReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
