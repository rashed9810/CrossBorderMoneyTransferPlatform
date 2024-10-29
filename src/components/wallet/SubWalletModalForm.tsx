import Link from 'next/link';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useCurrency from '../hooks/useCurrency';

interface ModalProps {
    handleWithdrawIntoWallet: () => void;
    handleChangePIN: (value: any) => void;
    handleForgetPIN: () => void;
    handleEditSubWallet: (value: any) => void;
    handleDeleteSubWallet: (value: any) => void;
    subWalletData: any;
}

const SubWalletModalForm: React.FC<ModalProps> = ({ handleWithdrawIntoWallet, handleChangePIN, handleForgetPIN, handleEditSubWallet, handleDeleteSubWallet, subWalletData }) => {
    const [loading, setLoading] = useState(false);
    const [copyId, setCopyId] = useState(false)
    const [currency] = useCurrency();

    const handleCopy = (e: any) => {
        e.preventDefault()
        navigator.clipboard.writeText(subWalletData?.walletId as string)
        toast.success("Copied ID!")
        setCopyId(true)
        setTimeout(() => {
            setCopyId(false)
        }, 2000)
    }

    return (
        <div className='relative'>

            <div className='-mt-1 mb-2'>
                <div className=" text-xs flex flex-row items-center">Wallet ID :
                    <span className='border border-gray-400 px-[3px]'>{subWalletData?.walletId}</span>
                    <div onClick={handleCopy} className='border cursor-pointer border-gray-300 p-[3px]'>
                        {
                            !copyId ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        }
                    </div>
                    <div className='border border-gray-300 p-[3px]'>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#723EEB" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className='absolute -top-7 left-72'>
                <button
                    onClick={() => handleChangePIN(subWalletData)}
                    className='border-[1.5px] text-[#723EEB] text-xs p-1 border-[#723EEB]'>Change PIN</button>
            </div>
            <div className='my-1'>
                <h3 className="font-semibold">Balance</h3>
                <p className="text-xs text-gray-500">Today, {new Date().toISOString().slice(0, 10)}</p>
            </div>
            <div className='mt-5 mb-3'>
                <h2 className="font-semibold">{subWalletData?.currency?.symbol} <span className='text-5xl'>{subWalletData?.balance > 0 ? subWalletData?.balance : '0.0'}</span>{subWalletData?.currency?.code}</h2>
            </div>
            <div className='w-full flex flex-row justify-between items-center gap-10 my-5'>
                <div className='w-5/6 flex flex-row gap-2 text-xs'>

                    <Link href={'/user/send-money'} className='w-full'>
                        <button
                            className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded">Send Remittance
                        </button>
                    </Link>

                    <button
                        onClick={handleWithdrawIntoWallet}
                        className="text-xs bg-[#3eae50] text-white w-full p-1.5 rounded">Withdraw Into Wallet
                    </button>

                </div>
                <div className='w-1/6 flex flex-row justify-end gap-1 '>

                    <button
                        onClick={() => handleEditSubWallet(subWalletData)}
                        className="text-xs bg-[#723EEB] text-white w-6 h-6 flex justify-center items-center rounded">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M13.648 0.49707C13.1687 0.49707 12.6991 0.682942 12.3371 1.0449L6.13486 7.2276L5.9979 7.36455L5.95877 7.56021L5.52833 9.75154L5.33267 10.6711L6.25225 10.4755L8.44359 10.045L8.63924 10.0059L8.7762 9.86894L14.9589 3.66668C15.6804 2.9452 15.6804 1.76638 14.9589 1.0449C14.5969 0.682942 14.1274 0.49707 13.648 0.49707ZM13.648 1.71013C13.7947 1.71013 13.939 1.78595 14.0784 1.92535C14.3573 2.20416 14.3573 2.50742 14.0784 2.78623L8.01315 8.85153L6.93704 9.06675L7.15226 7.99065L13.2176 1.92535C13.357 1.78595 13.5013 1.71013 13.648 1.71013ZM0.5 2.98189V15.5038H13.0219V7.24716L11.7697 8.49935V14.2516H1.75219V4.23408H7.50444L8.75663 2.98189H0.5Z" fill="white" />
                        </svg>
                    </button>

                    <button
                        onClick={() => handleDeleteSubWallet(subWalletData)}
                        className="text-xs bg-[#ea5455] text-white w-7 flex justify-center items-center rounded">
                        <svg width="16" height="18" viewBox="0 0 16 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.5 0C6.10742 0 5.70605 0.137695 5.42188 0.421875C5.1377 0.706055 5 1.10742 5 1.5V2.25H0.5V3.75H1.25V15.75C1.25 16.9834 2.2666 18 3.5 18H12.5C13.7334 18 14.75 16.9834 14.75 15.75V3.75H15.5V2.25H11V1.5C11 1.10742 10.8623 0.706055 10.5781 0.421875C10.2939 0.137695 9.89258 0 9.5 0H6.5ZM6.5 1.5H9.5V2.25H6.5V1.5ZM2.75 3.75H13.25V15.75C13.25 16.166 12.916 16.5 12.5 16.5H3.5C3.08398 16.5 2.75 16.166 2.75 15.75V3.75ZM4.25 6V14.25H5.75V6H4.25ZM7.25 6V14.25H8.75V6H7.25ZM10.25 6V14.25H11.75V6H10.25Z" fill="white" />
                        </svg>
                    </button>
                </div>
            </div>
            <div className='space-y-3'>
                <div className="w-full relative">
                    <label className="block mb-1 ">Wallet Currency</label>
                    <div className='flex flex-row'>
                        <input
                            type="number"
                            name="wallet"
                            className="w-[90%] px-3 border border-gray-400 rounded-l-full focus:outline-none"
                            placeholder="Enter Amount"
                        />
                        <select className="flex-1 px-2 border border-gray-400 rounded-r-full bg-[#723EEB] text-white focus:outline-none select select-sm">
                            {currency?.map((data: any, index: number) => (
                                <option value={data?.name} key={index}>
                                    {data?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full relative">
                    <label className="block mb-1 ">Converting Currency</label>
                    <div className='flex flex-row'>
                        <input
                            type="number"
                            name="converting"
                            className="w-[90%] px-3 border border-gray-400 rounded-l-full focus:outline-none"
                            placeholder="Enter Amount"
                        />
                        <select className="flex-1 px-2 border border-gray-400 rounded-r-full bg-[#723EEB] text-white focus:outline-none select select-sm">
                            {currency?.map((data: any, index: number) => (
                                <option value={data?.name} key={index}>
                                    {data?.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
                <div className="w-full relative">
                    <label className="block mb-1 ">Enter Your PIN</label>
                    <input
                        type="password"
                        name="pin"
                        className="w-full px-3 py-1  border border-gray-400 rounded-full focus:outline-none"
                        placeholder="******************"
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
                        className='text-[#723EEB] text-right font-semibold text-xs pt-1'>
                        Forget PIN?
                    </button>
                </div>
                <div className="w-full mx-auto py-3">
                    <button
                        type="submit"
                        className="w-full bg-[#723EEB] text-white p-2 rounded text-[10px]">
                        {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'}
                    </button>
                </div>
                {/* <div className='w-full mx-auto py-3'>
                    <input className='w-full bg-[#723EEB] text-white p-2 rounded text-[10px]' type="submit" value="Confirm" />
                </div> */}
            </div>
        </div>
    );
};

export default SubWalletModalForm;