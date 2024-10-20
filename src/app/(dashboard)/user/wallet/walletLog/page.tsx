'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import Topbar from '@/components/Topbar';
import { walletLogData } from '@/utils/data/walletLogData';
import Link from 'next/link';
import React from 'react';

const WalletLogPage = () => {
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
                    walletLogData.map((data, ind) => (
                        <div key={data.id} className="bg-white px-2 lg:px-6 py-2 lg:py-4 mb-5 rounded-2xl cursor-pointer">
                            <div className="flex flex-row justify-between items-center">
                                <div className="flex flex-row gap-2 lg:gap-6 items-start">
                                    <div className="bg-gray-200 rounded-[50%] p-2 hover:bg-[#723EEB] hover:stroke-white">
                                        <svg width="15" height="15" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill="black" />
                                        </svg>
                                    </div>
                                    <div className="w-36">
                                        <h3 className="font-bold">
                                            {
                                                data.type === 'Deposit' ?
                                                    <h3 className="text-green-500">{data.type}</h3> : <h3 className="text-red-500">{data.type}</h3>
                                            }
                                        </h3>

                                        <div className='flex flex-row gap-2'>
                                            <p className="text-[10px]">{data.transfer}</p>
                                            <p className="text-[10px]">
                                                {data.status}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-semibold text-right text-xs lg:text-sm">
                                    {
                                        data.type === 'Deposit' ?
                                            <h3 className="text-green-500">{data.amount}</h3> : <h3 className="text-red-500">{data.amount}</h3>
                                    }
                                    <p className="text-[10px]">Transaction ID : {data.transactionId}</p>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
};

export default WalletLogPage;