'use client'
import Topbar from '@/components/Topbar';
import SelectRecipientsCard from '@/components/recipients/SelectRecipientsCard';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
;


const SelectRecipientsPage = () => {
    const id = useSearchParams().get('id');
    return (
        <div>
            <Topbar>Recipients</Topbar>
            <div className='max-h-auto min-h-[90vh] '>
                <div className='mt-1 mb-3 flex flex-row justify-end'>
                    <Link href={`/user/recipients/create-select-recipient?id=${id}`} className='w-[50%] lg:w-[20%]'>
                        <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl font-semibold">+Add New Recipient</button>
                    </Link>
                </div>
                <SelectRecipientsCard />
            </div>
        </div>
    );
};

export default SelectRecipientsPage;