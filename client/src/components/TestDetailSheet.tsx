import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowRight } from "lucide-react";
import { type StatTest } from "@/lib/statsData";
import { useLocation } from "wouter";
import { TestResultCard } from "@/components/TestResultCard";

interface TestDetailSheetProps {
  test: StatTest | null;
  onClose: () => void;
  onAlternativeClick: (testId: string) => void;
  showWizardButton?: boolean;
}

export function TestDetailSheet({
  test,
  onClose,
  onAlternativeClick,
  showWizardButton = true,
}: TestDetailSheetProps) {
  const [, setLocation] = useLocation();

  if (!test) return null;

  return (
    <Dialog open={!!test} onOpenChange={(open) => !open && onClose()}>
      <DialogContent
        className="w-full max-w-[95vw] sm:max-w-2xl p-0 overflow-hidden"
        data-testid="test-detail-sheet"
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Sparkles className="w-5 h-5 text-primary" />
            Best Match
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div className="p-6 space-y-6 min-w-0">
            <TestResultCard
              test={test}
              isPrimary={true}
              onAlternativeClick={onAlternativeClick}
              defaultExpanded={["assumptions", "when-to-use"]}
            />

            {showWizardButton && (
              <Button
                className="w-full"
                onClick={() => setLocation("/wizard")}
                data-testid="button-use-wizard"
              >
                Use Wizard for Recommendations
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
