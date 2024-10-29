'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../LoaderSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

import hiddenEye from '../../../public/svg/hiddenEye.svg';
import openEye from '../../../public/svg/openEye.svg';

export interface TransactionPreparedTypes {
    id: string,
    amount: number,
    recipientWalletNumber: string;
    senderCurrentBalance: number;
    transactionAfterBalance: number;
    walletType: string;

    
}
export interface TransferTypes {
    transferInfo: TransactionPreparedTypes | null;
    setWalletModalOpen: React.Dispatch<React.SetStateAction<boolean>>
    currencySymbol: string;
   
}



const WalletToWalletModalForm = ({ transferInfo, currencySymbol, setWalletModalOpen }: TransferTypes) => {
    const [isLoading, setIsLoading] = useState(false);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const passwordRef = React.createRef<HTMLInputElement>();
    const axiosInstance = useAxiosSecure();
    const router: ReturnType<typeof useRouter> = useRouter();


    
    
    
   
   
   
   
    const handleSubmit = async () => {
        const password = {
            pinNumber: parseInt(passwordRef.current?.value as string)
        }
        try {
            setIsLoading(true)
            const res = await axiosInstance.post(`transaction/wallet-to-wallet/completed/${transferInfo?.id}`, password);
            if (res.status === 200) {
                router.push(`/user/send-money/payment-confirmation?transactionId=${res?.data.data.transactionId}`);
                setWalletModalOpen(false);
                toast.success("Your Transaction Successful");
            } else {
                toast.error(res?.data.message);
            }
        } catch (err: unknown) {  
            
            if (err instanceof Error && (err as any).response) {
                toast.error((err as any)?.response?.data?.message);
            }
        } finally {
            setIsLoading(false)
        }
    }


    return (
        <div className={`transition-opacity duration-300 ease-in-out space-y-2`}>
            <div className='mt-1 mb-2 space-y-1 font-semibold text-sm'>
                <h5>Transfer Wallet: {transferInfo?.walletType}</h5>
                <h5>Transfer Amount: {transferInfo?.amount+ currencySymbol}</h5>
                <h5>Recipients Wallet ID: {transferInfo?.recipientWalletNumber}</h5>
            </div>
            <div className='flex flex-row w-full'>
                <div className='border p-2 flex-1 space-y-2'>
                    <h5 className="text-sm">Your Current Wallet Balance: </h5>
                    <h4 className="flex flex-row justify-end">{transferInfo?.senderCurrentBalance+ currencySymbol}</h4>
                </div>
                <div className='border p-2 flex-1 space-y-2'>
                    <h5 className="text-sm">Balance after Transaction: </h5>
                    <h4 className="flex flex-row justify-end">{transferInfo?.transactionAfterBalance+ currencySymbol}</h4>
                </div>
            </div>
            <div className="w-full my-2">
                <label className="block mb-1 text-gray-600 font-bold text-sm">Confirm PIN*</label>
                <input
                    ref={passwordRef}
                    type={isPasswordVisible ? 'text' : 'password'}
                    name="confirmPIN"
                    className="w-full px-3 py-1 text-xs border border-gray-300 rounded focus:outline-none"
                    placeholder="Enter PIN....."
                />
                <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-8 mt-[6px] cursor-pointer'>
                    {
                        isPasswordVisible ? <Image src={openEye} alt="hiddenEyeIcon" className='w-4 h-4' /> :
                            <Image src={hiddenEye} alt="hiddenEyeIcon" className='w-4 h-4' />
                    }
                </span>
            </div>
            <button onClick={handleSubmit} className="bg-[#723EEB] text-white w-full text-max px-4 py-[6px] text-xs rounded transition-all duration-300 ease-in-out hover:bg-[#5c31c0] mt-1">
                {
                    isLoading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'
                }
            </button>
        </div>
    );
};

export default WalletToWalletModalForm; 
