import React from "react";

interface SEOHeadingProps {
  level: 1 | 2 | 3 | 4 | 5 | 6;
  children: React.ReactNode;
  className?: string;
  id?: string;
  highlight?: string[];
}

const SEOHeading = ({ level, children, className = "", id, highlight = [] }: SEOHeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  const highlightText = (text: string) => {
    if (highlight.length === 0) return text;

    const parts = text.split(new RegExp(`(${highlight.join("|")})`, "gi"));
    return parts.map((part, index) => {
      if (highlight.some((h) => part.toLowerCase() === h.toLowerCase())) {
        return (
          <mark key={index} className="bg-yellow-100 dark:bg-yellow-900">
            {part}
          </mark>
        );
      }
      return part;
    });
  };

  return (
    <Tag
      className={`font-bold ${getDefaultStyles(level)} ${className}`}
      id={id}
      {...(level === 1 && { "aria-label": "Page Heading" })}
    >
      {typeof children === "string" ? highlightText(children) : children}
    </Tag>
  );
};

const getDefaultStyles = (level: number): string => {
  switch (level) {
    case 1:
      return "text-4xl md:text-5xl mb-6";
    case 2:
      return "text-3xl md:text-4xl mb-5";
    case 3:
      return "text-2xl md:text-3xl mb-4";
    case 4:
      return "text-xl md:text-2xl mb-3";
    case 5:
      return "text-lg md:text-xl mb-2";
    case 6:
      return "text-base md:text-lg mb-2";
    default:
      return "";
  }
};

export default SEOHeading;
