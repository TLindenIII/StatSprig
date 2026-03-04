import { Link } from "@/lib/OfflineLink";
import { useRef, useState, useLayoutEffect, useEffect } from "react";
import { useNavContext } from "@/contexts/NavContext";

interface NavLinksProps {
  currentPage: "wizard" | "browse" | "glossary" | "home" | "cascading";
}

const navItems = [
  { id: "wizard", label: "Wizard", href: "/wizard" },
  { id: "cascading", label: "Tree", href: "/tree" },
  { id: "browse", label: "Browse", href: "/browse" },
  { id: "glossary", label: "Glossary", href: "/glossary" },
] as const;

export function NavLinks({ currentPage }: NavLinksProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Map<string, HTMLElement>>(new Map());
  const { getPreviousPosition, setPreviousPosition } = useNavContext();

  const [position, setPosition] = useState<{ left: number; width: number } | null>(null);
  const [isReadyForTransition, setIsReadyForTransition] = useState(false);

  // Measure and set position whenever the active page changes
  useLayoutEffect(() => {
    const activeEl = itemRefs.current.get(currentPage);
    const container = containerRef.current;

    if (!activeEl || !container) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();

    if (activeRect.width < 1) return; // Hidden on mobile

    const newPos = {
      left: activeRect.left - containerRect.left,
      width: activeRect.width,
    };

    const prevPos = getPreviousPosition();

    // If we have a saved previous position from context, use it as our starting layout
    // BEFORE the browser paints the new frame
    if (prevPos && prevPos.width > 0 && prevPos.left !== newPos.left) {
      // 1. Instantly snap to the old position without animation
      setIsReadyForTransition(false);
      setPosition(prevPos);

      // 2. Wait exactly one frame for the browser to register the snapped position
      requestAnimationFrame(() => {
        // 3. Turn on CSS transitions
        setIsReadyForTransition(true);
        // 4. Trigger the layout change to the new position
        setPosition(newPos);
      });
    } else {
      // If we don't have a previous position (e.g. first load), just snap to the target
      setIsReadyForTransition(false);
      setPosition(newPos);
    }

    // Save our destination as the new baseline
    setPreviousPosition(newPos);
  }, [currentPage, getPreviousPosition, setPreviousPosition]);

  // Handle resize events instantly without animation
  useEffect(() => {
    const handleResize = () => {
      const activeEl = itemRefs.current.get(currentPage);
      const container = containerRef.current;

      if (!activeEl || !container) return;

      const containerRect = container.getBoundingClientRect();
      const activeRect = activeEl.getBoundingClientRect();

      if (activeRect.width < 1) {
        setPosition(null);
        setPreviousPosition({ left: 0, width: 0 });
        return;
      }

      const newPos = {
        left: activeRect.left - containerRect.left,
        width: activeRect.width,
      };

      setIsReadyForTransition(false);
      setPosition(newPos);
      setPreviousPosition(newPos);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [currentPage, setPreviousPosition]);

  return (
    <div ref={containerRef} className="flex items-center relative">
      {navItems.map((item) => {
        const isActive = item.id === currentPage;

        return (
          <span
            key={item.id}
            ref={(el: HTMLSpanElement | null) => {
              if (el) itemRefs.current.set(item.id, el);
            }}
            className="inline-block"
          >
            <Link
              href={item.href}
              data-testid={`nav-${item.id}`}
              className={`relative px-2 sm:px-3 py-1.5 text-sm font-medium transition-colors duration-200 inline-block ${
                isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          </span>
        );
      })}

      {position && (
        <span
          className="absolute bottom-0 h-0.5 bg-primary rounded-full z-10"
          style={{
            left: position.left,
            width: position.width,
            transition: isReadyForTransition
              ? "left 300ms cubic-bezier(0.4, 0, 0.2, 1), width 300ms cubic-bezier(0.4, 0, 0.2, 1)"
              : "none",
          }}
        />
      )}
    </div>
  );
}
