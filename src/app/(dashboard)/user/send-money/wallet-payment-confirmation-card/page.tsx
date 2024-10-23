'use client'
import LoadingSpin from '@/components/2fa-security/LoadingSpin';
import Topbar from '@/components/Topbar';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { redirect, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import hiddenEye from '../../../../../../public/svg/hiddenEye.svg';
import openEye from '../../../../../../public/svg/openEye.svg';


const PaymentConfirmationPage = () => {
    const id = useSearchParams().get('id');
    const axiosInstance = useAxiosSecure();
    const queryClient = useQueryClient();
    const [pin, setPin] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const router = useRouter();

    const { data, isError, isLoading, error } = useQuery({
        queryKey: ['preparedTransaction'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/transaction/wallet-to-bank/prepared/${id}`);
            return res?.data?.data;
        },
    });

    //Add confirm transaction
    const { data: pendingTransactionData, isSuccess, isPending: isPendingTransaction, isError: isPendingTransactionError, mutate, error: pendingTransactionError } = useMutation({
        mutationFn: async () => {
            const response = await axiosInstance.post(`/transaction/wallet-to-bank/pending/${id}`, {
                "pinNumber": parseInt(pin)
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['pending-transaction'] })
        },
    });



    // handle confirm payment

    const handleConfirmPayment = () => {
        const pinRegex = /^[0-9]{4}$/;
        if (!pin || pin === '') {
            toast.error('Please enter your PIN');
            return;
        }

        if (!pinRegex.test(pin)) {
            toast.error('Please enter a valid pin');
            return;
        }

        mutate();
    }

    useEffect(() => {
        if (isError) {
            toast.error(error?.message);
        }
        if (isPendingTransactionError) {
            toast.error(pendingTransactionError?.message);
        }
        if (isSuccess) {
            toast.success(pendingTransactionData?.message);
            redirect(`/user/send-money/payment-confirmation?transactionID=${pendingTransactionData?.data?.transactionId}`);
        }
    }, [isError, isSuccess, isPendingTransactionError, pendingTransactionData, error, pendingTransactionError]);

    useEffect(() => {
        const handleBackButton = (e: PopStateEvent) => {
            // You can customize the behavior here, e.g. force back to a specific page
            e.preventDefault();
            router.back(); // or router.push('/some-page');
        };

        window.addEventListener('popstate', handleBackButton);

        return () => {
            window.removeEventListener('popstate', handleBackButton);
        };
    }, [router]);
    return (
        <>
            <Topbar>Payment Confirmation</Topbar>
            <div className='bg-white min-h-[80vh] max-h-auto flex justify-center items-center my-5 rounded-xl'>
                <div className='w-[95%] lg:w-[45%] mx-auto py-4'>
                    <div className='bg-[#723eeb] py-4 text-center w-full mx-auto rounded-xl text-white'>
                        <h2 className="text-xl font-semibold">Payment Confirmation</h2>
                    </div>
                    <div>
                        <div className='my-8 space-y-1 text-xs lg:text-sm'>
                            <h5 className="">Transfering Wallet: {data?.walletType}</h5>
                            <h5 className="">Transfering Amount: {data?.amount}</h5>
                        </div>
                        <div className='flex flex-row w-full h-28 my-3'>
                            <div className='border p-2 w-1/2 h-full'>
                                <h5 className="text-xs lg:text-sm">Your Current Wallet Balance: </h5>
                                <h4 className="text-2xl h-full flex flex-row justify-end items-end pb-8">{
                                    isLoading ? <LoadingSpin height='2rem' width='2rem' borderWidth='0.425rem' color='#723EEB' /> :
                                        data?.senderCurrentBalance
                                }</h4>
                            </div>
                            <div className='border p-2 w-1/2 h-full'>
                                <h5 className="text-xs lg:text-sm">Balance after Transaction: </h5>
                                <h4 className="text-2xl h-full flex flex-row justify-end items-end pb-4">{
                                    isLoading ? <LoadingSpin height='2rem' width='2rem' borderWidth='0.425rem' color='#723EEB' /> :
                                        data?.transactionAfterBalance
                                }</h4>
                            </div>
                        </div>
                        <div className="w-full my-5 relative ">
                            <label className="block mb-1 text-gray-600 font-bold text-xs lg:text-sm">Enter PIN*</label>
                            <input
                                type={isPasswordVisible ? 'text' : 'password'}
                                name="endterPIN"
                                className="w-full px-3 py-2 text-xs border border-gray-300 rounded-full focus:outline-none"
                                placeholder="Enter PIN....."
                                value={pin}
                                onChange={(e) => setPin(e.target.value)}
                            />
                            <span onClick={() => setIsPasswordVisible(!isPasswordVisible)} className='absolute right-5 mt-2 cursor-pointer'>
                                {
                                    isPasswordVisible ? <Image src={openEye} alt="hiddenEyeIcon" className='w-4 h-4' /> :
                                        <Image src={hiddenEye} alt="hiddenEyeIcon" className='w-4 h-4' />
                                }
                            </span>

                        </div>
                        <div className="w-full ">
                            <button onClick={() => handleConfirmPayment()} className="bg-[#723EEB] hover:bg-indigo-600 text-white w-full text-max px-4 py-2 text-xs rounded-full flex justify-center items-center">{isPendingTransaction ? <LoadingSpin height='1rem' width='1rem' borderWidth='0.225rem' color='#FFF' /> : "Confirm Payment"}</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default PaymentConfirmationPage;