import React from 'react';

const ProgressPayment: React.FC = () => {
    return (
        <div className='mt-20'>
            <div className='flex justify-center '>
                <ol className="flex items-center w-[60%] justify-center mx-auto   ">
                    {/* Step 1 */}
                    <li className="flex w-full items-center text-gray-600">
                        <div className="flex items-center justify-center w-6 h-6 bg-orange-400 rounded-full shrink-0">
                            {/* Circle */}
                        </div>
                        {/* <span className=" text-sm font-medium">Your Payment Is Done</span> */}
                        <div className="flex w-full items-center -mx-1">
                            <div className="w-full h-2.5 bg-gradient-to-r from-orange-400 to-gray-400"></div>
                        </div>
                    </li>

                    {/* Step 2 */}
                    <li className="flex w-full items-center text-gray-600">
                        <div className="flex items-center justify-center w-6 h-6 bg-gray-400 rounded-full shrink-0">
                            {/* Circle */}
                        </div>
                        {/* <span className="text-sm font-medium">Payment Received by Agent</span> */}
                        <div className="flex w-full items-center -mx-1">
                            <div className="w-full h-2.5 bg-gradient-to-r from-gray-400 to-green-400"></div>
                        </div>
                    </li>

                    {/* Step 3 */}
                    <li className="flex items-center text-gray-600">
                        <div className="flex items-center justify-center w-6 h-6 bg-green-400 rounded-full">
                        </div>
                        {/* <span className="text-sm font-medium">Your Payment Received By Recipient</span> */}
                    </li>
                </ol>
            </div>
            <div className='flex text-sm font-medium justify-evenly w-auto ml-10 mt-4'>
                <p>Your Payment Is Done</p>
                <p className='ml-16'>Payment Received by Agent</p>
                <p>Your Payment Received By Recipient</p>
            </div>
        </div>
    );
};

export default ProgressPayment;
