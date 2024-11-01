'use client'
import Image from 'next/image';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import UserProfile from '../../../public/user-avater.png';
import UserCover from '../../../public/user-cover.png';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useUserProfile from '../hooks/useUserProfile';

interface FormData {
    country: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    image?: File;
};

const UserUpdateForm = () => {
    const { register, handleSubmit, formState: { errors }, setValue } = useForm<FormData>();
    const [user, refetch] = useUserProfile();
    const axiosInstance = useAxiosSecure();
    const { city, address, phoneNumber, state, zipCode, country, email, name, dpxId, isKycVerified } = user;
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        setValue('country', user?.country);
        setValue('address', user?.address);
        setValue('phone', user?.phoneNumber);
        setValue('city', user?.city);
        setValue('state', user?.state);
        setValue('zipCode', user?.zipCode);

    }, [user, setValue]);

    const onSubmit = async (data: FormData) => {
        const formData = new FormData();

        const userUpdateInfo = {
            country: data.country,
            phoneNumber: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: parseInt(data.zipCode),
        };

        formData.append('data', JSON.stringify(userUpdateInfo));
        setLoading(true);
        axiosInstance.post('/user/profile', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then((res) => {
            refetch();
            toast.success("Your information has been updated");
            setLoading(false);
        }).catch((error) => {
            toast.error(error?.response?.data?.message);
            setLoading(false);
        });

    }

    return (
        <div className='my-6 bg-white rounded-xl h-[90%]'>

            <div className='w-full h-40 relative rounded-t-xl overflow-hidden'>
                <Image
                    src={UserCover}
                    layout='fill'
                    objectFit='cover'
                    alt='cover-photo'
                />
            </div>
            <div className='mx-7 relative'>
                <div className='flex flex-row gap-4 absolute lg:-mt-2'>
                    <div>
                        <label className='block cursor-pointer'>
                            {/* <input className='hidden' type="file" name="" id="" /> */}
                            <input
                                {...register("image", { required: false })}
                                type="file"
                                // placeholder="Select Image"
                                className="text-sm cursor-pointer w-52 hidden"
                            />
                            <Image className='rounded-full' src={UserProfile} width={60} height={40} alt='profileImage'></Image>
                            <div className='absolute ml-12 -mt-7'>
                                <svg width="18" height="18" className='bg-[#723EEB] p-1 rounded-full' viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3.5 0L3.22049 0.197183L0.498264 2.20487L1.05729 2.61716L3.11111 1.10243V5.85275H3.88889V1.10243L5.94271 2.61716L6.50174 2.20487L3.77951 0.197183L3.5 0ZM0 6.42638V7H7V6.42638H0Z" fill="white" />
                                </svg>
                            </div>
                        </label>

                        <h3 className="font-semibold text-xs mt-1 text-[#723EEB]">ID : {dpxId}</h3>

                    </div>
                    <div>
                        <h3 className="text-xs font-semibold text-[#723EEB]">{name}</h3>
                        {isKycVerified ? <span className='border border-green-600 text-green-600 text-[10px] px-1 rounded font-semibold'>Verified</span> : <span className='border border-red-600 text-red-600 text-[10px] px-1 rounded font-semibold'>Unverified</span>}
                        <p className='text-[10px] text-gray-400 mt-2'>{email}</p>
                    </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className='pt-20'>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">Country*</label>
                            <input
                                type="text"
                                {...register("country", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter Country..."
                                defaultValue={country}

                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">Phone</label>
                            <input
                                type="text"
                                {...register("phone", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter Phone..."
                                defaultValue={phoneNumber}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">Address</label>
                            <input
                                type="text"
                                {...register("address", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter Address..."
                                defaultValue={address}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">City</label>
                            <input
                                type="text"
                                {...register("city", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter City..."
                                defaultValue={city}
                            />
                        </div>
                    </div>
                    <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">State</label>
                            <input
                                type="text"
                                {...register("state", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter State..."
                                defaultValue={state}
                            />
                        </div>
                        <div className="lg:w-1/2">
                            <label className="text-gray-600 font-semibold text-sm">Zip Code</label>
                            <input
                                type="string"
                                {...register("zipCode", {
                                    disabled: isKycVerified && true
                                })}
                                className={`mt-1 w-full px-3 py-1 text-sm border border-gray-300 rounded-xl focus:outline-none`}
                                placeholder="Enter Zip..."
                                defaultValue={zipCode}
                            />
                        </div>
                    </div>
                    <div className="w-3/4 mx-auto pb-3 lg:pb-0 lg:mt-5">
                        <button
                            type="submit"
                            disabled={isKycVerified && true}
                            className={`w-full ${isKycVerified ? 'cursor-not-allowed' : 'cursor-pointer'} bg-[#723EEB] text-white p-1 rounded-[5px] text-sm`}>
                            {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Update'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default UserUpdateForm;