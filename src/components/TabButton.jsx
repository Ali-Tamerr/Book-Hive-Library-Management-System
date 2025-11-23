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
            className={`px-8 h-10 whitespace-nowrap text-sm font-semibold ${getBorderRadius()} ${isActive ? 'bg-[#0b0b3b] text-white ' : 'bg-[#E3E3E3] '
                }`}
        >
            {label}
        </button>
    );
};

export default TabButton;
