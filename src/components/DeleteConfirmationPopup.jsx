import React from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { Trash2 } from 'lucide-react';

const DeleteConfirmationPopup = ({ show, onClose, onConfirm, title = "Delete Confirmation" }) => {
    return (
        <Popup
            show={show}
            onClose={onClose}
            title={title}
            icon={<Trash2 size={30} />}
            maxWidthClass="max-w-[627px]"
        >
            <div className='flex flex-col items-center gap-14'>
                <div className='px-10'>
                    <p className="text-center text-[#000035] text-base font-medium">
                        Are you certain you wish to proceed with the deletion of the selected entry?
                    </p>
                </div>
                <div className="flex justify-between gap-3">
                    <FormButton onClick={onConfirm} isPrimary>
                        CONFIRM
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default DeleteConfirmationPopup;
