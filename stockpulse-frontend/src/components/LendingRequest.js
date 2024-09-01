// src/components/LendingRequest.js
import React from 'react';
import './LendingRequest.css';

const LendingRequestModal = ({ isVisible, onClose, onSave }) => {
  if (!isVisible) return null; // Ensure modal is hidden when not visible

  return (
    <div className='modal-overlay'>
      <div className='modal-container'>
        <h2>Request Lending</h2>
        <form>
          <div>
            <label htmlFor='stockID'>Stock ID</label>
            <input type='text' id='stockID' name='stockID' required />
          </div>
          <div>
            <label htmlFor='borrowerID'>Borrower ID</label>
            <input type='text' id='borrowerID' name='borrowerID' required />
          </div>
          <div>
            <label htmlFor='borrowedDate'>Borrowed Date</label>
            <input type='date' id='borrowedDate' name='borrowedDate' required />
          </div>
          <div>
            <label htmlFor='dueDate'>Due Date</label>
            <input type='date' id='dueDate' name='dueDate' required />
          </div>
          <div>
            <label htmlFor='notes'>Notes</label>
            <input type='text' id='notes' name='notes' />
          </div>
          <div>
            <button type='submit'>Submit</button>
            <button type='button' onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LendingRequestModal;
