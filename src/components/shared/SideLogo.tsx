import Image from 'next/image';
import logo from '../../../public/SidebarLogo.png';
import useNavigationContext from '../NavigationContext/useNavigationContext';


const SideLogo = () => {
    const { isNavOpen, toggleNavigation }: any = useNavigationContext();

    return (
        <div className={`px-5 py-3 lg:w-[90%] w-[100%] ${isNavOpen ? 'hidden md:block' : ''}`}>
            <Image src={logo} className='w-[100%]' alt='notfound' priority />
        </div>
    );
};

export default SideLogo;