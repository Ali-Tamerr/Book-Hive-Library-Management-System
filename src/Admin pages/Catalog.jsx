import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BorrowedBooks from './BorrowedBooks';
import Overdue from './Overdue';
import BoughtBooks from './BoughtBooks';
import ReservedBooks from './ReservedBooks';

function Catalog({ searchValue }) {
  const location = useLocation();
  const [localActiveTab, setLocalActiveTab] = useState('borrowed');

  const [activeTab, setActiveTab] = useState('catalog');

  useEffect(() => {
    const path = location.pathname;
    if (path.includes('/admin/catalog')) {
      setActiveTab('catalog');
    }
  }, [location.pathname]);

  return (
      <div className="flex flex-col h-screen">
        <div className="flex gap-2 px-6 py-3 bg-[#f8f8fb] border-b border-[#0b0b3b28] max-[650px]:grid max-[650px]:grid-cols-1">
          <button
            onClick={() => setLocalActiveTab('borrowed')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              localActiveTab === 'borrowed' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Borrowed Books
          </button>
          <button
            onClick={() => setLocalActiveTab('bought')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              localActiveTab === 'bought' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Bought Books
          </button>
          <button
            onClick={() => setLocalActiveTab('reserved')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              localActiveTab === 'reserved' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Reserved Books
          </button>
          <button
            onClick={() => setLocalActiveTab('overdue')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              localActiveTab === 'overdue' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Overdue Borrowers
          </button>
        </div>

        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] flex flex-col">
          {localActiveTab === 'borrowed' && <BorrowedBooks searchValue={searchValue} />}
          {localActiveTab === 'bought' && <BoughtBooks searchValue={searchValue} />}
          {localActiveTab === 'reserved' && <ReservedBooks searchValue={searchValue} />}
          {localActiveTab === 'overdue' && <Overdue searchValue={searchValue} />}
        </section>
      </div>
  );
}

export default Catalog;
