'use client';
import { ReactNode, useEffect, useState } from 'react';
import { CSSTransition } from 'react-transition-group';
interface IProps {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    bodyClass?: string;
    innerBodyClass?: string;
    isIcon?: boolean;
}
const SecondModal = ({
    isOpen,
    onClose,
    children,
    innerBodyClass
}: IProps) => {

    return (
        <CSSTransition
            in={isOpen}
            timeout={200}
            classNames='modal'
            unmountOnExit
        >
            <div className='fixed top-0 left-0 right-0 z-[999999] p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-screen bg-gray-900/40 flex justify-center items-center'>
                <div
                    className={`bg-white rounded-[15px] transition-transform transform modal-content w-[90%] xs:w-[80%] sm:w-[60%] lg:max-w-[500px] `}
                >
                    <button
                        type='button'
                        onClick={onClose}
                        className='absolute top-4 right-2.5 text-gray-400 bg-transparent hover:bg-gray-100/50 hover:text-gray-800 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                        Close
                    </button>
                    <div className={`${innerBodyClass} p-6`}>{children}</div>
                </div>
            </div>
        </CSSTransition>
    );
};
export default SecondModal;