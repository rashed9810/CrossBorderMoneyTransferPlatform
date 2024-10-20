import React from 'react';

interface CardProps {
    title: string;
    children: React.ReactNode;
}

const SendMoneyCard: React.FC<CardProps> = ({ title, children }) => {
    return (
        <div className='bg-white rounded-xl min-h-auto max-h-auto py-4 my-5'>
            <div className='bg-[#723eeb] py-4 space-y-1 flex flex-col justify-center items-center w-[95%] lg:w-[45%] mx-auto rounded-xl text-white'>
                <h2 className="text-xl font-semibold">Send Money</h2>
                <h3>{title}</h3>
            </div>
            {/* form */}
            {children}
        </div>
    );
};

export default SendMoneyCard;