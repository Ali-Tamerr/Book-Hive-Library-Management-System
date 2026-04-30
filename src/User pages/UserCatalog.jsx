import { useState } from 'react';
import BorrowedBooksContent from './UserBorrowedBooks';
import ReturnedBooksContent from './UserReturnedBooks';
import UserOverdueBorrows from './UserOverdueBorrows';
import TabButton from '../components/TabButton';

function UserCatalog({ searchValue }) {
    const [localActiveTab, setLocalActiveTab] = useState('borrowed');

    const tabButtons = (
        <div className="flex items-center gap-4 max-[40.625rem]:grid max-[40.625rem]:grid-cols-1 max-[40.625rem]:gap-2">
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
