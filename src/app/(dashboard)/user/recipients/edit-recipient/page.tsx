'use client'
import Topbar from '@/components/Topbar';
import LoadingSpinner from '@/components/common/Loading/LoadingSpinner';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import useCurrency from '@/components/hooks/useCurrency';
import useSingleRecipient from '@/components/hooks/useSingleRecipient';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import UserProfile from '../../../../../../public/user-avater.png';

interface FormData {
    fullName: string;
    email: string;
    phoneNumber: string;
    country: string;
    city: string;
    bankName: string;
    accountNumber: string;
}

const EditRecipientPage = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [loading, setLoading] = useState(false);
    const searchParams = useSearchParams();
    const id = searchParams.get('id');
    const [singleRecipient, refetch]: any = useSingleRecipient(id as string | null);
    const [currency] = useCurrency();
    const { fullName, email, phone, city, bankName, accountNumber } = singleRecipient;
    const axiosInstance = useAxiosSecure();

    useEffect(() => {

        setValue('fullName', singleRecipient?.fullName);
        setValue('email', singleRecipient?.email);
        setValue('phoneNumber', singleRecipient?.phone);
        setValue('city', singleRecipient?.city);
        setValue('bankName', singleRecipient?.bankName);
        setValue('accountNumber', singleRecipient?.accountNumber);
        setValue('country', singleRecipient?.country);

    }, [singleRecipient, setValue]);

    const onSubmit = async (data: any) => {
        const updatedInfo = {
            fullName: data?.fullName,
            email: data?.email,
            phone: data?.phoneNumber,
            city: data?.city,
            bankName: data?.bankName,
            accountNumber: data?.accountNumber,
            country: data?.country,
        }

        setLoading(true);
        try {
            const res = await axiosInstance.patch(`/recipient/${id}`, updatedInfo);
            if (res.status === 200) {
                refetch();
                setLoading(false);
                toast.success("Recipient updated successfully");
            }
        } catch (error: any) {
            setLoading(false);
            toast.error("There is something wrong");
        }
    }

    return (
        <div>
            <Topbar>Edit Recipient</Topbar>
            <form onSubmit={handleSubmit(onSubmit)} className='bg-white px-5 my-10 rounded-xl py-5'>
                <div className='relative'>
                    <label className='block text-[14px] cursor-pointer w-32'>
                        <input className='hidden' type="file" name="" id="" />
                        <Image className='rounded-full' src={UserProfile} width={100} height={80} alt='profileImage'></Image>
                        <div className='absolute ml-[74px] -mt-9'>
                            <svg width="30" height="30" className='bg-[#723EEB] p-1 rounded-full' viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M3.5 0L3.22049 0.197183L0.498264 2.20487L1.05729 2.61716L3.11111 1.10243V5.85275H3.88889V1.10243L5.94271 2.61716L6.50174 2.20487L3.77951 0.197183L3.5 0ZM0 6.42638V7H7V6.42638H0Z" fill="white" />
                            </svg>
                        </div>
                    </label>
                    <div className='w-24'>
                        <h3 className="font-semibold text-xs mt-1 text-center text-[#723EEB]">DPX0005</h3>
                    </div>
                </div>
                {/* Full name Field */}
                <div className="my-3">
                    <label className="text-gray-700 text-[14px] font-semibold">Full Name*</label>
                    <input
                        type="text"
                        {...register("fullName", {
                            minLength: 2
                        })}
                        className={`mt-3 w-full px-3 text-[14px] py-2 border border-gray-300 rounded-xl focus:outline-none`}
                        placeholder="Samit Kumar Baral"
                        defaultValue={fullName}
                    />
                    {errors.fullName?.type == "minLength" && (
                        <span className='text-red-600 text-xs -mt-5'>Full Name must be atleast 2 characters</span>
                    )}
                </div>
                {/* Email Field */}
                <div className="mb-3">
                    <label className="text-gray-700 text-[14px] font-semibold">Email</label>
                    <input
                        type="email"
                        {...register("email", {
                        })}
                        className={`mt-3 w-full px-3 text-[14px] py-2 border border-gray-300 rounded-xl focus:outline-none`}
                        placeholder="samit2021@gmail.com"
                        defaultValue={email}
                    />
                </div>
                {/* Phone number Field */}
                <div className="mb-3">
                    <label className="text-gray-700 text-[14px] font-semibold">Phone Number</label>
                    <input
                        type="number"
                        {...register("phoneNumber", {
                            minLength: 11
                        })}
                        className={`mt-3 w-full px-3 text-[14px] py-2 border border-gray-300 rounded-xl focus:outline-none`}
                        placeholder="+8801********"
                        defaultValue={phone}
                    />
                    {errors.phoneNumber?.type == "minLength" && (
                        <span className='text-red-600 text-xs -mt-5'>Phone Number must be atleast 11 characters</span>
                    )}
                </div>
                {/* country and city */}
                <div className="flex flex-col lg:flex-row w-full gap-4 mb-4">
                    <div className="lg:w-1/2 w-full">
                        <label className="block text-[14px] mb-3 font-semibold">Select Country*</label>
                        <select
                            {...register("country")}
                            className={`w-full px-3 text-[14px] py-2 border border-gray-300 outline-none rounded-xl cursor-pointer`}
                        >
                            {
                                currency?.map((currency: any) => (
                                    <option key={currency.id}
                                        value={currency?.country}
                                        defaultChecked={currency?.country}
                                    >
                                        {currency?.country}
                                    </option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <label className="block text-[14px] mb-3 font-semibold">City*</label>
                        <input
                            type="text"
                            {...register("city")}
                            className={`w-full px-3 text-[14px] py-2 border ${errors.city ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                            placeholder="Enter City ..."
                            defaultValue={city}
                        />
                    </div>
                </div>
                {/* bank name and acc number */}
                <div className="flex flex-col lg:flex-row w-full gap-4 mb-4">
                    <div className="lg:w-1/2 w-full">
                        <label className="block text-[14px] mb-3 font-semibold">Bank Name*</label>
                        <input
                            type="text"
                            {...register("bankName",)}
                            className={`w-full px-3 text-[14px] py-2 border ${errors.bankName ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                            placeholder="Enter Bank Name ..."
                            defaultValue={bankName}
                        >
                        </input>
                    </div>
                    <div className="lg:w-1/2 w-full">
                        <label className="block text-[14px] mb-3 font-semibold">Bank Account Number*</label>
                        <input
                            type="text"
                            {...register("accountNumber", {
                                pattern: {
                                    value: /^[0-9]+$/,
                                    message: "Account number must only contain digits",
                                },
                                minLength: {
                                    value: 10,
                                    message: "Account number must be at least 10 digits long",
                                },
                            })}
                            className={`w-full px-3 text-[14px] py-2 border ${errors.accountNumber ? "border-red-500" : "border-gray-300"} outline-none rounded-xl`}
                            placeholder="Enter Bank Account Number ..."
                            defaultValue={accountNumber}
                        />
                    </div>
                </div>
                {/* button */}
                <button
                    type="submit"
                    className="bg-[#723EEB] text-white w-full text-max px-4 py-1 text-xs rounded"
                >
                    {
                        loading ? <LoadingSpinner className="h-4 w-4" /> : 'Confirm'
                    }
                </button>
                {/* {submitError && <div className="text-red-500 mt-4">{submitError}</div>} */}

            </form>
        </div>
    );
};

export default EditRecipientPage;