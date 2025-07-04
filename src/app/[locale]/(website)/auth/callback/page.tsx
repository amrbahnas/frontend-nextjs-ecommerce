"use client";
import { useMe } from "@/_api/query";
import { useLogin } from "../_api/mutation";
import { useEffect } from "react";

const Callbackpage = () => {
  const { user } = useMe();
  const { onLoginSuccess } = useLogin();

  useEffect(() => {
    if (user?.id) {
      onLoginSuccess(user);
    }
  }, [user]);

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Redirecting...
          </h2>
          <p className="text-gray-600">
            Please wait while we redirect you to the home page
          </p>
        </div>
      </div>
    </div>
  );
};

export default Callbackpage;
