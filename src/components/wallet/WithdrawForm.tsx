import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import LoadingSpinner from '../common/Loading/LoadingSpinner';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useMainWallet from '../hooks/useMainWallet';

interface ModalProps {
    handleForgetPIN: (value: any) => void;
    setWithdrawModalOpen: (value: boolean) => void;
}
interface FormData {
    amount: string;
    bankName: string;
    accountNumber: string;
    holderName: string;
    transactionID: string;
    pin: number;
};

const WithdrawForm: React.FC<ModalProps> = ({ handleForgetPIN, setWithdrawModalOpen }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
    const [pin, setPin] = useState(false);
    const [mainWallet, mainWalletRefetch] = useMainWallet();
    const axiosInstance = useAxiosSecure();

    const onSubmit = async (data: any) => {
        const withdrawInfo = {
            amount: parseFloat(data.amount),
            bankName: data.bankName,
            accountNo: data.accountNumber,
            holderName: data.holderName,
            walletId: mainWallet?.id,
            walletNumber: mainWallet?.walletId,
            pinNumber: parseInt(data.pin),
        };
        setLoading(true);
        try {
            const res = await axiosInstance.post('/wallet/create-withdraw', withdrawInfo);

            if (res.status === 200) {
                reset();
                mainWalletRefetch();
                toast.success(`Your withdraw is under review`);
                setWithdrawModalOpen(false);
            }
        } catch (error: any) {
            if (error) {
                toast.error(error?.response?.data?.message);
            }
        }
        setLoading(false);
    }

    return (
        <>
            {/* balance */}
            <div className='my-1'>
                <h3 className="">Available Balance</h3>
            </div>
            <div className='mt-1 mb-5 font-semibold'>
                <h2 className="">{mainWallet?.currency?.symbol} <span className='text-5xl'>{mainWallet.balance}.0</span>{mainWallet?.currency?.code}</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                {/* Amount Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Your Amount</label>
                    <input
                        type="number"
                        {...register("amount", {
                            required: "Amount is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Enter Amount Here....."
                    />
                    {errors.amount?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.amount.message}</p>
                    )}
                </div>
                {/* Bank name Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Bank Name</label>
                    <input
                        type="text"
                        {...register("bankName", {
                            required: "Bank Name is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Asia Bank"
                    />
                    {errors.bankName?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.bankName.message}</p>
                    )}
                </div>
                {/* Account number Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Enter Your Bank Account Number</label>
                    <input
                        type="text"
                        {...register("accountNumber", {
                            required: "Account Number is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="123032420234"
                    />
                    {errors.accountNumber?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.accountNumber.message}</p>
                    )}
                </div>
                {/* Amount Field */}
                <div className="mb-3">
                    <label className="text-[14px]">Holder Name</label>
                    <input
                        type="text"
                        {...register("holderName", {
                            required: "HolderName is required",
                        })}
                        className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-2xl focus:outline-none font-semibold text-[14px]`}
                        placeholder="Enter HolderName Here....."
                    />
                    {errors.holderName?.type === 'required' && (
                        <p className="text-red-500 text-xs">{errors.holderName.message}</p>
                    )}
                </div>
                {/* Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600 text-sm">Enter Your PIN</label>
                    <div className="relative">
                        <input
                            type={pin ? 'text' : 'password'}
                            {...register("pin", {
                                required: "Pin is required",
                                minLength: 4,
                                pattern: /^[0-9]*$/
                            })}
                            className={`mt-1 w-full px-3 py-1 border border-gray-400 rounded-[10px] focus:outline-none placeholder:text-xs text-sm`}
                            placeholder="Enter PIN...."
                        />
                        <span
                            onClick={() => setPin(!pin)}
                            className="absolute top-3 right-4 text-[14px] cursor-pointer"
                        >
                            {pin ? <FaEye /> : <FaEyeSlash />}
                        </span>
                    </div>

                    {errors.pin?.type === 'required' && (
                        <p className="text-red-500 text-xs">Pin is required</p>
                    )}

                    {errors.pin?.type === 'pattern' && (
                        <p className="text-red-500 text-xs">Pin must be a number</p>
                    )}
                    {errors.pin?.type === 'minLength' && (
                        <p className="text-red-500 text-xs">Pin must be at least 4 numbers</p>
                    )}
                </div>
                <div className='flex flex-row justify-end'>
                    <div
                        onClick={() => handleForgetPIN(mainWallet)}
                        className='text-[#723EEB] text-right cursor-pointer text-xs pt-1'>
                        Forget PIN?
                    </div>
                </div>
                {/* Deposit button */}
                <div className="w-full mx-auto pb-5">
                    <button
                        type="submit"
                        className="w-full bg-[#ea5455] text-white p-2 rounded text-[10px]"
                    >
                        {loading ? <LoadingSpinner className='h-3 w-3' /> : 'Confirm Withdraw'}
                        {/* Confirm Withdraw */}
                    </button>
                </div>
            </form>
        </>
    );
};

export default WithdrawForm;