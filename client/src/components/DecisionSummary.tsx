import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Check, ChevronRight, History } from "lucide-react";
import type { WizardStep } from "@/lib/wizardKeys";
import { TextWithGlossary } from "@/components/TextWithGlossary";

interface DecisionSummaryProps {
  steps: WizardStep[];
  selections: Record<string, string>;
  onStepClick?: (stepIndex: number) => void;
  variant?: "sidebar" | "compact";
}

export function DecisionSummary({
  steps,
  selections,
  onStepClick,
  variant = "sidebar",
}: DecisionSummaryProps) {
  // Filter steps that have a recorded selection
  const selectedSteps = steps.filter(
    (step) => selections[step.id] !== undefined && selections[step.id] !== ""
  );

  if (variant === "compact") {
    // Compact horizontal view for Results page
    if (selectedSteps.length === 0) return null;

    return (
      <div className="border rounded-lg bg-card text-card-foreground shadow-sm">
        <div className="p-4 flex flex-col gap-3">
          <div className="flex items-center gap-2 text-sm font-semibold text-muted-foreground">
            <History className="w-4 h-4" />
            <span>Analysis Path</span>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            {selectedSteps.map((step, index) => {
              const selectedValue = selections[step.id];
              const option = step.options.find((o) => o.value === selectedValue);
              const displayLabel = option?.label || selectedValue;
              const isClickable = onStepClick !== undefined;

              return (
                <div key={step.id} className="flex items-center">
                  <Badge
                    variant="secondary"
                    className={`flex items-center gap-1 whitespace-normal text-left h-auto py-1.5 ${isClickable ? "cursor-pointer hover:bg-secondary/80" : ""}`}
                    onClick={() =>
                      isClickable && onStepClick(steps.findIndex((s) => s.id === step.id))
                    }
                  >
                    <span className="opacity-70 font-normal">{step.title}:</span>
                    <span className="markdown-inline">
                      <TextWithGlossary text={displayLabel} />
                    </span>
                  </Badge>
                  {index < selectedSteps.length - 1 && (
                    <ChevronRight className="w-4 h-4 text-muted-foreground mx-1" />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // Sidebar / Timeline view for Wizard
  return (
    <div className="space-y-4">
      <div>
        <h3 className="font-semibold text-lg mb-1">Your Journey</h3>
        <p className="text-sm text-muted-foreground">Track your decisions as you go.</p>
      </div>

      <div className="relative pl-4 space-y-6 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-0.5 before:bg-border">
        {selectedSteps.map((step, index) => {
          const selectedValue = selections[step.id];
          const option = step.options.find((o) => o.value === selectedValue);
          const stepIndex = steps.findIndex((s) => s.id === step.id);
          const isClickable = onStepClick !== undefined;
          const displayLabel = option?.label || selectedValue;

          return (
            <div
              key={step.id}
              className={`relative pl-6 ${isClickable ? "cursor-pointer group" : ""}`}
              onClick={() => isClickable && onStepClick(stepIndex)}
            >
              {/* Dot */}
              <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-primary ring-4 ring-background group-hover:ring-primary/20 transition-all" />

              <div className="space-y-1">
                <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                  {step.title}
                </div>
                <div className="font-medium text-sm leading-tight group-hover:text-primary transition-colors markdown-inline">
                  <TextWithGlossary text={displayLabel} />
                </div>
              </div>
            </div>
          );
        })}

        {selectedSteps.length === 0 && (
          <div className="relative pl-6">
            <div className="absolute left-[-5px] top-1.5 w-2.5 h-2.5 rounded-full bg-muted ring-4 ring-background" />
            <p className="text-sm text-muted-foreground italic">Decisions will appear here...</p>
          </div>
        )}
      </div>
    </div>
  );
}
