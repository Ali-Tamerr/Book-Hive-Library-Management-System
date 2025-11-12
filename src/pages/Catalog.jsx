import { useState } from 'react';
import BorrowedBooks from './BorrowedBooks';
import Overdue from './Overdue';
import BoughtBooks from './BoughtBooks';
import ReservedBooks from './ReservedBooks';

function Catalog({ searchValue }) {
  const [activeTab, setActiveTab] = useState('borrowed');

  return (
      <div className="flex flex-col h-screen">
        <div className="flex gap-2 px-6 py-3 bg-[#f8f8fb] border-b border-[#0b0b3b28] max-[650px]:grid max-[650px]:grid-cols-1">
          <button
            onClick={() => setActiveTab('borrowed')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              activeTab === 'borrowed' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Borrowed Books
          </button>
          <button
            onClick={() => setActiveTab('bought')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              activeTab === 'bought' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Bought Books
          </button>
          <button
            onClick={() => setActiveTab('reserved')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              activeTab === 'reserved' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Reserved Books
          </button>
          <button
            onClick={() => setActiveTab('overdue')}
            className={`px-4 py-2 rounded-md text-sm font-medium border ${
              activeTab === 'overdue' ? 'bg-white text-[#0b0b3b] border-[#0b0b3b8f]' : 'bg-[#001b961a] border-transparent'
            }`}
          >
            Overdue Borrowers
          </button>
        </div>

        <section className="flex-1 bg-white mx-6 my-5 rounded-lg p-5 shadow-[0_2px_6px_rgba(0,0,0,0.05)] flex flex-col">
          {activeTab === 'borrowed' && <BorrowedBooks searchValue={searchValue} />}
          {activeTab === 'bought' && <BoughtBooks searchValue={searchValue} />}
          {activeTab === 'reserved' && <ReservedBooks searchValue={searchValue} />}
          {activeTab === 'overdue' && <Overdue searchValue={searchValue} />}
        </section>
      </div>
  );
}

export default Catalog;
