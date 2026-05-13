import { CheckCircle2 } from "lucide-react";
import { PreparationPlanDay } from "../types/interview.types";

interface PreparationPlanProps {
  plan: PreparationPlanDay[];
}

export const PreparationPlan = ({ plan }: PreparationPlanProps) => {
  if (!plan || plan.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="text-2xl font-bold text-gray-900">Recommended Preparation Plan</h3>
      
      <div className="relative border-l-2 border-gray-200 ml-3 md:ml-4 space-y-8 pb-4">
        {plan.map((dayPlan, idx) => (
          <div key={idx} className="relative pl-6 md:pl-8">
            {/* Timeline dot */}
            <span className="absolute -left-[11px] top-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 ring-4 ring-white">
              <span className="text-[10px] font-bold text-white">{dayPlan.day}</span>
            </span>
            
            <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="mb-3 flex items-center justify-between">
                <h4 className="text-lg font-bold text-gray-900">
                  Day {dayPlan.day}: <span className="text-blue-600">{dayPlan.focus}</span>
                </h4>
              </div>
              
              <ul className="space-y-2 mt-4">
                {dayPlan.tasks.map((task, taskIdx) => (
                  <li key={taskIdx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{task}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
