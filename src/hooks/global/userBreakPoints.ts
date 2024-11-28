import { useMediaQuery } from "react-responsive";

type BreakPoints = "xs" | "sm" | "md" | "lg" | "xl";

const useBreakPoints = (target?: BreakPoints) => {
  const xs = useMediaQuery({
    minWidth: 0,
    maxWidth: 575,
  });

  const sm = useMediaQuery({
    minWidth: 576,
    maxWidth: 767,
  });
  const md = useMediaQuery({
    minWidth: 768,
    maxWidth: 991,
  });
  const lg = useMediaQuery({
    minWidth: 992,
    maxWidth: 1199,
  });
  const xl = useMediaQuery({
    minWidth: 1200,
  });

  const pointsObj = {
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
    xl: xl,
  };

  return target ? pointsObj[target] : pointsObj;
};

export default useBreakPoints;
