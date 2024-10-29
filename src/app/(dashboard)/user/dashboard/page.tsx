"use client"

import Topbar from '@/components/Topbar';

import SendMoneyLog from '@/components/dashboard/SendMoneyLog/SendMoneyLog';
import TotalTransactionsChart from '@/components/dashboard/TotalTransactionsChart/TotalTransactionsChart';
import Wallet from '@/components/dashboard/Wallet/Wallet';


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
        <div className='min-h-[calc(100vh-100px)]'>
            <Topbar>Dashboard</Topbar>
            <div className='grid grid-cols-12 gap-5 mt-2 lg:mt-8 w-full lg:pb-5'>
                {/* First column */}
                <div className='xl:col-span-7 lg:col-span-6 col-span-12 space-y-8'>

                    <div className='w-full'>
                        <Wallet />
                    </div>

                    <div className='w-full mt-0 md:mt-5 lg:mt-0 lg:h-[50vh] '>
                        <TotalTransactionsChart />
                    </div>
                </div>

                {/* Second column */}
                <div className='xl:col-span-5 lg:col-span-6 col-span-12 w-full mt-5 lg:mt-0'>
                    <SendMoneyLog />
                </div>
            </div>
        </div>
    );
};

export default Page;


