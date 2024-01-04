import React, { useState } from 'react';
import Modal from 'react-modal';
import { BaseUrl } from '../../config';
import './feedback.css'; // Create this CSS file for styling

const FeedbackForm = ({ isOpen, onRequestClose }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const values = {
      name: name,
      email: email,
      message: message,
    };

    fetch(`${BaseUrl}/add-feedback`, { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((resp) => {
        if (resp.message === 'Feedback added successfully') {
          console.log('Feedback added successfully');

          onRequestClose();
        } else {
          console.error('Error adding feedback:', resp.error);
          
        }
      })
      .catch((err) => {
        console.error('Fetch error:', err);
        // Handle fetch error
      });
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="feedback-modal"
      overlayClassName="feedback-overlay"
    >
      <div className="modal-header">
        <h2>Send Your Feedback</h2>
        <button className="close-button" onClick={onRequestClose}>
          &times;
        </button>
      </div>
      <div className="modal-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <textarea
            placeholder="Your feedback..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
          <button className='btn btn-secondary' type="submit">Submit</button>
        </form>
      </div>
    </Modal>
  );
};

export default FeedbackForm;


