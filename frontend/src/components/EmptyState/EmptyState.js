import React from 'react';
import './EmptyState.css';

const EmptyState = () => {
  return (
    <div className="empty-state">
      <div className="empty-state-icon">🖥️</div>
      <h2 className="empty-state-title">PC Hardware Assistant</h2>
      <p className="empty-state-text">
        Welcome! Start a new conversation with the PC Hardware Assistant.
      </p>
      <div className="empty-state-topics">
        <div className="empty-state-topic">Check hardware compatibility</div>
        <div className="empty-state-topic">Get component recommendations</div>
        <div className="empty-state-topic">Troubleshoot hardware issues</div>
        <div className="empty-state-topic">PC build advice</div>
      </div>
    </div>
  );
};

export default EmptyState;
