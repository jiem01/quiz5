import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../redux/actions/authActions';
import {
  listConversations,
  getConversationDetail,
  clearActiveConversation,
} from '../../redux/actions/conversationActions';
import { sendMessage } from '../../redux/actions/chatActions';
import ConversationItem from '../../components/ConversationItem/ConversationItem';
import Message from '../../components/Message/Message';
import EmptyState from '../../components/EmptyState/EmptyState';
import Loader from '../../components/Loader/Loader';
import './HomeScreen.css';

const HomeScreen = () => {
  const [prompt, setPrompt] = useState('');
  const [messages, setMessages] = useState([]);
  const [activeId, setActiveId] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const messagesEndRef = useRef(null);

  const { userInfo } = useSelector((state) => state.auth);
  const { conversations, loading: convoLoading } = useSelector(
    (state) => state.conversation
  );
  const { activeConversation, detailLoading } = useSelector(
    (state) => state.conversation
  );
  const { loading: chatLoading } = useSelector((state) => state.chat);

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    } else {
      dispatch(listConversations());
    }
  }, [userInfo, navigate, dispatch]);

  useEffect(() => {
    if (activeConversation && activeConversation.messages) {
      setMessages(activeConversation.messages);
    }
  }, [activeConversation]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleConversationClick = (conversation) => {
    setActiveId(conversation._id);
    dispatch(getConversationDetail(conversation._id));
  };

  const handleNewConversation = () => {
    setActiveId(null);
    setMessages([]);
    dispatch(clearActiveConversation());
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!prompt.trim() || chatLoading) return;

    const currentPrompt = prompt;
    setPrompt('');

    setMessages((prev) => [
      ...prev,
      { role: 'user', content: currentPrompt, id: Date.now() },
    ]);

    const result = await dispatch(sendMessage(activeId, currentPrompt));

    if (result) {
      if (!activeId) {
        setActiveId(result.conversation_id);
      }
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== Date.now());
        return [
          ...filtered.slice(0, -1),
          result.user_message,
          result.ai_message,
        ];
      });
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="home-container">
      <div className="sidebar">
        <div className="sidebar-header">
          <button className="new-chat-btn" onClick={handleNewConversation}>
            + New Chat
          </button>
        </div>
        <div className="sidebar-conversations">
          {convoLoading ? (
            <Loader />
          ) : (
            conversations.map((conv) => (
              <ConversationItem
                key={conv._id}
                title={conv.title}
                date={conv.updated_at}
                active={activeId === conv._id}
                onClick={() => handleConversationClick(conv)}
              />
            ))
          )}
        </div>
        <div className="sidebar-footer">
          <div className="user-info">
            <span className="user-avatar">
              {userInfo?.user?.username?.charAt(0)?.toUpperCase()}
            </span>
            <span className="user-name">{userInfo?.user?.username}</span>
          </div>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
      <div className="main-chat">
        {detailLoading ? (
          <Loader />
        ) : messages.length === 0 && !activeId ? (
          <EmptyState />
        ) : (
          <div className="messages-container">
            {messages.map((msg, index) => (
              <Message key={msg.id || index} content={msg.content} role={msg.role} />
            ))}
            {chatLoading && (
              <div className="typing-indicator">
                <div className="message message-ai">
                  <div className="message-avatar" style={{ backgroundColor: '#10b981', color: '#fff' }}>AI</div>
                  <div className="message-content">
                    <div className="message-role">PC Hardware Assistant</div>
                    <div className="typing-dots">
                      <span></span><span></span><span></span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
        <div className="chat-input-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              placeholder="Ask about PC hardware..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              disabled={chatLoading}
              className="chat-input"
            />
            <button
              type="submit"
              disabled={chatLoading || !prompt.trim()}
              className="send-btn"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
