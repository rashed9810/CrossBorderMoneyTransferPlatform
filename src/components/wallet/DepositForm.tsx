import React, { useState } from 'react';
import ForgetPINModal from '../common/ForgetPINModal/ForgetPINModal';

interface ModalProps {
    handleForgetPIN: () => void;
}


const DepositForm: React.FC<ModalProps> = ({ handleForgetPIN }) => {
    const [depositBankIsOpen, setDepositBankIsOpen] = useState(false);
    const [depositSelectedValue, setDepositSelectedValue] = useState("Choose One");

    const selectOptions = ['USA Bank', 'Indian Bank', 'Nigerian Bank'];

    const handleDeposit = (value: string) => {

        if(value === 'USA Bank'){
            setDepositSelectedValue('USA Bank | Account Number : 124993492030')
        }
        else if(value === 'Indian Bank'){
            setDepositSelectedValue('Indian Bank | Account Number : 153934595350')
        }
        else if(value === 'Nigerian Bank'){
            setDepositSelectedValue('Nigerian Bank | Account Number : 172034502030')
        }
    }

    return (
        <div>
            {/* balance */}
            <div className='my-1'>
                <h3 className="">Available Balance</h3>
            </div>
            <div className='mt-1 mb-5'>
                <h2 className="font-semibold">$ <span className='text-5xl'>00.0</span>USD</h2>
            </div>
            <div className='space-y-5'>
                <div className="w-full">
                    <label className="block mb-1  ">Enter Your Amount</label>
                    <input
                        type="text"
                        name="amount"
                        className="w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold"
                        placeholder="Enter Amount Here....."
                    />
                </div>
                <div className="relative w-full">
                    <label className="block mb-2 ">Deposit Bank and Account Number</label>
                    <div onClick={() => setDepositBankIsOpen(!depositBankIsOpen)} className="mx-auto flex w-full items-center justify-between rounded-2xl px-3 py-1 border border-gray-400">
                        <h1 className={`font-semibold ${depositSelectedValue === 'Choose One' ? 'text-gray-400' : 'text-red-600'}`}>{depositSelectedValue}</h1>
                        <svg className={`${depositBankIsOpen ? '-rotate-180' : 'rotate-0'} duration-300`} width={25} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"><path d="M7 10L12 15L17 10" stroke="#4B5563" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>{' '}</g></svg>
                    </div>

                    {/* dropdown - options  */}
                    <div className={`${depositBankIsOpen ? 'visible top-14 bg-white opacity-100' : 'invisible -top-4 opacity-0'} absolute mx-auto my-4 w-full z-50 rounded-xl py-4 border duration-300`}>
                        {selectOptions?.map((option, idx) => (
                            <div key={idx} onClick={(e) => { handleDeposit(option); setDepositBankIsOpen(false); }} className="px-6 py-2 text-gray-500 hover:bg-gray-100">
                                {option}
                            </div>
                        ))}
                    </div>
                </div>
                <div className="w-full">
                    <label className="block mb-1  ">Enter Transaction ID</label>
                    <input
                        type="text"
                        name="transactionID"
                        className="w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold"
                        placeholder="Enter Transaction ID....."
                    />
                </div>
                <div className="w-full relative">
                    <label className="block mb-1">Enter Your PIN</label>
                    <input
                        type="password"
                        name="pin"
                        className="w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold"
                        placeholder="Enter PIN....."
                    />
                    <span className='absolute right-3 mt-2.5'>

                        <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.59674 0L0.847251 0.785877L4.08961 4.16856L9.87373 10.2335L10.8676 11.2927L14.4033 15L15.1528 14.2141L11.9104 10.8144C14.1181 9.66757 15.5988 7.96555 15.6904 7.85877L16 7.5L15.6904 7.14123C15.5499 6.97679 12.2159 3.12642 8 3.12642C6.97963 3.12642 6.01629 3.36133 5.13238 3.70729L1.59674 0ZM8 4.21982C9.1222 4.21982 10.1833 4.55083 11.1283 5.00569C11.4644 5.5951 11.6497 6.26139 11.6497 6.9533C11.6497 7.94633 11.2831 8.85393 10.6884 9.53303L9.2057 7.97836C9.42363 7.6986 9.56416 7.34411 9.56416 6.9533C9.56416 6.04784 8.86354 5.31321 8 5.31321C7.62729 5.31321 7.28921 5.46056 7.0224 5.68907L5.96334 4.57859C6.611 4.36931 7.28921 4.21982 8 4.21982ZM3.1446 4.71526C1.47251 5.79371 0.386966 7.0494 0.309572 7.14123L0 7.5L0.309572 7.85877C0.443992 8.0168 3.53157 11.5597 7.5112 11.8394C7.6721 11.8565 7.83503 11.8736 8 11.8736C8.16497 11.8736 8.3279 11.8565 8.4888 11.8394C8.91853 11.8095 9.33809 11.7497 9.74338 11.6515L8.81466 10.6777C8.5499 10.7417 8.28106 10.7802 8 10.7802C5.98778 10.7802 4.35031 9.06321 4.35031 6.9533C4.35031 6.66287 4.38697 6.37884 4.44807 6.09909L3.1446 4.71526ZM3.43788 5.82574C3.35438 6.19519 3.30754 6.57104 3.30754 6.9533C3.30754 7.90362 3.56212 8.77919 4.00815 9.53303C2.81466 8.81549 1.90224 7.97409 1.43381 7.5C1.82281 7.10493 2.52342 6.44932 3.43788 5.82574ZM12.5621 5.82574C13.4766 6.44932 14.1752 7.10493 14.5662 7.5C14.0978 7.97409 13.1711 8.83257 11.9756 9.55011C12.4236 8.79627 12.6925 7.90362 12.6925 6.9533C12.6925 6.57104 12.6456 6.19305 12.5621 5.82574Z" fill="#4B4B4B" />
                        </svg>

                    </span>
                </div>
                <div className='flex flex-row justify-end'>
                    <button
                        onClick={handleForgetPIN}
                        className='text-[#723EEB] text-right  text-xs pt-1'>
                        Forget PIN?
                    </button>
                </div>
                <div className='w-full mx-auto pb-5'>
                    <input className='w-full bg-[#3eae50] text-white p-2 rounded text-[10px]' type="submit" value="I Have Made Deposit" />
                </div>
            </div>
        </div>
    );
};

export default DepositForm;