import Container from "@/components/ui/container";
import React from "react";

const LegalPrivacy = () => {
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Legal & Privacy</h1>
      <p className="text-lg text-gray-600 max-w-3xl mb-6 text-center">
        We value your privacy and are committed to protecting your personal
        information. Please read our privacy policy and legal terms carefully.
      </p>
      <div className="space-y-4 text-gray-600 max-w-3xl">
        <h2 className="text-2xl font-semibold">Privacy Policy</h2>
        <p>
          Our privacy policy explains how we collect, use, and safeguard your
          information. [Add detailed policy here].
        </p>
        <h2 className="text-2xl font-semibold">Terms of Use</h2>
        <p>
          By using our website, you agree to our terms and conditions. [Add
          detailed terms here].
        </p>
      </div>
    </Container>
  );
};

export default LegalPrivacy;
