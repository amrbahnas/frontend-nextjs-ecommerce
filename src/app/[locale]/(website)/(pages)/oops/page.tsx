"use client";
import { Button, Result } from "antd";
import { useRouter } from "next/navigation";
import Container from "@/components/ui/container";
import useParamsService from "@/hooks/global/useParamsService";

const ErrorOperations = () => {
  const router = useRouter();
  const { getParams } = useParamsService({});
  const redirect = getParams("redirect");

  return (
    <Container className="flex justify-center items-center min-h-[calc(100dvh-200px)]">
      <Result
        status="warning"
        title="Oops! Something Unexpected Happened"
        subTitle={
          <div className="text-gray-600 max-w-lg text-center">
            <p>
              We apologize for the inconvenience. Our team has been notified and
              is working to resolve the issue.
            </p>
            <p className="mt-2">In the meantime, you can try:</p>
            <ul className="list-disc list-inside mt-2 text-left">
              <li>Refreshing the page</li>
              <li>Clearing your browser cache</li>
              <li>Coming back in a few minutes</li>
            </ul>
          </div>
        }
        extra={
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <Button
              type="primary"
              onClick={() => {
                if (redirect) {
                  router.push(redirect);
                } else {
                  window.location.reload();
                }
              }}
              size="large"
            >
              Refresh Page
            </Button>
            {/* <Button onClick={() => router.back()} size="large">
              Go Back
            </Button>
            <Button onClick={() => router.push("/")} size="large">
              Return Home
            </Button> */}
          </div>
        }
      />
    </Container>
  );
};

export default ErrorOperations;
