'use client'
import PrimaryKycForm from '@/components/kyc/PrimaryKycForm';
import SecondaryKycForm from '@/components/kyc/SecondaryKycForm';
import Topbar from '@/components/Topbar';
import React, { useState } from 'react';

const KYCPage = () => {
    const [id, setId] = useState(1);

    const handleKYC = (index: number) => {
        if (index === 1) {
            setId(1)
        }
        else if (index === 2) {
            setId(2)
        }
    }
    return (
        <div>
            <Topbar>KYC</Topbar>
            <div className='pt-10 bg-white rounded-[10px] my-5'>
                <div className='flex flex-row justify-center items-center gap-2 border-b border-black text-sm font-bold'>

                    <button className={`${id === 1 ? 'border-x border-t border-black p-1' : ''}`}
                        onClick={() => handleKYC(1)}>Primary KYC</button>

                    <button className={`${id === 2 ? 'border-x border-t border-black p-1' : ''}`}
                        onClick={() => handleKYC(2)}>Secondary KYC</button>

                </div>
                <div>
                    {
                        id === 1 ? <PrimaryKycForm /> :
                            <SecondaryKycForm />
                    }
                </div>
            </div>
        </div>
    );
};

export default KYCPage;