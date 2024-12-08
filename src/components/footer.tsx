import Image from "next/image";
import Link from "next/link";
import Container from "./container";
import NextImage from "./ui/nextImage";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { memo } from "react";

const Footer = () => {
  return (
    <div className=" py-24 bg-gray-100 text-sm mt-24">
      <Container>
        {/* TOP */}
        <div className="flex flex-col md:flex-row justify-between gap-10 flex-wrap">
          {/* LEFT */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <Link href="/">
              <div className="text-2xl tracking-wide">Elbahnsawy</div>
            </Link>
            <p>Elbahnsawy is a global online fashion retail company. We sell</p>
            <a
              className="font-semibold"
              href="mailto:elbahnsawy.work@gmail.com"
            >
              elbahnsawy.work@gmail.com
            </a>
            <span className="font-semibold">(+20)1064480375</span>
            <div className="flex gap-6">
              <a
                href="https://www.facebook.com/amr.bahnas.75"
                target="_blank"
                rel="noreferrer"
                className="text-3xl"
              >
                <FaFacebookSquare />
              </a>
              <a
                href="https://www.instagram.com/amr_elbahnsawy/"
                target="_blank"
                rel="noreferrer"
                className="text-3xl"
              >
                <IoLogoInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/amr-elbahnsawy/"
                target="_blank"
                rel="noreferrer"
                className="text-3xl"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://github.com/amrbahnas"
                target="_blank"
                rel="noreferrer"
                className="text-3xl"
              >
                <FaGithub />
              </a>
            </div>
          </div>
          {/* CENTER */}
          <div className="grid  grid-cols-2 md:grid-cols-3  gap-3 flex-1 shrink-0">
            <div className="flex flex-col gap-3 md:gap-16">
              <h1 className="font-medium text-lg">SHOP</h1>
              <div className="flex flex-col gap-6">
                <Link href="/list?cat=66fc7bc1ce2284e5c7c337ae">Men</Link>
                <Link href="?cat=66fc7f18e3bd2937a6e60771">Sport</Link>
                <Link href="/list">All Products</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-16">
              <h1 className="font-medium text-lg">HELP</h1>
              <div className="flex flex-col gap-6">
                <Link href="/customer-service">Customer Service</Link>
                <Link href="/profile">My Account</Link>
                <Link href="/find-store">Find a Store</Link>
              </div>
            </div>
            <div className="flex flex-col gap-3 md:gap-16">
              <h1 className="font-medium text-lg">COMPANY</h1>
              <div className="flex flex-col gap-6 ">
                <Link href="/about-us">About Us</Link>
                <Link href="/contact-us">Contact Us</Link>
              </div>
            </div>
          </div>
          {/* RIGHT */}
          <div className="w-full md:w-1/2 lg:w-1/4 flex flex-col gap-8">
            <span className="font-semibold">Secure Payments</span>
            <div className="flex justify-between">
              <NextImage src="/discover.png" alt="" width={40} height={20} />
              <NextImage src="/skrill.png" alt="" width={40} height={20} />
              <NextImage src="/paypal.png" alt="" width={40} height={20} />
              <NextImage src="/mastercard.png" alt="" width={40} height={20} />
              <NextImage src="/visa.png" alt="" width={40} height={20} />
            </div>
          </div>
        </div>
        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mt-16">
          <div className="">© 2024 Elbahnsawy Shop</div>
          <div className="flex flex-col gap-8 md:flex-row">
            <div className="">
              <span className="text-gray-500 mr-4">Language</span>
              <span className="font-medium">United States | English</span>
            </div>
            <div className="">
              <span className="text-gray-500 mr-4">Currency</span>
              <span className="font-medium">$ EGP</span>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default memo(Footer);
