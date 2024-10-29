'use client'
import React, { useEffect, useState } from 'react';
import Modal from '../Modal/Modal';
import { useForm } from 'react-hook-form';
import ResetPinModal from '../ResetPinModal/ResetPinModal';
import useAxiosSecure from '@/components/hooks/useAxiosSecure';
import LoadingSpinner from '../Loading/LoadingSpinner';
import toast from 'react-hot-toast';

interface ModalProps {
    isForgetPINModalOpen: boolean;
    setForgetPINModalOpen: (value: boolean) => void;
    mainWallet?: any;
    subWalletData?: any;
}
interface FormData {
    question: string;
    answer: string;
}

const ForgetPINModal: React.FC<ModalProps> = ({ setForgetPINModalOpen, isForgetPINModalOpen, mainWallet, subWalletData }) => {
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();
    const [resetPinModalOpen, setResetPinModalOpen] = useState(false);
    const axiosInstance = useAxiosSecure();

    const handleCloseModal = () => setForgetPINModalOpen(false);

    useEffect(() => {
        // Set the default security question value when mainWallet or subWalletData changes
        if (mainWallet?.securityQuestion) {
            setValue('question', mainWallet.securityQuestion);
        } else if (subWalletData?.securityQuestion) {
            setValue('question', subWalletData.securityQuestion);
        }
    }, [mainWallet, subWalletData, setValue]);

    const onSubmit = async (data: FormData) => {

        const securityQuestionInfo = {
            walletId: mainWallet?.id || subWalletData?.id,
            securityQuestion: data.question,
            answer: data.answer
        }
        setLoading(true);
        try {

            const res = await axiosInstance.post('/wallet/forgot-pin', securityQuestionInfo);

            if (res.status === 200) {
                reset();
                setForgetPINModalOpen(false);
                setResetPinModalOpen(true);
                // toast.success('Pin reseted successfully')
                toast.success('Varified successfully')
            }
        } catch (error: any) {
            toast.error('Answer is wrong')
            reset();
        }
        setLoading(false);
    }

    return (
        <>
            <div>
                <Modal
                    isOpen={isForgetPINModalOpen}
                    onClose={handleCloseModal}
                    title="Pin Recovery"
                >
                    <div>
                        <div className='mb-8'>
                            <h3 className="">{mainWallet ? 'Main' : 'Sub'} Wallet : {mainWallet?.walletName || subWalletData?.walletName}</h3>
                            <h3 className="">Wallet ID : {mainWallet?.walletId || subWalletData?.walletId}</h3>
                        </div>
                        <form onSubmit={handleSubmit(onSubmit)} className='space-y-3'>

                            <div className="w-full relative text-sm">
                                <label className="">Security Question</label>
                                <input
                                    type="text"
                                    {...register("question", {

                                    })}
                                    className={`mt-1 w-full px-3 py-2  border border-gray-400 rounded-full focus:outline-none placeholder:text-black`}
                                    placeholder="Question Here....."
                                    defaultValue={mainWallet?.securityQuestion || subWalletData?.securityQuestion}
                                />
                            </div>
                            <div className="w-full relative text-sm">
                                <label className="">Answer</label>
                                <input
                                    type="text"
                                    {...register("answer", {
                                        required: "Answer is required"
                                    })}
                                    className={`mt-1 w-full px-3 py-2  border border-gray-400 rounded-full focus:outline-none placeholder:text-gray-400`}
                                    placeholder="Your Answer Here....."
                                />
                                {errors.answer && (
                                    <span className="text-red-500 text-xs mt-1">
                                        {errors.answer.message}
                                    </span>
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

            <ResetPinModal
                resetPinModalOpen={resetPinModalOpen}
                setResetPinModalOpen={setResetPinModalOpen}
                mainWallet={mainWallet}
                subWalletData={subWalletData}
            />
        </>
    );
};

export default ForgetPINModal;