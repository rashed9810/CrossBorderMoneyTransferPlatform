import React from 'react';

const Skeleton = () => {
    return (
        <div className=" p-6 bg-white shadow-md mx-auto min-w-fit w-1/2 rounded-xl">
            <div className="animate-pulse">
                {/* Product Image Skeleton */}
                <div className="w-full lg:h-52 md:h-52 h-48 rounded-lg bg-gray-300 mb-6"></div>
                {/* Product Title Skeleton */}
                <div className="w-[390px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* product heading skeleton */}
                <div className="w-[320px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* Product Description Skeleton */}
                <div className="w-[300px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* Product Description Skeleton */}
                <div className="w-[400px] h-4 rounded-lg bg-gray-300 mb-4"></div>
                {/* Product Description Skeleton */}
                <div className="w-[300px] h-4 rounded-lg bg-gray-300 mb-4"></div>
            </div>
        </div>
    );
};

export default Skeleton;