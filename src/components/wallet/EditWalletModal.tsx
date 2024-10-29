import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { LiaEyeSlashSolid, LiaEyeSolid } from 'react-icons/lia';
import useNavigationContext from '../NavigationContext/useNavigationContext';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import Modal from '../common/Modal/Modal';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useCurrency from '../hooks/useCurrency';
import useSubWallets from '../hooks/useSubWallets';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';

interface FormData {
    walletName: string;
    walletEmail: string;
    currency: string;
    confirmPIN: number;
}
interface ModalProps {
    isEditWalletModalOpen: boolean;
    setEditWalletModalOpen: (value: boolean) => void;
}

const EditWalletModal: React.FC<ModalProps> = ({ isEditWalletModalOpen, setEditWalletModalOpen }) => {
    const [pin, setPin] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currency] = useCurrency();
    const [, refetch] = useSubWallets();
    const { subWalletData }: any = useNavigationContext();
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();
    const axiosInstance = useAxiosSecure();


    useEffect(() => {
        setValue('walletName', subWalletData?.walletName);
        setValue('walletEmail', subWalletData?.walletEmail);
        setValue('currency', subWalletData?.currency?.name);
    }, [subWalletData, setValue]);


    const handleCloseModal = () => setEditWalletModalOpen(false);

    const onSubmit = async (data: any) => {
        const updatedInfo = {
            walletName: data?.walletName,
            walletEmail: data?.walletEmail,
            currencyId: subWalletData?.currency?.id,
            pinNumber: parseInt(data?.confirmPIN)
        };
        setLoading(true);

        try {
            const res = await axiosInstance.put(`/wallet/update-wallet/${subWalletData?.id}`, updatedInfo);

            if (res.status === 200) {
                toast.success('Wallet has been updated');
                refetch();
                setEditWalletModalOpen(false);
                reset();
            }
        } catch (error: any) {
            if (error) {
                toast.error("There is something wrong");
            }
        };
        setLoading(false);
    }

    return (
        <div className=''>
            <Modal
                isOpen={isEditWalletModalOpen}
                onClose={handleCloseModal}
                title=""
            >
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4 w-2/3 mx-auto'>
                    <h1 className="">Edit Modal</h1>
                    {/* wallet field */}
                    <div className=" text-xs">
                        <label className="">Wallet Name</label>
                        <input
                            type="text"
                            {...register("walletName", {
                                required: "Wallet Name is required",
                            })}
                            className={`mt-1 w-full px-3 py-2 border border-gray-400 rounded-full focus:outline-none`}
                            placeholder="Enter Wallet Name....."
                            defaultValue={subWalletData?.walletName}
                        />
                        {errors.walletName?.type === 'required' && (
                            <p className="text-red-500 text-xs">Wallet name is required</p>
                        )}
                    </div>
                    {/* Email Field */}
                    <div className="w-full relative text-xs">
                        <label>Wallet Email</label>
                        <input
                            type="email"
                            {...register("walletEmail", {
                                required: "Email is required",
                            })}
                            className={`mt-1 w-full px-3 py-2 border border-gray-400 rounded-full focus:outline-none`}
                            placeholder="Enter Wallet Email....."
                            defaultValue={subWalletData?.walletEmail}
                        />
                        {errors.walletEmail?.type === 'required' && (
                            <p className="text-red-500 text-xs">Email is required</p>
                        )}
                    </div>
                    {/* currency */}
                    <div className="w-full text-xs">
                        <label className="">Select Currency*</label>
                        <select
                            className="mt-1 w-full px-3 border border-gray-400 rounded-full focus:outline-none select select-sm text-xs"
                            // defaultValue={subWalletData?.currency?.name}
                            {...register("currency", {
                                required: 'Please select a currency'
                            })}
                        >
                            <option disabled value={subWalletData?.currency?.name}>{subWalletData?.currency?.name}</option>
                            {/* {currency?.map((data: any) => (
                                <option value={data?.id} key={data.id}>
                                    {data?.name}
                                </option>
                            ))} */}
                        </select>
                        {errors.currency?.type === 'required' && (
                            <p className="text-red-500 text-xs">Currency is required</p>
                        )}
                    </div>
                    {/* Pin Field */}
                    <div className="w-full relative text-xs">
                        <label className="">Confirm PIN</label>
                        <div className="relative">
                            <input
                                type={pin ? 'text' : 'password'}
                                {...register("confirmPIN", {
                                    required: "Pin is required",
                                    minLength: 4,
                                    pattern: /^[0-9]*$/
                                })}
                                className={`mt-1 w-full px-3 py-2  border border-gray-400 rounded-full focus:outline-none`}
                                placeholder="Enter PIN...."
                            />
                            <button
                                type="button"
                                onClick={() => setPin(!pin)}
                                className="absolute top-3 right-4 text-[14px]"
                            >
                                {pin ? <FaEye /> : <FaEyeSlash />}
                            </button>
                        </div>

                        {errors.confirmPIN?.type === 'required' && (
                            <p className="text-red-500 text-xs">Pin is required</p>
                        )}
                        {errors.confirmPIN?.type === 'minLength' && (
                            <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                        )}
                    </div>
                    {/* create now Button */}
                    <div className="w-4/5 mx-auto py-3">
                        <button
                            type="submit"
                            className="mt-1 w-full bg-[#723EEB] text-white p-2 rounded text-[10px]"
                        >
                            {
                                loading ? <LoadingSpinner className='h-4 w-4' /> : 'Confirm Change'
                            }

                        </button>
                    </div>
                </form>
            </Modal>
        </div>
    );
};

export default EditWalletModal;