'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SkeletonForRecipient from '@/components/common/skeleton/SkeletonForRecipient';
import useWalletLog from '@/components/hooks/useWalletLog';
import RecipientsTable from '@/components/recipients/RecipientsTable';
import Topbar from '@/components/Topbar';
import DepositLogTable from '@/components/wallet/DepositLogTable';
import WithdrawLogTable from '@/components/wallet/WithdrawLogTable';
import { walletLogData } from '@/utils/data/walletLogData';
import Link from 'next/link';
import { useState } from 'react';
import { GoDotFill } from 'react-icons/go';

const WalletLogPage = () => {
    const [walletLog, , isPending] = useWalletLog();
    const [open, setOpen] = useState<Record<string, boolean>>({});
    console.log(walletLog, 'wallet log console');

    const toggleDepositCard = (id: string) => {
        setOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className='h-screen'>
            <Topbar>Wallet Log</Topbar>
            <div className='flex flex-row justify-between items-center my-2'>
                <CardSubTitle title='Wallet Log' />
                <Link href={`/user/wallet`}>
                    <button className="text-[10px] w-28 lg:w-40 bg-[#723EEB] text-white p-1 lg:p-2 rounded-full font-semibold">Back To Wallet</button>
                </Link>
            </div>
            <div>
                {
                    isPending ? <SkeletonForRecipient /> : (
                        walletLog?.deposits?.length > 0 || walletLog?.withdraw?.length > 0 ? (
                            <div>
                                {
                                    (
                                        walletLog?.deposits?.map((data: any) => (
                                            <div key={data.id} className={`bg-white px-2 lg:px-6 py-2 lg:py-4 mb-5 rounded-2xl cursor-pointer group ${open[String(data.id)] ? "shadow-md shadow-neutral-400" : ""
                                                }`}>
                                                <div onClick={() => toggleDepositCard(String(data.id))} className="flex flex-row justify-between items-center">
                                                    <div className="flex flex-row gap-2 lg:gap-6 items-start">
                                                        <div className={`bg-gray-200 rounded-[50%] ${open[String(data.id)] ? "rotate-0" : "-rotate-180"} p-2 duration-300 group-hover:text-white text-black group-hover:fill-white group-hover:bg-[#723EEB] `}>
                                                            <svg width="15" height="15" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill='currentColor' />
                                                            </svg>
                                                        </div>
                                                        <div className="w-36 xxs:w-24 md:w-full">
                                                            <h3 className="font-semibold xxs:text-sm">
                                                                <h3 className="text-green-500">Deposit</h3>
                                                            </h3>

                                                            <div className='flex flex-row gap-2'>
                                                                <p className="text-[10px] xxs:text-[8px] md:text-[10px]">{data?.bankDetails}</p>
                                                                <p className="text-[10px] flex items-center ml-1">
                                                                    {
                                                                        data.status === 'PENDING' ? <GoDotFill className="text-[#FF9F43] inline" /> :
                                                                            <GoDotFill className="text-[#0AC484]" />
                                                                    }
                                                                    {data?.status}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-right text-xs lg:text-sm">
                                                        <h3 className="text-green-500">{data?.amount} $</h3>
                                                        <p className="text-[10px]">Transaction ID : {data?.transactionId}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`grid transition-all duration-500 ease-in-out  ${open[String(data.id)] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                        }`}
                                                >
                                                    <div className="overflow-hidden flex flex-col">
                                                        <DepositLogTable data={data} />
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    )
                                }
                                {
                                    (
                                        walletLog?.withdraw?.map((data: any) => (
                                            <div key={data.id} className={`bg-white px-2 lg:px-6 py-2 lg:py-4 mb-5 rounded-2xl cursor-pointer group ${open[String(data.id)] ? "shadow-md shadow-neutral-400" : ""
                                                }`}>
                                                <div onClick={() => toggleDepositCard(String(data.id))} className="flex flex-row justify-between items-center">
                                                    <div className="flex flex-row gap-2 lg:gap-6 items-start">
                                                        <div className={`bg-gray-200 rounded-[50%] p-2 duration-300 group-hover:text-white text-black group-hover:fill-white group-hover:bg-[#723EEB] ${open[String(data.id)] ? "rotate-0" : "-rotate-180"}`}>
                                                            <svg width="15" height="15" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill='currentColor' />
                                                            </svg>
                                                        </div>
                                                        <div className="w-36 xxs:w-24 md:w-full">
                                                            <h3 className="font-semibold xxs:text-sm">
                                                                <h3 className="text-red-500">Withdraw</h3>
                                                            </h3>

                                                            <div className='flex flex-row gap-2'>
                                                                <p className="text-[10px] xxs:text-[8px] md:text-[10px]">{data?.bankName}</p>
                                                                <p className="text-[10px] flex items-center ml-1">
                                                                    {
                                                                        data.status === 'PENDING' ? <GoDotFill className="text-[#FF9F43]" /> :
                                                                            <GoDotFill className="text-[#0AC484]" />
                                                                    }
                                                                    {data?.status}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="font-semibold text-right text-xs lg:text-sm">
                                                        <h3 className="text-red-500">{data?.amount} $</h3>
                                                        <p className="text-[10px]">Account Number : {data?.accountNo}</p>
                                                    </div>
                                                </div>
                                                <div
                                                    className={`grid transition-all duration-500 ease-in-out  ${open[String(data.id)] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                        }`}
                                                >
                                                    <div className="overflow-hidden flex flex-col">
                                                        <WithdrawLogTable data={data} />
                                                    </div>
                                                </div>
                                            </div>
                                        )
                                        )
                                    )
                                }
                            </div>

                        ) : (<div className='flex justify-center items-center py-5 rounded-xl bg-white'>
                            <h3 className="font-semibold text-black">You have no wallet transactions</h3>
                        </div>)
                    )
                }
            </div>
        </div>
    );
};

export default WalletLogPage;