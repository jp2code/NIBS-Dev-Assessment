import React from 'react';
import PropTypes from 'prop-types';

function ErrorModal({ isOpen, message, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="error-modal-backdrop" style={backdropStyle}>
      <div className="error-modal" style={modalStyle}>
        <h2>Error</h2>
        <div>{message}</div>
        <button onClick={onClose} style={buttonStyle}>Close</button>
      </div>
    </div>
  );
}

const backdropStyle = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100vw',
  height: '100vh',
  backgroundColor: 'rgba(0,0,0,0.5)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 1000
};

const modalStyle = {
  background: '#fff',
  padding: '2rem',
  borderRadius: '8px',
  minWidth: '300px',
  boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
};

const buttonStyle = {
  marginTop: '1rem',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  border: 'none',
  background: '#d32f2f',
  color: '#fff',
  cursor: 'pointer'
};

ErrorModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  message: PropTypes.string,
  onClose: PropTypes.func.isRequired
};

ErrorModal.defaultProps = {
  message: 'An unexpected error occurred.'
};

export default ErrorModal;