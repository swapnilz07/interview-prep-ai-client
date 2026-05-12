import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, SearchX } from "lucide-react";
import { MainLayout } from "../../../shared/layouts/MainLayout";
import { InterviewReportCard } from "../components/InterviewReportCard";
import { Button } from "../../../shared/components/Button";
import { ConfirmModal } from "../../../shared/components/ConfirmModal";
import { useInterviews } from "../hooks/useInterviews";
import { useDeleteInterview } from "../hooks/useDeleteInterview";

export const InterviewReportsPage = () => {
  const { data: reports, isLoading } = useInterviews();
  const deleteMutation = useDeleteInterview();
  const [deleteModalState, setDeleteModalState] = useState<{ isOpen: boolean; reportId: string | null }>({
    isOpen: false,
    reportId: null,
  });

  const handleDeleteClick = (id: string) => {
    setDeleteModalState({ isOpen: true, reportId: id });
  };

  const handleConfirmDelete = () => {
    if (deleteModalState.reportId) {
      deleteMutation.mutate(deleteModalState.reportId, {
        onSettled: () => setDeleteModalState({ isOpen: false, reportId: null }),
      });
    }
  };

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
              Interview Practice
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage and review your AI-generated interview strategies.
            </p>
          </div>
          <Link to="/interviews/new">
            <Button className="flex items-center gap-2 rounded-xl shadow-md">
              <PlusCircle className="h-5 w-5" />
              New Interview
            </Button>
          </Link>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="h-48 rounded-2xl bg-gray-100 animate-pulse" />
            ))}
          </div>
        ) : reports?.length === 0 ? (
          <div className="bg-white rounded-2xl border border-gray-200 border-dashed p-12 text-center">
            <div className="inline-flex items-center justify-center p-4 bg-gray-50 rounded-full mb-4">
              <SearchX className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">No interviews found</h3>
            <p className="text-gray-500 mb-6 max-w-sm mx-auto">
              Get started by generating your first AI-powered interview strategy based on a job description.
            </p>
            <Link to="/interviews/new">
              <Button variant="outline" className="rounded-xl">
                Create First Interview
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {reports?.map((report) => (
              <InterviewReportCard 
                key={report._id} 
                report={report} 
                onDelete={handleDeleteClick}
                isDeleting={deleteMutation.isPending && deleteMutation.variables === report._id}
              />
            ))}
          </div>
        )}
      </div>
      <ConfirmModal
        isOpen={deleteModalState.isOpen}
        onClose={() => setDeleteModalState({ isOpen: false, reportId: null })}
        onConfirm={handleConfirmDelete}
        title="Delete Interview Report"
        message="Are you sure you want to delete this interview report? This action cannot be undone."
        confirmText="Delete"
        isConfirming={deleteMutation.isPending}
      />
    </MainLayout>
  );
};
