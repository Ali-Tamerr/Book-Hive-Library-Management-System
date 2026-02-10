import React, { useState, useEffect } from 'react';
import { Copy, ChevronUp } from 'lucide-react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';
import { useBranches } from '../hooks/useBranches';
import { useNFCReader } from '../contexts/NFCReaderContext';

function BookCopiesPopup({ show, onClose, quantity, bookCopies, onSave }) {
    const [copies, setCopies] = useState([]);
    const [currentInputIndex, setCurrentInputIndex] = useState(0);
    const [selectedBranch, setSelectedBranch] = useState('');
    const [isBranchSelectOpen, setIsBranchSelectOpen] = useState(false);
    const inputRefs = React.useRef([]);
    const { data: branches = [] } = useBranches();
    const { isConnected } = useNFCReader();

    useEffect(() => {
        if (show) {
            const qty = parseInt(quantity, 10) || 1;
            if (bookCopies && bookCopies.length > 0) {
                const existingCopies = bookCopies.map(c => c.book_copy_id || '');
                const firstBranch = bookCopies[0]?.branch_id || '';
                setSelectedBranch(firstBranch);

                while (existingCopies.length < qty) {
                    existingCopies.push('');
                }
                setCopies(existingCopies.slice(0, qty));
            } else {
                setCopies(Array(qty).fill(''));
                setSelectedBranch('');
            }
            inputRefs.current = Array(qty).fill(null);
            setCurrentInputIndex(0);
        }
    }, [show, quantity, bookCopies]);

    useEffect(() => {
        if (isConnected && inputRefs.current[0]) {
            setTimeout(() => {
                inputRefs.current[0].focus();
                setCurrentInputIndex(0);
            }, 150);
        }
    }, [isConnected]);

    const handleCopyChange = (index, value) => {
        const newCopies = [...copies];
        newCopies[index] = value;
        setCopies(newCopies);
    };

    const handleNFCData = (data) => {
        handleCopyChange(currentInputIndex, data);

        const nextIndex = currentInputIndex + 1;
        if (nextIndex < copies.length) {
            setTimeout(() => {
                if (inputRefs.current[nextIndex]) {
                    inputRefs.current[nextIndex].focus();
                    setCurrentInputIndex(nextIndex);
                }
            }, 100);
        }
    };

    const handleInputFocus = (index) => {
        setCurrentInputIndex(index);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const allFilled = copies.every(c => c.trim() !== '');
        if (!allFilled) {
            alert(`Please fill all ${copies.length} copy IDs`);
            return;
        }

        if (!selectedBranch) {
            alert('Please select a branch');
            return;
        }

        const copyIds = copies;
        const uniqueCopies = new Set(copyIds);
        if (uniqueCopies.size !== copyIds.length) {
            alert('Copy IDs must be unique');
            return;
        }

        const bookCopiesArray = copies.map(c => ({
            book_copy_id: c,
            branch_id: parseInt(selectedBranch, 10)
        }));
        onSave(bookCopiesArray);
        onClose();
    };

    return (
        <Popup
            show={show}
            onClose={onClose}
            title={`Add Book`}
            icon={<Copy size={24} strokeWidth={2.3} />}
            maxWidthClass="max-w-[800px]"
        >
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="px-10 flex gap-3">
                    <div className='flex-1'>
                        <NFCReaderButton
                            onDataReceived={handleNFCData}
                            inputRef={{ current: inputRefs.current[currentInputIndex] }}
                        />
                    </div>
                    <div className='flex-1 relative'>
                        <select
                            value={selectedBranch}
                            onChange={(e) => { setSelectedBranch(e.target.value); setIsBranchSelectOpen(false); }}
                            onClick={() => setIsBranchSelectOpen(!isBranchSelectOpen)}
                            onBlur={() => setIsBranchSelectOpen(false)}
                            required
                            className="w-full text-[#727374] h-[50px] px-4 py-3 pr-10 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px] bg-white appearance-none"
                        >
                            <option value="">Select Branch</option>
                            {branches.map(branch => (
                                <option key={branch.branch_id} value={branch.branch_id}>
                                    {branch.name}
                                </option>
                            ))}
                        </select>
                        <ChevronUp
                            className={`absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#727374] pointer-events-none transition-transform duration-200 ${isBranchSelectOpen ? 'rotate-180' : 'rotate-0'}`}
                        />
                    </div>
                </div>

                <div className={`px-10 max-h-[400px] text-[#727374] overflow-y-auto grid ${copies.length === 1 ? 'grid-cols-1' : 'grid-cols-2'} gap-3`}>
                    {copies.map((copy, index) => (
                        <input
                            key={index}
                            ref={el => inputRefs.current[index] = el}
                            type="text"
                            value={copy}
                            onChange={(e) => handleCopyChange(index, e.target.value)}
                            onFocus={() => handleInputFocus(index)}
                            placeholder={`ID`}
                            required
                            className="w-full text-[#727374] h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                        />
                    ))}
                </div>
                <div className="flex justify-between gap-3">
                    <FormButton type="button" onClick={onClose}>
                        BACK
                    </FormButton>
                    <FormButton type="submit" isPrimary>
                        SAVE COPIES
                    </FormButton>
                </div>
            </form>
        </Popup>
    );
}

export default BookCopiesPopup;
