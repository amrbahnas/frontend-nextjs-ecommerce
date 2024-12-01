"use client";
import Container from "@/components/container";
import { useState } from "react";
import EnterNewEmail from "./_comps/enterNewEmail";
import EnterOTP from "./_comps/enterOTP";

const Page = () => {
  const [newEmail, setNewEmail] = useState("");
  const [currentScreen, setCurrentScreen] = useState<"enterEmail" | "enterOTP">(
    "enterEmail"
  );
  return (
    <Container className="min-h-96">
      <div className=" w-full md:w-1/2 mx-auto mt-12">
        <EnterNewEmail
          setCurrentScreen={setCurrentScreen}
          currentScreen={currentScreen}
          setNewEmail={setNewEmail}
        />
        <EnterOTP
          currentScreen={currentScreen}
          setNewEmail={setNewEmail}
          newEmail={newEmail}
          setCurrentScreen={setCurrentScreen}
        />
      </div>
    </Container>
  );
};

export default Page;
