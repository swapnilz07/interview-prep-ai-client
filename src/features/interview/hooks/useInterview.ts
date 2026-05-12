import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../services/interviewApi";

export const useInterview = (id?: string) => {
  return useQuery({
    queryKey: ["interview", id],
    queryFn: () => interviewApi.getReportById(id as string),
    enabled: !!id,
  });
};
