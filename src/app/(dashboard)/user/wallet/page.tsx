'use client'
import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import ForgetPINModal from '@/components/common/ForgetPINModal/ForgetPINModal';
import Modal from '@/components/common/Modal/Modal';
import Skeleton from '@/components/common/skeleton/Skeleton';
import SkeletonForWalletLog from '@/components/common/skeleton/SkeletonForWalletLog';
import useMainWallet from '@/components/hooks/useMainWallet';
import useSubWallets from '@/components/hooks/useSubWallets';
import useWalletLog from '@/components/hooks/useWalletLog';
import Topbar from '@/components/Topbar';
import ChangePINForm from '@/components/wallet/ChangePINForm';
import CreateNewWalletForm from '@/components/wallet/CreateNewWalletForm';
import DepositLogTable from '@/components/wallet/DepositLogTable';
import DepositModal from '@/components/wallet/DepositModal';
import MakeMainWalletModal from '@/components/wallet/MakeMainWalletModal';
import SubWalletTable from '@/components/wallet/SubWalletTable';
import WithdrawLogTable from '@/components/wallet/WithdrawLogTable';
import WithdrawModal from '@/components/wallet/WithdrawModal';
import Link from 'next/link';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { GoDotFill } from 'react-icons/go';

const WalletPage = () => {
    const [mainWallet, , , isLoading, isSuccess, isFetching] = useMainWallet();
    const [subWallets, , isSubWalletPending] = useSubWallets();
    const [walletLog, , isPending] = useWalletLog();

    const [isChangePINModalOpen, setChangePINModalOpen] = useState(false);
    const [isForgetPINModalOpen, setForgetPINModalOpen] = useState(false);
    const [isMakeMaintWalletModalOpen, setMakeMaintWalletModalOpen] = useState(false);
    const [isSubWalletModalOpen, setSubWalletModalOpen] = useState(false);
    const [copyId, setCopyId] = useState(false)
    const [subWalletData, setSubWalletData] = useState({});
    const [isWalletLoading, setWalletLoading] = useState(false);
    const [open, setOpen] = useState<Record<string, boolean>>({});

    const handleChangePIN = () => {
        setChangePINModalOpen(true);
    };

    // set setIntervals 2000 iswalletloading to false
    // useEffect(() => {
    //     if (isSuccess && mainWallet?.userId) {
    //         setWalletLoading(true)
    //         const i = setInterval(() => {
    //             setWalletLoading(false)
    //         }, 2000)
    //         return () => clearInterval(i)
    //     }
    // }, [isSuccess, mainWallet])

    const handleForgetPIN = () => {
        setForgetPINModalOpen(true);
        setChangePINModalOpen(false);
    };

    const handleMakeMainWallet = (data: any) => {
        setSubWalletData(data);
        setSubWalletModalOpen(false);
        setMakeMaintWalletModalOpen(true);
    }

    const handleSubWallet = (data: any) => {
        setSubWalletModalOpen(true);
        setSubWalletData(data);
    };

    const handleCloseModal = () => {
        setChangePINModalOpen(false);
        setForgetPINModalOpen(false);
    }

    const handleCopy = useCallback((e: any) => {
        e.preventDefault()
        navigator.clipboard.writeText(mainWallet?.walletId as string)
        toast.success("Copied ID!")
        setCopyId(true)
        setTimeout(() => {
            setCopyId(false)
        }, 2000)
    }, [mainWallet?.walletId]);

    const toggleDepositCard = (id: string) => {
        setOpen((prevState) => ({
            ...prevState,
            [id]: !prevState[id],
        }));
    };

    return (
        <div className='min-h-[calc(100vh-100px)]'>
            <Modal
                isOpen={isChangePINModalOpen}
                onClose={handleCloseModal}
                title="Change PIN"
            >
                <ChangePINForm
                    handleForgetPIN={handleForgetPIN}
                    mainWallet={mainWallet}
                    setChangePINModalOpen={setChangePINModalOpen}
                />
            </Modal>

            <Topbar>Wallet Balance</Topbar>
            <CardSubTitle fontSize='1rem' title='Wallet Balance' />
            <div className='w-full my-5 flex flex-col lg:flex-row lg:max-h-[31rem]  xl:max-h-[32.75rem] gap-5 '>

                
                {
                    isLoading && isFetching ? <Skeleton /> : (
                        <>
                            <div className='bg-white rounded-xl w-full min-h-full lg:w-2/4 p-2'>
                                <div className='flex flex-col h-full'>
                                    <div>
                                        {/* id section */}
                                        <div className='flex flex-row lg:flex-wrap  lg:gap-2 xl:gap-0 justify-between items-center px-2 lg:px-5 pt-5'>
                                            <div className="font-semibold flex flex-row items-center text-xs lg:text-base">Wallet ID :
                                                <span className='border border-gray-400 px-[3px]'>{mainWallet?.walletId}</span>
                                                <div onClick={handleCopy} className='border cursor-pointer border-gray-300 p-[3px] lg:p-[7px]'>
                                                    {
                                                        !copyId ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    }
                                                </div>
                                                <div className='border border-gray-300 p-[3px] lg:p-[7px]'>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#723EEB" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleChangePIN()}
                                                className='border-[1.5px] font-semibold text-[#723EEB] text-[10px] lg:text-xs p-[2px] lg:p-1 border-[#723EEB]'>Change PIN</button>
                                        </div>
                                        {/* balance */}
                                        <div className='my-1 px-2 lg:px-5'>
                                            <h3 className="font-semibold">Balance</h3>
                                            {/* <p className="text-xs text-gray-500">Today,25 APR 2024</p> */}
                                            <p className="text-xs text-gray-500">Today,{new Date().toISOString().slice(0, 10)}</p>
                                        </div>
                                        <div className='my-7 px-2 lg:px-5'>
                                            <h2 className="font-semibold">{mainWallet?.currency?.symbol} <span className='text-5xl'>{mainWallet?.balance}.00</span>{mainWallet?.currency?.code}</h2>
                                        </div>
                                        {/* button */}
                                        <div className='flex flex-row gap-7 justify-center items-center w-3/4 mx-auto my-7'>

                                            <WithdrawModal />

                                            <DepositModal />

                                        </div>
                                    </div>
                                    <div className="divider divider-neutral"></div>
                                    {/* sub wallet table */}
                                    <div className='custom-scrollbar overflow-y-auto'>
                                        <h3 className="font-semibold px-4">Your Sub Wallet</h3>
                                        {
                                            // subWallets?.length > 0
                                            subWallets?.length > 0 ? (
                                                <SubWalletTable
                                                    isSubWalletModalOpen={isSubWalletModalOpen}
                                                    setSubWalletModalOpen={setSubWalletModalOpen}
                                                    handleMakeMainWallet={handleMakeMainWallet}
                                                    handleSubWallet={handleSubWallet}
                                                    data={subWalletData}
                                                />
                                            ) : (
                                                <div className='flex justify-center items-center h-32'>
                                                    <h1 className="text-lg">You do not have any sub wallets</h1>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </>

                    )

                }

                {/* {
                    isLoading && isFetching ? <Skeleton /> : (

                        mainWallet?.userId && (
                            <div className='bg-white rounded-xl w-full min-h-full lg:w-2/4 p-2'>
                                <div className='flex flex-col h-full'>
                                    <div>
                                       
                                        <div className='flex flex-row lg:flex-wrap  lg:gap-2 xl:gap-0 justify-between items-center px-2 lg:px-5 pt-5'>
                                            <div className="font-semibold flex flex-row items-center text-xs lg:text-base">Wallet ID :
                                                <span className='border border-gray-400 px-[3px]'>{mainWallet?.walletId}</span>
                                                <div onClick={handleCopy} className='border cursor-pointer border-gray-300 p-[3px] lg:p-[7px]'>
                                                    {
                                                        !copyId ? <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                                                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                                    }
                                                </div>
                                                <div className='border border-gray-300 p-[3px] lg:p-[7px]'>
                                                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#723EEB" />
                                                    </svg>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => handleChangePIN()}
                                                className='border-[1.5px] font-semibold text-[#723EEB] text-[10px] lg:text-xs p-[2px] lg:p-1 border-[#723EEB]'>Change PIN</button>
                                        </div>
                                       
                                        <div className='my-1 px-2 lg:px-5'>
                                            <h3 className="font-semibold">Balance</h3>
                                           
                                            <p className="text-xs text-gray-500">Today,{new Date().toISOString().slice(0, 10)}</p>
                                        </div>
                                        <div className='my-7 px-2 lg:px-5'>
                                            <h2 className="font-semibold">{mainWallet?.currency?.symbol} <span className='text-5xl'>{mainWallet?.balance}.00</span>{mainWallet?.currency?.code}</h2>
                                        </div>
                                      
                                        <div className='flex flex-row gap-7 justify-center items-center w-3/4 mx-auto my-7'>

                                            <WithdrawModal />

                                            <DepositModal />

                                        </div>
                                    </div>
                                    <div className="divider divider-neutral"></div>
                                   
                                    <div className='custom-scrollbar overflow-y-auto'>
                                        <h3 className="font-semibold px-4">Your Sub Wallet</h3>
                                        {
                                           
                                            subWallets?.length > 0 ? (
                                                <SubWalletTable
                                                    isSubWalletModalOpen={isSubWalletModalOpen}
                                                    setSubWalletModalOpen={setSubWalletModalOpen}
                                                    handleMakeMainWallet={handleMakeMainWallet}
                                                    handleSubWallet={handleSubWallet}
                                                    data={subWalletData}
                                                />
                                            ) : (
                                                <div className='flex justify-center items-center h-32'>
                                                    <h1 className="text-lg">You do not have any sub wallets</h1>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        )
                    )

                } */}

                <div className='bg-white p-4 rounded-xl lg:w-2/4 overflow-hidden mx-auto w-full h-full'>
                    <CreateNewWalletForm />
                </div>
            </div>



            <div className='flex flex-row justify-between items-center my-10'>
                <h1 className='font-bold text-xs lg:text-base'>Wallet Log</h1>
                <Link href={`/user/wallet/walletLog`}>
                    <button className=" bg-[#723EEB] text-white text-xs w-20 lg:w-28 p-2 rounded-full lg:text-sm font-semibold">View More</button>
                </Link>
            </div>
            <div>
                <div>
                    {
                        isPending ? <SkeletonForWalletLog /> : (
                            walletLog?.deposits?.length > 0 || walletLog?.withdraw?.length > 0 ? (
                                <div>
                                    {
                                        (
                                            walletLog?.deposits?.slice(0, 2)?.map((data: any) => (
                                                <div key={data.id} className={`bg-white px-2 lg:px-6 py-2 lg:py-4 mb-5 rounded-2xl cursor-pointer group ${open[String(data.id)] ? "shadow-md shadow-neutral-400" : ""
                                                    }`}>
                                                    <div onClick={() => toggleDepositCard(String(data.id))} className="flex flex-row justify-between items-center">
                                                        <div className="flex flex-row gap-2 lg:gap-6 items-start">
                                                            <div className={`bg-gray-200 rounded-[50%] ${open[String(data.id)] ? "rotate-0" : "-rotate-180"} p-2 duration-300 group-hover:text-white text-black group-hover:fill-white group-hover:bg-[#723EEB] `}>
                                                                <svg width="15" height="15" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill='currentColor' />
                                                                </svg>
                                                            </div>
                                                            <div className="w-36 xxs:w-24 md:w-full">
                                                                <h3 className="font-semibold xxs:text-sm text-green-500">
                                                                    Deposit
                                                                    {/* {
                                                            data.type === 'Deposit' ?
                                                                <h3 className="text-green-500">{data.type}</h3> : <h3 className="text-red-500">{data.type}</h3>
                                                        } */}
                                                                </h3>

                                                                <div className='flex flex-row gap-2'>
                                                                    <p className="text-[10px] xxs:text-[8px] md:text-[10px]">{data?.bankDetails}</p>
                                                                    <p className="text-[10px] flex items-center ml-1">
                                                                        {
                                                                            data.status === 'PENDING' ? <GoDotFill className="text-[#FF9F43] inline" /> :
                                                                                <GoDotFill className="text-[#0AC484]" />
                                                                        }
                                                                        {data?.status}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold text-right text-xs lg:text-sm">
                                                            <h3 className="text-green-500">{data?.amount} $</h3>
                                                            <p className="text-[10px]">Transaction ID : {data?.transactionId}</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`grid transition-all duration-500 ease-in-out  ${open[String(data.id)] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                            }`}
                                                    >
                                                        <div className="overflow-hidden flex flex-col">
                                                            <DepositLogTable data={data} />
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )
                                    }
                                    {
                                        (
                                            walletLog?.withdraw?.slice(0, 2)?.map((data: any) => (
                                                <div key={data.id} className={`bg-white px-2 lg:px-6 py-2 lg:py-4 mb-5 rounded-2xl cursor-pointer group ${open[String(data.id)] ? "shadow-md shadow-neutral-400" : ""
                                                    }`}>
                                                    <div onClick={() => toggleDepositCard(String(data.id))} className="flex flex-row justify-between items-center">
                                                        <div className="flex flex-row gap-2 lg:gap-6 items-start">
                                                            <div className={`bg-gray-200 rounded-[50%] p-2 duration-300 group-hover:text-white text-black group-hover:fill-white group-hover:bg-[#723EEB] ${open[String(data.id)] ? "rotate-0" : "-rotate-180"}`}>
                                                                <svg width="15" height="15" viewBox="0 0 16 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M8 0L7.37627 0.59661L0 7.97288L1.24746 9.22034L7.1322 3.33559V20.7458H8.8678V3.33559L14.7525 9.22034L16 7.97288L8.62373 0.59661L8 0Z" fill='currentColor' />
                                                                </svg>
                                                            </div>
                                                            <div className="w-36 xxs:w-24 md:w-full">
                                                                <h3 className="font-semibold xxs:text-sm">
                                                                    <h3 className="text-red-500">Withdraw</h3>
                                                                </h3>

                                                                <div className='flex flex-row gap-2'>
                                                                    <p className="text-[10px] xxs:text-[8px] md:text-[10px]">{data?.bankName}</p>
                                                                    <p className="text-[10px] flex items-center ml-1">
                                                                        {
                                                                            data.status === 'PENDING' ? <GoDotFill className="text-[#FF9F43]" /> :
                                                                                <GoDotFill className="text-[#0AC484]" />
                                                                        }
                                                                        {data?.status}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div className="font-semibold text-right text-xs lg:text-sm">
                                                            <h3 className="text-red-500">{data?.amount} $</h3>
                                                            <p className="text-[10px]">Account Number : {data?.accountNo}</p>
                                                        </div>
                                                    </div>
                                                    <div
                                                        className={`grid transition-all duration-500 ease-in-out  ${open[String(data.id)] ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                                            }`}
                                                    >
                                                        <div className="overflow-hidden flex flex-col">
                                                            <WithdrawLogTable data={data} />
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                            )
                                        )
                                    }
                                </div>

                            ) : (<div className='flex justify-center items-center py-5 rounded-xl bg-white'>
                                <h3 className="font-semibold text-black">You have no wallet transactions</h3>
                            </div>)
                        )
                    }
                </div>
            </div>

            {/* make main wallet modal */}
            <MakeMainWalletModal
                isMakeMainWalletModalOpen={isMakeMaintWalletModalOpen}
                setMakeMainWalletModalOpen={setMakeMaintWalletModalOpen}
                subWalletData={subWalletData}
            />

            {/* forget pin modal */}
            <ForgetPINModal
                setForgetPINModalOpen={setForgetPINModalOpen}
                isForgetPINModalOpen={isForgetPINModalOpen}
                mainWallet={mainWallet}
            />
        </div>
    );
};

export default WalletPage;