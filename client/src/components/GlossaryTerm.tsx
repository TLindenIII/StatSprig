import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { glossaryTerms } from "@/lib/glossaryData";
import { statisticalTests } from "@/lib/statsData";

interface GlossaryTermProps {
  term: string;
}

export function GlossaryTerm({ term }: GlossaryTermProps) {
  // Find definition from either glossary or stats lists
  const getTermDetails = (termName: string) => {
    const gTerm = glossaryTerms.find(
      (t) =>
        t.term.toLowerCase() === termName.toLowerCase() ||
        t.aliases?.some((a) => a.toLowerCase() === termName.toLowerCase())
    );
    if (gTerm) return { name: gTerm.term, desc: gTerm.definition };

    const sTerm = statisticalTests.find((t) => t.name.toLowerCase() === termName.toLowerCase());
    if (sTerm) return { name: sTerm.name, desc: sTerm.description };

    return { name: termName, desc: "Definition not available." };
  };

  const details = getTermDetails(term);

  return (
    <HoverCard>
      <HoverCardTrigger className="text-primary/80 cursor-pointer">{term}</HoverCardTrigger>
      <HoverCardContent className="w-80 text-left z-[9999]" side="top">
        <div className="space-y-1">
          <h4 className="text-sm font-semibold">{details.name}</h4>
          <p className="text-sm text-muted-foreground whitespace-normal leading-relaxed">
            {details.desc}
          </p>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}
