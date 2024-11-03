'use client'
import useUserProfile from '@/components/hooks/useUserProfile';
import PrimaryKycForm from '@/components/kyc/PrimaryKycForm';
import SecondaryKycForm from '@/components/kyc/SecondaryKycForm';
import Topbar from '@/components/Topbar';
import { useKYC } from '@/context/useKyc';
import React, { useState } from 'react';

const KYCPage = () => {
    const [kycForm, setKycForm] = useState<string>('primary');
    const [user] = useUserProfile();
    const kycStatus = user?.kyc?.kycStatus;

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

                {
                    kycStatus === 'PENDING' ? <div className='h-[70vh] flex justify-center items-center'><h3>Your KYC is pending approval. Please wait.</h3></div> : (
                        user?.isKycVerified ? <div className='h-[70vh] flex justify-center items-center'><h3>You KYC is approved</h3></div> :
                            <>
                                <div className='flex flex-row justify-center items-center gap-2 border-b border-black text-sm font-bold'>
                                    <button className={`${kycForm === 'primary' ? 'border-x border-t border-black p-1' : ''}`}
                                        onClick={() => handleKYC('primary')}>Primary KYC</button>

                                    {/* <button className={`${kycForm === 'secondary' ? 'border-x border-t border-black p-1' : ''}`}
                        onClick={() => handleKYC('secondary')}>Secondary KYC</button> */}
                                </div>
                                <div>
                                    {
                                        kycForm === 'primary' && <PrimaryKycForm />
                                    }
                                    {/* {
                        kycForm === 'secondary' && <SecondaryKycForm />
                    } */}
                                </div>
                            </>
                    )
                }


            </div>
        </div>
    );
};

export default KYCPage;