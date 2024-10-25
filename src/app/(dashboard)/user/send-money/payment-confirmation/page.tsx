'use client'
import Topbar from '@/components/Topbar';
import Link from 'next/link';

import React from 'react';

const page = () => {
    return (
        <div>
            <Topbar>Payment Confirmation</Topbar>
            <div className='h-screen mt-10'>
                <div className='bg-white w-full space-y-4 flex flex-col items-center py-8 rounded-xl'>
                    <div className='w-8 lg:w-12 h-8 lg:h-12 flex justify-center items-center rounded-full p-2 bg-[#723EEB]'>
                        <svg width="38" height="32" viewBox="0 0 28 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M26.533 0.731445L8.89749 18.367L1.46697 10.9365L0 12.4034L8.16401 20.5674L8.89749 21.269L9.63098 20.5674L28 2.19842L26.533 0.731445Z" fill="white" />
                        </svg>
                    </div>
                    <h3 className="text-xs lg:text-base font-semibold">Your Withdraw Is Successfully Completed</h3>

                    <div className="flex flex-row items-end text-xs lg:text-base w-full px-5">
                        <div className='w-full '>
                            <label className="block mb-1 text-gray-600 font-semibold text-sm ">Transaction ID</label>
                            <input
                                className='w-full px-3 py-2.5 border-[1px] border-gray-300  text-xs outline-0 rounded-tl-[15px] rounded-bl-[15px]'
                                type="text"
                                name="qrcode"
                                placeholder='Transaction ID'
                                readOnly

                            />
                        </div>
                        <div className='border-y-[1px] border-gray-400 w-12 h-[37px] flex justify-center items-center'>
                            <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                            </svg>
                        </div>
                        <div className='border-[1px] border-gray-400 w-12 h-[37px] p-4 flex justify-center items-center rounded-tr-[15px] rounded-br-[15px] bg-[#723EEB]'>
                            <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                            </svg>
                        </div>
                    </div>

                    <div className="flex flex-row items-end text-xs lg:text-base w-full px-5">
                        <div className='w-full '>
                            <label className="block mb-1 text-gray-600 font-semibold text-sm ">Track Your Transaction</label>
                            <input
                                className='w-full px-3 py-2.5 border border-gray-300 text-xs outline-0 rounded-tl-[15px] rounded-bl-[15px] font-semibold placeholder:text-[#733ebc]'
                                type="text"
                                name="qrcode"
                                placeholder='www.diasporex.com/something/3232434'
                            />
                        </div>
                        <div className='border-y border-gray-300 w-12 h-[37px] flex justify-center items-center'>
                            <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                            </svg>
                        </div>
                        <div className='border border-gray-300 w-12 h-[37px] p-4 flex justify-center items-center rounded-tr-[15px] rounded-br-[15px] bg-[#723EEB]'>
                            <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                            </svg>
                        </div>
                    </div>

                    <div className='flex flex-row gap-3 w-full px-5'>
                        <Link href={"/user/send-money"} className='w-[50%]'>
                            <button className="text-xs bg-[#723EEB] text-white w-full p-2 lg:p-3 rounded-full font-semibold">Send Money Again</button>
                        </Link>
                        <Link href={"/user/dashboard"} className='w-[50%]'>
                            <button className="text-xs bg-[#723EEB] text-white w-full p-2 lg:p-3 rounded-full font-semibold">Go To Dashboard</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default page;