import React, { useState } from 'react';
import useCurrency from '../hooks/useCurrency';
import { useForm } from 'react-hook-form';
import { FaEye, FaEyeSlash } from 'react-icons/fa6';
import useAxiosSecure from '../hooks/useAxiosSecure';
import useMainWallet from '../hooks/useMainWallet';
import { toast } from 'react-toastify';
import useSubWallets from '../hooks/useSubWallets';

interface FormData {
    walletName: string;
    email: string;
    currency: string;
    securityQuestion: string;
    answer: string;
    newPin: number;
}

const CreateNewWalletForm = () => {
    const [currency] = useCurrency();
    const [mainWallet] = useMainWallet();
    const [ , refetch] = useSubWallets();
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [pin, setPin] = useState(false);
    const axiosInstance = useAxiosSecure();


    const onSubmit = async (data: any) => {
        const currencyId = await currency.filter((c: any) => c.name === data.currency);
        if (!mainWallet?.userId) {
            const walletInfo = {
                currencyId: currencyId[0]?.id,
                category: 'PRIMARY',
                walletEmail: data?.email,
                walletName: data?.walletName,
                securityQuestion: data?.securityQuestion,
                answer: data?.answer,
                pinNumber: parseInt(data?.newPin)
            };
            const res = await axiosInstance.post('/wallet/create-wallet', walletInfo)
            if (res.status === 200) {
                // toast('Wallet has been created successfully');
            }
        } else {
            const walletInfo = {
                currencyId: currencyId[0]?.id,
                category: 'SECONDARY',
                walletEmail: data?.email,
                walletName: data?.walletName,
                securityQuestion: data?.securityQuestion,
                answer: data?.answer,
                pinNumber: parseInt(data?.newPin)
            };
            const res = await axiosInstance.post('/wallet/create-wallet', walletInfo)
            console.log(res);
            if (res.status === 200) {
                refetch();
                // toast('Sub Wallet has been created successfully');
            }
        };
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <h3 className="font-semibold">Create New Wallet</h3>
                {/* wallet name Field */}
                <div className="mb-3">
                    <label className="text-gray-600  text-[10px] font-semibold">Wallet Name</label>
                    <input
                        type="text"
                        {...register("walletName", {
                            required: "Wallet Name is required",
                        })}
                        className={`w-full px-3 py-1 text-[10px] border border-gray-400 rounded-[10px] focus:outline-none`}
                        placeholder="Enter Wallet Name....."
                    />
                    {errors.walletName?.type === 'required' && (
                        <p className="text-red-500 text-xs">Wallet name is required</p>
                    )}
                </div>
                {/* Email Field */}
                <div className="mb-3">
                    <label className="text-gray-600  text-[10px] font-semibold">Email</label>
                    <input
                        type="text"
                        {...register("email", {
                            required: "Email is required",
                        })}
                        className={`w-full px-3 py-1 text-[10px] border border-gray-400 rounded-[10px] focus:outline-none`}
                        placeholder="Enter Wallet Email....."
                    />
                    {errors.email?.type === 'required' && (
                        <p className="text-red-500 text-xs">Email is required</p>
                    )}
                </div>
                {/* currency */}
                <div className="mb-3 w-full">
                    <label className="text-gray-600  text-[10px] font-semibold">Select Currency*</label>
                    <select
                        className="w-full px-3 py-[5px] text-[10px] border border-gray-400 rounded-[10px] cursor-pointer focus:outline-none"
                        {...register("currency", {
                            required: 'Please select a currency'
                        })}
                    // value={filter}
                    >
                        {currency?.map((data: any) => (
                            <option value={data?.name} key={data._id}>
                                {data?.name}
                            </option>
                        ))}
                    </select>
                    {errors.currency?.type === 'required' && (
                        <p className="text-red-500 text-xs">Currency is required</p>
                    )}
                </div>
                {/* security question Field */}
                <div className="mb-3">
                    <label className="text-gray-600  text-[10px] font-semibold">Enter a Security Question</label>
                    <input
                        type="text"
                        {...register("securityQuestion", {
                            required: "Security Question is required",
                        })}
                        className={`w-full px-3 py-1 text-[10px] border border-gray-400 rounded-[10px] focus:outline-none`}
                        placeholder="Enter a Security Question....."
                    />
                    {errors.securityQuestion?.type === 'required' && (
                        <p className="text-red-500 text-xs">Security Question is required</p>
                    )}
                </div>
                {/* Answer Field */}
                <div className="mb-3">
                    <label className="text-gray-600  text-[10px] font-semibold">Answer</label>
                    <input
                        type="text"
                        {...register("answer", {
                            required: "Answer is required",
                        })}
                        className={`w-full px-3 py-1 text-[10px] border border-gray-400 rounded-[10px] focus:outline-none`}
                        placeholder="Enter Answer....."
                    />
                    {errors.answer?.type === 'required' && (
                        <p className="text-red-500 text-xs">Answer is required</p>
                    )}
                </div>
                {/* Pin Field */}
                <div className="mb-3">
                    <label className="text-gray-600  text-[10px] font-semibold">Create New PIN</label>
                    <div className="relative">
                        <input
                            type={'number'}
                            {...register("newPin", {
                                required: "Pin is required",
                                minLength: 4,
                            })}
                            className={`w-full px-3 py-1 text-[10px] border border-gray-400 rounded-[10px] focus:outline-none`}
                            placeholder="Enter PIN...."
                        />
                        <button
                            type="button"
                            onClick={() => setPin(!pin)}
                            className="absolute top-2.5 right-4 text-[11px]"
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

                {/* create now Button */}
                <div className="w-full mx-auto mt-3 ">
                    <button
                        type="submit"
                        className="w-full bg-[#723EEB] text-white cursor-pointer p-1 rounded text-[10px]"
                    >
                        Create Now
                    </button>
                </div>
            </form>
        </>
    );
};

export default CreateNewWalletForm;