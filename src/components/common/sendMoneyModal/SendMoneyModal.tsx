import React, { ReactNode } from 'react';

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: ReactNode;
}

const SendMoneyModal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    // if (!isOpen) return null;
    return (
        <div>
            <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
                <div className={`bg-white rounded shadow-lg overflow-hidden w-[95%] max-w-[28rem] lg:w-full overflow-y-auto transition-all duration-500 ease-in-out absolute top-5 ${isOpen ? 'opacity-1 translate-y-0' : '-translate-y-20 opacity-0'}`}>
                    <div className="flex justify-between items-center py-2 px-4">
                        <h3 className="text-base font-semibold ">{title}</h3>
                        <div onClick={onClose} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
                            <div
                                className="text-3xl"
                            >
                                &times;
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-2">
                        {children}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SendMoneyModal;
