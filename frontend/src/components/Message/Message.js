import React from 'react';
import './Message.css';

const Message = ({ content, role }) => {
  return (
    <div className={`message ${role === 'user' ? 'message-user' : 'message-ai'}`}>
      <div className="message-avatar">
        {role === 'user' ? 'U' : 'AI'}
      </div>
      <div className="message-content">
        <div className="message-role">
          {role === 'user' ? 'You' : 'PC Hardware Assistant'}
        </div>
        <div className="message-text">{content}</div>
      </div>
    </div>
  );
};

export default Message;
