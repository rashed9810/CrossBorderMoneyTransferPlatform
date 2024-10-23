import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';
import Modal from '../common/Modal/Modal';
import SkeletonQR from '../common/skeleton/SkeletonQR';
import useAxiosSecure from '../hooks/useAxiosSecure';
import LoadingSpin from './LoadingSpin';

const TwoFactor = () => {
    const [isOpenEnableModal, setIsOpenEnableModal] = useState(false);
    const [isOpenWithCodeModal, setIsOpenWithCodeModal] = useState(false);
    const queryClient = useQueryClient();
    const [copyId, setCopyId] = useState(false)

    const axiosInstance = useAxiosSecure();

    // 2fa Data
    const { data, isError: isTwoAuthError, isLoading } = useQuery({
        queryKey: ['2fa'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/user/two-factor/generate`);
            return res?.data?.data;
        },
    });

    // user Data
    const { data: userData, refetch } = useQuery({
        queryKey: ['userData'],
        queryFn: async () => {
            const res = await axiosInstance.get(`/user/profile`);
            return res?.data?.data;
        },
    });


    // Verify 2fa
    const { data: verifyData, isSuccess, isPending, isError: verifyError, mutate } = useMutation({
        mutationFn: async (token: string) => {
            const response = await axiosInstance.post(`/user/two-factor/verify`, {
                "token": token
            });
            return response.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['2fa'] })
        },
    });


    const handleEnable = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const target = e.target as HTMLFormElement
        const key = target.key.value;
        mutate(key);
    }
    const handleEnableYes = () => {
        setIsOpenWithCodeModal(true);
        setIsOpenEnableModal(false);
    }
    const handleEnableCancel = () => {
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your two-factor authentication is not enabled",
        });
        setIsOpenWithCodeModal(false);
    }


    const handleCopy = (e: any) => {
        e.preventDefault()
        navigator.clipboard.writeText(data?.secret ? data?.secret : 'MBCE2JDRJQI77J5X')
        toast.success("Copied ID!")
        setCopyId(true)
        setTimeout(() => {
            setCopyId(false)
        }, 2000)
    }


    useEffect(() => {
        if (verifyError) {
            toast.error('Invalid code');
        }
        if (isSuccess) {
            refetch();
            toast.success('Two-factor authentication enabled');
            setIsOpenWithCodeModal(false);
        }
        if (isTwoAuthError) {
            toast.error('Something went wrong');
        }
    }, [isSuccess, verifyError, refetch, isTwoAuthError]);

    return (
        <div>
            <Modal
                isOpen={isOpenEnableModal}
                onClose={() => setIsOpenEnableModal(false)}
            >
                <div>
                    <p className='font-medium'>
                        Are you sure you want to enable two-factor authentication?
                    </p>
                    <div className='w-full flex justify-between gap-2 py-4'>
                        <button onClick={() => setIsOpenEnableModal(false)} className='bg-gray-300 text-gray-500 px-3 py-1 rounded font-medium'>Cancel</button>
                        <button onClick={handleEnableYes} className='bg-[#723EEB] text-white px-3 py-1 rounded font-medium'>Yes</button>
                    </div>
                </div>
            </Modal>
            <Modal
                isOpen={isOpenWithCodeModal}
                onClose={() => setIsOpenWithCodeModal(false)}
                disableCloseButton={true}
            >
                <form onSubmit={handleEnable}>
                    <p className='text-red-500'>
                        *Scan the QR code with your Google Authenticator app or enter the key below manually.
                    </p>
                    <div className='flex flex-col gap-2 pt-3'>
                        <label className='font-medium'>Enter Code</label>
                        <input
                            className='w-full px-3 py-1 border border-gray-300 rounded'
                            type="text"
                            name="key"
                            placeholder='32414'
                        />
                    </div>
                    <div className='w-full flex justify-between gap-2 py-4'>
                        <button type='button' onClick={() => handleEnableCancel()} className='bg-gray-300 text-gray-500 px-3 py-1 rounded font-medium'>Cancel</button>
                        <button className='bg-[#723EEB] text-white px-3 py-1 rounded font-medium'>{
                            isPending ? <LoadingSpin height='1rem' width='1rem' borderWidth='0.25rem' color='#fff' /> : 'Enable'
                        }</button>
                    </div>
                </form>
            </Modal>
            <CardSubTitle title='Two Factor Authenticator' />
            <div className='bg-white p-4 my-5 rounded-xl'>
                <h5 className="lg:text-sm text-xs text-black font-semibold">QRcode Share</h5>
                <div className="flex flex-row items-center text-xs lg:text-base my-2">
                    <p className='w-full px-3 py-1 border text-gray-400 border-gray-300 text-xs outline-0 rounded-l'>{data?.secret ? data?.secret : 'MBCE2JDRJQI77J5X'}</p>

                    <div onClick={handleCopy} className='border border-gray-300 w-[25.5px] h-[25.5px] flex justify-center items-center cursor-pointer'>
                        {
                            !copyId ? <svg width="11" height="11" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                            </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                        }
                    </div>
                    <div className='border border-gray-300  w-[25.5px] h-[25.5px] flex justify-center items-center rounded-r bg-[#723EEB]'>
                        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                        </svg>
                    </div>
                </div>
                <div className='flex flex-col justify-center items-center mt-5'>
                    {
                        isLoading ? <SkeletonQR /> : <Image src={data?.qrCodeUrl} width={150} height={150} alt='QrCode' />
                    }
                    <div className='w-3/4 my-5'>
                        <button disabled={userData?.twoFactorEnabled} onClick={() => setIsOpenEnableModal(true)} className={`text-xs ${userData?.twoFactorEnabled ? 'bg-[#9c7aea]' : 'bg-[#723EEB]'}  text-white w-full p-1.5 rounded font-semibold`}>{
                            userData?.twoFactorEnabled ? 'Verified' : 'Enable'
                        }</button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default TwoFactor;