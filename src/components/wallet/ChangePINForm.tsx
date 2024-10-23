'use client'
import React, { useState } from 'react';
import ForgetPINModal from '../common/ForgetPINModal/ForgetPINModal';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';
import useAxiosSecure from '../hooks/useAxiosSecure';
import { toast, ToastContainer } from 'react-toastify';
import Swal from 'sweetalert2';

interface ModalProps {
    handleForgetPIN: () => void;
    mainWallet?: any;
    subWalletData?: any;
    setChangePINModalOpen: (value: boolean) => void;
};

interface FormData {
    currentPin: number;
    newPin: number;
    confirmNewPin: number;
};

const ChangePINForm: React.FC<ModalProps> = ({ handleForgetPIN, mainWallet, subWalletData, setChangePINModalOpen }) => {

    const [pin, setPin] = useState(false);
    const axiosInstance = useAxiosSecure();
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();

    const onSubmit = async (data: any) => {
        const oldPin = parseInt(data?.currentPin);
        const newPin = parseInt(data?.newPin);
        const confirmNewPin = parseInt(data?.confirmNewPin);

        const changedPinInfo = {
            walletId: mainWallet?.id || subWalletData?.id,
            oldPin,
            newPin,
        };

        try {
            if (newPin !== confirmNewPin) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "New Pin doesn't match",
                    showConfirmButton: false,
                    timer: 1500
                });
            } else {
                const res = await axiosInstance.put('/wallet/change-pin', changedPinInfo)

                if (res?.status === 200) {
                    reset();
                    setChangePINModalOpen(false);
                    Swal.fire({
                        position: "center",
                        icon: "success",
                        title: "Pin has been changed",
                        showConfirmButton: false,
                        timer: 1500
                    });
                }
            }
        } catch (error: any) {
            if (error.response && error.response.status === 403) {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Current Pin is wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
            else {
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Current Pin is wrong",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        }

        // if (newPin !== confirmNewPin) {
        //     Swal.fire({
        //         position: "center",
        //         icon: "error",
        //         title: "New Pin doesn't match",
        //         showConfirmButton: false,
        //         timer: 1500
        //     });
        // } else {
        //     const res = await axiosInstance.put('/wallet/change-pin', changedPinInfo)
        //     if (res?.status === 200) {
        //         Swal.fire({
        //             position: "center",
        //             icon: "success",
        //             title: "Pin has been changed",
        //             showConfirmButton: false,
        //             timer: 1500
        //         });
        //     }
        //     //  else {
        //     //     Swal.fire({
        //     //         position: "center",
        //     //         icon: "error",
        //     //         title: "Current Pin is wrong",
        //     //         showConfirmButton: false,
        //     //         timer: 1500
        //     //     });
        //     // }
        // }
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
                    <label className="">Enter Current PIN</label>
                    <div className="relative">
                        <input
                            type={'number'}
                            {...register("currentPin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none placeholder:text-black`}
                            placeholder="PIN Here...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-4 right-4 text-[11px]"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.currentPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}
                    {errors.currentPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
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
                    <label className="">Enter New PIN</label>
                    <div className="relative">
                        <input
                            type={'number'}
                            {...register("newPin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none placeholder:text-black`}
                            placeholder="PIN Here...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-4 right-4 text-[11px]"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
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
                            type={'number'}
                            {...register("confirmNewPin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`w-full mt-1 px-3 py-1 border border-gray-400 rounded-full focus:outline-none placeholder:text-black`}
                            placeholder="PIN Here...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-4 right-4 text-[11px]"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
                        </button>
                    </div>

                    {errors.confirmNewPin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}
                    {errors.confirmNewPin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>
                {/* create now Button */}
                <div className="w-full mx-auto py-5 ">
                    <button
                        type="submit"
                        className="w-full bg-[#ea5455] text-white p-2 rounded text-[10px]"
                    >
                        Confirm
                    </button>
                </div>
            </form>
        </div>
    );
};

export default ChangePINForm;