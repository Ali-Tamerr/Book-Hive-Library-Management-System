import React from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { Trash2 } from 'lucide-react';

const DeleteConfirmationPopup = ({ show, onClose, onConfirm, title = "Delete Confirmation", warningMessage, isDeleteDisabled }) => {
    return (
        <Popup
            show={show}
            onClose={onClose}
            title={title}
            icon={<Trash2 size={30} />}
            maxWidthClass="max-w-[627px]"
        >
            <div className='flex flex-col items-center gap-14'>
                <div className='px-10 flex flex-col gap-4'>
                    <p className="text-center text-[#000035] text-base font-medium">
                        Are you certain you wish to proceed with the deletion of the selected entry?
                    </p>
                    {warningMessage && (
                        <p className="text-center text-red-600 text-sm font-medium">
                            {warningMessage}
                        </p>
                    )}
                </div>
                <div className="flex justify-between gap-3">
                    <FormButton onClick={onConfirm} isPrimary disabled={isDeleteDisabled}>
                        CONFIRM
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default DeleteConfirmationPopup;
