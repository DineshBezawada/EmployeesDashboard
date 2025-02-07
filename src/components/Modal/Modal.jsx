import React, { useEffect } from 'react';
import './modal.css';

const Modal = ({ isOpen, onClose, children }) => {

    useEffect(() => {
        if (isOpen) {
          document.body.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = 'auto';
        }
        return () => {
          document.body.style.overflow = 'auto';
        };
      }, [isOpen]);
if (!isOpen) return null; 
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close-btn" onClick={onClose}>X</button>
        <div className="modal-body">
          {children} 
        </div>
      </div>
    </div>
  );
};

export default Modal;