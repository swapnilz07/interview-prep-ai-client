import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { BrainCircuit, UploadCloud, FileText, Briefcase, FileSignature } from "lucide-react";
import { toast } from "react-hot-toast";
import { MainLayout } from "../../../shared/layouts/MainLayout";
import { GenerateReportPayload } from "../types/interview.types";
import { Button } from "../../../shared/components/Button";
import { useGenerateInterview } from "../hooks/useGenerateInterview";

const generateSchema = z.object({
  title: z.string().min(2, "Job title is required"),
  jobDescription: z.string().min(10, "Job description is too short").max(5000, "Job description is too long"),
  selfDescription: z.string().max(2000, "Self description is too long").optional(),
  resume: z.instanceof(FileList)
    .refine((files) => files?.length === 1, "Resume is required.")
    .refine(
      (files) => {
        const file = files?.[0];
        if (!file) return false;
        const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
        return validTypes.includes(file.type);
      },
      "Only PDF and DOC/DOCX files are accepted."
    )
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, "Max file size is 5MB."),
});

type GenerateFormValues = z.infer<typeof generateSchema>;

export const GenerateInterviewPage = () => {
  const navigate = useNavigate();
  const [fileName, setFileName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GenerateFormValues>({
    resolver: zodResolver(generateSchema),
  });

  const generateMutation = useGenerateInterview();

  const onSubmit = (data: GenerateFormValues) => {
    const payload: GenerateReportPayload = {
      title: data.title,
      jobDescription: data.jobDescription,
      selfDescription: data.selfDescription,
      resume: data.resume[0],
    };
    generateMutation.mutate(payload, {
      onSuccess: () => {
        reset();
        setFileName(null);
        toast.success("Interview strategy generated successfully!");
        navigate("/interviews");
      },
    });
  };

  return (
    <MainLayout>
      <div className="max-w-3xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center p-3 bg-blue-50 rounded-full mb-4">
            <BrainCircuit className="h-8 w-8 text-blue-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            AI Interview Prep
          </h1>
          <p className="text-lg text-gray-500">
            Upload your resume and the job description to generate a customized interview strategy.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden">
          <form onSubmit={handleSubmit(onSubmit)} className="p-8 space-y-8">
            {/* Job Title */}
            <div>
              <label htmlFor="title" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                Target Job Title
              </label>
              <input
                {...register("title")}
                type="text"
                id="title"
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="e.g. Senior Frontend Developer"
              />
              {errors.title && (
                <p className="mt-2 text-sm text-red-600">{errors.title.message}</p>
              )}
            </div>

            {/* Job Description */}
            <div>
              <label htmlFor="jobDescription" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileText className="h-4 w-4 mr-2 text-gray-400" />
                Job Description
              </label>
              <textarea
                {...register("jobDescription")}
                id="jobDescription"
                rows={6}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="Paste the full job description here..."
              />
              {errors.jobDescription && (
                <p className="mt-2 text-sm text-red-600">{errors.jobDescription.message}</p>
              )}
            </div>

            {/* Self Description (Optional) */}
            <div>
              <label htmlFor="selfDescription" className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <FileSignature className="h-4 w-4 mr-2 text-gray-400" />
                About You <span className="text-gray-400 font-normal ml-2">(Optional)</span>
              </label>
              <textarea
                {...register("selfDescription")}
                id="selfDescription"
                rows={3}
                className="w-full rounded-xl border border-gray-300 px-4 py-3 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 transition-colors"
                placeholder="Highlight any specific experiences or areas you want the AI to consider..."
              />
              {errors.selfDescription && (
                <p className="mt-2 text-sm text-red-600">{errors.selfDescription.message}</p>
              )}
            </div>

            {/* Resume Upload */}
            <div>
              <label className="flex items-center text-sm font-semibold text-gray-700 mb-2">
                <UploadCloud className="h-4 w-4 mr-2 text-gray-400" />
                Resume Upload
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-xl hover:border-blue-400 hover:bg-blue-50 transition-colors group relative">
                <div className="space-y-1 text-center">
                  <UploadCloud className="mx-auto h-12 w-12 text-gray-300 group-hover:text-blue-500 transition-colors" />
                  <div className="flex text-sm text-gray-600 justify-center">
                    <label
                      htmlFor="resume"
                      className="relative cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500"
                    >
                      <span>Upload a file</span>
                      <input
                        id="resume"
                        type="file"
                        className="sr-only"
                        accept=".pdf,.doc,.docx"
                        {...register("resume", {
                          onChange: (e) => {
                            if (e.target.files && e.target.files.length > 0) {
                              setFileName(e.target.files[0].name);
                            }
                          },
                        })}
                      />
                    </label>
                    <p className="pl-1">or drag and drop</p>
                  </div>
                  <p className="text-xs text-gray-500">PDF, DOC, DOCX up to 5MB</p>
                  {fileName && (
                    <p className="text-sm font-semibold text-blue-600 mt-2">Selected: {fileName}</p>
                  )}
                </div>
              </div>
              {errors.resume && (
                <p className="mt-2 text-sm text-red-600">{errors.resume.message as string}</p>
              )}
            </div>

            {/* Submit Button */}
            <div className="pt-4">
              <Button
                type="submit"
                className="w-full py-4 text-lg font-semibold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all transform hover:-translate-y-0.5"
                disabled={generateMutation.isPending}
              >
                {generateMutation.isPending ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Analyzing & Generating Strategy...
                  </span>
                ) : (
                  "Generate AI Interview Strategy"
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
};
