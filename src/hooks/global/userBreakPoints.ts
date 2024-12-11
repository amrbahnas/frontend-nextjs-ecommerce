import { useMediaQuery } from "react-responsive";

type BreakPoints = "xs" | "sm" | "md" | "lg"  ;

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
     
  });
 

  const pointsObj = {
    xs: xs,
    sm: sm,
    md: md,
    lg: lg,
     
  };

  return target ? pointsObj[target] : pointsObj;
};

export default useBreakPoints;
