
import React, { useState } from 'react';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/Loading/LoadingSpinner';

interface FormData {
    email: string;
}

const ForgetPassword = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { setOpenForgetPassword, setMessage }: any = useNavigationContext();
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    async function onSubmit(values: any) {
        const email = values.email;
        if (email) {
            try {
                setLoading(true);
                // const res = await axios.post(values.email);
                const res = await fetch(
                    `https://diasporex-api.vercel.app/api/v1/auth/forgot-password`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({ email })
                    }
                );
                console.log(res);

                if (res?.status === 200) {
                    setLoading(false);
                    toast.success('Password reset link sent to your email');
                    reset();
                } else {
                    toast.error("No User found on this email");
                    setLoading(false);
                }
            } catch (err: Error | any) {
                setLoading(false);
                toast.error("There is something wrong");
                setError('Please provide a valid email');
            }
        }
    }

    // const onSubmit = async (data: FormData) => {
    //     setError('');
    //     try {
    //         const email = data.email;
    //         const res = await axios.post('https://diasporex-api.vercel.app/api/v1/auth/forgot-password', { email });
    //         if (res.status === 200) {
    //             toast('You request has been proceeded');
    //             setMessage(true);
    //         }
    //     } catch (error: any) {
    //         if (error.response.status === 404) {
    //             setError("Please provide a valid email");
    //         }
    //     };
    // }

    return (
        <div className='bg-white p-5 h-[100%] w-[550px] rounded-xl'>
            <h1 className=" font-semibold">Forgot Password?</h1>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-8 mt-5'>
                {/* Email Field */}
                <div className="mb-4">
                    <label className='text-xs'>Enter your email and we will send you a link to reset your password.</label>
                    <input
                        type="text"
                        {...register("email", {
                            required: "Email is required",
                            // pattern: {
                            //   value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            //   message: "Custom error: Enter a valid email address",
                            // },
                        })}
                        className={`border border-gray-300 text-gray-900 text-sm rounded-xl block w-full p-2.5 dark:border-gray-600 focus:outline-none bg-white mt-1`}
                        placeholder="name@gmail.com"
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-xs mt-1">Please give your email</p>
                    )}

                    {error && (
                        <p className="text-red-500 text-xs mt-1">{error}</p>
                    )}

                </div>
                <div className="">
                    <button
                        type="submit"
                        className="w-full md:px-4 py-2.5 bg-[#723EEB] text-white text-xs rounded-3xl hover:bg-[#6129e6] duration-500"
                    >
                        {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Send Link'}
                    </button>
                </div>
                <div className="text-center flex justify-center mb-4 items-center gap-1">
                    <div className="text-black text-sm flex justify-center items-center">
                        Already Have An Account?
                        <div
                            className="text-end text-[#723EEB] text-sm font-medium cursor-pointer ml-1"
                        >
                            <Link href={'/auth/login'}>
                                Login Now
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default ForgetPassword;