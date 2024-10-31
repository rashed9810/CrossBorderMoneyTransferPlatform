import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import TextInputKYC from './TextInputField';
import InputSelectKyc from './InputSelectKYC';
import PrimaryFileUpload from './PrimaryFileUpload';
import toast from 'react-hot-toast';
import { useKYC } from '@/context/useKyc';
import useUserProfile from '../hooks/useUserProfile';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpinner from '../LoaderSpinner';

const PrimaryKycForm = () => {
    const { setPrimaryKycData } = useKYC();
    const [loading, setLoading] = useState(false);
    const [profileFilePath, setProfileFilePath] = useState<string | null>(null);
    const [backProfileFilePath, setBackProfileFilePath] = useState<string | null>(null);
    const [user, refetch] = useUserProfile();
    const { city, address, phoneNumber, state, zipCode, country, email, fullName } = user;
    const axiosInstance = useAxiosSecure();
    const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();

    useEffect(() => {
        setValue("fullName", user?.name)
        setValue("email", user?.email)
        setValue("country", user?.country)
        setValue("city", user?.city)
        setValue("state", user?.state)
        setValue("zip_code", user?.zipCode)
        setValue("phone", user?.phoneNumber)
        setValue("address", user?.address)
    }, [setValue, user]);

    const onSubmit = async (data: any) => {
        const formData = new FormData();
        const kycInfo = {
            fullName: data.fullName,
            country: data.country.value,
            phone: data.phone,
            address: data.address,
            city: data.city,
            state: data.state,
            zipCode: data.zip_code.toString(),
            email: data.email,
            documentType: data.documentType.value
        };

        formData.append('data', JSON.stringify(kycInfo));
        formData.append('frontPartDoc', profileFilePath as string);
        formData.append('backPartDoc', backProfileFilePath as string);

        setLoading(true);
        // console.log(formData);
        axiosInstance.post('/kyc', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        }).then(() => {
            refetch();
            toast.success("KYC is completed");
            setLoading(false);
        }).catch((error) => {
            toast.error(error?.response?.data?.message);
            setLoading(false);
        })
    };

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className='bg-white px-2 lg:px-6 pt-10 rounded-xl text-xs'
        >
            <div className="w-full">
                <TextInputKYC
                    label="Full Name"
                    name="fullName"
                    register={register}
                    validation={{ required: 'Full Name is required' }}
                    errors={errors}
                    placeholder="Enter Full Name ..."
                    value={fullName}
                />
            </div>
            <div className="w-full my-3">
                <TextInputKYC
                    label="Email"
                    name="email"
                    register={register}
                    validation={{ required: 'Email is required' }}
                    errors={errors}
                    placeholder="Enter Email ..."
                    value={email}
                />
            </div>
            <div className="flex flex-col lg:flex-row justify-between w-full gap-3 lg:gap-10 my-3">
                <div className="w-full">
                    <InputSelectKyc
                        name="country"
                        error="Country is Required"
                        label="Country"
                        placeholder="Select Country"
                        control={control}
                        borderColor={true}
                        value={country}
                    />
                </div>
                <div className="w-full">
                    <TextInputKYC
                        label="City"
                        name="city"
                        register={register}
                        validation={{ required: 'City is required' }}
                        errors={errors}
                        placeholder="Enter City ..."
                        value={city}
                    />
                </div>
                <div className="w-full">
                    <TextInputKYC
                        label="State"
                        name="state"
                        register={register}
                        validation={{ required: 'State is required' }}
                        errors={errors}
                        placeholder="Enter State ..."
                        value={state}
                    />
                </div>
            </div>
            <div className="flex flex-col lg:flex-row w-full gap-4 my-3">
                <div className="lg:w-1/2">
                    <TextInputKYC
                        label="Zip Code"
                        name="zip_code"
                        register={register}
                        validation={{ required: 'Zip Code is required' }}
                        errors={errors}
                        placeholder="Enter Zip Code ..."
                        value={zipCode}
                    />
                </div>
                <div className="lg:w-1/2">
                    <TextInputKYC
                        label="Phone"
                        name="phone"
                        register={register}
                        validation={{ required: 'Phone is required' }}
                        errors={errors}
                        placeholder="Enter Phone ..."
                        value={phoneNumber}
                    />
                </div>
            </div>
            <div className="w-full my-3">
                <TextInputKYC
                    label="Address"
                    name="address"
                    register={register}
                    validation={{ required: 'Address is required' }}
                    errors={errors}
                    placeholder="Enter Address ..."
                    value={address}
                />
            </div>
            <PrimaryFileUpload control={control} errors={errors} register={register} setProfileFilePath={setProfileFilePath} setBackProfileFilePath={setBackProfileFilePath} />
            <div className='pt-3 pb-5'>
                <button
                    type="submit"
                    className="bg-[#723EEB] py-[6px] text-white w-full text-max px-4 lg:text-sm text-xs rounded"
                >
                    {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'}
                </button>
            </div>
        </form>
    );
};

export default PrimaryKycForm;
