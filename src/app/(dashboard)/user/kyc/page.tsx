'use client'
import PrimaryKycForm from '@/components/kyc/PrimaryKycForm';
import SecondaryKycForm from '@/components/kyc/SecondaryKycForm';
import Topbar from '@/components/Topbar';
import React, { useState } from 'react';

const KYCPage = () => {
    const [kycForm, setKycForm] = useState<string>('primary');

    const handleKYC = (props: 'primary' | 'secondary') => {
        if (props === 'primary') {
            setKycForm('primary')
        }
        if (props === 'secondary') {
            setKycForm('secondary')
        }
    }
    return (
        <div>
            <Topbar>KYC</Topbar>
            <div className='pt-10 bg-white rounded-[10px] my-5'>
                <div className='flex flex-row justify-center items-center gap-2 border-b border-black text-sm font-bold'>
                    <button className={`${kycForm === 'primary' ? 'border-x border-t border-black p-1' : ''}`}
                        onClick={() => handleKYC('primary')}>Primary KYC</button>

                    <button className={`${kycForm === 'secondary' ? 'border-x border-t border-black p-1' : ''}`}
                        onClick={() => handleKYC('secondary')}>Secondary KYC</button>
                </div>
                <div>
                    {
                        kycForm === 'primary' && <PrimaryKycForm />
                    }
                    {
                        kycForm === 'secondary' && <SecondaryKycForm />
                    }
                </div>
            </div>
        </div>
    );
};

export default KYCPage;