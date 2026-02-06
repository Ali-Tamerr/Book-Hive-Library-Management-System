import React, { useEffect, useMemo } from 'react';
import { useBranches } from '../hooks/useBranches';
import { useBookCopies } from '../hooks/useBookCopies';

const AboutBranchesPopup = ({ isOpen, onClose }) => {
  const { data: branches = [], isLoading: branchesLoading, error: branchesError } = useBranches();
  const { data: bookCopies = [], isLoading: copiesLoading, error: copiesError } = useBookCopies();

  const isLoading = branchesLoading;
  const hasError = Boolean(branchesError);
  const canShowCounts = !copiesLoading && !copiesError;

  const bookCountByBranch = useMemo(() => {
    const counts = new Map();
    bookCopies.forEach((copy) => {
      const key = copy?.branch_id !== undefined && copy?.branch_id !== null
        ? String(copy.branch_id)
        : null;
      if (!key) return;
      counts.set(key, (counts.get(key) || 0) + 1);
    });
    return counts;
  }, [bookCopies]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="branches-popup-overlay" onClick={onClose}>
      <div
        className="branches-popup"
        role="dialog"
        aria-modal="true"
        aria-labelledby="branches-popup-title"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="branches-popup-topbar">
          <button type="button" className="branches-popup-back" onClick={onClose}>
            Back
          </button>
          <div className="branches-popup-brand">
            <img
              src={new URL('../Home/assets/logo.svg', import.meta.url).href}
              alt="Book Hive Logo"
            />
            <div className="branches-popup-brand-text">
              <span className="name">BookHive</span>
              <span className="sub">Library</span>
            </div>
          </div>
        </div>

        <h3 id="branches-popup-title" className="branches-popup-title">
          Our Branches
        </h3>

        <div className="branches-popup-table-wrap">
          <table className="branches-popup-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Contact No</th>
                <th>Location</th>
                <th className="branches-popup-qty">Bo Quantity</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="branches-popup-empty">
                    Loading branches...
                  </td>
                </tr>
              ) : hasError ? (
                <tr>
                  <td colSpan={4} className="branches-popup-empty">
                    Unable to load branches right now.
                  </td>
                </tr>
              ) : branches.length === 0 ? (
                <tr>
                  <td colSpan={4} className="branches-popup-empty">
                    No branches found.
                  </td>
                </tr>
              ) : (
                branches.map((branch, index) => {
                  const branchId = branch?.branch_id ?? branch?.id ?? index;
                  const countKey = branchId !== undefined && branchId !== null ? String(branchId) : null;
                  const bookCount = canShowCounts && countKey
                    ? bookCountByBranch.get(countKey) ?? 0
                    : 'N/A';

                  return (
                    <tr key={branchId}>
                      <td>{branch?.name || 'N/A'}</td>
                      <td>{branch?.contact_number || 'N/A'}</td>
                      <td>{branch?.location || 'N/A'}</td>
                      <td className="branches-popup-qty">{bookCount}</td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AboutBranchesPopup;
