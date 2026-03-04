import { useState, useMemo, useEffect, useCallback } from "react";
import { useAppSearch } from "@/lib/useAppSearch";
import { Link } from "@/lib/OfflineLink";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/ThemeToggle";
import { TestResultCard } from "@/components/TestResultCard";
import { TestDetailSheet } from "@/components/TestDetailSheet";
import { CompareSheet } from "@/components/CompareSheet";
import { statisticalTests, categoryGroups, StatTest } from "@/lib/statsData";
import { Search, DraftingCompass, X, GitCompare } from "lucide-react";
import { NavLinks } from "@/components/NavLinks";
import { Header } from "@/components/Header";

// Smart search with weighted scoring and typo tolerance
function levenshteinDistance(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;
  const matrix: number[][] = [];
  for (let i = 0; i <= b.length; i++) matrix[i] = [i];
  for (let j = 0; j <= a.length; j++) matrix[0][j] = j;
  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      const cost = a[j - 1] === b[i - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }
  return matrix[b.length][a.length];
}

function scoreText(text: string, query: string): number {
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  if (!lowerQuery) return 0;

  // Exact match - highest score
  if (lowerText === lowerQuery) return 1000;

  // Starts with query - very high
  if (lowerText.startsWith(lowerQuery)) return 800;

  // Contains exact query phrase as substring - high priority for multi-word queries
  if (lowerText.includes(lowerQuery)) {
    // Bonus points based on query length (longer phrases = more specific = higher score)
    return 600 + Math.min(lowerQuery.length * 10, 200);
  }

  // Word-level matching
  const textWords = lowerText.split(/\s+/);
  const queryWords = lowerQuery.split(/\s+/).filter((w) => w.length > 0);
  let wordScore = 0;
  let matchedWords = 0;

  for (const qWord of queryWords) {
    // Skip single-character words for individual scoring (but they count in phrase match above)
    if (qWord.length === 1) continue;

    let bestWordMatch = 0;
    for (const word of textWords) {
      // Exact word match
      if (word === qWord) {
        bestWordMatch = Math.max(bestWordMatch, 400);
        continue;
      }
      // Word starts with query word
      if (word.startsWith(qWord)) {
        bestWordMatch = Math.max(bestWordMatch, 300);
        continue;
      }
      // Word contains query word
      if (word.includes(qWord)) {
        bestWordMatch = Math.max(bestWordMatch, 200);
        continue;
      }
      // Fuzzy match with typo tolerance (for words 3+ chars)
      if (qWord.length >= 3 && word.length >= 3) {
        const distance = levenshteinDistance(word.slice(0, Math.max(qWord.length, 5)), qWord);
        const maxAllowedDistance = qWord.length <= 4 ? 1 : 2;
        if (distance <= maxAllowedDistance) {
          bestWordMatch = Math.max(bestWordMatch, 150 - distance * 30);
        }
      }
    }
    if (bestWordMatch > 0) matchedWords++;
    wordScore += bestWordMatch;
  }

  return wordScore;
}

function getSearchScore(test: StatTest, query: string): number {
  if (!query.trim()) return 1; // No query = show all equally

  // Field weights - name is most important
  const weights = {
    name: 10,
    description: 4,
    whenToUse: 3,
    assumptions: 2,
    category: 2,
    methodFamily: 2,
  };

  let totalScore = 0;

  totalScore += scoreText(test.name, query) * weights.name;
  totalScore += scoreText(test.description, query) * weights.description;
  totalScore += scoreText(test.category, query) * weights.category;

  // Array fields - take best match
  const whenToUseScore = test.whenToUse.reduce((max, t) => Math.max(max, scoreText(t, query)), 0);
  totalScore += whenToUseScore * weights.whenToUse;

  const assumptionScore = test.assumptions.reduce(
    (max, a) => Math.max(max, scoreText(a, query)),
    0
  );
  totalScore += assumptionScore * weights.assumptions;

  return totalScore;
}

