'use client';
import VerifyEmail from '@/components/verify-email/VerifyEmail';
import React from 'react';

const page = () => {
    return (
        <div className='auth-bg min-h-screen w-full flex items-center justify-center'>
            <div className='px-4'>
                <VerifyEmail />
            </div>
        </div>
    );
};

export default page;