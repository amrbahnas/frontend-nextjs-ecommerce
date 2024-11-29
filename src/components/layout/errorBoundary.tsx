import React from "react";
import { ErrorBoundary as ErrorBoundaryPkg } from "react-error-boundary";
import toast from "react-hot-toast";

const ErrorBoundary: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <ErrorBoundaryPkg
      FallbackComponent={ErrorFallback}
      onError={(error) => {
        console.error("Caught by boundary:", error);
        toast.error(error.message);
      }}
    >
      {children}
    </ErrorBoundaryPkg>
  );
};

export default ErrorBoundary;

function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error;
  resetErrorBoundary: () => void;
}) {
  return (
    <div role="alert">
      <p>Something went wrong:</p>
      <pre>{error.message}</pre>
      <button onClick={resetErrorBoundary}>Try again</button>
    </div>
  );
}
