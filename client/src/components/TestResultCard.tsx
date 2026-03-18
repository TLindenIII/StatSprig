import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import {
  CheckCircle,
  AlertCircle,
  CircleHelp,
  ArrowRight,
  GitCompare,
  ExternalLink,
  Code,
} from "lucide-react";
import { statisticalTests, type StatTest } from "@/lib/statsData";
import { CodeBlock } from "@/components/ui/CodeBlock";
import { TextWithGlossary } from "@/components/TextWithGlossary";

interface TestResultCardProps {
  test: StatTest;
  isPrimary?: boolean;
  onViewDetails?: () => void;
  onCompare?: () => void;
  isComparing?: boolean;
  canCompare?: boolean;
  onAlternativeClick?: (testId: string) => void;
  defaultExpanded?: string[];
}

import { cn } from "@/lib/utils";

export const TestResultCard = React.memo(function TestResultCard({
  test,
  isPrimary = false,
  onViewDetails,
  onCompare,
  isComparing = false,
  canCompare = true,
  onAlternativeClick,
  defaultExpanded = [],
}: TestResultCardProps) {
  return (
    <Card
      className={cn("relative", isPrimary ? "border-blue-500 border-2 shadow-md" : "", "min-w-0")}
      data-testid={`test-result-${test.id}`}
    >
      <CardHeader className="pb-3 pt-6">
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-1">
            <CardTitle className="font-mono text-xl">{test.name}</CardTitle>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-muted-foreground py-2">
          <TextWithGlossary text={test.description} />
        </div>

        {(test.outcome ||
          test.design ||
          test.predictorStructure ||
          test.wikipediaUrl ||
          onCompare) && (
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm text-muted-foreground">
            <div className="flex gap-4 flex-wrap items-center">
              {test.outcome && (
                <span>
                  <strong>Outcome:</strong> {test.outcome}
                </span>
              )}
              {test.design && (
                <span>
                  <strong>Design:</strong> {test.design}
                </span>
              )}
              {test.predictorStructure && (
                <span>
                  <strong>Predictors:</strong> {test.predictorStructure}
                </span>
              )}
              {test.wikipediaUrl && (
                <a
                  href={test.wikipediaUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-primary hover:underline"
                  data-testid={`link-learn-more-${test.id}`}
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Wikipedia
                </a>
              )}
            </div>

            {onCompare && (
              <Button
                variant={isComparing ? "secondary" : "outline"}
                size="sm"
                onClick={onCompare}
                disabled={!canCompare && !isComparing}
                className="w-full sm:w-auto ml-auto"
                data-testid={`compare-${test.id}`}
              >
                <GitCompare className="w-4 h-4 mr-2" />
                {isComparing ? "Remove" : "Compare"}
              </Button>
            )}
          </div>
        )}

        <Accordion key={test.id} type="multiple" defaultValue={defaultExpanded} className="w-full">
          <AccordionItem value="assumptions">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Assumptions to Check
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-2">
                {test.assumptions.map((assumption, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="markdown-inline">
                      <TextWithGlossary text={assumption} />
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="when-to-use">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <CircleHelp className="w-4 h-4" />
                When to Use
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="space-y-2 pl-2">
                {test.whenToUse.map((use, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm">
                    <ArrowRight className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                    <div className="markdown-inline">
                      <TextWithGlossary text={use} />
                    </div>
                  </li>
                ))}
              </ul>
            </AccordionContent>
          </AccordionItem>

          {!isPrimary && (
            <AccordionItem value="alternatives">
              <AccordionTrigger className="text-sm font-medium">
                <span className="flex items-center gap-2">
                  <ArrowRight className="w-4 h-4" />
                  Related Methods
                </span>
              </AccordionTrigger>
              <AccordionContent>
                <div className="flex flex-wrap gap-2 pt-1 pl-2">
                  {test.alternativeLinks && test.alternativeLinks.length > 0 ? (
                    test.alternativeLinks.map((altId) => {
                      const altTest = statisticalTests.find((t) => t.id === altId);
                      if (!altTest) {
                        return (
                          <Badge key={altId} variant="outline">
                            {altId
                              .split("-")
                              .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                              .join(" ")}
                          </Badge>
                        );
                      }
                      return onAlternativeClick ? (
                        <Button
                          key={altId}
                          variant="outline"
                          size="sm"
                          onClick={() => onAlternativeClick(altId)}
                          data-testid={`alt-link-${altId}`}
                        >
                          {altTest.name}
                        </Button>
                      ) : (
                        <a
                          key={altId}
                          href={`/browse?test=${altId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          data-testid={`alt-link-${altId}`}
                        >
                          <Button variant="outline" size="sm">
                            {altTest.name}
                          </Button>
                        </a>
                      );
                    })
                  ) : (
                    <span className="text-sm text-muted-foreground">
                      No related methods listed.
                    </span>
                  )}
                </div>
              </AccordionContent>
            </AccordionItem>
          )}

          <AccordionItem value="code-examples">
            <AccordionTrigger className="text-sm font-medium">
              <span className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                Code Examples
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-6 pt-2">
                <div className="w-full">
                  <h6 className="text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-2 text-muted-foreground">
                    Python
                  </h6>
                  <div className="max-w-full overflow-x-auto rounded-md border text-xs">
                    <CodeBlock
                      code={test.pythonCode || `# Python code example coming soon`}
                      lang="python"
                    />
                  </div>
                </div>

                <div className="w-full">
                  <h6 className="text-[10px] uppercase font-bold tracking-wider mb-2 flex items-center gap-2 text-muted-foreground">
                    R
                  </h6>
                  <div className="max-w-full overflow-x-auto rounded-md border text-xs">
                    <CodeBlock code={test.rCode || `# R code example coming soon`} lang="r" />
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
    </Card>
  );
});
