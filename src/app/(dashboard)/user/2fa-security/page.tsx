'use client'
import GoogleAuthenticator from '@/components/2fa-security/Google-Authenticator';
import TwoFactor from '@/components/2fa-security/Two-factor';
import Topbar from '@/components/Topbar';


const page = () => {
    return (
        <div>
            <Topbar>2FA Security</Topbar>
            <div className='flex flex-col lg:flex-row gap-5 w-full lg:h-[85vh]'>
                <div className='lg:w-1/2'>
                    <TwoFactor />
                </div>
                <div className='lg:w-1/2'>
                    <GoogleAuthenticator />
                </div>
            </div>
        </div>
    );
};

export default page;