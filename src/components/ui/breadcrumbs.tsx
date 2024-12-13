import SEOLink from "./sEOLink";

interface BreadcrumbItem {
  label: string;
  href: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

const Breadcrumbs = ({ items, className = "" }: BreadcrumbsProps) => {
  return (
    <nav
      aria-label="Breadcrumb"
      className={`flex items-center space-x-2 ${className}`}
    >
      <ol className="flex items-center space-x-2">
        <li>
          <SEOLink href="/" title="Home" prefetch={false}>
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="sr-only">Home</span>
          </SEOLink>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center">
            <svg
              className="w-4 h-4 text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
            <SEOLink
              href={item.href}
              title={item.label}
              prefetch={index === items.length - 1}
              className={`ml-2 text-sm ${
                index === items.length - 1
                  ? "text-gray-500 cursor-default pointer-events-none"
                  : "text-blue-600 hover:text-blue-800"
              }`}
            >
              {item.label}
            </SEOLink>
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
