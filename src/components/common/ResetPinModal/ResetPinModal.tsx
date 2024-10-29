'use client'
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Modal from '../Modal/Modal';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import LoadingSpinner from '../Loading/LoadingSpinner';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface ModalProps {
    resetPinModalOpen: boolean;
    setResetPinModalOpen: (value: boolean) => void;
    mainWallet?: any;
    subWalletData?: any;
}
interface FormData {
    newPin: number;
    confirmNewPin: number;
};

const ResetPinModal: React.FC<ModalProps> = ({ resetPinModalOpen, setResetPinModalOpen, mainWallet, subWalletData }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [newPin, setNewPin] = useState(false);
    const [confirmNewPin, setConfirmNewPin] = useState(false);
    const axiosInstance = useAxiosSecure();

    const handleCloseModal = () => setResetPinModalOpen(false);

    const onSubmit = async (data: any) => {
        const newPin = parseInt(data.newPin);
        const confirmNewPin = parseInt(data.confirmNewPin);

        const newPinInfo = {
            walletId: mainWallet?.id || subWalletData?.id,
            newPin,
        }
        setLoading(true);
        try {
            if (newPin !== confirmNewPin) {
                toast.error("New Pin doesn't match");;
            }
            else {
                const res = await axiosInstance.post('/wallet/reset-pin', newPinInfo);
                if (res.status === 200) {
                    if (res?.status === 200) {
                        reset();
                        setResetPinModalOpen(false);
                        toast.success("Pin has been changed");
                    }
                }
            }
        } catch (error: any) {
            if (error) {
                toast.error("There is something wrong");
            }
        }
        setLoading(false);

    }

    return (
        <>
            <div>
                <Modal
                    isOpen={resetPinModalOpen}
                    onClose={handleCloseModal}
                    title="Pin Recovery"
                >
                    <div>
                        <div className='mb-8'>
                            <h3 className="">{mainWallet ? 'Main' : 'Sub'} Wallet : {mainWallet?.walletName || subWalletData?.walletName}</h3>
                            <h3 className="">Wallet ID : {mainWallet?.walletId || subWalletData?.walletId}</h3>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

                            {/* New Pin Field */}
                            <div className="mb-3">
                                <label className="">Enter New PIN</label>
                                <div className="relative">
                                    <input
                                        type={newPin ? 'text' : 'password'}
                                        {...register("newPin", {
                                            required: "Pin is required",
                                            minLength: 4,
                                             pattern: /^[0-9]*$/
                                        })}
                                        className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none `}
                                        placeholder="Type Here...."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setNewPin(!newPin)}
                                        className="absolute top-4 right-4 text-[14px]"
                                    >
                                        {newPin ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>

                                {errors.newPin?.type === 'required' && (
                                    <p className="text-red-500 text-xs">Pin is required</p>
                                )}
                                {errors.newPin?.type === 'minLength' && (
                                    <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                                )}
                            </div>
                            {/* Confirm New Pin Field */}
                            <div className="mb-3">
                                <label className="">Confirm New PIN</label>
                                <div className="relative">
                                    <input
                                        type={confirmNewPin ? 'text' : 'password'}
                                        {...register("confirmNewPin", {
                                            required: "Pin is required",
                                            minLength: 4,
                                            pattern: /^[0-9]*$/
                                        })}
                                        className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none `}
                                        placeholder="Type Here...."
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setConfirmNewPin(!confirmNewPin)}
                                        className="absolute top-4 right-4 text-[14px]"
                                    >
                                        {confirmNewPin ? <FaEye /> : <FaEyeSlash />}
                                    </button>
                                </div>

                                {errors.confirmNewPin?.type === 'required' && (
                                    <p className="text-red-500 text-xs">Pin is required</p>
                                )}
                                {errors.confirmNewPin?.type === 'minLength' && (
                                    <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                                )}
                            </div>
                            <div className="w-full mx-auto py-3">
                                <button
                                    type="submit"
                                    className="w-full bg-[#ea5455] text-white p-2 rounded text-[10px]">
                                    {loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm'}
                                    {/* Confirm */}
                                </button>
                            </div>
                        </form>
                    </div>

                </Modal>
            </div>
        </>
    );
};

export default ResetPinModal;