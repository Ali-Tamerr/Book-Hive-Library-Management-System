import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BorrowedBooks from './BorrowedBooks';
import Overdue from './Overdue';
import BoughtBooks from './BoughtBooks';
import ReservedBooks from './ReservedBooks';
import TabButton from '../components/TabButton';

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

  const tabButtons = (
    <div className="flex gap-4 max-[650px]:grid max-[650px]:grid-cols-1">
      <TabButton
        label="Borrowed Books"
        isActive={localActiveTab === 'borrowed'}
        onClick={() => setLocalActiveTab('borrowed')}
        position="first"
      />
      {/* <TabButton
        label="Bought Books"
        isActive={localActiveTab === 'bought'}
        onClick={() => setLocalActiveTab('bought')}
        position="middle"
      />
      <TabButton
        label="Reserved Books"
        isActive={localActiveTab === 'reserved'}
        onClick={() => setLocalActiveTab('reserved')}
        position="middle"
      /> */}
      <TabButton
        label="Overdue Borrowers"
        isActive={localActiveTab === 'overdue'}
        onClick={() => setLocalActiveTab('overdue')}
        position="last"
      />
    </div>
  );

  return (
    <>
      {localActiveTab === 'borrowed' && <BorrowedBooks searchValue={searchValue} customTitle={tabButtons} hideButton={true} />}
      {localActiveTab === 'bought' && <BoughtBooks searchValue={searchValue} customTitle={tabButtons} hideButton={true} />}
      {localActiveTab === 'reserved' && <ReservedBooks searchValue={searchValue} customTitle={tabButtons} hideButton={true} />}
      {localActiveTab === 'overdue' && <Overdue searchValue={searchValue} customTitle={tabButtons} />}
    </>
  );
}

export default Catalog;
