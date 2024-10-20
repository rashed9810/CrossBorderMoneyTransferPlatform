import Image from 'next/image';
import { useEffect, useState } from 'react';
import ProgressPayment from './ProgressPayment';

const CompletePayment = () => {

    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    const svg = [
        "/svg/processing.svg",
        "/svg/receive.svg",
        "/svg/complete.svg"
    ];

    useEffect(() => {
        if (currentImageIndex < svg.length - 1) {
            const interval = setInterval(() => {
                setCurrentImageIndex((prevIndex) => prevIndex + 1);
            }, 1000);

            return () => clearInterval(interval);
        }
    }, [currentImageIndex, svg.length]);

    return (
        <div>
            <ProgressPayment />
            <div className='flex justify-center py-10'>
                <div>
                    <Image
                        src={svg[currentImageIndex]}
                        width={170}
                        height={170}
                        alt="Svg of the author"
                    />
                </div>
            </div>
        </div>
    );
};

export default CompletePayment;
