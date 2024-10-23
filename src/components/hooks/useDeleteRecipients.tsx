import { useMutation, useQueryClient } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useDeleteRecipient = () => {
  const axiosInstance = useAxiosSecure();
  const queryClient = useQueryClient();

  const deleteRecipientMutation = useMutation({
    mutationFn: async (recipientId: string) => {
      const response = await axiosInstance.delete(`/recipient/${recipientId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['recipients'] })
    },
  });

  const deleteRecipient = (recipientId: string) => {
    deleteRecipientMutation.mutate(recipientId);
  };

  return { deleteRecipient, isDeleting: deleteRecipientMutation.isPending };
};

export default useDeleteRecipient;
