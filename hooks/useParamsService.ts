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
    // replace(pathname);
  };

  return { setParams, resetParams };
};

export default useParamsService;
