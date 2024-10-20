import Image from 'next/image';
import React from 'react';
import logo from '../../../public/SidebarLogo.png';


const SideLogo = () => {
    return (
        <div className='px-5 py-3'>
            <Image src={logo} width={110} height={100} alt='notfound' />
        </div>
    );
};

export default SideLogo;