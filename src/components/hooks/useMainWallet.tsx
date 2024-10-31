import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useMainWallet = () => {
    const axiosInstance = useAxiosSecure();
    const { data: mainWallet = [], refetch: mainWalletRefetch, isPending, isLoading, isSuccess, isFetching } = useQuery({
        queryKey: ['mainWallet'],
        queryFn: async () => {
            const res = await axiosInstance.get('/wallet/main-wallet');
            return res?.data?.data;
        },
        staleTime: 5 * 60 * 1000,  // 5 minutes (prevents refetching if data is considered "fresh")
        // cacheTime: 10 * 60 * 1000,  // 10 minutes (how long inactive cache remains)
        refetchOnWindowFocus: false, // Disable refetching when window is focused
        refetchOnMount: false,  // Prevent refetching on remount if data is already in cache
        refetchOnReconnect: false,  // Disable refetching when the network reconnects
    })
    return [mainWallet, mainWalletRefetch, isPending, isLoading, isSuccess, isFetching];
};

export default useMainWallet;