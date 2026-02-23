import React, { useState } from 'react';
import BranchDetailsPopup from './BranchDetailsPopup';
import './popup.css';

const branches = [
  {
    name: 'BookHive Cairo',
    phone: '01245615282',
    location: 'Cairo',
    quantity: 1,
  },
];


const BranchesModal = ({ isOpen, onClose }) => {
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  if (!isOpen) return null;

  const openDetail = (branch) => {
    setSelectedBranch(branch);
    setIsDetailOpen(true);
  };

  const closeDetail = () => {
    setIsDetailOpen(false);
    setSelectedBranch(null);
  };

  return (
    <div className="branches-overlay" onClick={onClose}>
      <div className="branches-popup popup-typography" onClick={(e) => e.stopPropagation()}>
        <button className="branches-close" onClick={onClose}>Close</button>

        <div className="branches-header">
          <h2>Our Branches</h2>
          <img
            src={new URL('../assets/logo.svg', import.meta.url).href}
            alt="BookHive Logo"
            className="branches-logo"
          />
        </div>

        <table className="branches-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Location</th>
              <th>Bo Quantity</th>
            </tr>
          </thead>
          <tbody>
            {branches.map((branch, index) => (
              <tr key={index} onClick={() => openDetail(branch)}>
                <td>{branch.name}</td>
                <td>{branch.phone}</td>
                <td>{branch.location}</td>
                <td>{branch.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <BranchDetailsPopup isOpen={isDetailOpen} onClose={closeDetail} branch={selectedBranch} />
      </div>
    </div>
  );
};

export default BranchesModal;
