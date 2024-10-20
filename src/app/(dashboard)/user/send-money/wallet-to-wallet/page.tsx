'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SendMoneyCard from '@/components/common/SendMoneyCard/SendMoneyCard';
import SendMoneyModal from '@/components/common/sendMoneyModal/SendMoneyModal';
import WalletToWalletModalForm from '@/components/send-money/WalletToWalletModalForm';
import Topbar from '@/components/Topbar';
import React, { useState } from 'react';

const WalletToWalletpage = () => {
    const [walletModalOpen, setWalletModalOpen] = useState(false);

    const selectOptions = ['Wallet to Wallet', 'Wallet to Bank', 'Bank to Bank'];
    const walletOptions = ['Main Wallet', 'SUB: Indian', 'SUB: Nigerian', 'SUB: Canadian'];

    const [transferIsOpen, setTransferIsOpen] = useState(false);
    const [transferSelectedValue, setTransferSelectedValue] = useState(selectOptions[0]);

    const [walletIsOpen, setWalletIsOpen] = useState(false);
    const [walletSelectedValue, setWalletSelectedValue] = useState("Select Wallet");

    const handleWalletModal = () => {
        setWalletModalOpen(true);
    }

    const handleCloseModal = () => {
        setWalletModalOpen(false);
    };

    return (
        <div className='min-h-screen max-h-auto'>
            <Topbar>Send Money</Topbar>
            <CardSubTitle title='Send Money' />
            <div>
                <SendMoneyCard title='Wallet To Wallet Transfer'>
                    {/* form */}
                    <div className='w-[95%] lg:w-[45%] mx-auto space-y-5 mt-5'>
                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Select Transfer Type</label>
                            <div onClick={() => setTransferIsOpen(!transferIsOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-1 border cursor-pointer">
                                <h1 className="font-medium text-gray-600">{transferSelectedValue}</h1>
                                <svg className={`${transferIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                            </div>

                            {/* dropdown - options  */}
                            <div className={`${transferIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                {selectOptions?.map((option, idx) => (
                                    <div key={idx} onClick={(e) => { setTransferSelectedValue(option); setTransferIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="relative w-full text-xs">
                            <label className="block mb-2 font-semibold">Select Sending Wallet</label>
                            <div onClick={() => setWalletIsOpen(!walletIsOpen)} className="mx-auto flex w-full items-center justify-between rounded-xl px-3 py-1 border cursor-pointer">
                                <h1 className="font-medium text-gray-600">{walletSelectedValue}</h1>
                                <svg className={`${walletIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                            </div>

                            {/* dropdown - options  */}
                            <div className={`${walletIsOpen ? 'visible top-12 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                                {walletOptions?.map((option, idx) => (
                                    <div key={idx} onClick={(e) => { setWalletSelectedValue(option); setWalletIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                        {option}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <h3 className="text-red-600 text-xs">Your Transferring Currency is USD $</h3>
                        <div className="w-full">
                            <label className="block mb-1 font-semibold text-xs">Sending Amount</label>
                            <input
                                type="number"
                                name="sendingAmount"
                                className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
                                placeholder="Type Amount....."
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-1 font-semibold text-xs">Recipients Wallet Number</label>
                            <input
                                type="number"
                                name="walletNumber"
                                className="w-full px-3 py-2 text-xs border rounded-[10px] focus:outline-none"
                                placeholder="Type Wallet Number....."
                            />
                        </div>
                        <button
                            onClick={() => handleWalletModal()}
                            className='font-semibold text-white text-xs lg:text-xs p-1 lg:p-2 rounded-full bg-[#723EEB] w-full'>
                            Confirm
                        </button>
                    </div>
                </SendMoneyCard>
            </div>
            <SendMoneyModal
                isOpen={walletModalOpen}
                onClose={handleCloseModal}
                title='Wallet To Wallet'
            >
                <WalletToWalletModalForm />
            </SendMoneyModal>
        </div>
    );
};

export default WalletToWalletpage; 

