import React from 'react';
import Popup from './Popup.jsx';
import { BookOpen } from 'lucide-react';

function BookDetailsPopup({ show, onClose, book, category, onBookNow }) {
    if (!show || !book) return null;

    const isAvailable = book.quantity >= 2;

    return (
        <Popup
            show={show}
            onClose={onClose}
            title="Book Details"
            icon={<BookOpen size={24} />}
            maxWidthClass="max-w-[700px]"
        >
            <div className="flex flex-col items-center gap-8">
                {book.image_url ? (
                    <img
                        src={book.image_url}
                        alt={book.name}
                        className="w-40 h-56 object-cover rounded-lg shadow-lg"
                    />
                ) : (
                    <div className="w-40 h-56 bg-gradient-to-br from-[#0a0f33] to-[#192261] rounded-lg flex items-center justify-center shadow-lg">
                        <BookOpen size={48} className="text-white opacity-50" />
                    </div>
                )}

                <div className="flex w-full gap-8">
                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#0a0f33]">
                                <span className="font-medium">Name : </span>
                                {book.name}
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[#0a0f33]">
                                <span className="font-medium">Category : </span>
                                {category || 'N/A'}
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[#0a0f33]">
                                <span className="font-medium">Copies : </span>
                                {book.quantity}
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>
                    </div>

                    <div className="w-[1px] bg-gray-300 self-stretch"></div>

                    <div className="flex-1 flex flex-col gap-6">
                        <div className="flex flex-col gap-1">
                            <span className="text-[#0a0f33]">
                                <span className="font-medium">Availability : </span>
                                {isAvailable ? 'Available' : book.quantity === 1 ? 'Reserved' : 'Borrowed'}
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>

                        <div className="flex flex-col gap-1">
                            <span className="text-[#0a0f33]">
                                <span className="font-medium">Sale Price : </span>
                                {book.sale_price ? `$${book.sale_price}` : 'N/A'}
                            </span>
                            <div className="w-full h-[1px] bg-gray-300"></div>
                        </div>

                        <div className="flex justify-end pt-2">
                            <button
                                onClick={onBookNow}
                                disabled={!isAvailable}
                                className={`px-8 py-3 rounded-lg font-semibold transition-colors ${isAvailable
                                        ? 'bg-[#0a0f33] text-white hover:bg-[#192261] cursor-pointer'
                                        : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                            >
                                Book Now
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </Popup>
    );
}

export default BookDetailsPopup;
