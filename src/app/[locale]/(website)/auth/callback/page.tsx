"use client";
import { useMe } from "@/_api/query";
import { useLogin } from "../_api/mutation";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Callbackpage = () => {
  const { user, error } = useMe();
  const { onLoginSuccess } = useLogin();
  const router = useRouter();

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong");
      router.push("/auth/login");
    }
    if (user?.id) {
      onLoginSuccess(user);
    }
  }, [user, error]);

  return (
    <div className="fixed inset-0 bg-white z-50">
      <div className="flex flex-col items-center justify-center h-full gap-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">
            Redirecting
            <span className="loading-dots">
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
              <span className="dot">.</span>
            </span>
          </h2>
          <p className="text-gray-600">
            Please wait while we redirect you to the home page
          </p>
          <style jsx>{`
            .loading-dots {
              display: inline-block;
            }
            .dot {
              opacity: 0;
              animation: showHideDot 1.5s ease-in-out infinite;
              display: inline-block;
            }
            .dot:nth-child(1) {
              animation-delay: 0s;
            }
            .dot:nth-child(2) {
              animation-delay: 0.5s;
            }
            .dot:nth-child(3) {
              animation-delay: 1s;
            }
            .dot:nth-child(4) {
              animation-delay: 1.5s;
            }
            @keyframes showHideDot {
              0% {
                opacity: 0;
              }
              50% {
                opacity: 1;
              }
              100% {
                opacity: 0;
              }
            }
          `}</style>
        </div>
      </div>
    </div>
  );
};

export default Callbackpage;
