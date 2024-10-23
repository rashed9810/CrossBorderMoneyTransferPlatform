import React from 'react';

import RegistrationForm from '@/components/auth/RegistrationForm';
import Image from 'next/image';
import { BackToHome } from '../login/components';

const Page = () => {
    return (
        <div className="bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full flex items-center justify-center">
            <div className="px-2 lg:px-4 sm:container">
                <div className="lg:flex items-center justify-center gap-10">
                    <div className="hidden lg:block">
                        <div className="lg:block">
                            <Image
                                src="/auth/register_bg.png"
                                width={593}
                                height={463}
                                alt="Registration background image"
                                className="object-contain"
                            />
                        </div>
                    </div>
                    {/* Registration Form Section */}
                    <div className="w-full lg:w-[50%]">
                        <RegistrationForm />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Page;
