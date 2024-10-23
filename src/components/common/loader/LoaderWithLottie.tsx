import Image from 'next/image';
import spinner from '../../../../public/loaderInitial.gif';

interface LoaderWithLottieProps {
    width?: number;
    height?: number;
}

const LoaderWithLottie: React.FC<LoaderWithLottieProps> = ({ width, height }) => {

    return (
        <>
            <Image src={spinner} alt='Loader' width={110} height={110} priority />
        </>
    );
};

export default LoaderWithLottie;
