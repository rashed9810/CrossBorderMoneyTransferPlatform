'use client'
import TransactionInfoDisplay from '@/components/payment-confirmation/TransactionInfoDisplay';
import Topbar from '@/components/Topbar';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';


const PaymentConfirmationMassagePage = () => {
    const id = useSearchParams().get('transactionID');

    return (
        <div>
            <Topbar>Payment Confirmation</Topbar>
            <div className='h-screen mt-10'>
                <div className='bg-white w-full space-y-4 flex flex-col items-center py-8 rounded-xl'>
                    <div className='w-8 lg:w-12 h-8 lg:h-12 flex justify-center items-center rounded-full p-2 bg-[#723EEB]'>
                        <svg width="38" height="32" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.533 0.731445L8.89749 18.367L1.46697 10.9365L0 12.4034L8.16401 20.5674L8.89749 21.269L9.63098 20.5674L28 2.19842L26.533 0.731445Z" fill="white" />
                        </svg>
                    </div>
                    <h3 className="text-sm lg:text-base font-semibold">Your {id ? 'Transaction' : 'Withdraw'} Is Successfully Completed</h3>
                    <TransactionInfoDisplay transactionID={id || ''} />
                    <div className='flex flex-row gap-3 w-full px-5'>
                        <Link href={"/user/send-money"} className='w-[50%]'>
                            <button className="text-xs bg-[#723EEB] text-white w-full p-2 lg:p-3 rounded-full font-semibold">Send Money Again</button>
                        </Link>
                        <Link href={"/user/dashboard"} className='w-[50%]'>
                            <button className="text-xs bg-[#723EEB] text-white w-full p-2 lg:p-3 rounded-full font-semibold">Go To Dashboard</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentConfirmationMassagePage;