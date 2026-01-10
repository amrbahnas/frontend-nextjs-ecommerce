import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

type BreakPoints = "xs" | "sm" | "md" | "lg";

const useBreakPoints = (target?: BreakPoints) => {
  // Track if we're mounted on the client
  const [isMounted, setIsMounted] = useState(false);

  // Media queries - these will be false on server
  const xsQuery = useMediaQuery({
    minWidth: 0,
    maxWidth: 575,
  });

  const smQuery = useMediaQuery({
    minWidth: 576,
    maxWidth: 767,
  });

  const mdQuery = useMediaQuery({
    minWidth: 768,
    maxWidth: 991,
  });

  const lgQuery = useMediaQuery({
    minWidth: 992,
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Return false for all breakpoints until mounted to ensure SSR consistency
  // Default to lg=true for desktop-first SSR (most common use case for this e-commerce site)
  const pointsObj = {
    xs: isMounted ? xsQuery : false,
    sm: isMounted ? smQuery : false,
    md: isMounted ? mdQuery : false,
    lg: isMounted ? lgQuery : true, // Default to desktop layout for SSR
  };

  return target ? pointsObj[target] : pointsObj;
};

export default useBreakPoints;
