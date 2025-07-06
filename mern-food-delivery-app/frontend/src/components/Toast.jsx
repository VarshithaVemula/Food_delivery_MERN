// src/components/common/Toast.jsx
import React, { useEffect } from 'react';
import './Toast.css';

const Toast = ({ message, type = "success", onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 2000); // Hide after 2 seconds

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`toast ${type}`}>
      <p>{message}</p>
      <span onClick={onClose}>×</span>
    </div>
  );
};

export default Toast;
