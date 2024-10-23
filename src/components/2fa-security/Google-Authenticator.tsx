import CardSubTitle from '@/components/common/cardSubTitle/CardSubTitle';
import Image from 'next/image';
import Link from 'next/link';
import GooglePlayImage from '../../../public/googlePlay.png';

const GoogleAuthenticator = () => {
    return (
        <div>
            <CardSubTitle title='Google Authenticator' />
            <div className='bg-white px-3 py-4 space-y-4 rounded-xl my-5'>
                <h4 className="text-sm font-bold">Google Authenticator</h4>
                <p className='text-xs'>Google Authenticator is a product based authenticator by Google that executes two-venture confirmation administrations for verifying clients of any programming applications</p>
                <div className='flex flex-col justify-center items-center mt-5'>
                    <Image src={GooglePlayImage} alt='QRcode' />
                    <div className='w-[70%] my-5'>
                        <Link target='_blank' href='https://play.google.com/store/search?q=google+authenticator&c=apps&hl=en_US'>
                            <button className="text-xs bg-[#723EEB] text-white w-full p-1.5 rounded font-semibold">Download App</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GoogleAuthenticator;