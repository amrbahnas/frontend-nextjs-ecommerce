// Important For Usage: => "Suspense Wrapper"
// component which import this Hook must be wrap at parent component with Suspense component
// this for avoid error "Missing Suspense boundary with useSearchParams" when  build the app
// the idea is => useSearchParams() entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded.
// so we use Suspense to pass fallback "Loading" until component rendered
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type ParamsService = () => {
  setParams: (key: string, value?: string) => void;
  resetParams: () => void;
};

const useParamsService: ParamsService = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const setParams = (key: string, value?: string) => {
    const params = new URLSearchParams(searchParams);
    if (!value) {
      params.delete(key);
      replace(`${pathname}?${params.toString()}`);
    } else {
      params.set(key, value);
      replace(`${pathname}?${params.toString()}`);
    }
  };

  const resetParams = () => {
    replace(pathname);
  };

  return { setParams, resetParams };
};

export default useParamsService;
