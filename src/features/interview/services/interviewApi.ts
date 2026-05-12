import { apiEndpoints } from "../../../shared/config/apiEndpoints";
import axiosInstance from "../../../shared/config/axiosInstance";
import { GenerateReportPayload, InterviewReport } from "../types/interview.types";

export const interviewApi = {
  generateReport: async (payload: GenerateReportPayload): Promise<InterviewReport> => {
    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("jobDescription", payload.jobDescription);
    if (payload.selfDescription) {
      formData.append("selfDescription", payload.selfDescription);
    }
    if (payload.resume) {
      formData.append("resume", payload.resume);
    }

    const response = await axiosInstance.post<{ data: InterviewReport }>(
      apiEndpoints.interview.generateReport,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data.data;
  },

  getAllReports: async (): Promise<InterviewReport[]> => {
    const response = await axiosInstance.get<{ data: InterviewReport[] }>(
      apiEndpoints.interview.getAllReports
    );
    return response.data.data;
  },

  getReportById: async (interviewId: string): Promise<InterviewReport> => {
    const url = apiEndpoints.interview.getReport.replace(":interviewId", interviewId);
    const response = await axiosInstance.get<{ data: InterviewReport }>(url);
    return response.data.data;
  },

  deleteReport: async (interviewId: string): Promise<void> => {
    const url = apiEndpoints.interview.deleteReport.replace(":interviewId", interviewId);
    await axiosInstance.delete(url);
  },

  generatePdf: async (interviewId: string): Promise<void> => {
    const url = apiEndpoints.interview.generateResumePdf.replace(":interviewId", interviewId);
    const response = await axiosInstance.post(url, {}, { responseType: "blob" });

    // Create a blob from the PDF stream
    const file = new Blob([response.data], { type: "application/pdf" });
    const fileURL = URL.createObjectURL(file);

    // Trigger download
    const a = document.createElement("a");
    a.href = fileURL;
    a.download = `interview-resume-${interviewId}.pdf`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(fileURL);
  },
};
