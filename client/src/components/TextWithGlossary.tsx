import React from "react";
import { GlossaryTerm } from "./GlossaryTerm";
import { glossaryTerms } from "@/lib/glossaryData";
import { statisticalTests } from "@/lib/statsData";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { useGlossary } from "@/contexts/GlossaryContext";

interface TextWithGlossaryProps {
  text: string;
}

const allTerms = [
  ...glossaryTerms.flatMap((t) => [t.term, ...(t.aliases || [])]),
  ...statisticalTests.map((t) => t.name),
];

allTerms.sort((a, b) => b.length - a.length);

const escapeRegExp = (string: string) => string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
const termsPattern = allTerms.map(escapeRegExp).join("|");
const regex = new RegExp(`\\b(${termsPattern})\\b`, "gi");

/**
 * Replaces occurrences of glossary terms in a text string with GlossaryTerm components.
 */
function replaceTermsInString(text: string) {
  const parts = text.split(regex);
  return parts.map((part, i) => {
    const isTerm = allTerms.some((term) => term.toLowerCase() === part.toLowerCase());
    if (isTerm) {
      return <GlossaryTerm key={i} term={part} />;
    }
    return part;
  });
}

/**
 * Recursively parses React children to find strings and replace terms.
 */
function parseChildren(children: React.ReactNode): React.ReactNode {
  if (typeof children === "string") {
    return replaceTermsInString(children);
  }

  if (Array.isArray(children)) {
    return React.Children.map(children, (child) => parseChildren(child));
  }

  if (React.isValidElement(children)) {
    // DO NOT parse inside KaTeX nodes, as it destroys the math rendering DOM structure
    if (children.props && typeof children.props.className === "string") {
      if (children.props.className.includes("katex") || children.props.className.includes("math")) {
        return children;
      }
    }

    // Check if the element contains children we should parse
    if (children.props && children.props.children) {
      return React.cloneElement(children, {
        ...children.props,
        children: parseChildren(children.props.children),
      });
    }
  }

  return children;
}

const createGlossaryRenderer =
  (Tag: keyof JSX.IntrinsicElements) =>
  ({ node, className, children, ...props }: any) => {
    // If the node itself is marked as math, don't parse it
    if (className && (className.includes("katex") || className.includes("math"))) {
      return (
        <Tag className={className} {...props}>
          {children}
        </Tag>
      );
    }
    return (
      <Tag className={className} {...props}>
        {parseChildren(children)}
      </Tag>
    );
  };

import { useIsMobile } from "@/hooks/use-mobile";

export function TextWithGlossary({ text }: TextWithGlossaryProps) {
  const { isGlossaryEnabled } = useGlossary();
  const isMobile = useIsMobile();

  if (!text) return null;

  if (!isGlossaryEnabled || isMobile) {
    return (
      <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[rehypeKatex]}>
        {text}
      </ReactMarkdown>
    );
  }

  return (
    <ReactMarkdown
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
      components={{
        p: createGlossaryRenderer("p"),
        li: createGlossaryRenderer("li"),
        strong: createGlossaryRenderer("strong"),
        span: createGlossaryRenderer("span"),
        em: createGlossaryRenderer("em"),
        h1: createGlossaryRenderer("h1"),
        h2: createGlossaryRenderer("h2"),
        h3: createGlossaryRenderer("h3"),
        h4: createGlossaryRenderer("h4"),
        h5: createGlossaryRenderer("h5"),
        h6: createGlossaryRenderer("h6"),
        div: createGlossaryRenderer("div"),
        td: createGlossaryRenderer("td"),
        th: createGlossaryRenderer("th"),
      }}
    >
      {text}
    </ReactMarkdown>
  );
}
