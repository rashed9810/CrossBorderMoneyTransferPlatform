'use client';
import ForgetPassword from '@/components/forgetPassword/ForgetPassword';

const page = () => {
    return (
        <div className='flex items-center bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full  justify-center'>
            <div className='px-4 max-w-[1200px] mx-auto'>
                <div className='md:flex md:justify-between gap-5 h-[288px]'>
                    {/* <div className='h-full md:w-[40%] hidden md:block'>
                        <Image
                            src="/auth/login_bg.png"
                            alt='Diasporex Avatar'
                            className='h-full w-full md:object-contain '
                            height={100}
                            width={100}
                        />
                    </div> */}
                    <div className='w-[100%] md:w-[60%]'>
                        <ForgetPassword />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default page;







