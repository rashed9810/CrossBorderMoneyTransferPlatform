'use client'
import Link from 'next/link';
// import RecipientsCards from '../../components/recipients/RecipientsCards';
import Topbar from '@/components/Topbar';
import useRecipients from '@/components/hooks/useRecipients';
import RecipientsCards from '@/components/recipients/RecipientsCards';
import { useEffect, useState } from 'react';
import { useSearchTransaction } from '@/context/TransactionSearchContext';


const RecipientsPage = () => {

    return (
        <div>
            <Topbar>Recipients</Topbar>
            <div className='max-h-auto min-h-[90vh] '>
                <div className='mt-4 flex flex-row justify-end items-end gap-3 flex-wrap'>
                    <Link href={"/user/recipients/create-recipient"} className=''>
                        <button className="text-xs bg-[#723EEB] text-white w-full py-1.5 px-5 md:px-8 rounded-2xl font-semibold">+Add New Recipient</button>
                    </Link>
                </div>
                <div className='pt-4'>
                    <RecipientsCards />
                </div>
            </div>
        </div>
    );
};

export default RecipientsPage;