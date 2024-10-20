'use client'
import Link from 'next/link';
import Topbar from '@/components/Topbar';
import SelectRecipientsForBank from '@/components/recipients/SelectRecipientsForBank';

const SelectRecipientsBankPage = () => {
    return (
        <div>
        <Topbar>Recipients</Topbar>
        <div className='max-h-auto min-h-[90vh] '>
            <div className='mt-1 mb-3 flex flex-row justify-end'>
                <Link href={"/user/recipients/create-recipient"} className='w-[50%] lg:w-[20%]'>
                    <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl font-semibold">+Add New Recipient</button>
                </Link>
            </div>
           <SelectRecipientsForBank />
        </div>
    </div>
    );
};

export default SelectRecipientsBankPage;