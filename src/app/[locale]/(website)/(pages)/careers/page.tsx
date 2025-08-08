import Container from "@/components/ui/container";
import React from "react";

const Careers = () => {
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Careers</h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-8">
        Join our team and be part of an innovative and dynamic company. We are
        always looking for talented individuals to help us grow.
      </p>
      <div className="space-y-6 w-full max-w-2xl">
        <div className="p-6 bg-white dark:bg-dark-bg shadow-md rounded-lg">
          <h2 className="text-2xl font-semibold text-gray-800 dark:text-dark-text">
            Frontend Developer
          </h2>
          <p className="text-gray-600 dark:text-dark-text-secondary mt-2">
            Location: Remote
          </p>
          <p className="text-gray-600 dark:text-dark-text-secondary mt-2">
            We are looking for a skilled frontend developer with experience in
            React and Tailwind CSS.
          </p>
          <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
            Apply Now
          </button>
        </div>
        {/* Add more job listings as needed */}
      </div>
    </Container>
  );
};

export default Careers;
