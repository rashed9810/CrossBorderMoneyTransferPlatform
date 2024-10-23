'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';

interface ModalProps {
    handleForgetPIN: () => void;
    mainWallet?: any;
    // subWalletData?: any;
    setChangePINModalOpen: (value: boolean) => void;
};

interface FormData {
    currentPin: number;
    newPin: number;
    confirmNewPin: number;
};

const ChangePINForm: React.FC<ModalProps> = ({ handleForgetPIN, mainWallet, setChangePINModalOpen }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [showCurrentPin, setShowCurrentPin] = useState(false);
    const [showNewPin, setShowNewPin] = useState(false);
    const [showConfirmNewPin, setShowConfirmNewPin] = useState(false);
    const axiosInstance = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const { subWalletData }: any = useNavigationContext();

    const onSubmit = async (data: any) => {
        const oldPin = parseInt(data?.currentPin);
        const newPin = parseInt(data?.newPin);
        const confirmNewPin = parseInt(data?.confirmNewPin);

        const changedPinInfo = {
            walletId: mainWallet?.id || subWalletData?.id,
            oldPin,
            newPin,
        };
        setLoading(true);
        try {
            if (newPin !== confirmNewPin) {
                toast.error("New Pin doesn't match");
            } else {
                const res = await axiosInstance.put('/wallet/change-pin', changedPinInfo)

                if (res?.status === 200) {
                    reset();
                    setChangePINModalOpen(false);
                    setLoading(false);
                    toast.success("Pin successfully changed");
                }
            }
        } catch (error: any) {
            if (error) {
                setError("Your pin is wrong");
                reset();
            }
        }
        setLoading(false);
    }

    return (
        <div>
            {/* balance */}
            <div className='my-1'>
                <h3 className="">{mainWallet ? 'Main' : 'Sub'} Wallet: {mainWallet?.walletName || subWalletData?.walletName}</h3>
            </div>
            <div className='mt-1 mb-5'>
                <h2 className="">Wallet ID : {mainWallet?.walletId || subWalletData?.walletId}</h2>

            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Current Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600 font-semibold">Enter Current PIN</label>
                    <div className="relative">
                        <input
                            type={showCurrentPin ? 'text' : 'password'}
                            {...register("currentPin", {
                                required: "Pin is required",
                                minLength: 4,
                                pattern: /^[0-9]*$/
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPin(!showCurrentPin)}
                            className="absolute top-3 right-4 text-[14px]"
                        >
                            {showCurrentPin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.currentPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}

                    {errors.currentPin?.type === 'pattern' && (
                        <p className="text-red-500 text-xs">Pin must be a number</p>
                    )}
                    {errors.currentPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                    {error && (
                        <p className="text-red-500 text-xs">Your pin is wrong</p>
                    )}

                </div>
                {/* forget pin */}
                <div className='flex flex-row justify-end'>
                    <button
                        onClick={handleForgetPIN}
                        className='text-[#723EEB] text-right font-semibold text-xs pt-1'>
                        Forget PIN?
                    </button>
                </div>
                {/* New Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600 font-semibold">Enter New PIN</label>
                    <div className="relative">
                        <input
                            type={showNewPin ? 'text' : 'password'}
                            {...register("newPin", {
                                required: "Pin is required",
                                minLength: 4,
                                pattern: /^[0-9]*$/
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPin(!showNewPin)}
                            className="absolute top-3 right-4 text-[14px]"
                        >
                            {showNewPin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.newPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}

                    {errors.newPin?.type === 'pattern' && (
                        <p className="text-red-500 text-xs">Pin must be a number</p>
                    )}
                    {errors.newPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>
                {/* Confirm New Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600 font-semibold">Confirm New PIN</label>
                    <div className="relative">
                        <input
                            type={showConfirmNewPin ? 'text' : 'password'}
                            {...register("confirmNewPin", {
                                required: "Pin is required",
                                minLength: 4,
                                pattern: /^[0-9]*$/
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmNewPin(!showConfirmNewPin)}
                            className="absolute top-3 right-4 text-[14px]"
                        >
                            {showConfirmNewPin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.confirmNewPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}

                    {errors.confirmNewPin?.type === 'pattern' && (
                        <p className="text-red-500 text-xs">Pin must be a number</p>
                    )}
                    {errors.confirmNewPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>
                {/* confirm Button */}
                <div className="w-full mx-auto py-5 ">
                    <button
                        type="submit"
                        className="w-full bg-[#ea5455] text-white p-2 rounded text-xs"
                    >

                        {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'}
                        {/* Confirm */}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePINForm;