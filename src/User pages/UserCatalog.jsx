import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import BorrowedBooksContent from './BorrowedBooksContent';
import ReturnedBooksContent from './ReturnedBooksContent';
import TabButton from '../components/TabButton';

function UserCatalog({ searchValue }) {
    const location = useLocation();
    const [localActiveTab, setLocalActiveTab] = useState('borrowed');

    const [activeTab, setActiveTab] = useState('catalog');

    useEffect(() => {
        const path = location.pathname;
        if (path.includes('/user/catalog')) {
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
            <TabButton
                label="Returned Books"
                isActive={localActiveTab === 'returned'}
                onClick={() => setLocalActiveTab('returned')}
                position="last"
            />
        </div>
    );

    return (
        <>
            {localActiveTab === 'borrowed' && <BorrowedBooksContent searchValue={searchValue} customTitle={tabButtons} />}
            {localActiveTab === 'returned' && <ReturnedBooksContent searchValue={searchValue} customTitle={tabButtons} />}
        </>
    );
}

export default UserCatalog;
