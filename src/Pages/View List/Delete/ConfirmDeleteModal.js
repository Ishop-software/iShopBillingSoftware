import React from 'react';
import './ConfirmDeleteModal.css';

function ConfirmDeleteModal({ show, onClose, onDelete }) {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Are you sure you want to delete this item?</h3>
        <div className="modal-buttons">
          <button className="btn delete" onClick={onDelete}>Delete</button>
          <button className="btn cancel" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmDeleteModal;
