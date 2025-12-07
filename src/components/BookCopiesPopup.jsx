import React, { useState, useEffect } from 'react';
import { Copy, Plus, Trash2 } from 'lucide-react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';

function BookCopiesPopup({ show, onClose, quantity, bookCopies, onSave }) {
    const [copies, setCopies] = useState([]);
    const inputRefs = React.useRef([]);

    useEffect(() => {
        if (show) {
            const qty = parseInt(quantity, 10) || 1;
            if (bookCopies && bookCopies.length > 0) {
                const existingCopies = bookCopies.map(c => c.book_copy_id || '');
                while (existingCopies.length < qty) {
                    existingCopies.push('');
                }
                setCopies(existingCopies.slice(0, qty));
            } else {
                setCopies(Array(qty).fill(''));
            }
            inputRefs.current = Array(qty).fill(null);
        }
    }, [show, quantity, bookCopies]);

    const handleCopyChange = (index, value) => {
        const newCopies = [...copies];
        newCopies[index] = value;
        setCopies(newCopies);
    };

    const handleNFCData = (index, data) => {
        handleCopyChange(index, data);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const filledCopies = copies.filter(c => c.trim() !== '');
        if (filledCopies.length !== copies.length) {
            alert(`Please fill all ${copies.length} copy IDs`);
            return;
        }

        const uniqueCopies = new Set(filledCopies);
        if (uniqueCopies.size !== filledCopies.length) {
            alert('Copy IDs must be unique');
            return;
        }

        const bookCopiesArray = copies.map(id => ({ book_copy_id: id }));
        onSave(bookCopiesArray);
        onClose();
    };

    return (
        <Popup
            show={show}
            onClose={onClose}
            title={`Enter Copy IDs (${copies.length} required)`}
            icon={<Copy size={24} strokeWidth={2.3} />}
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="px-10 max-h-[400px] overflow-y-auto">
                    <div className="space-y-3">
                        {copies.map((copyId, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <span className="text-sm font-medium text-gray-600 w-8">#{index + 1}</span>
                                <NFCReaderButton
                                    onDataReceived={(data) => handleNFCData(index, data)}
                                    inputRef={{ current: inputRefs.current[index] }}
                                />
                                <input
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    value={copyId}
                                    onChange={(e) => handleCopyChange(index, e.target.value)}
                                    placeholder={`Copy ID ${index + 1} (e.g., BC-${String(index + 1).padStart(4, '0')})`}
                                    required
                                    className="flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                                />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex justify-between gap-3">
                    <FormButton type="button" onClick={onClose}>
                        CANCEL
                    </FormButton>
                    <FormButton type="submit" isPrimary>
                        SAVE COPY IDs
                    </FormButton>
                </div>
            </form>
        </Popup>
    );
}

export default BookCopiesPopup;
