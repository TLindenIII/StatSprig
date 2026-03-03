import { useRef, useState, useEffect } from "react";
import { useScroll, useMotionValueEvent, animate } from "framer-motion";

// Using Beta-distribution style parameters to perfectly mimic Gamma on the left
// and flip smoothly to a perfect mirror image on the right.
const distConfigs = [
  { aStart: 1.5, bStart: 30, ampStart: 180, opacity: 0.15, strokeWidth: 1.5 },
  { aStart: 2, bStart: 20, ampStart: 150, opacity: 0.25, strokeWidth: 2 },
  { aStart: 2.5, bStart: 15, ampStart: 130, opacity: 0.4, strokeWidth: 2 },
  { aStart: 3, bStart: 12, ampStart: 110, opacity: 0.6, strokeWidth: 2.5 },
  { aStart: 4, bStart: 9, ampStart: 90, opacity: 0.8, strokeWidth: 2.5 },
  { aStart: 5, bStart: 6, ampStart: 70, opacity: 1, strokeWidth: 3 },
];

export function DistributionDivider({
  nextSectionColorClass = "text-muted/30 dark:text-muted/30 text-opacity-100",
  lineColorClass = "text-primary",
}: {
  nextSectionColorClass?: string;
  lineColorClass?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);

  // We detect precisely when the TOP of the divider hits the CENTER of the screen.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  const [fillPath, setFillPath] = useState("M 0 200 L 1000 200 Z");
  const [linePaths, setLinePaths] = useState<string[]>([]);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [isAnimationDone, setIsAnimationDone] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0 && !hasTriggered) {
      setHasTriggered(true);
    }
  });

  const updatePaths = (progress: number) => {
    const width = 1000;
    const height = 200;

    // We leave a 10% buffer at the beginning and end so the shapes stay
    // static for the first and last moments of the scroll, ensuring you see them clearly.
    const tRaw = (progress - 0.1) / 0.8;
    const t = Math.max(0, Math.min(1, tRaw));

    // Smoothstep interpolation for elegant acceleration/deceleration
    const smoothT = t * t * (3 - 2 * t);

    // sin(pi * smoothT) makes a beautiful bell curve that reaches 1.0 safely at the exact middle
    // To make them completely flat in the middle, we dip them aggressively!
    const dip = Math.sin(Math.PI * smoothT);

    let pathFill = `M 0 ${height}`;
    let newPaths: string[] = [];

    for (let i = 0; i < distConfigs.length; i++) {
      const dist = distConfigs[i];

      // As t goes 0 -> 1, a and b swap values perfectly, inverting the skew
      // meaning they stretch across the screen and reshape onto the right side!
      const a_t = dist.aStart * (1 - smoothT) + dist.bStart * smoothT;
      const b_t = dist.bStart * (1 - smoothT) + dist.aStart * smoothT;

      // Amplitude curves down to 5 (almost completely flat) in the middle, and recovers
      const currentAmp = dist.ampStart * (1 - dip) + 5 * dip;

      let pathLine = ``;

      // Compute the actual distribution points (Beta PDF normalized to peak=1)
      for (let x = 0; x <= width; x += 5) {
        const u = x / width;
        let yVal = 0;

        if (u > 0 && u < 1) {
          const mode = (a_t - 1) / (a_t + b_t - 2);

          let modeLog = 0;
          if (mode > 0 && mode < 1) {
            modeLog = (a_t - 1) * Math.log(mode) + (b_t - 1) * Math.log(1 - mode);
          }

          const uLog = (a_t - 1) * Math.log(u) + (b_t - 1) * Math.log(1 - u);
          yVal = currentAmp * Math.exp(uLog - modeLog);
        }

        if (!isFinite(yVal)) yVal = 0;
        const yStr = (height - yVal).toFixed(2);

        // Fill based on the very last (widest) distribution
        if (i === distConfigs.length - 1) {
          pathFill += ` L ${x} ${yStr}`;
        }

        if (x === 0) pathLine += `M ${x} ${yStr}`;
        else pathLine += ` L ${x} ${yStr}`;
      }
      newPaths.push(pathLine);
    }
    pathFill += ` L ${width} ${height} Z`;

    setFillPath(pathFill);
    setLinePaths(newPaths);
  };

  // Ensure initial render matches progress=0
  useEffect(() => {
    updatePaths(0);
  }, []);

  useEffect(() => {
    if (hasTriggered && !isAnimationDone) {
      // Lock scrolling to ensure they watch the animation perfectly
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`; // prevent layout shift

      const controls = animate(0, 1, {
        duration: 2.2, // Fast enough to be engaging, slow enough to appreciate
        ease: "easeInOut",
        onUpdate: (latestVal) => {
          updatePaths(latestVal);
        },
        onComplete: () => {
          setIsAnimationDone(true);

          // Unlock scrolling
          document.body.style.overflow = "";
          document.body.style.paddingRight = "";

          // Proceed to smoothly bring the next content on the screen exactly as requested
          window.scrollBy({ top: 350, behavior: "smooth" });
        },
      });

      return () => {
        controls.stop();
        document.body.style.overflow = "";
        document.body.style.paddingRight = "";
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasTriggered]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[150px] sm:h-[200px] overflow-hidden leading-none z-10 relative -mb-[1px]"
    >
      <svg
        viewBox="0 0 1000 200"
        preserveAspectRatio="none"
        className={`w-full h-full ${nextSectionColorClass}`}
        style={{ display: "block" }}
      >
        <path d={fillPath} fill="currentColor" />
        {linePaths.map((d, i) => (
          <path
            key={i}
            d={d}
            fill="none"
            stroke="currentColor"
            className={lineColorClass}
            style={{ opacity: distConfigs[i].opacity }}
            strokeWidth={distConfigs[i].strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ))}
      </svg>
    </div>
  );
}
