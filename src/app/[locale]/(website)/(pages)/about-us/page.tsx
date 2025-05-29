import Container from "@/components/ui/container";
import React from "react";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";

const AboutUs = () => {
  return (
    <Container className="flex flex-col items-center justify-center py-16 min-h-96">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
      <section className="text-lg text-gray-600 max-w-3xl text-center mt-4 leading-relaxed">
        <p>
          Amr Elbahnsawy, Full Stack Developer with 3 years of experience, from
          Zagazig, Egypt.
        </p>
        <p>
          Graduated from Zagazig University, Faculty of Engineering, Computer
          and Systems Department.
        </p>
        <div className=" flex flex-col justify-center gap-5">
          <a className="font-semibold" href="mailto:elbahnsawy.work@gmail.com">
            elbahnsawy.work@gmail.com
          </a>
          <span className="font-semibold">(+20)1064480375</span>
          <div className="flex gap-6 justify-center">
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
      </section>
    </Container>
  );
};

export default AboutUs;
