import Container from "@/components/container";
import React from "react";

const Affiliates = () => {
  return (
    <Container className="flex flex-col   min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Affiliates</h1>
      <p className="text-lg text-gray-600 max-w-3xl  mb-8">
        Become an affiliate and earn commissions by promoting our products. Join
        our program and grow your income!
      </p>

      <div className="w-full max-w-md space-y-4">
        <p className="text-gray-700">As an affiliate, you’ll receive:</p>
        <ul className="list-disc list-inside text-gray-600 text-left mx-auto">
          <li>Generous commission rates</li>
          <li>Access to promotional materials</li>
          <li>Support from our team</li>
        </ul>
        <button className="mt-6 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
          Apply for Affiliate Program
        </button>
      </div>
    </Container>
  );
};

export default Affiliates;
