import { Link } from "@/lib/OfflineLink";
import { DraftingCompass } from "lucide-react";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GlossaryToggle } from "@/components/GlossaryToggle";
import { NavLinks } from "@/components/NavLinks";

interface HeaderProps {
  currentPage: "home" | "wizard" | "browse" | "glossary" | "cascading";
}

export function Header({ currentPage }: HeaderProps) {
  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between gap-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <DraftingCompass className="w-5 h-5 text-primary dark:text-white" />
          {/* Always hide StatsTree text on mobile for non-home pages to match previous fix. 
              For consistency, let's also hide it on mobile for Home if we want to stop "jumping".
              However, the user request specifically said "pages like wizard...". 
              If we want to stop the jumping when switching FROM home TO wizard, we should probably hide it on Home too,
              OR accept the jump only on that transition.
              
              BUT, if the buttons (NavLinks) are jumping, it's because the available space for them changes.
              
              Let's make it consistent: Hidden on mobile for ALL pages including Home?
              The user didn't explicitly ask for Home, but "jumping" implies inconsistency.
              
              Actually, let's keep the logic: Visible on Home, Hidden on others.
              The "jumping" might be coming from NavLinks re-rendering or measuring layout?
              
              Let's try to ensure the Right Side container is stable.
          */}
          <span className={currentPage === "home" ? "" : "hidden sm:inline"}>The Statlas</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          {currentPage === "home" ? (
            <div className="flex items-center gap-2 sm:gap-4">
              <Link
                href="/glossary"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                Glossary
              </Link>
              <div className="h-5 w-px bg-border" aria-hidden="true" />
              <ThemeToggle />
            </div>
          ) : (
            <>
              <NavLinks currentPage={currentPage === "browse" ? "browse" : currentPage} />
              <div className="h-5 w-px bg-border ml-1 mr-1" aria-hidden="true" />
              <GlossaryToggle />
              <ThemeToggle />
            </>
          )}
        </div>
      </div>
    </header>
  );
}
