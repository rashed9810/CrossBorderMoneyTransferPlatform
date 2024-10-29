import Modal from '../common/Modal/Modal';
import React, { useState } from 'react';
import DepositForm from './DepositForm';
import ForgetPINModal from '../common/ForgetPINModal/ForgetPINModal';

const DepositModal = () => {
    const [isDepositModalOpen, setDepositModalOpen] = useState(false);
    const [isForgetPINModalOpen, setForgetPINModalOpen] = useState(false);
    const [walletInfo, setWalletInfo] = useState({});

    const handleDeposit = () => {
        setDepositModalOpen(true);
    };

    const handleForgetPIN = (walletInfo : any) => {
        setWalletInfo(walletInfo);
        setForgetPINModalOpen(true);
        setDepositModalOpen(false);
    };

    const handleCloseModal = () => {
        setDepositModalOpen(false);
        setForgetPINModalOpen(false);
    }

    return (
        <div className='w-full'>
            <Modal
                isOpen={isDepositModalOpen}
                onClose={handleCloseModal}
                title="Deposit Money"
            >
                <DepositForm
                    handleForgetPIN={handleForgetPIN}
                    setDepositModalOpen={setDepositModalOpen}
                />
            </Modal>
            <button
                onClick={() => handleDeposit()}
                className="text-xs bg-[#3eae50] text-white w-full p-1.5 rounded">Deposit
            </button>


            {/* forget pin modal */}
            <ForgetPINModal
                setForgetPINModalOpen={setForgetPINModalOpen}
                isForgetPINModalOpen={isForgetPINModalOpen}
                mainWallet={walletInfo}
            />
        </div>
    );
};

export default DepositModal;