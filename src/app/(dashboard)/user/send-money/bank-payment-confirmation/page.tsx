'use client'
import Topbar from '@/components/Topbar';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

import AgentAvater from '../../../../../../public/agent-avater.png';

const page = () => {
    return (
        <>
            <Topbar>Payment Confirmation</Topbar>
            <div className='bg-white min-h-[90vh] max-h-auto my-5 rounded-xl'>
                <div className='w-[95%] lg:w-[45%] mx-auto py-4'>
                    <div className='bg-[#723eeb] py-4 text-center w-full mx-auto rounded-xl text-white'>
                        <h2 className="text-xl font-semibold">Payment Confirmation</h2>
                    </div>

                    <div className='text-xs'>
                        <div className='my-5 flex flex-row justify-between items-center'>
                            <div className='flex flex-row justify-center items-center gap-3'>
                                <Image src={AgentAvater} alt='Agent Avater' />
                                <h4 className="font-semibold ">Agent Name: </h4>
                            </div>
                            <h4>Agent One</h4>
                        </div>
                        <div className='flex flex-row items-center gap-3'>
                            <div className='border border-[#723EEB] flex justify-center items-center w-9 h-9 rounded-full '>
                                <svg width="11" height="11" viewBox="00 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.5 0.682251L5.31771 0.773397L1.15104 2.81767L0.916667 2.93486V3.651H10.0833V2.93486L9.84896 2.81767L5.68229 0.773397L5.5 0.682251ZM5.5 1.61975L7.94792 2.81767H3.05208L5.5 1.61975ZM1.75 4.06767V8.23433H1.33333V9.06767H9.66667V8.23433H9.25V4.06767H8.41667V8.23433H7.58333V4.06767H6.75V8.23433H5.91667V4.06767H5.08333V8.23433H4.25V4.06767H3.41667V8.23433H2.58333V4.06767H1.75ZM0.5 9.48433V10.3177H10.5V9.48433H0.5Z" fill="#723EEB" />
                                </svg>
                            </div>
                            <h3 className="font-semibold">Payment Bank Accounts: </h3>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-10 w-[80%] mx-auto my-3'>
                            <div className='border bg-gradient-to-l from-[#bd7dfb] to-[#df89f2] text-white w-[50%] mx-auto h-28 rounded'>
                                <h5 className="text-[10px] p-2">Bank Name </h5>
                                <div className='flex flex-col justify-end items-end h-full pb-10'>
                                    <div className="text-xs flex flex-row justify-center py-2 border-y border-l border-white w-[83%]">
                                        <h4>ACC : 123345345364</h4>
                                        <div className='flex justify-center items-center ml-1.5'>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#fff" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='border bg-gradient-to-l from-[#bd7dfb] to-[#df89f2] text-white w-[50%] h-28 rounded'>
                                <h5 className="text-[10px] p-2">Bank Name </h5>
                                <div className='flex flex-col justify-end items-end h-full pb-10'>
                                    <div className="text-xs flex flex-row justify-center py-2 border-y border-l border-white w-[83%]">
                                        <h4>ACC : 123345345364</h4>
                                        <div className='flex justify-center items-center ml-1.5'>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#fff" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex flex-row justify-between items-center gap-10 w-[80%] mx-auto my-3'>
                            <div className='border bg-gradient-to-l from-[#bd7dfb] to-[#df89f2] text-white w-[50%] mx-auto h-28 rounded'>
                                <h5 className="text-[10px] p-2">Bank Name </h5>
                                <div className='flex flex-col justify-end items-end h-full pb-10'>
                                    <div className="text-xs flex flex-row justify-center py-2 border-y border-l border-white w-[83%]">
                                        <h4>ACC : 123345345364</h4>
                                        <div className='flex justify-center items-center ml-1.5'>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#fff" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='border bg-gradient-to-l from-[#bd7dfb] to-[#df89f2] text-white w-[50%] h-28 rounded'>
                                <h5 className="text-[10px] p-2">Bank Name </h5>
                                <div className='flex flex-col justify-end items-end h-full pb-10'>
                                    <div className="text-xs flex flex-row justify-center py-2 border-y border-l border-white w-[83%]">
                                        <h4>ACC : 123345345364</h4>
                                        <div className='flex justify-center items-center ml-1.5'>
                                            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#fff" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="w-full my-5">
                            <label className="block mb-1 text-gray-600 font-bold text-[10px]">Payment Reference ID</label>
                            <input
                                type="password"
                                name="endterPIN"
                                className="w-full px-3 py-2 text-[10px] border border-gray-300 rounded-full focus:outline-none"
                                placeholder="Payment Reference ID"
                            />
                        </div>
                        <Link href={'/user/send-money/payment-confirmation'} className="w-full ">
                            <button className="bg-[#723EEB] text-white w-full text-max px-4 py-2 text-xs rounded-full">Confirm Payment</button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default page;