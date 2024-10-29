'use client'
import Image from 'next/image';
import { BackToHome } from './components';
import LoginForm from './components/LoginForm';
import useNavigationContext from '@/components/NavigationContext/useNavigationContext';
import ForgetPassword from '@/components/forgetPassword/ForgetPassword';
import Link from 'next/link';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

const LoginPage = () => {
  const { message, setMessage }: any = useNavigationContext();
  const { data: session, status } = useSession();
  const router = useRouter();
  

  return (
    <div className='bg-gradient-to-r from-pink-200 to-blue-200 min-h-screen w-full flex items-center justify-center'>
      <div className='px-2 lg:px-4 sm:container'>
        {message ? (
          <div>
            <h1 className="font-semibold text-black">Please Check Your Email to reset your password</h1>
            <div className='text-center'>
              <Link
                onClick={() => setMessage(false)}
                href="/auth/login"
                className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
              >
                Login Now
              </Link>
            </div>
          </div>
        ) : (
          <div className='sm:flex items-center justify-center gap-5 '>
            <div className='relative lg:block '>
              <div className='hidden lg:block h-full mt-3'>
                <Image
                  src="/auth/login_bg.png"
                  width={500}
                  height={460}
                  alt="Picture of the author"
                />
              </div>
            </div>
            <div className='w-full sm:w-[70%] lg:w-[40%]'>
              <LoginForm />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default LoginPage
