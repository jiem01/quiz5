import React from 'react';
import './FormComponent.css';

const FormComponent = ({ title, onSubmit, children }) => {
  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">{title}</h2>
        <form onSubmit={onSubmit}>{children}</form>
      </div>
    </div>
  );
};

export default FormComponent;
