import { agentsData } from '@/utils/data/agentsData';
import Image from 'next/image'
import React, { useState } from 'react';
import { GoDotFill } from 'react-icons/go';
import AgentAvater from '../../../public/agent-avater.png';
import Link from 'next/link';

interface Agent {
  name: string;
  id: number;
  agentsId: string;
  status: string;
  rate: string;
  rating: string;
  country: string;
  bankName: string;
  bankAccountNo: string;
  exchangeRate: string;
  exchangeTime: string;
  totalTransaction: number;
  recipientWillReceive: number;
}

interface SelectAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type OpenStateType = {
  [key: number]: boolean;
};

const SelectAgentModal: React.FC<SelectAgentModalProps> = ({ isOpen, onClose }) => {
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>(null);
  const [open, setOpen] = useState<OpenStateType>({});

  if (!isOpen) return null;

  const toggleCard = (id: number) => {
    setOpen(prevState => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded shadow-lg max-w-lg w-full">
        <div className='bg-[#723eeb] py-5 space-y-1 flex flex-col justify-center items-center w-full text-white relative'>
          <h2 className="text-xl font-semibold">Send Money</h2>
          <div onClick={onClose} className='absolute right-3 top-2 w-6 h-6 flex justify-center items-center text-white border-[1.5px] border-white cursor-pointer rounded'>
            <div
              className="text-3xl"
            >
              &times;
            </div>
          </div>
        </div>
        <div className="overflow-y-auto h-[500px] px-6 pt-6 pb-10">
          {agentsData.map((data: Agent) => (
            <div key={data.id} className={`bg-white px-2 py-1 lg:px-6 lg:py-2 mb-3 text-xs cursor-pointer border-b `}>
              <div onClick={() => toggleCard(data.id)} className="flex flex-row justify-between items-center w-full">
                <div className="flex flex-row gap-3 lg:gap-2 items-start w-[85%]">

                  <Image src={AgentAvater} width={30} height={30} alt='Agent Avater' />

                  <div className="">
                    <h3 className="text-[10px] font-bold">{data.name}</h3>
                    <div>
                      <p className="text-[10px] -ml-[2px]"> <GoDotFill className="text-[#60bb6f] inline-block items-center " /> {data.status}</p>
                    </div>
                  </div>
                  <div className="">
                    <h3 className="text-[10px] font-semibold text-[#723EEB]">ID: {data.agentsId}</h3>
                  </div>
                </div>
                <div className="w-[40%] flex flex-col items-end">
                  <h5 className="text-xs text-[#ff7d55] rounded font-semibold">Agent rate : {data.rate}$</h5>
                  <h5 className="text-xs text-[#723EEB] rounded font-semibold">Rating : {data.rating}</h5>
                </div>
              </div>
              {/* dropdown table */}
              <div className={`grid transition-all duration-500 ease-in-out  ${open[data.id] ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}>
                <div className='overflow-hidden flex flex-col'>
                  <div className='bg-gray-100 rounded-2xl p-4 mt-10'>
                    <div className=''>
                      {/* 1st row */}
                      <p className='border-b border-black flex flex-row justify-between items-center text-xs pb-2 '>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 0C3.57227 0 2 1.57227 2 3.5C2 4.70508 2.61523 5.77539 3.54688 6.40625C1.76367 7.17188 0.5 8.94141 0.5 11H1.5C1.5 8.78516 3.28516 7 5.5 7C7.71484 7 9.5 8.78516 9.5 11H10.5C10.5 8.94141 9.23633 7.17188 7.45312 6.40625C8.38477 5.77539 9 4.70508 9 3.5C9 1.57227 7.42773 0 5.5 0ZM5.5 1C6.88672 1 8 2.11328 8 3.5C8 4.88672 6.88672 6 5.5 6C4.11328 6 3 4.88672 3 3.5C3 2.11328 4.11328 1 5.5 1Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Name</p>
                        </div>
                        <p >{data.name}</p>
                      </p>
                      {/* 2nd row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="15" height="10" viewBox="00 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0.277344 0.5V10.5H14.7218V0.5H0.277344ZM2.67318 1.61111H12.326L7.49957 4.82292L2.67318 1.61111ZM1.38845 2.09722L7.18707 5.96875L7.49957 6.15972L7.81207 5.96875L13.6107 2.09722V9.38889H1.38845V2.09722Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Country</p>
                        </div>
                        <p >{data.country}</p>
                      </p>
                      {/* 3rd row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600  rounded-full flex justify-center items-center w-6 h-6 '>
                            <svg width="12" height="12" viewBox="00 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M5.5 0.5C2.74284 0.5 0.5 2.74284 0.5 5.5C0.5 8.25716 2.74284 10.5 5.5 10.5C8.25716 10.5 10.5 8.25716 10.5 5.5C10.5 2.74284 8.25716 0.5 5.5 0.5ZM5.5 1.33333C6.32031 1.33333 7.08203 1.57747 7.72656 1.98438L7.38802 2.02344L7.46615 2.85677L7.02344 2.66146L6.65885 2.97396L6.72396 3.83333L7.6224 3.54688L8.74219 3.91146L8.45573 4.43229L7.77865 4.01562L7.04948 4.11979L6.33333 4.65365L5.92969 5.90365L6.73698 6.56771C6.73698 6.56771 7.56543 6.42448 7.60938 6.42448C7.65332 6.42448 7.96094 7.17969 7.96094 7.17969L7.29688 9.26302C6.75488 9.52181 6.1429 9.66667 5.5 9.66667C5.36816 9.66667 5.23796 9.65202 5.10938 9.64062L4.65365 8.84635L5.09635 7.17969L3.41667 5.91667H1.86719L1.46354 5.09635L2.58333 4.21094L4.25 3.41667L4.0026 2.3099L4.71875 2.15365L5.05729 2.6224L6.30729 2.38802L6.08594 1.42448L5.16146 1.35938C5.27214 1.35124 5.38607 1.33333 5.5 1.33333ZM5.03125 1.35938L4.38021 1.63281L4.06771 1.58073C4.37533 1.46842 4.69434 1.39681 5.03125 1.35938ZM1.35938 5.82552L1.76302 6.29427V7.15365L2.54427 8.01302H3.02604L4.21094 9.47135C2.63867 8.96191 1.49121 7.53776 1.35938 5.82552Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Bank Name</p>
                        </div>
                        <p >{data.bankName}</p>
                      </p>
                      {/* 4th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="12" height="12" viewBox="00 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8 0.389282C6.62467 0.389282 5.5 1.51396 5.5 2.88928C5.5 3.30269 5.65951 3.72424 5.86458 4.19137C6.06966 4.65849 6.32845 5.15328 6.59375 5.61064C7.12435 6.52535 7.66146 7.29032 7.66146 7.29032L8 7.78512L8.33854 7.29032C8.33854 7.29032 8.87565 6.52535 9.40625 5.61064C9.67155 5.15328 9.93034 4.65849 10.1354 4.19137C10.3405 3.72424 10.5 3.30269 10.5 2.88928C10.5 1.51396 9.37533 0.389282 8 0.389282ZM3.82031 1.19657L0.5 2.61584V10.6106L3.84635 9.16532L7.17969 10.4153L10.5 8.99605V5.36324C10.2347 5.87268 9.9401 6.36096 9.66667 6.79553V8.44918L7.58333 9.33459V8.65751L6.97135 7.7721C6.90625 7.67769 6.82975 7.56539 6.75 7.44657V9.37366L4.25 8.43616V2.23824L4.70573 2.40751C4.74642 2.12594 4.81966 1.85413 4.92708 1.60022L3.82031 1.19657ZM8 1.22262C8.92448 1.22262 9.66667 1.9648 9.66667 2.88928C9.66667 3.05042 9.56575 3.43127 9.38021 3.85282C9.19466 4.27437 8.93262 4.75289 8.67708 5.19397C8.33691 5.77991 8.19043 5.98824 8 6.2747C7.80957 5.98824 7.66309 5.77991 7.32292 5.19397C7.06738 4.75289 6.80534 4.27437 6.61979 3.85282C6.43424 3.43127 6.33333 3.05042 6.33333 2.88928C6.33333 1.9648 7.07552 1.22262 8 1.22262ZM3.41667 2.26428V8.44918L1.33333 9.33459V3.16272L3.41667 2.26428ZM8 2.26428C7.65495 2.26428 7.375 2.54423 7.375 2.88928C7.375 3.23433 7.65495 3.51428 8 3.51428C8.34505 3.51428 8.625 3.23433 8.625 2.88928C8.625 2.54423 8.34505 2.26428 8 2.26428Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Bank Account No</p>
                        </div>
                        <p >{data.bankAccountNo}</p>
                      </p>
                      {/* 5th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0.892578V4.10686H5V0.892578H0ZM0.357143 1.24972H4.64286V3.74972H0.357143V1.24972ZM0.714286 1.60686V1.96401H2.5V1.60686H0.714286ZM3.57143 1.60686V1.7966C3.37054 1.83008 3.21429 2.00028 3.21429 2.20954C3.21429 2.34417 3.28892 2.46763 3.4096 2.52762L3.92857 2.7899C3.92857 2.82966 3.90137 2.85686 3.86161 2.85686H3.63839C3.59863 2.85686 3.57143 2.82966 3.57143 2.7899V2.67829H3.21429V2.7899C3.21429 2.99916 3.37054 3.16936 3.57143 3.20285V3.39258H3.92857V3.20285C4.12946 3.16936 4.28571 2.99916 4.28571 2.7899C4.28571 2.65527 4.21108 2.53251 4.0904 2.47182L3.57143 2.20954C3.57143 2.16978 3.59863 2.14258 3.63839 2.14258H3.86161C3.90137 2.14258 3.92857 2.16978 3.92857 2.20954V2.32115H4.28571V2.20954C4.28571 2.00028 4.12946 1.83008 3.92857 1.7966V1.60686H3.57143ZM0.714286 2.14258V2.49972H1.96429V2.14258H0.714286ZM1.16071 2.67829C1.05259 2.67829 0.976562 2.73968 0.926339 2.79548C0.876116 2.85128 0.839146 2.91336 0.809152 2.97963C0.749163 3.11286 0.714286 3.25656 0.714286 3.39258H1.07143C1.07143 3.33538 1.09933 3.21122 1.13839 3.12472C1.14955 3.09961 1.16071 3.09124 1.17188 3.0745C1.18513 3.09263 1.19489 3.10449 1.21094 3.1303C1.23675 3.17215 1.26535 3.22238 1.30022 3.26981C1.3351 3.31724 1.37765 3.39537 1.51228 3.39816C1.6183 3.40025 1.65109 3.36189 1.68527 3.33677C1.71945 3.31166 1.74316 3.28795 1.76897 3.26423C1.78641 3.24819 1.80036 3.23633 1.81362 3.22517C1.8185 3.23214 1.83803 3.244 1.93638 3.28655C2.05566 3.33887 2.23633 3.39258 2.5 3.39258V3.03544C2.28027 3.03544 2.16588 2.99986 2.08147 2.96289C1.99707 2.92592 1.9329 2.85686 1.78571 2.85686C1.67829 2.85686 1.65109 2.89872 1.6183 2.92383C1.58901 2.94615 1.56878 2.96987 1.54576 2.99079C1.5353 2.97405 1.53041 2.96568 1.51786 2.94615C1.48786 2.89732 1.45229 2.84222 1.40067 2.7899C1.34905 2.73758 1.26744 2.67829 1.16071 2.67829Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Exchange Rate</p>
                        </div>
                        <p className='text-[#fbbb7d]'>{data.exchangeRate}$</p>
                      </p>
                      {/* 6th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 0C1.12142 0 0 1.12142 0 2.5C0 3.87858 1.12142 5 2.5 5C3.87858 5 5 3.87858 5 2.5C5 1.12142 3.87858 0 2.5 0ZM2.5 0.416667C3.65316 0.416667 4.58333 1.34684 4.58333 2.5C4.58333 3.65316 3.65316 4.58333 2.5 4.58333C1.34684 4.58333 0.416667 3.65316 0.416667 2.5C0.416667 1.34684 1.34684 0.416667 2.5 0.416667ZM2.29167 0.833333V2.70833H3.75V2.29167H2.70833V0.833333H2.29167Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Exchange Time</p>
                        </div>
                        <p className='text-[#3dd9fc]'>{data.exchangeTime}</p>
                      </p>
                      {/* 7th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0.892578V4.10686H5V0.892578H0ZM0.357143 1.24972H4.64286V3.74972H0.357143V1.24972ZM0.714286 1.60686V1.96401H2.5V1.60686H0.714286ZM3.57143 1.60686V1.7966C3.37054 1.83008 3.21429 2.00028 3.21429 2.20954C3.21429 2.34417 3.28892 2.46763 3.4096 2.52762L3.92857 2.7899C3.92857 2.82966 3.90137 2.85686 3.86161 2.85686H3.63839C3.59863 2.85686 3.57143 2.82966 3.57143 2.7899V2.67829H3.21429V2.7899C3.21429 2.99916 3.37054 3.16936 3.57143 3.20285V3.39258H3.92857V3.20285C4.12946 3.16936 4.28571 2.99916 4.28571 2.7899C4.28571 2.65527 4.21108 2.53251 4.0904 2.47182L3.57143 2.20954C3.57143 2.16978 3.59863 2.14258 3.63839 2.14258H3.86161C3.90137 2.14258 3.92857 2.16978 3.92857 2.20954V2.32115H4.28571V2.20954C4.28571 2.00028 4.12946 1.83008 3.92857 1.7966V1.60686H3.57143ZM0.714286 2.14258V2.49972H1.96429V2.14258H0.714286ZM1.16071 2.67829C1.05259 2.67829 0.976562 2.73968 0.926339 2.79548C0.876116 2.85128 0.839146 2.91336 0.809152 2.97963C0.749163 3.11286 0.714286 3.25656 0.714286 3.39258H1.07143C1.07143 3.33538 1.09933 3.21122 1.13839 3.12472C1.14955 3.09961 1.16071 3.09124 1.17188 3.0745C1.18513 3.09263 1.19489 3.10449 1.21094 3.1303C1.23675 3.17215 1.26535 3.22238 1.30022 3.26981C1.3351 3.31724 1.37765 3.39537 1.51228 3.39816C1.6183 3.40025 1.65109 3.36189 1.68527 3.33677C1.71945 3.31166 1.74316 3.28795 1.76897 3.26423C1.78641 3.24819 1.80036 3.23633 1.81362 3.22517C1.8185 3.23214 1.83803 3.244 1.93638 3.28655C2.05566 3.33887 2.23633 3.39258 2.5 3.39258V3.03544C2.28027 3.03544 2.16588 2.99986 2.08147 2.96289C1.99707 2.92592 1.9329 2.85686 1.78571 2.85686C1.67829 2.85686 1.65109 2.89872 1.6183 2.92383C1.58901 2.94615 1.56878 2.96987 1.54576 2.99079C1.5353 2.97405 1.53041 2.96568 1.51786 2.94615C1.48786 2.89732 1.45229 2.84222 1.40067 2.7899C1.34905 2.73758 1.26744 2.67829 1.16071 2.67829Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Total Transaction</p>
                        </div>
                        <p >{data.totalTransaction}</p>
                      </p>
                      {/* 8th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-indigo-600 flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2.5 0.12207L2.34205 0.481547L1.7756 1.75061L0.392157 1.89767L0 1.94124L0.294118 2.20268L1.32353 3.13405L1.03486 4.49571L0.953159 4.87697L1.2963 4.68089L2.5 3.98373L3.7037 4.68089L4.04684 4.87697L3.96514 4.49571L3.67647 3.13405L4.70588 2.20268L5 1.94124L4.60784 1.89767L3.2244 1.75061L2.65795 0.481547L2.5 0.12207ZM2.5 0.97719L2.94662 1.98482L2.9902 2.07741L3.08824 2.0883L4.18301 2.20268L3.36601 2.93797L3.28976 3.00878L3.31155 3.10682L3.5403 4.1798L2.58715 3.63514L2.5 3.58068L2.41285 3.63514L1.45969 4.1798L1.68845 3.10682L1.71024 3.00878L1.63399 2.93797L0.816993 2.20268L1.91176 2.0883L2.0098 2.07741L2.05338 1.98482L2.5 0.97719Z" fill="#723EEB" />
                            </svg>
                          </div>
                          <p>Agent Rating</p>
                        </div>
                        <p className='text-[#fd5f2e]'>{data.rating}</p>
                      </p>
                      {/* 9th row */}
                      <p className='border-b border-black flex flex-row justify-between items-center py-3 text-xs text-[#60bb6f]'>
                        <div className='flex flex-row gap-3 items-center'>
                          <div className='border border-[#60bb6f] flex justify-center items-center w-6 h-6 rounded-full'>
                            <svg width="10" height="10" viewBox="0 0 5 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M0 0.892578V4.10686H5V0.892578H0ZM0.357143 1.24972H4.64286V3.74972H0.357143V1.24972ZM0.714286 1.60686V1.96401H2.5V1.60686H0.714286ZM3.57143 1.60686V1.7966C3.37054 1.83008 3.21429 2.00028 3.21429 2.20954C3.21429 2.34417 3.28892 2.46763 3.4096 2.52762L3.92857 2.7899C3.92857 2.82966 3.90137 2.85686 3.86161 2.85686H3.63839C3.59863 2.85686 3.57143 2.82966 3.57143 2.7899V2.67829H3.21429V2.7899C3.21429 2.99916 3.37054 3.16936 3.57143 3.20285V3.39258H3.92857V3.20285C4.12946 3.16936 4.28571 2.99916 4.28571 2.7899C4.28571 2.65527 4.21108 2.53251 4.0904 2.47182L3.57143 2.20954C3.57143 2.16978 3.59863 2.14258 3.63839 2.14258H3.86161C3.90137 2.14258 3.92857 2.16978 3.92857 2.20954V2.32115H4.28571V2.20954C4.28571 2.00028 4.12946 1.83008 3.92857 1.7966V1.60686H3.57143ZM0.714286 2.14258V2.49972H1.96429V2.14258H0.714286ZM1.16071 2.67829C1.05259 2.67829 0.976562 2.73968 0.926339 2.79548C0.876116 2.85128 0.839146 2.91336 0.809152 2.97963C0.749163 3.11286 0.714286 3.25656 0.714286 3.39258H1.07143C1.07143 3.33538 1.09933 3.21122 1.13839 3.12472C1.14955 3.09961 1.16071 3.09124 1.17188 3.0745C1.18513 3.09263 1.19489 3.10449 1.21094 3.1303C1.23675 3.17215 1.26535 3.22238 1.30022 3.26981C1.3351 3.31724 1.37765 3.39537 1.51228 3.39816C1.6183 3.40025 1.65109 3.36189 1.68527 3.33677C1.71945 3.31166 1.74316 3.28795 1.76897 3.26423C1.78641 3.24819 1.80036 3.23633 1.81362 3.22517C1.8185 3.23214 1.83803 3.244 1.93638 3.28655C2.05566 3.33887 2.23633 3.39258 2.5 3.39258V3.03544C2.28027 3.03544 2.16588 2.99986 2.08147 2.96289C1.99707 2.92592 1.9329 2.85686 1.78571 2.85686C1.67829 2.85686 1.65109 2.89872 1.6183 2.92383C1.58901 2.94615 1.56878 2.96987 1.54576 2.99079C1.5353 2.97405 1.53041 2.96568 1.51786 2.94615C1.48786 2.89732 1.45229 2.84222 1.40067 2.7899C1.34905 2.73758 1.26744 2.67829 1.16071 2.67829Z" fill="#60bb6f" />
                            </svg>
                          </div>
                          <p>Your Recipient Will Receive</p>
                        </div>
                        <p >{data.recipientWillReceive}$</p>
                      </p>

                    </div>
                    <div className="text-xs bg-[#723EEB] w-[25%] mx-auto text-center text-white p-1.5 rounded mt-5 hover:shadow-lg shadow-black">
                      <Link href={'/user/send-money/bank-payment-confirmation'}>
                        Select
                      </Link>
                    </div>
                  </div>
                </div>
              </div >
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SelectAgentModal;
