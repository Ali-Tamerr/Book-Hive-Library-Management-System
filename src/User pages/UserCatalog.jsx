import { useState } from 'react';
import BorrowedBooksContent from './UserBorrowedBooks';
import ReturnedBooksContent from './UserReturnedBooks';
import UserOverdueBorrows from './UserOverdueBorrows';
import TabButton from '../components/TabButton';

function UserCatalog({ searchValue }) {
    const [localActiveTab, setLocalActiveTab] = useState('borrowed');

    const tabButtons = (
        <div className="flex items-center max-[62.5rem]:overflow-x-auto max-[62.5rem]:pb-2 scrollbar-none">
            <TabButton
                label="Borrowed Books"
                isActive={localActiveTab === 'borrowed'}
                onClick={() => setLocalActiveTab('borrowed')}
                position="first"
                className="font-['Bebas_Neue',sans-serif]! flex-1"
            />
            <TabButton
                label="Returned Books"
                isActive={localActiveTab === 'returned'}
                onClick={() => setLocalActiveTab('returned')}
                className="flex-1"
            />
            <TabButton
                label="OVERDUE BORROWS"
                isActive={localActiveTab === 'overdue'}
                onClick={() => setLocalActiveTab('overdue')}
                position="last"
                className="font-['Bebas_Neue',sans-serif]! flex-1"
            />
        </div>
    );

    return (
        <>
            {localActiveTab === 'borrowed' && <BorrowedBooksContent searchValue={searchValue} customTitle={tabButtons} />}
            {localActiveTab === 'returned' && <ReturnedBooksContent searchValue={searchValue} customTitle={tabButtons} />}
            {localActiveTab === 'overdue' && <UserOverdueBorrows searchValue={searchValue} customTitle={tabButtons} />}
        </>
    );
}

export default UserCatalog;
