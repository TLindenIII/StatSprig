import { useState, useMemo, useRef, useEffect } from "react";
import { Header } from "@/components/Header";
import { wizardLogic } from "@/lib/wizardKeys";
import { statisticalTests, StatTest } from "@/lib/statsData";
import { TestTile } from "@/components/TestTile";
import { TestResultCard } from "@/components/TestResultCard";
import { TestDetailSheet } from "@/components/TestDetailSheet";
import { CompareSheet } from "@/components/CompareSheet";
import { ChevronRight, RotateCcw, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useIsMobile } from "@/hooks/use-mobile";

export default function CascadingFlow() {
  const isMobile = useIsMobile();
  const [expandedMobileOption, setExpandedMobileOption] = useState<string | null>(null);

  // State to track selections at each step ID
  const [selections, setSelections] = useState<Record<string, string>>({});

  // Sheet states for leaf nodes
  const [selectedTest, setSelectedTest] = useState<StatTest | null>(null);
  const [compareTests, setCompareTests] = useState<StatTest[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [compareContext, setCompareContext] = useState<"wizard" | "companion" | "browse">("wizard");
  const [cycleList, setCycleList] = useState<string[]>([]);
  const [currentCycleIndex, setCurrentCycleIndex] = useState(0);
  const [currentBaseTest, setCurrentBaseTest] = useState<StatTest | null>(null);

  // Auto-scroll ref
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Helper to check if tags match a rule
  const matchesRule = (tags: Record<string, any>, ruleCondition: Record<string, any>) => {
    for (const [key, value] of Object.entries(ruleCondition)) {
      if (typeof value === "object" && value !== null && !Array.isArray(value)) {
        if (!tags[key] || typeof tags[key] !== "object") return false;
        if (!matchesRule(tags[key], value)) return false;
      } else {
        if (tags[key] !== value) return false;
      }
    }
    return true;
  };

  // Compute the visible panes based on current selections
  const { panes, finalTags } = useMemo(() => {
    const list: any[] = [];
    let currentStepId = "goal";
    let accumulatedTags: Record<string, any> = {};

    let safety = 0;
    while (currentStepId && safety < 50) {
      safety++;

      const stepDef = wizardLogic.steps.find((s) => s.id === currentStepId);
      if (!stepDef) break;

      list.push(stepDef);

      const selectedValue = selections[currentStepId];
      if (!selectedValue) break;

      const option = stepDef.options.find((o) => o.value === selectedValue);
      if (!option) break;

      // Accumulate tags for this selection
      if (option.set_tags) {
        for (const [k, v] of Object.entries(option.set_tags)) {
          if (typeof v === "object" && v !== null && !Array.isArray(v)) {
            accumulatedTags[k] = { ...(accumulatedTags[k] || {}), ...v };
          } else {
            accumulatedTags[k] = v;
          }
        }
      }

      if (option.next === "leaf") {
        // Find matching rule based on accumulated tags
        const rule = wizardLogic.recommendation_rules.find((r) =>
          matchesRule(accumulatedTags, r.when)
        );

        let recs = null;
        if (rule) {
          recs = {
            primary: rule.recommend,
            alternatives: rule.alternatives || [],
            companions: rule.add_ons || [],
          };
        }

        list.push({ isLeaf: true, recommendations: recs });
        break;
      }

      currentStepId = option.next;
    }

    return { panes: list, finalTags: accumulatedTags };
  }, [selections]);

  // Auto-scroll to the rightmost pane whenever selections change
  useEffect(() => {
    if (scrollContainerRef.current) {
      const container = scrollContainerRef.current;
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        container.scrollTo({
          left: container.scrollWidth,
          behavior: "smooth",
        });
      }, 50);
    }
  }, [selections]);

  const handleSelection = (stepId: string, value: string) => {
    setSelections((prev) => {
      const newSelections = { ...prev, [stepId]: value };

      // We must clear any selections that come AFTER this step,
      // otherwise branching will break if we go back and change an earlier answer.
      // Easiest reliable way: rebuild the dict from the start up to the current step.
      const cleanedSelections: Record<string, string> = {};
      let currentInfoId = "goal";

      while (currentInfoId) {
        if (currentInfoId === stepId) {
          cleanedSelections[currentInfoId] = value;
          break; // Stop rebuilding here
        }
        if (prev[currentInfoId]) {
          cleanedSelections[currentInfoId] = prev[currentInfoId];
          const stepDef = wizardLogic.steps.find((s) => s.id === currentInfoId);
          const option = stepDef?.options.find((o) => o.value === prev[currentInfoId]);
          if (option && option.next !== "leaf") {
            currentInfoId = option.next;
          } else {
            break;
          }
        } else {
          break;
        }
      }
      return cleanedSelections;
    });
  };

  const handleReset = () => {
    setSelections({});
  };

  // Re-used from Results.tsx for the Leaf pane
  const handleAlternativeTileClick = (altId: string, primaryId: string, altIds: string[]) => {
    const baseTest = statisticalTests.find((t) => t.id === primaryId);
    const altTest = statisticalTests.find((t) => t.id === altId);

    if (baseTest && altTest) {
      const altIndex = altIds.indexOf(altId);
      setCurrentBaseTest(baseTest);
      setCycleList(altIds);
      setCurrentCycleIndex(altIndex >= 0 ? altIndex : 0);
      setCompareContext("wizard");
      setCompareTests([baseTest, altTest]);
      setShowCompare(true);
    }
  };

  const handleCompanionTileClick = (compId: string, compIds: string[]) => {
    const compTest = statisticalTests.find((t) => t.id === compId);
    if (compTest) {
      const compIndex = compIds.indexOf(compId);
      const startIndex = compIndex - (compIndex % 2);

      setCurrentBaseTest(null);
      setCycleList(compIds);
      setCurrentCycleIndex(startIndex >= 0 ? startIndex : 0);
      setCompareContext("companion");

      const testsToShow = [];
      const t1 = statisticalTests.find((t) => t.id === compIds[startIndex]);
      if (t1) testsToShow.push(t1);
      if (startIndex + 1 < compIds.length) {
        const t2 = statisticalTests.find((t) => t.id === compIds[startIndex + 1]);
        if (t2) testsToShow.push(t2);
      }
      setCompareTests(testsToShow);
      setShowCompare(true);
    }
  };

  const handlePrevCycle = () => {
    if (currentCycleIndex > 0) {
      if (compareContext === "companion") {
        const step = 2; // Cycle 2 at a time for companions
        const newIndex = Math.max(0, currentCycleIndex - step);
        const t1 = statisticalTests.find((t) => t.id === cycleList[newIndex]);
        const testsToShow = t1 ? [t1] : [];
        if (newIndex + 1 < cycleList.length) {
          const t2 = statisticalTests.find((t) => t.id === cycleList[newIndex + 1]);
          if (t2) testsToShow.push(t2);
        }
        setCurrentCycleIndex(newIndex);
        setCompareTests(testsToShow);
      } else {
        const newIndex = currentCycleIndex - 1;
        const test = statisticalTests.find((t) => t.id === cycleList[newIndex]);
        if (test) {
          setCurrentCycleIndex(newIndex);
          setCompareTests(currentBaseTest ? [currentBaseTest, test] : [test]);
        }
      }
    }
  };

  const handleNextCycle = () => {
    if (compareContext === "companion") {
      const step = 2;
      if (currentCycleIndex + step < cycleList.length) {
        const newIndex = currentCycleIndex + step;
        const t1 = statisticalTests.find((t) => t.id === cycleList[newIndex]);
        const testsToShow = t1 ? [t1] : [];
        if (newIndex + 1 < cycleList.length) {
          const t2 = statisticalTests.find((t) => t.id === cycleList[newIndex + 1]);
          if (t2) testsToShow.push(t2);
        }
        setCurrentCycleIndex(newIndex);
        setCompareTests(testsToShow);
      }
    } else {
      if (currentCycleIndex < cycleList.length - 1) {
        const newIndex = currentCycleIndex + 1;
        const test = statisticalTests.find((t) => t.id === cycleList[newIndex]);
        if (test) {
          setCurrentCycleIndex(newIndex);
          setCompareTests(currentBaseTest ? [currentBaseTest, test] : [test]);
        }
      }
    }
  };

  return (
    <div className="h-screen bg-background flex flex-col overflow-hidden">
      <Header currentPage="cascading" />

      {/* Horizontal scrolling container */}
      <div
        ref={scrollContainerRef}
        className="flex-1 overflow-x-auto flex items-stretch snap-x snap-mandatory"
      >
        {panes.map((pane, index) => {
          if (pane.isLeaf) {
            // Render Leaf Pane (Recommendations)
            const recs = pane.recommendations;
            const primaryTest = statisticalTests.find((t) => t.id === recs?.primary?.[0]);

            return (
              <div
                key="leaf"
                style={{ zIndex: 40 - index }}
                className="w-[85vw] sm:w-[450px] shrink-0 border-r bg-background snap-center flex flex-col relative animate-in slide-in-from-left-12 duration-300"
              >
                <div className="p-6 border-b bg-background sticky top-0 z-10 flex items-start justify-between h-[140px] pb-4">
                  <h2 className="text-xl font-bold font-serif">Results</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleReset}
                    title="Start Over"
                    className="mb-[-8px]"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-6 overflow-y-auto flex-1 space-y-8">
                  {primaryTest ? (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Best Match
                      </h3>
                      <TestTile
                        test={primaryTest}
                        onClick={() => setSelectedTest(primaryTest)}
                        hoverColor="blue"
                        className="border-2 border-blue-500 shadow-sm"
                      />
                    </div>
                  ) : (
                    <div className="p-6 text-center border rounded-xl bg-card">
                      <p className="text-muted-foreground">
                        No matching tests found for this path.
                      </p>
                      <Button variant="outline" className="mt-4" onClick={handleReset}>
                        Start Over
                      </Button>
                    </div>
                  )}

                  {recs?.alternatives && recs.alternatives.length > 0 && primaryTest && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-green-500" />
                        Alternatives
                      </h3>
                      <div className="grid gap-3">
                        {recs.alternatives.map((altId: string) => {
                          const altTest = statisticalTests.find((t) => t.id === altId);
                          if (!altTest) return null;
                          return (
                            <TestTile
                              key={altTest.id}
                              test={altTest}
                              onClick={() =>
                                handleAlternativeTileClick(
                                  altTest.id,
                                  primaryTest.id,
                                  recs.alternatives
                                )
                              }
                              hoverColor="green"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {recs?.companions && recs.companions.length > 0 && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-500" />
                        Companions
                      </h3>
                      <div className="grid gap-3">
                        {recs.companions.map((compId: string) => {
                          const compTest = statisticalTests.find((t) => t.id === compId);
                          if (!compTest) return null;
                          return (
                            <TestTile
                              key={compTest.id}
                              test={compTest}
                              onClick={() => handleCompanionTileClick(compTest.id, recs.companions)}
                              hoverColor="amber"
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          }

          // Render Question Pane
          return (
            <div
              key={pane.id}
              style={{ zIndex: 40 - index }}
              className={`w-[85vw] sm:w-80 shrink-0 border-r border-border transition-colors duration-300 snap-center flex flex-col relative
                bg-background ${!selections[pane.id] ? "shadow-[10px_0_15px_-3px_rgba(0,0,0,0.05)]" : ""}
                animate-in slide-in-from-left-12 duration-300`}
            >
              <div className="p-6 border-b sticky top-0 bg-inherit z-10 h-[140px] flex flex-col justify-start pb-4">
                <span className="text-xs font-semibold text-muted-foreground tracking-wider uppercase mb-1">
                  Step {index + 1}
                </span>
                <div className="text-lg font-bold font-serif markdown-inline overflow-hidden text-ellipsis line-clamp-3">
                  <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                    {pane.question}
                  </ReactMarkdown>
                </div>
              </div>

              <div className="p-4 overflow-y-auto flex-1 space-y-2">
                {pane.options.map((option: any) => {
                  const isSelected = selections[pane.id] === option.value;
                  const hasSelection = !!selections[pane.id];
                  const isExpandedMobile =
                    isMobile && expandedMobileOption === `${pane.id}-${option.value}`;

                  return (
                    <button
                      key={option.value}
                      onClick={() => {
                        if (
                          isMobile &&
                          !isSelected &&
                          expandedMobileOption !== `${pane.id}-${option.value}`
                        ) {
                          setExpandedMobileOption(`${pane.id}-${option.value}`);
                          return;
                        }
                        handleSelection(pane.id, option.value);
                        if (isMobile) setExpandedMobileOption(null);
                      }}
                      className={`w-full text-left p-4 rounded-xl transition-all duration-300 flex items-center justify-between group
                        ${
                          isSelected
                            ? "bg-primary text-primary-foreground shadow-md ring-2 ring-primary ring-offset-2 ring-offset-background"
                            : isExpandedMobile
                              ? "bg-accent text-foreground border border-border shadow-sm"
                              : hasSelection
                                ? "bg-muted text-muted-foreground hover:bg-muted/80"
                                : "bg-card hover:bg-accent hover:shadow-sm border border-border shadow-sm"
                        }
                      `}
                    >
                      <div className="pr-2 w-full">
                        <div className="font-medium text-[15px] markdown-inline">
                          <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
                            {option.label}
                          </ReactMarkdown>
                        </div>
                        {option.description && (
                          <div
                            className={`grid transition-all duration-300
                            ${isSelected || isExpandedMobile ? "grid-rows-[1fr] opacity-100 mt-1" : "grid-rows-[0fr] opacity-0 group-hover:grid-rows-[1fr] group-hover:opacity-100 group-hover:mt-1"}
                          `}
                          >
                            <div className="overflow-hidden">
                              <div
                                className={`text-xs leading-relaxed markdown-inline ${isSelected ? "text-primary-foreground/80" : "text-muted-foreground"}`}
                              >
                                <ReactMarkdown
                                  remarkPlugins={[remarkMath]}
                                  rehypePlugins={[rehypeKatex]}
                                >
                                  {option.description}
                                </ReactMarkdown>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      <div
                        className={`shrink-0 rounded-full p-1 transition-transform duration-200
                        ${isSelected ? "bg-primary-foreground/20 translate-x-1 opacity-100" : isExpandedMobile ? "bg-background/50 translate-x-1 opacity-100" : "opacity-0 group-hover:opacity-100 group-hover:bg-background/50 group-hover:translate-x-1"}
                      `}
                      >
                        <ChevronRight
                          className={`w-4 h-4 ${isSelected ? "text-primary-foreground" : ""}`}
                        />
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}

        {/* Padding element at end to ensure full scrolling width */}
        <div className="w-16 shrink-0" />
      </div>

      <CompareSheet
        tests={compareTests}
        open={showCompare}
        onClose={() => setShowCompare(false)}
        onRemoveTest={(id) => {
          const updated = compareTests.filter((t) => t.id !== id);
          setCompareTests(updated);
          if (updated.length === 0) setShowCompare(false);
        }}
        onPrev={handlePrevCycle}
        onNext={handleNextCycle}
        hasPrev={currentCycleIndex > 0}
        hasNext={
          compareContext === "companion"
            ? currentCycleIndex < cycleList.length - 2
            : currentCycleIndex < cycleList.length - 1
        }
        context={compareContext}
      />

      <TestDetailSheet
        test={selectedTest}
        onClose={() => setSelectedTest(null)}
        showWizardButton={false}
        onAlternativeClick={() => {}}
      />
    </div>
  );
}
