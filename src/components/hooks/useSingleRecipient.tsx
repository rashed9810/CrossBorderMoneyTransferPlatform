import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useSingleRecipient = (id: string | null) => {
    const axiosInstance = useAxiosSecure();

    const { data: singleRecipient = {}, refetch, isFetching } = useQuery({
        queryKey: ['singleRecipient', id],  
        queryFn: async () => {
            if (!id) return null;  
            const res = await axiosInstance.get(`/recipient/${id}`);
            return res?.data?.data;  
        },
        enabled: !!id,  
    });

    return [singleRecipient, refetch, isFetching];
};

export default useSingleRecipient;
