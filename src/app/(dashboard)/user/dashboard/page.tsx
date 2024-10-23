"use client"
import dynamic from 'next/dynamic'

import Topbar from '@/components/Topbar'

import TotalTransactionsChart from '@/components/dashboard/TotalTransactionsChart/TotalTransactionsChart'
import SendMoneyLog from '@/components/dashboard/SendMoneyLog/SendMoneyLog'
import Wallet from '@/components/dashboard/Wallet/Wallet'
import { decodedUser } from '@/components/hooks/useUser'


// const Page = () => {

//     return (
//         <div className='min-h-screen max-h-full'>
//             <Topbar>Dashboard</Topbar>
//             {/* <div className='flex flex-col lg:flex-row items-start w-full gap-5 mt-8'>
//                 <div className='lg:flex-1 w-full lg:w-3/5'>
//                     <Wallet />
//                 </div>
//                 <div className='lg:w-2/5 w-full'>
//                     <SendMoneyLog />
//                 </div>
//             </div>
//             <div className='w-full lg:w-[58%] '>
//                 <TotalTransactionsChart />
//             </div> */}
//             <div className='grid grid-cols-5 grid-rows-5 grid-flow-col w-full gap-5 mt-8'>
//                 <div className='col-span-3 w-full border border-red-600'>
//                     <Wallet />
//                 </div>
//                 <div className='col-span-2 row-span-5 w-full border border-green-600'>
//                     <SendMoneyLog />
//                 </div>
//             </div>
//             <div className='col-span-3 w-full lg:w-[58%] border border-blue-600'>
//                 <TotalTransactionsChart />
//             </div>
//         </div>
//     )
// }

const Page = () => {
    return (
        <div className='min-h-screen max-h-full'>
            <Topbar>Dashboard</Topbar>
            <div className='grid lg:grid-cols-5 lg:gap-5 mt-8 w-full '>
                {/* First column */}
                <div className='lg:col-span-3 grid lg:grid-rows-2 lg:gap-5'>
                    
                    <div className='w-full h-fit'>
                        <Wallet />
                    </div>
                    
                    <div className='w-full h-fit mt-0 md:mt-5 lg:mt-0'>
                        <TotalTransactionsChart />
                    </div>
                </div>

                {/* Second column */}
                <div className='lg:col-span-2 row-span-2 w-full mt-5 lg:mt-0'>
                    <SendMoneyLog />
                </div>
            </div>
        </div>
    );
};

export default Page;


