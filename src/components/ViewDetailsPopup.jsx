import React from 'react';
import Popup from './Popup.jsx';
import FormButton from './FormButton.jsx';
import { ReceiptText } from 'lucide-react';

const ViewDetailsPopup = ({ show, onClose, title = "View Details", children, data, savedBy }) => {
    return (
        <Popup
            show={show}
            onClose={onClose}
            title={title}
            icon={<ReceiptText size={30} />}
            maxWidthClass="max-w-[800px]"
        >
            <div className='flex flex-col items-center gap-14'>
                <div className='px-10 w-full'>
                    {children || (
                        <div className='flex gap-6 w-full h-max border border-[#828282] rounded-[10px] py-4 px-10'>
                            <div className='flex flex-2 flex-col gap-6 w-full mr-4 my-6'>
                                {data && Object.entries(data).map(([key, value]) => (
                                    <div key={key} className='flex flex-col w-full'>
                                        <span>{key}: {value || 'N/A'}</span>
                                        <div className='w-full h-[1px] bg-[#828282]'></div>
                                    </div>
                                ))}
                            </div>
                            <div className='w-[1px] self-stretch bg-[#828282]'></div>
                            <div className='flex flex-1 justify-center items-center'>
                                {savedBy && (
                                    <p>
                                        Saved by:
                                        <br /><br />
                                        <span>{savedBy.name} ({savedBy.role})</span>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}


                </div>
                <div className="flex justify-center gap-3">
                    <FormButton onClick={onClose} isPrimary>
                        CLOSE
                    </FormButton>
                </div>
            </div>
        </Popup>
    );
};

export default ViewDetailsPopup;
