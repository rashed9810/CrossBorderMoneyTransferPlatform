'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
type VerifyEmailProps = 'verified' | 'not-verified' | null | 'pending';

const VerifyEmail = () => {
    const searchParams = useSearchParams();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState('');
    const [isVerified, setIsVerified] = useState<VerifyEmailProps>('pending');
    const router = useRouter();

    useEffect(() => {
        const verifyEmail = async (token: string) => {
            try {
                setIsLoading(true);
                const response = await fetch(
                    `https://diasporex-api.vercel.app/api/v1/auth/verify-email?token=${token}`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    }
                );
                // await emailVerify(token);
                setMessage(
                    'Your email has been verified successfully! You can now login.'
                );
                setIsVerified('verified');
                toast.success('Email verified successfully');
                router.push('/auth/login');
            } catch (error) {
                setMessage(
                    'Verification failed. The token may have expired. Please request a new one.'
                );
                toast.error('Verification failed.');
            } finally {
                setIsVerified('not-verified');
                setIsLoading(false);
            }
        };

        const token = searchParams.get('token');
        if (token) {
            verifyEmail(token);
        }
    }, [searchParams, router]);

    return (
        <div className='bg-white rounded-xl shadow-lg px-5 py-7 w-full max-w-md md:w-[400px] text-center'>
            <>
                {isLoading && !isVerified ? (
                    <div className='mb-4 flex items-center gap-2 justify-center'>
                        <h2 className='text-black text-lg font-semibold '>
                            Verifying your email
                        </h2>
                        <LoadingSpinner className='w-8 h-8' />
                    </div>
                ) : (
                    <h2 className='text-black text-lg font-semibold mb-2'>
                        Email Verification
                    </h2>
                )}
            </>
            <p className='text-gray-700 text-sm mb-4'>
                {isLoading
                    ? 'Please wait while we verify your email...'
                    : message}
            </p>
            {isVerified === 'verified' && (
                <button
                    className='bg-first-950 text-white font-medium text-sm border border-first-500 py-2 px-4 rounded-md hover:bg-first-1000 transition duration-200 w-full'
                    onClick={() => {
                        router.push('/auth/login');
                    }}
                >
                    Go to Login
                </button>
            )}

            {isVerified === 'not-verified' && (
                <button
                    className='bg-first-950 text-white font-medium text-sm border border-first-500 py-2 px-4 rounded-md hover:bg-first-1000 transition duration-200 w-full'
                    onClick={() => {
                        router.push('/auth/forget-password');
                    }}
                >
                    Resend Email
                </button>
            )}

            {isVerified === 'pending' && (
                <button className='bg-first-950 text-white font-medium text-sm border border-first-500 py-2 px-4 rounded-md hover:bg-first-1000 transition duration-200 w-full'>
                    <LoadingSpinner className='w-5 h-5' />
                </button>
            )}
        </div>
    );
};

export default VerifyEmail;