import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useCurrency = () => {
    const axiosInstance = useAxiosSecure();
    const { data: currency = [], refetch, isPending, isLoading } = useQuery({
        queryKey: ['currency'],
        queryFn: async () => {
            const res = await axiosInstance.get('/currency');
            return res?.data?.data;
        },
    })
    return [currency, refetch, isPending, isLoading];
};

export default useCurrency;