"use client";
import { Button, Result } from "antd";
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
    <Result
      status="warning"
      title="There are some problems with your operation."
      extra={
        <Button type="primary" key="reset" onClick={resetErrorBoundary}>
          Try again
        </Button>
      }
    />
  );
}
