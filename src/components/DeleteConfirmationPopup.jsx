import React, { useState, useRef } from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import NFCReaderButton from './NFCReaderButton.jsx';
import { Trash2 } from 'lucide-react';

const DeleteConfirmationPopup = ({
    show,
    onClose,
    onConfirm,
    title = "Delete Confirmation",
    warningMessage,
    isDeleteDisabled,
    showNFCInput = false
}) => {
    const [nfcId, setNfcId] = useState('');
    const [deleteAll, setDeleteAll] = useState(false);
    const inputRef = useRef(null);

    const handleNFCData = (data) => {
        setNfcId(data);
    };

    const handleConfirm = () => {
        if (showNFCInput) {
            onConfirm({ nfcId, deleteAll });
        } else {
            onConfirm();
        }
        setNfcId('');
        setDeleteAll(false);
    };

    const handleClose = () => {
        setNfcId('');
        setDeleteAll(false);
        onClose();
    };

    return (
        <Popup
            show={show}
            onClose={handleClose}
            title={title}
            icon={<Trash2 size={30} />}
            maxWidthClass="max-w-[627px]"
        >
            <div className='flex flex-col items-center gap-14'>
                <div className='px-10 flex flex-col gap-4 w-full'>
                    <p className="text-center text-[#000035] text-base font-medium">
                        Are you certain you wish to proceed with the deletion of the selected entry?
                    </p>

                    {showNFCInput && (
                        <div className="flex flex-col gap-3 mt-4">
                            <div className="flex gap-3">
                                <NFCReaderButton
                                    onDataReceived={handleNFCData}
                                    inputRef={inputRef}
                                />
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={nfcId}
                                    onChange={(e) => setNfcId(e.target.value)}
                                    placeholder="ID"
                                    className="flex-1 h-[50px] px-4 py-3 rounded-xl border border-[#3D3E3E] outline-none focus:border-[#1e255e] text-[13px]"
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="deleteAll"
                                    checked={deleteAll}
                                    onChange={(e) => setDeleteAll(e.target.checked)}
                                    className="w-5 h-5 rounded border-[#3D3E3E] cursor-pointer"
                                />
                                <label htmlFor="deleteAll" className="text-[#000035] text-sm font-medium cursor-pointer">
                                    Do you want Delete all
                                </label>
                            </div>
                        </div>
                    )}

                    {warningMessage && (
                        <p className="text-center text-red-600 text-sm font-medium">
                            {warningMessage}
                        </p>
                    )}
                </div>
                <div className="flex justify-between gap-3">
                    <FormButton onClick={handleConfirm} isPrimary disabled={isDeleteDisabled}>
                        CONFIRM
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default DeleteConfirmationPopup;
