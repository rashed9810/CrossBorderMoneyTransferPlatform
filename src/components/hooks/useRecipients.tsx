import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useRecipients = (searchValue?: string) => {
    const axiosInstance = useAxiosSecure();
    const { data: recipients = [], refetch, isPending, isLoading } = useQuery({
        queryKey: ['recipients', searchValue],
        queryFn: async () => {
            const res = await axiosInstance.get('/recipient', {
                params: {
                    searchTerm: searchValue
                }
            });

            return res?.data?.data?.data;
        },
    })
    return [recipients, refetch, isPending, isLoading];
};
export default useRecipients;