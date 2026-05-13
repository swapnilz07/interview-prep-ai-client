import { useParams, Link } from "react-router-dom";
import { 
  ArrowLeft, Download, Briefcase, 
  Activity, CheckCircle2, XCircle
} from "lucide-react";
import { MainLayout } from "../../../shared/layouts/MainLayout";
import { QuestionList } from "../components/QuestionList";
import { SkillGapBadge } from "../components/SkillGapBadge";
import { PreparationPlan } from "../components/PreparationPlan";
import { Button } from "../../../shared/components/Button";
import { useInterview } from "../hooks/useInterview";
import { useGeneratePdf } from "../hooks/useGeneratePdf";

export const InterviewDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: report, isLoading, isError } = useInterview(id);
  const { generatePdf, isGenerating } = useGeneratePdf();

  const handleDownloadPdf = async () => {
    if (!id) return;
    await generatePdf(id);
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-gray-200 rounded w-1/4"></div>
            <div className="h-32 bg-gray-200 rounded-xl"></div>
            <div className="h-64 bg-gray-200 rounded-xl"></div>
          </div>
        </div>
      </MainLayout>
    );
  }

  if (isError || !report) {
    return (
      <MainLayout>
        <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex justify-center p-4 bg-red-50 rounded-full mb-4">
            <XCircle className="h-10 w-10 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Report Not Found</h2>
          <p className="text-gray-500 mb-6">We couldn't load the requested interview report.</p>
          <Link to="/interviews">
            <Button variant="outline">Back to Interviews</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const isCompleted = report.status === "completed";
  const isProcessing = report.status === "processing";

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8 pb-20">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-6">
          <Link 
            to="/interviews" 
            className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-4 w-4 mr-1" />
            Back to List
          </Link>
          
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="rounded-xl flex items-center gap-2"
              onClick={handleDownloadPdf}
              disabled={!isCompleted || isGenerating}
            >
              <Download className="h-4 w-4" />
              {isGenerating ? "Exporting..." : "Download Resume (PDF)"}
            </Button>
          </div>
        </div>

        {/* Status Banner for non-completed */}
        {isProcessing && (
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center gap-3">
            <Activity className="h-5 w-5 text-blue-600 animate-pulse" />
            <p className="text-blue-800 text-sm font-medium">
              This report is currently being processed by AI. Results will appear here once finished.
            </p>
          </div>
        )}

        {/* Overview Section */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row justify-between md:items-start gap-6">
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                {report.title}
              </h1>
              
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <div className="flex items-center bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <Briefcase className="h-4 w-4 mr-2 text-gray-400" />
                  <span className="font-medium text-gray-900 mr-1">Job Context</span>
                </div>
                {report.jobDescription && (
                  <div className="w-full mt-2">
                    <p className="text-sm text-gray-600 line-clamp-3 bg-gray-50 p-4 rounded-xl border border-gray-100">
                      {report.jobDescription}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Match Score */}
            {report.matchScore !== undefined && (
              <div className="flex-shrink-0 flex flex-col items-center justify-center p-6 bg-gradient-to-b from-purple-50 to-white rounded-2xl border border-purple-100 min-w-[160px]">
                <span className="text-sm font-bold text-purple-600 uppercase tracking-wider mb-1">
                  Match Score
                </span>
                <div className="text-5xl font-extrabold text-gray-900 tracking-tighter">
                  {report.matchScore}<span className="text-2xl text-purple-400">%</span>
                </div>
              </div>
            )}
          </div>
        </div>

        {isCompleted && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left Column - Questions */}
              <div className="lg:col-span-2 space-y-10">
                <section>
                  <QuestionList 
                    title="Technical Questions" 
                    type="technical"
                    questions={report.technicalQuestions} 
                  />
                </section>
                
                <section>
                  <QuestionList 
                    title="Behavioral Questions" 
                    type="behavioral"
                    questions={report.behavioralQuestions} 
                  />
                </section>
              </div>

              {/* Right Column - Skill Gaps */}
              <div className="space-y-8">
                {/* Skill Gaps */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <Activity className="h-5 w-5 text-red-500" />
                    Identified Skill Gaps
                  </h3>
                  {report.skillGaps && report.skillGaps.length > 0 ? (
                    <div className="space-y-3">
                      {report.skillGaps.map((gap, idx) => (
                        <SkillGapBadge key={idx} skillGap={gap} />
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-green-700 bg-green-50 p-3 rounded-lg">
                      <CheckCircle2 className="h-5 w-5" />
                      <span className="text-sm font-medium">No major skill gaps identified!</span>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Full Width Bottom - Preparation Plan */}
            <div className="bg-gray-50 rounded-2xl border border-gray-200 p-6 w-full">
              <PreparationPlan plan={report.preparationPlan} />
            </div>
          </div>
        )}
      </div>
    </MainLayout>
  );
};
