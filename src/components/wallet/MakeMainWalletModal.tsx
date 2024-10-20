import React from 'react';

interface ModalProps {
    isMakeMainWalletModalOpen: boolean;
    setMakeMainWalletModalOpen: (value: boolean) => void;
}

const MakeMainWalletModal: React.FC<ModalProps> = ({ isMakeMainWalletModalOpen, setMakeMainWalletModalOpen }) => {

    const handleCloseModal = () => setMakeMainWalletModalOpen(false);

    return (
        <div className=''>
            <div className={`fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-[999] ${isMakeMainWalletModalOpen ? 'opacity-1 visible' : 'invisible opacity-0'}`}>
                <div className={`bg-white rounded shadow-lg overflow-hidden w-[95%] max-w-96 lg:w-full overflow-y-auto transition-all duration-300 absolute top-5 ${isMakeMainWalletModalOpen ? 'opacity-1 translate-y-0 duration-300' : '-translate-y-20 opacity-0 duration-300 '}`}>
                    <div className="flex justify-between items-center py-2 px-4">
                        <h3 className="text-sm font-semibold "></h3>
                        <div onClick={() => handleCloseModal()} className='bg-[#723EEB] w-6 h-6 flex justify-center items-center text-white rounded cursor-pointer'>
                            <div
                                className="text-3xl"
                            >
                                &times;
                            </div>
                        </div>
                    </div>
                    <div className="px-6 pb-2">
                        <form className='space-y-4 w-full mx-auto'>
                            <h1 className=" text-sm">Want to Make this Wallet Your Main Wallet?</h1>

                            <div className="w-full relative text-xs">
                                <label className="block mb-1  ">Confirm PIN</label>
                                <input
                                    type="password"
                                    name="confirmPIN"
                                    className="w-full px-3 py-2  border border-gray-400 rounded-[10px] focus:outline-none"
                                    placeholder="******************"
                                />
                                <span className='absolute right-3 mt-2.5'>

                                    <svg width="16" height="15" viewBox="0 0 16 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M1.59674 0L0.847251 0.785877L4.08961 4.16856L9.87373 10.2335L10.8676 11.2927L14.4033 15L15.1528 14.2141L11.9104 10.8144C14.1181 9.66757 15.5988 7.96555 15.6904 7.85877L16 7.5L15.6904 7.14123C15.5499 6.97679 12.2159 3.12642 8 3.12642C6.97963 3.12642 6.01629 3.36133 5.13238 3.70729L1.59674 0ZM8 4.21982C9.1222 4.21982 10.1833 4.55083 11.1283 5.00569C11.4644 5.5951 11.6497 6.26139 11.6497 6.9533C11.6497 7.94633 11.2831 8.85393 10.6884 9.53303L9.2057 7.97836C9.42363 7.6986 9.56416 7.34411 9.56416 6.9533C9.56416 6.04784 8.86354 5.31321 8 5.31321C7.62729 5.31321 7.28921 5.46056 7.0224 5.68907L5.96334 4.57859C6.611 4.36931 7.28921 4.21982 8 4.21982ZM3.1446 4.71526C1.47251 5.79371 0.386966 7.0494 0.309572 7.14123L0 7.5L0.309572 7.85877C0.443992 8.0168 3.53157 11.5597 7.5112 11.8394C7.6721 11.8565 7.83503 11.8736 8 11.8736C8.16497 11.8736 8.3279 11.8565 8.4888 11.8394C8.91853 11.8095 9.33809 11.7497 9.74338 11.6515L8.81466 10.6777C8.5499 10.7417 8.28106 10.7802 8 10.7802C5.98778 10.7802 4.35031 9.06321 4.35031 6.9533C4.35031 6.66287 4.38697 6.37884 4.44807 6.09909L3.1446 4.71526ZM3.43788 5.82574C3.35438 6.19519 3.30754 6.57104 3.30754 6.9533C3.30754 7.90362 3.56212 8.77919 4.00815 9.53303C2.81466 8.81549 1.90224 7.97409 1.43381 7.5C1.82281 7.10493 2.52342 6.44932 3.43788 5.82574ZM12.5621 5.82574C13.4766 6.44932 14.1752 7.10493 14.5662 7.5C14.0978 7.97409 13.1711 8.83257 11.9756 9.55011C12.4236 8.79627 12.6925 7.90362 12.6925 6.9533C12.6925 6.57104 12.6456 6.19305 12.5621 5.82574Z" fill="#4B4B4B" />
                                    </svg>

                                </span>
                            </div>
                            <div className='w-4/5 mx-auto py-3'>
                                <input className='w-full bg-[#723EEB] text-white p-2 rounded text-[10px]' type="submit" value="Confirm Change" />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MakeMainWalletModal;