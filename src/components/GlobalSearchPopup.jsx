import React, { useState } from 'react';
import { Search, X, MapPin } from 'lucide-react';
import { useBooks } from '../hooks/useBooks';
import { useBookCopies } from '../hooks/useBookCopies';
import { useBranches } from '../hooks/useBranches';

function GlobalSearchPopup({ show, onClose }) {
    const [searchTerm, setSearchTerm] = useState('');
    const { data: books = [] } = useBooks();
    const { data: bookCopies = [] } = useBookCopies();
    const { data: branches = [] } = useBranches();

    if (!show) return null;

    const filteredBooks = searchTerm
        ? books.filter(book =>
            book.name?.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    const getBookBranches = (bookId) => {
        const copies = bookCopies.filter(bc => bc.book_id === bookId);
        const branchIds = [...new Set(copies.map(bc => bc.branch_id))];
        return branchIds.map(branchId => {
            const branch = branches.find(b => b.branch_id === branchId);
            return branch?.name || 'Unknown Branch';
        });
    };

    const getAvailabilityStatus = (quantity) => {
        if (quantity >= 2) return { text: 'Available', color: 'bg-green-100 text-green-700' };
        if (quantity === 1) return { text: 'Limited', color: 'bg-yellow-100 text-yellow-700' };
        return { text: 'Unavailable', color: 'bg-red-100 text-red-700' };
    };

    return (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
            <div className="bg-white w-11/12 max-w-[900px] rounded-lg p-8 max-h-[80vh] flex flex-col">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                        <div className="text-[#0b0b3b] bg-[#D7D7D7] p-4 rounded-lg">
                            <Search size={24} />
                        </div>
                        <span className="font-bold text-lg text-[#000035]">Global Book Search</span>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-[#0b0b3b] hover:text-red-600 transition-colors cursor-pointer"
                        type="button"
                    >
                        <X size={24} strokeWidth={2.9} className="border-[2px] p-1 rounded-[7px] text-[#525252]" />
                    </button>
                </div>

                <div className="h-[1px] bg-[#000035] w-full mb-6"></div>

                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search for books by name..."
                            className="w-full h-[50px] pl-12 pr-4 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[14px]"
                            autoFocus
                        />
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto">
                    {searchTerm === '' ? (
                        <div className="text-center text-gray-500 py-12">
                            <Search size={48} className="mx-auto mb-4 opacity-30" />
                            <p>Start typing to search for books</p>
                        </div>
                    ) : filteredBooks.length === 0 ? (
                        <div className="text-center text-gray-500 py-12">
                            <p>No books found matching "{searchTerm}"</p>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {filteredBooks.map(book => {
                                const bookBranches = getBookBranches(book.book_id);
                                const availability = getAvailabilityStatus(book.quantity);

                                return (
                                    <div
                                        key={book.book_id}
                                        className="border border-gray-200 rounded-lg p-4 hover:border-[#1e255e] transition-colors"
                                    >
                                        <div className="flex items-start justify-between">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-[#000035] text-lg mb-2">
                                                    {book.name}
                                                </h3>
                                                <div className="flex items-center gap-4 text-sm text-gray-600">
                                                    <div className="flex items-center gap-1">
                                                        <span className="font-medium">Quantity:</span>
                                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${availability.color}`}>
                                                            {book.quantity} - {availability.text}
                                                        </span>
                                                    </div>
                                                </div>
                                                {bookBranches.length > 0 && (
                                                    <div className="mt-3 flex items-start gap-2">
                                                        <MapPin size={16} className="text-gray-500 mt-1 flex-shrink-0" />
                                                        <div className="flex flex-wrap gap-2">
                                                            {bookBranches.map((branchName, idx) => (
                                                                <span
                                                                    key={idx}
                                                                    className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium"
                                                                >
                                                                    {branchName}
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default GlobalSearchPopup;
