'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import Topbar from '@/components/Topbar';
import UserUpdateForm from '@/components/user-profile/UserUpdateForm';
import PasswordChangeForm from '@/components/user-profile/PasswordChangeForm';
import React from 'react';
import OutgoingRemittanceTable from '@/components/user-profile/OutgoingRemittanceTable';
import DiasporexReferCard from '@/components/user-profile/DiasporexReferCard';

const UserProfile = () => {
    return (
        <div className='lg:h-[140vh]'>
            <Topbar>User Profile</Topbar>
            <div className='flex flex-col lg:flex-row gap-5 mx-2 '>
                <div className='lg:w-1/2'>
                    <div className='flex flex-row justify-between items-center'>
                        <CardSubTitle title='Profile Settings'></CardSubTitle>
                        <button className="text-xs bg-[#723EEB] text-white w-24 p-1.5 rounded-[5px]">Delete Profile</button>
                    </div>
                    <UserUpdateForm />
                    {/* <div className='mt-5'>
                        <DiasporexReferCard />
                    </div> */}
                </div>
                <div className='lg:w-1/2 mt-1'>
                    <CardSubTitle title='Change Password' />
                    <div>
                        <PasswordChangeForm />
                    </div>
                    {/* <div className='bg-white p-4 mt-5 rounded-xl'>
                        <h1 className="text-sm text-center mb-4 font-bold">Record of outgoing remittance</h1>
                        <OutgoingRemittanceTable />
                    </div> */}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;