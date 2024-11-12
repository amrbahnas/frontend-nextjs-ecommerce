import Container from "@/components/container";
import React from "react";

const AboutUs = () => {
  return (
    <Container className="flex flex-col items-center justify-center py-16 min-h-96  ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center">
        We are a passionate team dedicated to delivering high-quality products
        and exceptional customer service. Our mission is to provide a seamless
        online shopping experience for our customers. Founded in [Year], we
        continue to innovate and expand our offerings to serve you better.
      </p>
    </Container>
  );
};

export default AboutUs;
