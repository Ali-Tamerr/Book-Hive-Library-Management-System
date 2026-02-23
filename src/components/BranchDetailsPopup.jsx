import React from 'react';
import "./popup.css";

const BranchDetailsPopup = ({ isOpen, onClose, branch }) => {
    if (!isOpen || !branch) return null;

    return (
        <div className="overlay">
            <div className="popup popup-typography">
                <h2>Branch Details</h2>

                <p><strong>Name:</strong> {branch.name}</p>
                <p><strong>Phone:</strong> {branch.phone}</p>
                <p><strong>Location:</strong> {branch.location}</p>
                <p><strong>Quantity:</strong> {branch.quantity}</p>

                <button className="popup-close" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

export default BranchDetailsPopup;
