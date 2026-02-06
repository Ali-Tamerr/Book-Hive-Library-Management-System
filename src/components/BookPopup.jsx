import React from 'react';
import "./BookPopup.css";

const BookPopup = ({ isOpen, onClose, book }) => {
  if (!isOpen || !book) return null;

  return (
    <div className="overlay" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        
        <button className="back-btn" onClick={onClose}>Back</button>

        <div className="popup-content">
          <img src={book.image} alt={book.name} />

          <div className="info">
            <p><strong>Name:</strong> {book.name}</p>
            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Language:</strong> {book.language}</p>
          </div>

          <div className="info">
            <p><strong>Availability:</strong> {book.available ? "Available" : "Not Available"}</p>
            <p><strong>Branch:</strong> {book.branch}</p>

            <button className="book-btn">Explore Now</button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default BookPopup;
