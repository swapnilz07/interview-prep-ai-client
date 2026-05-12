import { useState } from "react";
import { ChevronDown, ChevronUp, Lightbulb, Target } from "lucide-react";
import { cn } from "../../../shared/utils/cn";
import { BehavioralQuestion, TechnicalQuestion } from "../types/interview.types";

interface QuestionListProps {
  title: string;
  questions: (TechnicalQuestion | BehavioralQuestion)[];
  type: "technical" | "behavioral";
}

export const QuestionList = ({ title, questions, type }: QuestionListProps) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  if (!questions || questions.length === 0) return null;

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
        {type === "technical" ? (
          <Target className="h-6 w-6 text-blue-600" />
        ) : (
          <Lightbulb className="h-6 w-6 text-purple-600" />
        )}
        {title}
      </h3>
      
      <div className="space-y-3">
        {questions.map((q, idx) => {
          const isExpanded = expandedIndex === idx;
          
          return (
            <div 
              key={idx}
              className={cn(
                "rounded-xl border transition-all duration-200 overflow-hidden",
                isExpanded 
                  ? "border-blue-200 bg-blue-50/30 shadow-sm" 
                  : "border-gray-200 bg-white hover:border-gray-300"
              )}
            >
              <button
                onClick={() => toggleExpand(idx)}
                className="w-full px-5 py-4 flex items-start justify-between text-left focus:outline-none"
              >
                <div className="flex-1 pr-6">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                      Question {idx + 1}
                    </span>
                  </div>
                  <h4 className="text-base font-medium text-gray-900 leading-snug">
                    {q.question}
                  </h4>
                </div>
                <div className="mt-1 flex-shrink-0 text-gray-400">
                  {isExpanded ? (
                    <ChevronUp className="h-5 w-5" />
                  ) : (
                    <ChevronDown className="h-5 w-5" />
                  )}
                </div>
              </button>
              
              <div 
                className={cn(
                  "px-5 pb-5 pt-1 space-y-4 text-sm transition-all",
                  isExpanded ? "block" : "hidden"
                )}
              >
                <div className="bg-white rounded-lg p-4 border border-blue-100 shadow-sm">
                  <h5 className="font-semibold text-blue-900 mb-1 flex items-center gap-1.5">
                    <Target className="h-4 w-4" /> Interviewer's Intention
                  </h5>
                  <p className="text-gray-700 leading-relaxed">{q.intention}</p>
                </div>
                
                <div className="bg-white rounded-lg p-4 border border-green-100 shadow-sm">
                  <h5 className="font-semibold text-green-900 mb-1 flex items-center gap-1.5">
                    <Lightbulb className="h-4 w-4" /> Suggested Answer Strategy
                  </h5>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">{q.answer}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
