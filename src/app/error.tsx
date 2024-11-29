"use client";
import { Button, Result } from "antd";

const Error = () => {
  return (
    <div className=" h-screen flex items-center justify-center">
      <Result
        status="warning"
        title="There are some problems with Our operation."
        extra={
          <div className="flex items-center gap-2 justify-center">
            <Button
              type="primary"
              onClick={() => {
                window.location.reload();
              }}
              className="btn btn-primary"
            >
              Reload
            </Button>
            <Button
              onClick={() => {
                window.history.back();
              }}
              className="btn btn-primary"
            >
              Go Back
            </Button>
          </div>
        }
      />
    </div>
  );
};

export default Error;
