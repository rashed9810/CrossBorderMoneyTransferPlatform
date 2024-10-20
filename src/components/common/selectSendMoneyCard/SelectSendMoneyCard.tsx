import React from 'react';

type CardProps = {
    title: string,
    desc: string,
}

const SelectSendMoneyCard: React.FC<CardProps> = ({ title, desc }) => {
    return (
        <div className='p-4 text-white cursor-pointer border-4 border-gray-300 transparent bg-gradient-to-t from-[#c051f2] to-[#9867f9] hover:from-[#a733dc] hover:to-[#7241d2] hover:border-[#c5c5c5] hover:shadow-[0_4px_15px_rgba(0,0,0,0.25)] transition-all ease-in-out duration-500 w-64 h-40 rounded-xl transform hover:scale-105'>

            <h3 className="font-semibold h-6">{title}</h3>
            <div className='flex justify-between items-end h-[90px]'>
                <p className='text-xs'>Transfer From your <br /> {desc}</p>
                <div className='w-7 h-7 flex justify-center items-center bg-[#16b0e1] rounded-full transform hover:scale-110 transition-transform duration-300'>
                    <svg width="14" height="14" viewBox="0 0 7 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.766667 0.75L0 1.51667L5.48333 7L0 12.4833L0.766667 13.25L6.63333 7.38333L7 7L6.63333 6.61667L0.766667 0.75Z" fill="white" />
                    </svg>

                </div>
            </div>

        </div>
    );
};

export default SelectSendMoneyCard;