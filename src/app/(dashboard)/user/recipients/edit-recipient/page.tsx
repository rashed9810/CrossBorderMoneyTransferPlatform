'use client'
import React from 'react';


import Image from 'next/image';
import Link from 'next/link';

import UserProfile from '../../../../../../public/user-avater.png';
import Topbar from '@/components/Topbar';

const EditRecipientPage = () => {
    return (
        <div>
            <Topbar>Edit Recipient</Topbar>
            <div className='bg-white px-5 my-10 rounded-xl pt-5 pb-10'>
                <div>
                    <label className='block cursor-pointer w-32'>
                        <input className='hidden' type="file" name="" id="" />
                        <Image className='rounded-full' src={UserProfile} width={100} height={80} alt='profileImage'></Image>
                        <div className='absolute ml-[74px] -mt-9'>
                            <svg width="30" height="30" className='bg-[#723EEB] p-1 rounded-full' viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 0L3.22049 0.197183L0.498264 2.20487L1.05729 2.61716L3.11111 1.10243V5.85275H3.88889V1.10243L5.94271 2.61716L6.50174 2.20487L3.77951 0.197183L3.5 0ZM0 6.42638V7H7V6.42638H0Z" fill="white" />
                            </svg>
                        </div>
                    </label>
                    <div className='w-24'>
                        <h3 className="font-semibold text-xs mt-1 text-center text-[#723EEB]">DPX0005</h3>
                    </div>
                </div>
                <div className="w-full my-3 text-xs">
                    <label className="block mb-3 text-gray-700 font-bold">Full Name*</label>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="Samit Kumar Baral"
                    />
                </div>
                <div className="w-full my-3 text-xs">
                    <label className="block mb-3 text-gray-700 font-bold">Email</label>
                    <input
                        type="email"
                        name="email"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="samit2021@gmail.com"
                    />
                </div>
                <div className="w-full my-3 text-xs">
                    <label className="block mb-3 text-gray-700 font-bold">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="+8801********"
                    />
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center gap-3 lg:gap-5 w-full mt-3 text-xs mb-5">
                    <div className=" lg:w-1/2">
                        <label className="block mb-3 text-gray-700 font-bold">Bank Name*</label>
                        <select className="w-full px-3 border border-gray-300 rounded-xl focus:outline-none select select-sm text-xs">
                            <option disabled>Select Bank</option>
                            <option>Indian Bank</option>
                            <option>USA Bank</option>
                        </select>
                    </div>
                    <div className="lg:w-1/2">
                        <label className="block mb-3 text-gray-700 font-bold">Bank Account Number*</label>
                        <input
                            type="number"
                            name="accountNumber"
                            className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                            placeholder="123434534545609"
                        />
                    </div>
                </div>
                <Link href={'/recipients'} className="w-full ">
                    <button className="bg-[#723EEB] text-white w-full text-max px-4 py-1 text-xs rounded">Confirm</button>
                </Link>
            </div>
        </div>
    );
};

export default EditRecipientPage;