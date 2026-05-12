import { useMutation, useQueryClient } from "@tanstack/react-query";
import { interviewApi } from "../services/interviewApi";
import { GenerateReportPayload } from "../types/interview.types";
import { toast } from "react-hot-toast";

export const useGenerateInterview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: GenerateReportPayload) => interviewApi.generateReport(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interviews"] });
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || "Failed to generate report. Please try again.";
      toast.error(message);
    },
  });
};
