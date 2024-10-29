'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useMainWallet from '../hooks/useMainWallet';
import useSubWallets from '../hooks/useSubWallets';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface ModalProps {
    isMakeMainWalletModalOpen: boolean;
    setMakeMainWalletModalOpen: (value: boolean) => void;
    subWalletData?: any;
}
interface FormData {
    confirmPin: number;
};

const MakeMainWalletModal: React.FC<ModalProps> = ({ isMakeMainWalletModalOpen, setMakeMainWalletModalOpen, subWalletData }) => {
    const [confirmNewPin, setConfirmNewPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [, mainWalletRefetch] = useMainWallet();
    const [, refetch] = useSubWallets();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const axiosInstance = useAxiosSecure();
    const handleCloseModal = () => setMakeMainWalletModalOpen(false);

    const onSubmit = async (data: any) => {
        const updatedInfo = {
            pinNumber: data.confirmPin
        };
        setLoading(true);
        try {
            const res = await axiosInstance.put(`/wallet/set-main/${subWalletData?.id}`, updatedInfo);
            if (res.status === 200) {
                toast.success('Converted to main wallet');
                reset();
                mainWalletRefetch();
                refetch();
                setMakeMainWalletModalOpen(false);
            }
        } catch (error: any) {
            toast.error(error?.response?.data?.message);
        };
        setLoading(false)
    }

    return (
        <div className=''>
            <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isMakeMainWalletModalOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
                <div className={`bg-white rounded shadow-lg overflow-hidden w-[95%] max-w-96 lg:w-full overflow-y-auto transition-all duration-300 absolute top-5 ${isMakeMainWalletModalOpen ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-300 '}`}>
                    <div className="flex justify-between items-center py-2 px-4">
                        <h3 className="text-sm font-semibold "></h3>
                        <div onClick={() => handleCloseModal()} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
                            <div
                                className="text-3xl"
                            >
                                &times;
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-2">
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-full mx-auto'>
                            <h1 className=" text-sm">Want to Make this Wallet Your Main Wallet?</h1>

                            {/* Confirm New Pin Field */}
                            <div className="w-full relative text-xs">
                                <label className="">Confirm PIN*</label>
                                <div className="relative">
                                    <input
                                        type={confirmNewPin ? 'text' : 'password'}
                                        {...register("confirmPin", {
                                            required: "Pin is required",
                                            minLength: 4,
                                            pattern: /^[0-9]*$/
                                        })}
                                        className={`mt-1 w-full px-3 py-2  border border-gray-400 rounded-[10px] focus:outline-none`}
                                        placeholder="Enter you main wallet PIN"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setConfirmNewPin(!confirmNewPin)}
                                        className="absolute top-3 right-4 text-[14px]"
                                    >
                                        {confirmNewPin ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>

                                {errors.confirmPin?.type === 'required' && (
                                    <p className="text-red-500 text-xs">Pin is required</p>
                                )}
                                {errors.confirmPin?.type === 'minLength' && (
                                    <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                                )}
                            </div>

                            <div className="w-4/5 mx-auto pb-4">
                                <button
                                    type="submit"
                                    className="w-full bg-[#ea5455] text-white p-2 rounded text-[10px]">
                                    {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm Change'}

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeMainWalletModal;