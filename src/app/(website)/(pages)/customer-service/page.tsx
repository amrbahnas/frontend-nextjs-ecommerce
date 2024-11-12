import Container from "@/components/container";
import React from "react";

const CustomerService = () => {
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Customer Service
      </h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-6">
        Our dedicated customer service team is here to help you with any issues
        or questions you may have.
      </p>
      <div className="space-y-4 max-w-lg text-center">
        <p className="text-gray-700">
          Call Us: <span className="font-semibold">+201064480375</span>
        </p>
        <p className="text-gray-700">
          Email Us:{" "}
          <span className="font-semibold">elbahnsawy.work@gmail.com</span>
        </p>
        <p className="text-gray-700">Live Chat: Available Mon-Fri, 9am-5pm</p>
      </div>
    </Container>
  );
};

export default CustomerService;
