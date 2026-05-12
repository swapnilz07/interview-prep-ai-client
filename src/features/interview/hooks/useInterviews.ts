import { useQuery } from "@tanstack/react-query";
import { interviewApi } from "../services/interviewApi";

export const useInterviews = () => {
  return useQuery({
    queryKey: ["interviews"],
    queryFn: interviewApi.getAllReports,
  });
};
