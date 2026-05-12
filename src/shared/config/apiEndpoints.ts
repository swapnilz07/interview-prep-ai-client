const API_BASE_URL = import.meta.env.VITE_API_URL;

export const apiEndpoints = {
  auth: {
    login: `${API_BASE_URL}/auth/login`,
    register: `${API_BASE_URL}/auth/register`,
    logout: `${API_BASE_URL}/auth/logout`,
    me: `${API_BASE_URL}/auth/get-me`,
    refresh: `${API_BASE_URL}/auth/refresh`,
  },

  interview: {
    generateReport: `${API_BASE_URL}/interview/report`,
    getAllReports: `${API_BASE_URL}/interview/report`,
    getReport: `${API_BASE_URL}/interview/:interviewId`,
    deleteReport: `${API_BASE_URL}/interview/:interviewId`,
    generateResumePdf: `${API_BASE_URL}/interview/resume/generate-pdf/:interviewId`,
  },
};
