import { useState } from "react";
import { interviewApi } from "../services/interviewApi";
import { toast } from "react-hot-toast";

export const useGeneratePdf = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePdf = async (id: string) => {
    setIsGenerating(true);
    try {
      await interviewApi.generatePdf(id);
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to generate PDF";
      toast.error(message);
    } finally {
      setIsGenerating(false);
    }
  };

  return { generatePdf, isGenerating };
};
