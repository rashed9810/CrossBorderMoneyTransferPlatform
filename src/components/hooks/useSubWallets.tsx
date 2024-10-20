import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSubWallets = () => {
    const axiosInstance = useAxiosSecure();
    const { data: subWallets = [], refetch, isPending} = useQuery({
        queryKey: ['subWallets'],
        queryFn: async () => {
            const res = await axiosInstance.get('wallet/sub-wallets');
            return res?.data?.data;
        },
    })
    return [subWallets, refetch, isPending];
};

export default useSubWallets;