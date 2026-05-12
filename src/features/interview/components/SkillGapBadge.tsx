import { AlertTriangle, AlertCircle, Info } from "lucide-react";
import { SkillGap } from "../types/interview.types";
import { cn } from "../../../shared/utils/cn";

interface SkillGapBadgeProps {
  skillGap: SkillGap;
}

export const SkillGapBadge = ({ skillGap }: SkillGapBadgeProps) => {
  const isHigh = skillGap.severity === "high";
  const isMedium = skillGap.severity === "medium";
  const isLow = skillGap.severity === "low";

  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-lg border px-4 py-3 shadow-sm",
        isHigh && "border-red-200 bg-red-50 text-red-900",
        isMedium && "border-yellow-200 bg-yellow-50 text-yellow-900",
        isLow && "border-blue-200 bg-blue-50 text-blue-900"
      )}
    >
      <div className="flex-shrink-0">
        {isHigh && <AlertTriangle className="h-5 w-5 text-red-600" />}
        {isMedium && <AlertCircle className="h-5 w-5 text-yellow-600" />}
        {isLow && <Info className="h-5 w-5 text-blue-600" />}
      </div>
      <div className="flex-1">
        <h4 className="text-sm font-semibold">{skillGap.skill}</h4>
      </div>
      <div>
        <span
          className={cn(
            "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider",
            isHigh && "bg-red-100 text-red-800",
            isMedium && "bg-yellow-100 text-yellow-800",
            isLow && "bg-blue-100 text-blue-800"
          )}
        >
          {skillGap.severity} impact
        </span>
      </div>
    </div>
  );
};
