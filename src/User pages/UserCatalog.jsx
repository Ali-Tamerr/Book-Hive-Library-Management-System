import { useState } from 'react';
import BorrowedBooksContent from './UserBorrowedBooks';
import ReturnedBooksContent from './UserReturnedBooks';
import UserOverdueBorrows from './UserOverdueBorrows';
import TabButton from '../components/TabButton';

function UserCatalog({ searchValue }) {
    const [localActiveTab, setLocalActiveTab] = useState('borrowed');

    const tabButtons = (
        <div className="flex gap-4 max-[650px]:grid max-[650px]:grid-cols-1 max-[650px]:gap-2">
            <TabButton
                label="Borrowed Books"
                isActive={localActiveTab === 'borrowed'}
                onClick={() => setLocalActiveTab('borrowed')}
                position="first"
                className="!font-['Bebas_Neue',sans-serif]"
            />
            <TabButton
                label="Returned Books"
                isActive={localActiveTab === 'returned'}
                onClick={() => setLocalActiveTab('returned')}
            />
            <TabButton
                label="OVERDUE BORROWS"
                isActive={localActiveTab === 'overdue'}
                onClick={() => setLocalActiveTab('overdue')}
                position="last"
                className="!font-['Bebas_Neue',sans-serif]"
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
