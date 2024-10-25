import React from 'react';
import Modal from '../Modal/Modal';

interface ModalProps {
    isForgetPINModalOpen: boolean;
    setForgetPINModalOpen: (value: boolean) => void;
}

const ForgetPINModal: React.FC<ModalProps> = ({  setForgetPINModalOpen, isForgetPINModalOpen }) => {

    const handleCloseModal = () => setForgetPINModalOpen(false);

    return (
        <>
            <div>
                <Modal
                    isOpen={isForgetPINModalOpen}
                    onClose={handleCloseModal}
                    title="Pin Recovery"
                >
                    <div>
                        <div className='mb-8'>
                            <h3 className="">Sub Wallet : Indian</h3>
                            <h3 className="">Wallet ID : IND-123446756</h3>
                        </div>
                        <form className='space-y-3'>
                            <div className="w-full relative text-sm">
                                <label className="block mb-1">Security Question</label>
                                <input
                                    type="text"
                                    name="question"
                                    className="w-full px-3 py-2  border border-gray-400 rounded-full focus:outline-none placeholder:text-black"
                                    placeholder="Question Here....."
                                />
                            </div>
                            <div className="w-full relative text-sm">
                                <label className="block mb-1">Answer</label>
                                <input
                                    type="text"
                                    name="answer"
                                    className="w-full px-3 py-2  border border-gray-400 rounded-full focus:outline-none placeholder:text-black"
                                    placeholder="Your Answer Here....."
                                />
                            </div>
                            <div className='w-full mx-auto py-3'>
                                <input className='w-full bg-[#ea5455] text-white p-2 rounded text-[10px]' type="submit" value="Confirm" />
                            </div>
                        </form>
                    </div>

                </Modal>
            </div>
        </>
    );
};

export default ForgetPINModal;