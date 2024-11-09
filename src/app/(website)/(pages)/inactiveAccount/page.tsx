import Container from "@/components/container";
import React from "react";
import { ImBlocked } from "react-icons/im";

const InactiveAccount = () => {
  return (
    <Container className="flex flex-col items-center justify-center h-80">
      <ImBlocked className="text-9xl text-red-500 mb-4" />
      <h1 className="text-2xl font-bold mb-4">Account is inactive</h1>
      <p className="text-lg">
        Your account is inactive. Please contact the administrator to activate
        your account.
      </p>
    </Container>
  );
};

export default InactiveAccount;
