import Container from "@/components/container";
import React from "react";

const ContactUs = () => {
  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl text-center">
        For any questions, feedback, or inquiries, please feel free to reach out
        to us. We are here to help!
      </p>
      <form className="w-full max-w-lg space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        />
        <textarea
          placeholder="Your Message"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
        >
          Send Message
        </button>
      </form>
    </Container>
  );
};

export default ContactUs;
