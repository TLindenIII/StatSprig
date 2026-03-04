import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Expand } from "@theme-toggles/react";
import "@theme-toggles/react/css/Expand.css";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;
      if (savedTheme) return savedTheme;

      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e: MediaQueryListEvent) => {
      // Only auto-update if the user hasn't manually set a preference in this session
      // Or we can just always follow system if we want.
      // Most robust is to check if 'theme' exists in localStorage.
      if (!localStorage.getItem("theme")) {
        setTheme(e.matches ? "dark" : "light");
      }
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button variant="ghost" size="icon" onClick={toggleTheme} data-testid="button-theme-toggle">
          <div className="text-xl flex items-center justify-center">
            {/* @ts-expect-error - Known typing discrepancy with React 19 props in @theme-toggles/react */}
            <Expand toggled={theme === "dark"} duration={750} />
          </div>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p>{theme === "light" ? "Switch to dark mode" : "Switch to light mode"}</p>
      </TooltipContent>
    </Tooltip>
  );
}