function matchesSearch(test: StatTest, query: string): boolean {
  return getSearchScore(test, query) > 0;
}

import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function AllTests() {
  const searchString = useAppSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedOutcomeScale, setSelectedOutcomeScale] = useState<string | null>(null);
  const [selectedDesign, setSelectedDesign] = useState<string | null>(null);

  const [selectedTest, setSelectedTest] = useState<StatTest | null>(null);
  const [compareTests, setCompareTests] = useState<StatTest[]>([]);
  const [showCompare, setShowCompare] = useState(false);
  const [openedViaAlternative, setOpenedViaAlternative] = useState(false);

  // Handle test query parameter to auto-open test detail
  useEffect(() => {
    const params = new URLSearchParams(searchString);
    const testId = params.get("test");
    if (testId) {
      const test = statisticalTests.find((t) => t.id === testId);
      if (test) {
        setSelectedTest(test);
      }
    }
  }, [searchString]);

  const getFilteredTests = (excludeFilter?: string) => {
    return statisticalTests.filter((test) => {
      const searchMatches = excludeFilter === "search" || matchesSearch(test, searchQuery);
      const matchesCategory =
        excludeFilter === "category" ||
        selectedCategory === null ||
        categoryGroups.find((g) => g.id === selectedCategory)?.tests.includes(test.id);
      const matchesOutcomeScale =
        excludeFilter === "outcomeScale" ||
        selectedOutcomeScale === null ||
        test.outcome === selectedOutcomeScale;
      const matchesDesign =
        excludeFilter === "design" || selectedDesign === null || test.design === selectedDesign;
      return searchMatches && matchesCategory && matchesOutcomeScale && matchesDesign;
    });
  };

  const outcomeScales = useMemo(() => {
    const availableTests = getFilteredTests("outcomeScale");
    return Array.from(
      new Set(availableTests.map((t) => t.outcome).filter(Boolean))
    ).sort() as string[];
  }, [searchQuery, selectedCategory, selectedDesign]);

  const designs = useMemo(() => {
    const availableTests = getFilteredTests("design");
    return Array.from(
      new Set(availableTests.map((t) => t.design).filter(Boolean))
    ).sort() as string[];
  }, [searchQuery, selectedCategory, selectedOutcomeScale]);

  const categoriesWithCounts = useMemo(() => {
    const availableTests = getFilteredTests("category");
    return categoryGroups
      .map((group) => {
        const count = availableTests.filter((t) => group.tests.includes(t.id)).length;
        return {
          ...group,
          count,
        };
      })
      .filter((g) => g.count > 0);
  }, [searchQuery, selectedOutcomeScale, selectedDesign]);

  useEffect(() => {
    if (selectedCategory !== null && !categoriesWithCounts.some((c) => c.id === selectedCategory)) {
      setSelectedCategory(null);
    }
  }, [categoriesWithCounts, selectedCategory]);

  useEffect(() => {
    if (selectedOutcomeScale !== null && !outcomeScales.includes(selectedOutcomeScale)) {
      setSelectedOutcomeScale(null);
    }
  }, [outcomeScales, selectedOutcomeScale]);

  useEffect(() => {
    if (selectedDesign !== null && !designs.includes(selectedDesign)) {
      setSelectedDesign(null);
    }
  }, [designs, selectedDesign]);

  // Pagination state
  const [visibleCount, setVisibleCount] = useState(12);

  // Reset visible count when filters change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, selectedCategory, selectedOutcomeScale, selectedDesign]);

  const filteredTests = useMemo(() => {
    const filtered = statisticalTests.filter((test) => {
      // Use query directly for filtering
      const searchMatches = matchesSearch(test, searchQuery);

      const matchesCat =
        selectedCategory === null ||
        categoryGroups.find((g) => g.id === selectedCategory)?.tests.includes(test.id);

      const matchesOutcomeScale =
        selectedOutcomeScale === null || test.outcome === selectedOutcomeScale;

      const matchesDesign = selectedDesign === null || test.design === selectedDesign;

      return searchMatches && matchesCat && matchesOutcomeScale && matchesDesign;
    });

    // Sort by relevance when there's a search query
    if (searchQuery.trim()) {
      return filtered.sort(
        (a, b) => getSearchScore(b, searchQuery) - getSearchScore(a, searchQuery)
      );
    }

    return filtered;
  }, [searchQuery, selectedCategory, selectedOutcomeScale, selectedDesign]);

  // Get visible tests for rendering
  const visibleTests = useMemo(() => {
    return filteredTests.slice(0, visibleCount);
  }, [filteredTests, visibleCount]);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 12);
  };

  const hasActiveFilters =
    selectedCategory !== null ||
    selectedOutcomeScale !== null ||
    selectedDesign !== null ||
    searchQuery !== "";

  const clearAllFilters = () => {
    setSelectedCategory(null);
    setSelectedOutcomeScale(null);
    setSelectedDesign(null);
    setSearchQuery("");
  };

  const toggleCompare = useCallback((test: StatTest) => {
    setCompareTests((prev) => {
      if (prev.some((t) => t.id === test.id)) {
        return prev.filter((t) => t.id !== test.id);
      } else if (prev.length < 3) {
        return [...prev, test];
      }
      return prev;
    });
  }, []);

  const handleTestClick = useCallback((test: StatTest) => {
    setSelectedTest(test);
  }, []);

  const handleAlternativeClick = useCallback((altId: string) => {
    const altTest = statisticalTests.find((t) => t.id === altId);
    if (altTest) {
      setSelectedTest((current) => {
        if (current) {
          setCompareTests([current, altTest]);
        }
        return null; // Close detail sheet
      });
      setOpenedViaAlternative(true);
      setShowCompare(true);
    }
  }, []);

  // Calculate total count of tests matching current filters (excluding category itself)
  const filteredCount = useMemo(() => {
    return getFilteredTests("category").length;
  }, [searchQuery, selectedOutcomeScale, selectedDesign]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header currentPage="browse" />

      <main className="flex-1 py-8 px-4">
        <div className="max-w-5xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold">All Statistical Tests</h1>
            <p className="text-muted-foreground">
              Browse our complete library of {statisticalTests.length} statistical tests and their
              use cases.
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex flex-col md:flex-row items-center gap-3 max-w-4xl mx-auto">
              <div className="flex w-full md:flex-1 gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="search"
                    placeholder="Search tests..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                    data-testid="input-search-tests"
                  />
                </div>
                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={clearAllFilters}
                    data-testid="button-clear-filters"
                    title="Clear all filters"
                    className="shrink-0"
                  >
                    <X className="w-4 h-4" />
                    <span className="sr-only">Clear all filters</span>
                  </Button>
                )}
              </div>

              <div className="flex gap-2 justify-center flex-wrap w-full md:w-auto">
                <Select
                  value={selectedOutcomeScale ?? "all"}
                  onValueChange={(value) => setSelectedOutcomeScale(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-40" data-testid="select-outcome-scale">
                    <SelectValue placeholder="Outcome" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Outcomes</SelectItem>
                    {outcomeScales.map((scale) => (
                      <SelectItem key={scale} value={scale}>
                        {scale
                          .split(/[_-]/)
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select
                  value={selectedDesign ?? "all"}
                  onValueChange={(value) => setSelectedDesign(value === "all" ? null : value)}
                >
                  <SelectTrigger className="w-44" data-testid="select-design">
                    <SelectValue placeholder="Design" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Designs</SelectItem>
                    {designs.map((design) => (
                      <SelectItem key={design} value={design}>
                        {design
                          .split(/[_-]/)
                          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                          .join(" ")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex justify-center gap-2 flex-wrap">
              <Button
                variant={selectedCategory === null ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(null)}
                data-testid="filter-all"
              >
                All Categories{" "}
                <span
                  className={`ml-1 ${
                    selectedCategory === null
                      ? "text-primary-foreground"
                      : "text-muted-foreground/70"
                  }`}
                >
                  ({filteredCount})
                </span>
              </Button>
              {categoriesWithCounts.map((category) => (
                <Button
                  key={category.id}
                  variant={selectedCategory === category.id ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  data-testid={`filter-${category.id}`}
                >
                  {category.label}
                  <span
                    className={`ml-1 ${
                      selectedCategory === category.id
                        ? "text-primary-foreground"
                        : "text-muted-foreground/70"
                    }`}
                  >
                    ({category.count})
                  </span>
                </Button>
              ))}
            </div>
          </div>

          {compareTests.length > 0 && (
            <div className="sticky top-14 z-40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 py-2 border-b mb-4 flex items-center justify-center gap-2 flex-wrap transition-all animate-in fade-in slide-in-from-top-2">
              <span className="text-sm text-muted-foreground">Comparing:</span>
              {compareTests.map((test) => (
                <Badge
                  key={test.id}
                  variant="secondary"
                  className="cursor-pointer"
                  onClick={() => toggleCompare(test)}
                  data-testid={`compare-badge-${test.id}`}
                >
                  {test.name}
                  <X className="w-3 h-3 ml-1" />
                </Badge>
              ))}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setCompareTests([])}
                data-testid="button-clear-compare"
              >
                <X className="w-4 h-4 mr-1" />
                Clear All
              </Button>
              <Button
                variant="default"
                size="sm"
                onClick={() => {
                  setOpenedViaAlternative(false);
                  setShowCompare(true);
                }}
                disabled={compareTests.length < 2}
                data-testid="button-compare"
              >
                <GitCompare className="w-4 h-4 mr-1" />
                {compareTests.length < 2 ? "Select at least 2" : `Compare (${compareTests.length})`}
              </Button>
            </div>
          )}

          <div className="space-y-4">
            {visibleTests.length > 0 ? (
              <>
                {visibleTests.map((test) => (
                  <TestResultCard
                    key={test.id}
                    test={test}
                    onViewDetails={() => handleTestClick(test)}
                    onCompare={() => toggleCompare(test)}
                    isComparing={compareTests.some((t) => t.id === test.id)}
                    canCompare={
                      compareTests.length < 3 || compareTests.some((t) => t.id === test.id)
                    }
                    onAlternativeClick={(altId) => {
                      const altTest = statisticalTests.find((t) => t.id === altId);
                      if (altTest) {
                        setCompareTests([test, altTest]);
                        setOpenedViaAlternative(true);
                        setShowCompare(true);
                      }
                    }}
                  />
                ))}

                {visibleTests.length < filteredTests.length && (
                  <div className="flex justify-center pt-4">
                    <Button variant="outline" onClick={handleLoadMore}>
                      Load More Tests ({filteredTests.length - visibleTests.length} remaining)
                    </Button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12">
                <p className="text-muted-foreground">No tests found matching your criteria.</p>
                {hasActiveFilters && (
                  <Button variant="ghost" onClick={clearAllFilters} className="mt-2">
                    Clear filters
                  </Button>
                )}
              </div>
            )}
          </div>

          <div className="text-center text-sm text-muted-foreground">
            Showing {visibleTests.length} of {filteredTests.length} tests
          </div>
        </div>
      </main>

      <TestDetailSheet
        test={selectedTest}
        onClose={() => setSelectedTest(null)}
        onAlternativeClick={handleAlternativeClick}
      />

      <CompareSheet
        tests={compareTests}
        open={showCompare}
        onClose={() => {
          setShowCompare(false);
          if (openedViaAlternative) {
            setCompareTests([]);
            setOpenedViaAlternative(false);
          }
        }}
        onRemoveTest={(testId: string) =>
          setCompareTests(compareTests.filter((t) => t.id !== testId))
        }
        context="browse"
      />
    </div>
  );
}
