import React from 'react';

const TabButton = ({ label, isActive, onClick, position = 'middle' }) => {
    const getBorderRadius = () => {
        if (position === 'first') return 'rounded-l-xl';
        if (position === 'last') return 'rounded-r-xl';
        if (position === 'only') return 'rounded-xl';
        return '';
    };

    return (
        <button
            onClick={onClick}
            className={`px-16 h-10 whitespace-nowrap text-sm font-semibold cursor-pointer ${getBorderRadius()} ${isActive ? 'bg-[#0b0b3b] text-white dark:bg-[#292D32] ' : 'bg-[#E3E3E3] dark:bg-[#D7D7D7] dark:text-[#121317] '
                }`}
        >
            {label}
        </button>
    );
};

export default TabButton;
