'use client'
import React from 'react';
import Link from 'next/link';
import Topbar from '../Topbar';
import CardSubTitle from '../common/cardSubTitle/CardSubTitle';

const CreateRecipientForm = () => {


    return (
        <div className=''>
            <Topbar>Create Recipient</Topbar>
            <CardSubTitle title='Create Recipient' />
            <div className='bg-white px-2 lg:px-6 py-10 rounded-2xl text-xs my-5'>
                {/* existing recipient */}
                <div className="flex flex-row gap-3 items-end lg:w-1/2 mb-6">
                    <div className="lg:w-1/2">
                        <label className="block mb-3 font-semibold">Search Existing Recipient</label>
                        <input
                            type="text"
                            name="firstName"
                            className="w-full px-3 py-1 border border-gray-300 outline-none"
                            placeholder="Enter ID ..."
                        />
                    </div>
                    <div className="w-1/2">
                        <button className="bg-[#5f76e8] w-full px-4 py-1 text-white">Search</button>
                    </div>
                </div>
                <div className="w-full">
                    <label className="block mb-3 font-semibold">Full Name*</label>
                    <input
                        type="text"
                        name="fullName"
                        className="w-full px-3 py-2 border border-gray-300 outline-none rounded-xl"
                        placeholder="Enter Full Name ..."
                    />
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-4 my-4 lg:my-10">
                    <div className="lg:w-1/2">
                        <label className="block mb-3 font-semibold">Email/Phone Number</label>
                        <input
                            type="text"
                            name="email-phone"
                            className="w-full px-3 py-2 border border-gray-300 outline-none rounded-xl"
                            placeholder="Enter Email/Phone Number ..."
                        />
                    </div>
                    <div className="lg:mb-4 lg:w-1/2">
                        <label className="block mb-3 font-semibold">Select Country*</label>
                        <select className="w-full px-3 border border-gray-300 focus:outline-none rounded-xl select select-sm text-[10px]">
                            <option>Select Country</option>
                        </select>
                    </div>
                </div>
                <div className="flex flex-col lg:flex-row w-full gap-4 my-4 lg:my-10">
                    <div className="lg:mb-4 lg:w-1/2">
                        <label className="block mb-3 font-semibold">Bank Name*</label>
                        <select className="w-full px-3 border border-gray-300 outline-none rounded-xl select select-sm text-[10px]">
                            <option>Select Bank</option>
                        </select>
                    </div>
                    <div className=" lg:mb-4 lg:w-1/2">
                        <label className="block mb-3 font-semibold"> Bank Account Number* </label>
                        <input
                            type="number"
                            name="accountNumber"
                            className="w-full px-3 py-2 border border-gray-300 focus:outline-none rounded-xl"
                            placeholder="Enter Bank Account Number ...."
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

export default CreateRecipientForm;