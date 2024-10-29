'use client'
import { useSearchParams } from "next/navigation"
import { useState } from "react"
import toast from "react-hot-toast"

const TransactionInfoDisplay = ({ transactionID }: { transactionID: string }) => {
    const [copyId, setCopyId] = useState(false)
    const [copyLink, setCopyLink] = useState(false)
    const id = useSearchParams().get('transactionId');



    const handleCopy = (item: 'copyId' | 'copyLink') => {
        if (item === 'copyId') {
            navigator.clipboard.writeText(id as string)
            toast.success("Copied ID!")
            setCopyId(true)
            setTimeout(() => {
                setCopyId(false)
            }, 2000)
        } else {
            navigator.clipboard.writeText('www.diasporex.com/something/3232434')
            toast.success("Copied Link!")
            setCopyLink(true)
            setTimeout(() => {
                setCopyLink(false)
            }, 2000)
        }

    }
    return (
        <>
            <div className="flex flex-row items-end text-xs lg:text-base w-full px-5">
                <div className='w-full '>
                    <label className="block mb-1 text-gray-600 font-semibold text-xs lg:text-sm ">Transaction ID</label>
                    <input
                        className='w-full px-3 py-2.5 border-[1px] border-gray-300  text-xs outline-0 rounded-tl-[15px] rounded-bl-[15px]'
                        type="text"
                        name="transactionId"
                        placeholder={`${id || transactionID}`}
                        readOnly
                    />
                </div>
                <div onClick={() => handleCopy('copyId')} id="copyId" className='cursor-pointer border-y-[1px] border-gray-400 w-12 h-[38px] flex justify-center items-center'>
                    {
                        !copyId ? <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    }
                </div>
                <div className='cursor-pointer border-[1px] border-gray-400 w-12 h-[39px] p-4 flex justify-center items-center rounded-tr-[15px] rounded-br-[15px] bg-[#723EEB]'>
                    <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                    </svg>
                </div>
            </div>
            <div className="flex flex-row items-end text-xs lg:text-base w-full px-5">
                <div className='w-full '>
                    <label className="block mb-1 text-gray-600 font-semibold text-xs lg:text-sm ">Track Your Transaction</label>
                    <input
                        className='w-full px-3 py-2.5 border border-gray-300 text-xs outline-0 rounded-tl-[15px] rounded-bl-[15px] font-semibold placeholder:text-[#733ebc]'
                        type="text"
                        name="tackingLink"
                        placeholder={'www.diasporex.com/something/3232434'}
                    />
                </div>
                <div onClick={() => handleCopy('copyLink')} id="copyLink" className='cursor-pointer border-y border-gray-300 w-12 h-[38px] flex justify-center items-center'>
                    {
                        !copyLink ? <svg width="13" height="13" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0 0V8.33333H2.91667V7.5H0.833333V0.833333H5.83333V1.25H6.66667V0H0ZM3.33333 1.66667V10H10V1.66667H3.33333ZM4.16667 2.5H9.16667V9.16667H4.16667V2.5Z" fill="#723EEB" />
                        </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                    }
                </div>
                <div className='cursor-pointer border border-gray-300 w-12 h-[39px] p-4 flex justify-center items-center rounded-tr-[15px] rounded-br-[15px] bg-[#723EEB]'>
                    <svg width="20" height="20" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.36562 0.487305L6.8 1.05293L8.46719 2.7123H4.6C3.3872 2.7123 2.4 3.6991 2.4 4.9123C2.4 6.1255 3.3872 7.1123 4.6 7.1123H4.8V6.3123H4.6C3.828 6.3123 3.2 5.6843 3.2 4.9123C3.2 4.1403 3.828 3.5123 4.6 3.5123H8.46875L6.80312 5.17793L7.36875 5.74355L10 3.1123L7.36562 0.487305ZM0 0.712305V9.5123H8.8V5.5123L8 6.3123V8.7123H0.8V1.5123H5.14141L5.94141 0.712305H0Z" fill="#fff" />
                    </svg>
                </div>
            </div>
        </>
    )
}
export default TransactionInfoDisplay