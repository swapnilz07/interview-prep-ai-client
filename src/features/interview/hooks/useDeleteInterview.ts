import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interviewApi } from "../services/interviewApi";
import { toast } from "react-hot-toast";

export const useDeleteInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => interviewApi.deleteReport(id),
    onSuccess: () => {
      toast.success("Report deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: () => {
      toast.error("Failed to delete report");
    },
  });
};
