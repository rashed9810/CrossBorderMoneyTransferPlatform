import { ArrowLeftFromLine } from 'lucide-react';
import Link from 'next/link';

const BackToHome = () => {
    return (
        <Link
            href='https://diasporex-public-sigma.vercel.app/'
            className={`bg-[#723EEB] p-2 hover:scale-105 transition-all duration-300 text-white !my-4 gap-2 flex w-40 rounded`}
        >
            <ArrowLeftFromLine /> Back to Home
        </Link>
    );
};

export default BackToHome;
