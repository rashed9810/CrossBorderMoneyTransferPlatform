import useAxiosSecure from './useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const useUserProfile = () => {
    const axiosInstance = useAxiosSecure();
    const { data: user = {}, refetch, isPending} = useQuery({
        queryKey: ['user'],
        queryFn: async () => {
            const res = await axiosInstance.get('/user/profile');
            return res?.data?.data;
        },
    })
    return [user, refetch, isPending];
};

export default useUserProfile;