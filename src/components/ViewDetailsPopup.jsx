import React from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { ReceiptText } from 'lucide-react';
import { getCurrentUser } from '../services/auth.api';

const ViewDetailsPopup = ({ show, onClose, title = "View Details", children, data, savedBy }) => {
    const currentUser = getCurrentUser();
    const isSuperAdmin = currentUser?.role === 'Super Admin';

    return (
        <Popup
            show={show}
            onClose={onClose}
            title={title}
            icon={<ReceiptText size={30} />}
            maxWidthClass="max-w-[800px]"
            closeButtonClassName="dark:border-[#FF4D4F] dark:text-[#FF4D4F] dark:bg-[#FCE3E6] dark:hover:bg-[#F9CDD2] dark:hover:text-[#FF4D4F]"
            dividerClassName="dark:bg-[#BFC3CC]"
        >
            <div className='flex flex-col items-center gap-14'>
                <div className='px-10 w-full'>
                    {children || (
                        <div className='flex text-[#000035] gap-6 w-full h-max border border-[#828282] rounded-[10px] py-4 px-10 dark:border-[#BFC3CC] dark:bg-[#15161A] dark:text-[#E2E4EA]'>
                            <div className='flex flex-2 flex-col gap-6 w-full mr-4 my-6'>
                                {data && Object.entries(data).map(([key, value]) => (
                                    <div key={key} className='flex flex-col w-full'>
                                        <span>{key}: {value || 'N/A'}</span>
                                        <div className='w-full h-[1px] bg-[#828282] dark:bg-[#6E7178]'></div>
                                    </div>
                                ))}
                            </div>
                            {isSuperAdmin && savedBy && (
                                <>
                                    <div className='w-[1px] self-stretch bg-[#828282] dark:bg-[#6E7178]'></div>
                                    <div className='flex flex-1 justify-center items-center'>
                                        <p>
                                            Saved by:
                                            <br /><br />
                                            <span>{savedBy.name} ({savedBy.role})</span>
                                        </p>
                                    </div>
                                </>
                            )}
                        </div>
                    )}


                </div>
                <div className="flex justify-center gap-3">
                    <FormButton onClick={onClose}>
                        CLOSE
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDetailsPopup;
