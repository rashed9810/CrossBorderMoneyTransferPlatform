import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMainWallet = () => {
    const axiosInstance = useAxiosSecure();
    const { data: mainWallet = [], refetch: mainWalletRefetch, isPending, isLoading, isSuccess } = useQuery({
        queryKey: ['mainWallet'],
        queryFn: async () => {
            const res = await axiosInstance.get('/wallet/main-wallet');
            return res?.data?.data;
        },
    })
    return [mainWallet, mainWalletRefetch, isPending, isLoading, isSuccess];
};

export default useMainWallet;