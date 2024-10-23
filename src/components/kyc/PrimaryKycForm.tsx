
import Link from 'next/link';
import React from 'react';

const PrimaryKycForm = () => {
    return (
        <div className='bg-white px-2 lg:px-6 pt-10 rounded-xl text-xs'>
            <div className="w-full">
                <label className="block mb-3 text-gray-700 font-bold">Full Name*</label>
                <input
                    type="text"
                    name="fullName"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                    placeholder="Enter Full Name ..."
                />
            </div>
            <div className="w-full my-3">
                <label className="block mb-3 text-gray-700 font-bold">Email</label>
                <input
                    type="email"
                    name="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                    placeholder="Enter Email ..."
                />
            </div>
            <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
                <div className=" w-full">
                    <label className="block mb-3 text-gray-700 font-bold">Country*</label>
                    <select className="w-full px-3 border border-gray-300 rounded-xl focus:outline-none select select-sm text-[10px]">
                        <option>Select Country</option>
                    </select>
                </div>
                <div className="w-full">
                    <label className="block mb-3 text-gray-700 font-bold">City</label>
                    <input
                        type="text"
                        name="city"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="Enter City ..."
                    />
                </div>
                <div className="w-full">
                    <label className="block mb-3 text-gray-700 font-bold">State</label>
                    <input
                        type="text"
                        name="state"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="Enter State ..."
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                <div className=" lg:w-1/2">
                    <label className="block mb-3 text-gray-700 font-bold">Zip Code</label>
                    <input
                        type="text"
                        name="zip_code"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="Enter Zip Code ..."
                    />
                </div>
                <div className="lg:w-1/2">
                    <label className="block mb-3 text-gray-700 font-bold">Phone</label>
                    <input
                        type="text"
                        name="phone"
                        className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                        placeholder="Enter Phone ..."
                    />
                </div>
            </div>
            <div className="w-full my-3">
                <label className="block mb-3 text-gray-700 font-bold">Address</label>
                <input
                    type="text"
                    name="address"
                    className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                    placeholder="Enter Address ..."
                />
            </div>
            <div className="flex flex-col lg:flex-row justify-between items-start w-full gap-3 lg:gap-10 my-3">
                <div className="mb-4 w-full">
                    <label className="block mb-3 text-gray-700 font-bold">Document Type*</label>
                    <select className="w-full px-3 border border-gray-300 rounded-xl focus:outline-none select select-sm text-[10px]">
                        <option>Select Document Type</option>
                    </select>
                </div>
                <div className="w-full ">
                    <label className="block text-gray-700 font-bold space-y-3">
                        <h1>Front Part</h1>
                        <div className='border-[1.5px] border-gray-200 rounded-xl border-dashed h-16'>
                            <input
                                type="file"
                                name="backPart"
                                className='hidden'
                            />
                            <div className="my-2 cursor-pointer">
                                <svg
                                    className="text-[#723EEB] mx-auto w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <div className='text-center'>
                                    Drop your file or <span className='text-[#723EEB] font-semibold underline'>
                                        Click
                                    </span> to select
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
                <div className="w-full ">
                    <label className="block text-gray-700 font-bold space-y-3">
                        <h1>Back Part</h1>
                        <div className='border-[1.5px] border-gray-200 rounded-xl border-dashed h-16'>
                            <input
                                type="file"
                                name="backPart"
                                className='hidden'
                            />
                            <div className="my-2 cursor-pointer">
                                <svg
                                    className="text-[#723EEB] mx-auto w-6"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                </svg>
                                <div className='text-center'>
                                    Drop your file or <span className='text-[#723EEB] font-semibold underline'>
                                        Click
                                    </span> to select
                                </div>
                            </div>
                        </div>
                    </label>
                </div>
            </div>
            <div className='pt-3 pb-5'>
                <Link href={'/user/recipients'} className="w-full">
                    <button className="bg-[#723EEB] text-white w-full text-max px-4 py-1 text-xs rounded">Confirm</button>
                </Link>
            </div>
        </div>
    );
};

export default PrimaryKycForm;