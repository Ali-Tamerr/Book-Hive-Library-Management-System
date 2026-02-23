import React, { useEffect } from 'react';

const FeaturedBookPopup = ({ isOpen, onClose, book, onBookNow }) => {
  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen || !book) return null;

  const handleBookNow = () => {
    if (onBookNow) onBookNow(book);
  };

  const displayName = book.version ? `${book.name} ~ ${book.version}` : book.name;

  return (
    <div className="featured-popup-overlay" onClick={onClose}>
      <div
        className="featured-popup popup-typography"
        role="dialog"
        aria-modal="true"
        aria-label="Book details"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="featured-popup-topbar">
          <button type="button" className="featured-popup-back" onClick={onClose}>
            Back
          </button>
        </div>

        <div className="featured-popup-cover">
          {book.image ? (
            <img src={book.image} alt={book.name} />
          ) : (
            <div className="featured-popup-cover-fallback">No Image</div>
          )}
        </div>

        <div className="featured-popup-content">
          <div className="featured-popup-col">
            <div className="featured-popup-row">
              <span className="label">Name :</span>
              <span className="value">{displayName}</span>
            </div>
            <div className="featured-popup-divider"></div>

            <div className="featured-popup-row">
              <span className="label">Category :</span>
              <span className="value">{book.category || 'N/A'}</span>
            </div>
            <div className="featured-popup-divider"></div>

            <div className="featured-popup-row">
              <span className="label">Language :</span>
              <span className="value">{book.language || 'N/A'}</span>
            </div>
            <div className="featured-popup-divider"></div>
          </div>

          <div className="featured-popup-col-divider"></div>

          <div className="featured-popup-col">
            <div className="featured-popup-row">
              <span className="label">Availability :</span>
              <span className="value">{book.availability || 'N/A'}</span>
            </div>
            <div className="featured-popup-divider"></div>

            <div className="featured-popup-row">
              <span className="label">Branch :</span>
              <span className="value">{book.branch || 'N/A'}</span>
            </div>
            <div className="featured-popup-divider"></div>

            <div className="featured-popup-actions">
              <button type="button" className="featured-popup-action" onClick={handleBookNow}>
                Book Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeaturedBookPopup;
