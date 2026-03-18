import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  CheckCircle,
  AlertCircle,
  ArrowRight,
  CircleHelp,
  GitCompare,
  ChevronLeft,
  ChevronRight,
  DraftingCompass,
  Blocks,
} from "lucide-react";
import type { StatTest } from "@/lib/statsData";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";

interface CompareSheetProps {
  tests: StatTest[];
  open: boolean;
  onClose: () => void;
  onRemoveTest: (testId: string) => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  context?: "wizard" | "browse" | "companion";
}

export function CompareSheet({
  tests,
  open,
  onClose,
  onRemoveTest,
  onPrev,
  onNext,
  hasPrev = false,
  hasNext = false,
  context = "wizard",
}: CompareSheetProps) {
  if (tests.length === 0) return null;

  const showNavigation = onPrev && onNext && (hasPrev || hasNext);
  const isSingleTest = tests.length === 1;

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent
        className={`w-[95vw] sm:w-full p-0 overflow-hidden ${tests.length === 3 ? "max-w-[90vw]" : "max-w-4xl"}`}
        data-testid="compare-sheet"
      >
        <DialogHeader className="px-6 pt-6 pb-4 border-b bg-muted/30">
          <DialogTitle className="flex items-center gap-2 text-xl">
            {context === "companion" ? (
              <>
                <Blocks className="w-5 h-5 text-primary" />
                Useful Companions
              </>
            ) : context === "wizard" ? (
              <>
                <GitCompare className="w-5 h-5 text-primary" />
                Compare Related Methods
              </>
            ) : isSingleTest ? (
              <>
                <DraftingCompass className="w-5 h-5 text-primary" />
                Test Details
              </>
            ) : (
              <>
                <GitCompare className="w-5 h-5 text-primary" />
                Compare Statistical Tests
              </>
            )}
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[80vh]">
          <div
            className={`p-6 grid gap-4 min-w-0 grid-cols-1 ${tests.length === 3 ? "md:grid-cols-3" : tests.length === 2 ? "md:grid-cols-2" : "md:grid-cols-1 max-w-2xl mx-auto"}`}
          >
            {tests.map((test, index) => (
              <Card
                key={test.id}
                className={`relative min-w-0 flex flex-col ${context === "wizard" && index === 0 ? "border-primary" : ""}`}
                data-testid={`compare-card-${test.id}`}
              >
                {context === "wizard" && index === 0 && (
                  <Badge className="absolute -top-3 left-3 text-xs w-fit">Recommended</Badge>
                )}
                {context === "wizard" && index === 1 && (
                  <Badge variant="secondary" className="absolute -top-3 left-3 text-xs w-fit">
                    Related
                  </Badge>
                )}
                <CardHeader className="pb-3 pt-6">
                  <CardTitle className="font-mono text-base leading-tight">{test.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 text-sm">
                  <div className="text-muted-foreground text-xs">
                    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                      {test.description}
                    </ReactMarkdown>
                  </div>

                  <div className="grid grid-cols-1 gap-1 text-xs bg-muted/50 p-2 rounded-md">
                    {test.outcome && (
                      <div>
                        <span className="text-muted-foreground font-medium">Outcome: </span>
                        {test.outcome}
                      </div>
                    )}
                    {test.design && (
                      <div>
                        <span className="text-muted-foreground font-medium">Design: </span>
                        {test.design}
                      </div>
                    )}
                    {test.predictorStructure && (
                      <div>
                        <span className="text-muted-foreground font-medium">Predictors: </span>
                        {test.predictorStructure}
                      </div>
                    )}
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium flex items-center gap-1 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Assumptions
                    </h5>
                    <ul className="space-y-1 pl-5">
                      {test.assumptions.slice(0, 4).map((assumption, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <CheckCircle className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <div className="markdown-inline">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {assumption}
                            </ReactMarkdown>
                          </div>
                        </li>
                      ))}
                      {test.assumptions.length > 4 && (
                        <li className="text-xs text-muted-foreground pl-4">
                          +{test.assumptions.length - 4} more...
                        </li>
                      )}
                    </ul>
                  </div>

                  <div className="space-y-2">
                    <h5 className="font-medium flex items-center gap-1 text-xs">
                      <CircleHelp className="w-3.5 h-3.5" />
                      When to Use
                    </h5>
                    <ul className="space-y-1 pl-5">
                      {test.whenToUse.slice(0, 3).map((use, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs">
                          <ArrowRight className="w-3 h-3 text-primary mt-0.5 flex-shrink-0" />
                          <div className="markdown-inline">
                            <ReactMarkdown
                              remarkPlugins={[remarkMath]}
                              rehypePlugins={[rehypeKatex]}
                            >
                              {use}
                            </ReactMarkdown>
                          </div>
                        </li>
                      ))}
                      {test.whenToUse.length > 3 && (
                        <li className="text-xs text-muted-foreground pl-4">
                          +{test.whenToUse.length - 3} more...
                        </li>
                      )}
                    </ul>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {showNavigation && (
            <div className="border-t mt-4 px-6 py-4 flex justify-end gap-2 bg-muted/30">
              <Button
                variant="outline"
                size="sm"
                onClick={onPrev}
                disabled={!hasPrev}
                data-testid="button-prev-alternative"
              >
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={onNext}
                disabled={!hasNext}
                data-testid="button-next-alternative"
              >
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </div>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
