import { Highlighter, HighlighterIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useGlossary } from "@/contexts/GlossaryContext";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function GlossaryToggle() {
  const { isGlossaryEnabled, toggleGlossary } = useGlossary();

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleGlossary}
          className={`hidden md:inline-flex ${
            isGlossaryEnabled ? "text-primary bg-primary/10" : "text-muted-foreground opacity-50"
          }`}
          data-testid="button-glossary-toggle"
        >
          <Highlighter className="h-5 w-5" />
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{isGlossaryEnabled ? "Turn Off Highlights" : "Highlight Key Terms"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
