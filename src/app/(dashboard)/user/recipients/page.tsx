'use client'
import Link from 'next/link';
// import RecipientsCards from '../../components/recipients/RecipientsCards';
import Topbar from '@/components/Topbar';
import RecipientsCards from '@/components/recipients/RecipientsCards';


const RecipientsPage = () => {
    return (
        <div>
            <Topbar>Recipients</Topbar>
            <div className='max-h-auto min-h-[90vh] '>
                <div className='mt-1 mb-3 flex flex-row justify-end'>
                    <Link href={"/user/recipients/create-recipient"} className='w-[50%] lg:w-[20%]'>
                        <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl font-semibold">+Add New Recipient</button>
                    </Link>
                </div>
                <RecipientsCards />
            </div>
        </div>
    );
};

export default RecipientsPage;