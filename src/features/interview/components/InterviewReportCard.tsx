import { Link } from "react-router-dom";
import { Calendar, ChevronRight, Trash2, Activity } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { formatDate } from "../../../shared/utils/formatDate";
import { InterviewReport } from "../types/interview.types";

interface InterviewReportCardProps {
  report: InterviewReport;
  onDelete?: (id: string) => void;
  isDeleting?: boolean;
}

export const InterviewReportCard = ({
  report,
  onDelete,
  isDeleting,
}: InterviewReportCardProps) => {
  const isCompleted = report.status === "completed";
  const isProcessing = report.status === "processing";
  const isFailed = report.status === "failed";

  return (
    <div className="group relative flex flex-col justify-between overflow-hidden rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 transition-all hover:shadow-md sm:p-8">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-x-2">
          <span
            className={cn(
              "inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-xs font-medium",
              isCompleted && "bg-green-100 text-green-700",
              isProcessing && "bg-blue-100 text-blue-700",
              isFailed && "bg-red-100 text-red-700",
              !isCompleted && !isProcessing && !isFailed && "bg-gray-100 text-gray-700"
            )}
          >
            {isProcessing && <Activity className="h-3 w-3 animate-pulse" />}
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </span>
          {report.matchScore !== undefined && (
            <span className="inline-flex items-center gap-x-1 rounded-full bg-purple-100 px-2 py-1 text-xs font-medium text-purple-700">
              {report.matchScore}% Match
            </span>
          )}
        </div>
        
        {onDelete && (
          <button
            onClick={(e) => {
              e.preventDefault();
              onDelete(report._id);
            }}
            disabled={isDeleting}
            className="rounded-md p-2 text-gray-400 transition-colors hover:bg-red-50 hover:text-red-600 disabled:opacity-50"
            title="Delete report"
          >
            <Trash2 className="h-5 w-5" />
          </button>
        )}
      </div>

      <div className="mb-4">
        <h3 className="text-xl font-semibold leading-tight text-gray-900 group-hover:text-blue-600 transition-colors">
          {report.title}
        </h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">
          {report.jobDescription}
        </p>
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-4">
        <div className="flex items-center text-sm text-gray-500">
          <Calendar className="mr-1.5 h-4 w-4" />
          {formatDate(report.createdAt)}
        </div>
        
        <Link
          to={`/interviews/${report._id}`}
          className={cn(
            "inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-500",
            !isCompleted && "pointer-events-none opacity-50"
          )}
        >
          View Details
          <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
};
