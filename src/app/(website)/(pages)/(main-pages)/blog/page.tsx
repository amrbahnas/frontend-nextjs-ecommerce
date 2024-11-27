import Container from "@/components/container";
import React from "react";

const Blog = () => {
  const posts = [
    {
      title: "How to Choose the Right Product for You",
      date: "November 1, 2024",
      preview:
        "Finding the perfect product can be challenging. Here are some tips to help you make the right choice.",
    },
    {
      title: "5 Ways to Use Our Products in Everyday Life",
      date: "October 20, 2024",
      preview:
        "Our products are versatile and can be used in various ways. Learn how to make the most of them!",
    },
    // Add more posts as needed
  ];

  return (
    <Container className="flex flex-col items-center justify-center  min-h-96  py-16 ">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">Blog</h1>
      <p className="text-lg text-gray-600 max-w-3xl text-center mb-8">
        Explore our blog for the latest tips, product insights, and stories from
        our community.
      </p>
      <div className="space-y-6 w-full max-w-3xl">
        {posts.map((post, index) => (
          <div key={index} className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-semibold text-gray-800">
              {post.title}
            </h2>
            <p className="text-sm text-gray-500 mb-2">{post.date}</p>
            <p className="text-gray-600">{post.preview}</p>
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700">
              Read More
            </button>
          </div>
        ))}
      </div>
    </Container>
  );
};

export default Blog;
