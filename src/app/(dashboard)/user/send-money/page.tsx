'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import SelectSendMoneyCard from '@/components/common/selectSendMoneyCard/SelectSendMoneyCard';
import Topbar from '@/components/Topbar';
import Link from 'next/link';
import React from 'react';

const page = () => { 
    return (
        <div className='min-h-screen max-h-auto'>
            <Topbar>Send Money</Topbar>
            <CardSubTitle title='Select Send Money Option' />
            <div className='bg-white rounded-xl lg:h-[340px] mt-5 py-2 lg:py-0'>
                <h2 className="text-xl font-semibold text-center py-4">Select An Option</h2>

                <div className='flex flex-col lg:flex-row justify-center items-center gap-8 mt-5'>
                    <Link href={'/user/send-money/wallet-to-wallet'}>
                        <SelectSendMoneyCard
                            title='Wallet to Wallet Transfer'
                            desc='Wallet to Another Wallet'
                        />
                    </Link>
                    <Link href={'/user/send-money/wallet-to-bank'}>
                        <SelectSendMoneyCard
                            title='Wallet to Bank Transfer'
                            desc='Wallet to your recipient'
                        />
                    </Link>
                    <Link href={'/user/send-money/bank-to-bank'}>
                        <SelectSendMoneyCard
                            title='Bank to Bank Transfer'
                            desc="Bank to recipient's Bank"
                        />
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default page;