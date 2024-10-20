import Image from 'next/image';
import React from 'react';
import profile from '../../../public/user-avater.png';

const SecondaryKycForm = () => {
    return (
        <div>
            <div className='lg:w-1/2 px-2 lg:px-0 mx-auto my-10'>
                <div className='text-center mb-14 space-y-2'>
                    <h1 className="text-xl font-bold">Upload a proof of your identity</h1>
                    <p className='text-xs'>DiasporeX Requires a valid government issue ID(drivers license,passport,national ID)</p>
                </div>
                <form className='text-xs'>
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
                        <div className="w-full">
                            <label className="block mb-3 text-gray-700 font-bold">Full Name</label>
                            <input
                                type="text"
                                name="fullName"
                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter City ..."
                            />
                        </div>
                        <div className="w-full">
                            <label className="block mb-3 text-gray-700 font-bold">Email</label>
                            <input
                                type="email"
                                name="email"
                                className="w-full px-3 py-2 border border-gray-300 rounded-xl focus:outline-none"
                                placeholder="Enter State ..."
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-7">
                        <div className=" w-full">
                            <label className="block mb-3 text-gray-700 font-bold">Country*</label>
                            <select className="w-full px-3 border border-gray-300 rounded-xl focus:outline-none select select-sm text-[10px]">
                                <option>Select Country</option>
                            </select>
                        </div>
                        <div className=" w-full">
                            <label className="block mb-3 text-gray-700 font-bold">Document Type*</label>
                            <select className="w-full px-3 border border-gray-300 rounded-xl focus:outline-none select select-sm text-[10px]">
                                <option>Document Type</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex flex-row justify-between w-full gap-3 lg:gap-10 my-3 h-52 mt-12">
                        <label className="block text-gray-700 space-y-3 w-1/2 ">
                            <div className='flex flex-row justify-between font-bold'>
                                <h1>Front Part</h1>
                                <h1>Back Part</h1>
                            </div>
                            <div className='border-[1.5px] border-gray-200 rounded-xl border-dashed flex flex-col justify-center h-44'>
                                <input
                                    type="file"
                                    name="backPart"
                                    className='hidden'
                                />
                                <div className=" cursor-pointer px-3">
                                    <svg
                                        className="text-[#723EEB] w-5 mx-auto mb-2"
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
                                    <div className='text-center '>
                                        Drop your file or <span className='text-[#723EEB] font-semibold underline'>
                                            Click
                                        </span> to select
                                    </div>
                                </div>
                            </div>
                        </label>
                        <div className='w-1/2'>
                            <div className='border border-black w-full h-[203px] flex flex-col rounded-[10px]'>
                                <div className='flex flex-col justify-center items-center h-full'>
                                    <Image className='rounded-xl' src={profile} width={100} height={100} alt="face" />
                                </div>
                                <div className='mb-4 w-1/2 mx-auto'>
                                    <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded-2xl">Facial Verification</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className='flex justify-between items-center mt-4'>
                        <div>
                            <input type="checkbox" name="checkbox" id="checkbox" />
                            <label htmlFor="checkbox" className='font-semibold ml-1'>Confirm that i uploaded valid government-issued photo ID.This ID include my picture, signature,name,date of birth and address.</label>
                        </div>
                    </div>
                    <div className='w-full pt-5 pb-7'>
                        <input className='w-full bg-[#723EEB] text-white p-1 rounded-[5px]' type="submit" value="Apply" />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default SecondaryKycForm;