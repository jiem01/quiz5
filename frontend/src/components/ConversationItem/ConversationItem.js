import React from 'react';
import './ConversationItem.css';

const ConversationItem = ({ title, date, active, onClick }) => {
  const formatDate = (dateString) => {
    const d = new Date(dateString);
    return d.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <div
      className={`conversation-item ${active ? 'conversation-item-active' : ''}`}
      onClick={onClick}
    >
      <div className="conversation-item-title">{title}</div>
      <div className="conversation-item-date">{formatDate(date)}</div>
    </div>
  );
};

export default ConversationItem;
