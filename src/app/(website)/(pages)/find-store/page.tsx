import Container from "@/components/container";
import React from "react";

const FindAStore = () => {
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Find a Store</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        Locate the nearest store for a more personal shopping experience. Enter
        your location to find a store near you.
      </p>
      <div className="w-full max-w-md">
        <input
          type="text"
          placeholder="Enter your location"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <button
          type="button"
          className="w-full mt-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Find Store
        </button>
      </div>
    </Container>
  );
};

export default FindAStore;
