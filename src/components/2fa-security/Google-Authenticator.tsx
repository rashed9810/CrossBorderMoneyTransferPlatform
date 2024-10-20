import React from 'react';
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import GooglePlayImage from '../../../public/googlePlay.png';
import Image from 'next/image';

const GoogleAuthenticator = () => {
    return (
        <div>
            <CardSubTitle title='Google Authenticator' />
            <div className='bg-white px-3 py-4 space-y-4 rounded-xl my-5'>
                <h4 className="text-xs font-bold">Google Authenticator</h4>
                <p className='text-[10px]'>Google Authenticator is a product based authenticator by Google that executes two-venture confirmation administrations for verifying clients of any programming applications</p>
                <div className='flex flex-col justify-center items-center mt-5'>
                    <Image src={GooglePlayImage} alt='QRcode' />
                    <div className='w-[70%] my-5'>
                        <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded font-semibold">Download App</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthenticator;