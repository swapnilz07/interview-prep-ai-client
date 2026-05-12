import { apiEndpoints } from "../../../shared/config/apiEndpoints";
import axiosInstance from "../../../shared/config/axiosInstance";



export const interviewApiService = {
    generateReport: async (resume: File, title: string, jobDescription: string, selfDescription: string) => {
        const formData = new FormData();
        formData.append("resume", resume);
        formData.append("title", title);
        formData.append("jobDescription", jobDescription);
        formData.append("selfDescription", selfDescription);
        const response = await axiosInstance.post(apiEndpoints.interview.generateReport, formData);
        return response.data;
    },
    getAllReports: async () => {
        const response = await axiosInstance.get(apiEndpoints.interview.getAllReports);
        return response.data;
    },
    getReport: async (interviewId: string) => {
        const response = await axiosInstance.get(apiEndpoints.interview.getReport.replace(":interviewId", interviewId));
        return response.data;
    },
    generateResumePdf: async (interviewId: string) => {
        const response = await axiosInstance.post(apiEndpoints.interview.generateResumePdf.replace(":interviewId", interviewId));
        return response.data;
    },

    updateReport: async (interviewId: string, updatedData: any) => {
        const response = await axiosInstance.patch(apiEndpoints.interview.getReport.replace(":interviewId", interviewId), updatedData);
        return response.data;
    },

    deleteReport: async (interviewId: string) => {
        const response = await axiosInstance.delete(apiEndpoints.interview.getReport.replace(":interviewId", interviewId));
        return response.data;
    },
};