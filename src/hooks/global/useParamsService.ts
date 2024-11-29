// Important For Usage: => create "Loading" file beside project layout file or "Suspense Wrapper"
// this for avoid error "Missing Suspense boundary with useSearchParams" when  build the app
// the idea is => useSearchParams() entire page into client-side rendering. This could cause your page to be blank until the client-side JavaScript has loaded.
// so we use Suspense to pass fallback "Loading" until component rendered
import { usePathname, useSearchParams, useRouter } from "next/navigation";

type ParamsService = (currentComponent_Must_WrappedWith_Suspense: any) => {
  setParams: (key: string, value?: string) => void;
  setMultiParams: (params: { [key: string]: string }) => void;
  getParams: (key: string) => string | null;
  getCurrentParams: () => { key: string; value: string }[];
  removeParams: (key: string) => void;
  resetParams: () => void;
};

const useParamsService: ParamsService = (
  makeSure_create_loading_file_beside_project_layout_file_Or_currentComponent_Must_WrappedWith_Suspense
) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const getParams = (key: string) => {
    return searchParams.get(key);
  };

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

  const setMultiParams = (params: { [key: string]: string }) => {
    const newParams = new URLSearchParams(searchParams);
    Object.keys(params).forEach((key) => {
      if (!params[key]) {
        newParams.delete(key);
      } else {
        newParams.set(key, params[key]);
      }
    });
    replace(`${pathname}?${newParams.toString()}`);
  };

  const resetParams = () => {
    replace(pathname);
  };

  const getCurrentParams = () => {
    const params = new URLSearchParams(searchParams);
    const entries = params.entries();
    const result = [];
    for (const [key, value] of entries) {
      result.push({ key, value });
    }
    return result;
  };

  const removeParams = (key: string) => {
    const params = new URLSearchParams(searchParams);
    params.delete(key);
    replace(`${pathname}?${params.toString()}`);
  };

  return {
    setParams,
    resetParams,
    getParams,
    setMultiParams,
    getCurrentParams,
    removeParams,
  };
};

export default useParamsService;
