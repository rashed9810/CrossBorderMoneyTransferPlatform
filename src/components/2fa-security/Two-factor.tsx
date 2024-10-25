import React from 'react';
import Image from 'next/image';


import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import QRcodeImage from '../../../public/qrcode.png';

const TwoFactor = () => {
    return (
        <div>
            <CardSubTitle title='Two Factor Authenticator' />
            <div className='bg-white p-4 my-5 rounded-xl'>
                <h5 className="text-xs text-gray-400 font-semibold">QRcode Share</h5>
                <div className="flex flex-row items-center text-xs lg:text-base my-2">
                    <input
                        className='w-full px-3 py-1 border border-gray-300 text-xs outline-0 rounded-l'
                        type="text"
                        name="qrcode" 
                        placeholder='MBCE2JDRJQI77J5X'
                        />
                    <div className='border border-gray-300 w-[25.5px] h-[25.5px] flex justify-center items-center'>
                        <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                        </svg>
                    </div>
                    <div className='border border-gray-300  w-[25.5px] h-[25.5px] flex justify-center items-center rounded-r bg-[#723EEB]'>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                        </svg>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-5'>
                    <Image src={QRcodeImage} alt='QRcode' />
                    <div className='w-3/4 my-5'>
                        <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded font-semibold">Enable</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TwoFactor;