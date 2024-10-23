
const SkeletonForTransaction = () => {
    return (
        <div className='space-y-5 overflow-hidden'>

            <div className="min-w-[700px] w-full bg-white animate-pulse flex justify-center flex-col items-start mx-auto p-6 rounded-xl">
                {/* user post skeleton */}
                <div className=" w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
                <div className="mt-8 w-full">
                    <div className="w-full rounded-full bg-gray-300 h-[15px] mb-3"></div>
                    <div className="w-[90%] rounded-full bg-gray-300 h-[15px]"></div>
                </div>
            </div>

        </div>

    );
};


export default SkeletonForTransaction;