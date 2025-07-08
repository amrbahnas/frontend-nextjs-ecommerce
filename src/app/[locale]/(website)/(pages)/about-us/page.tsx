import Container from "@/components/ui/container";
import React from "react";
import { FaFacebookSquare, FaGithub, FaLinkedin } from "react-icons/fa";
import { IoLogoInstagram } from "react-icons/io5";
import { useTranslations } from "next-intl";

const AboutUs = () => {
  const t = useTranslations("AboutUs");

  return (
    <Container className="flex flex-col items-center justify-center py-16 min-h-96">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{t("title")}</h1>
      <section className="text-lg text-gray-600 max-w-3xl text-center mt-4 leading-relaxed">
        <p>{t("description.intro")}</p>
        <p>{t("description.education")}</p>
        <div className="flex flex-col justify-center gap-5">
          <a className="font-semibold" href={`mailto:${t("contact.email")}`}>
            {t("contact.email")}
          </a>
          <span className="font-semibold">{t("contact.phone")}</span>
          <div className="flex gap-6 justify-center">
            <a
              href="https://www.facebook.com/amr.bahnas.75"
              target="_blank"
              rel="noreferrer"
              className="text-3xl"
              title={t("social.facebook")}
            >
              <FaFacebookSquare />
            </a>
            <a
              href="https://www.instagram.com/amr_elbahnsawy/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl"
              title={t("social.instagram")}
            >
              <IoLogoInstagram />
            </a>
            <a
              href="https://www.linkedin.com/in/amr-elbahnsawy/"
              target="_blank"
              rel="noreferrer"
              className="text-3xl"
              title={t("social.linkedin")}
            >
              <FaLinkedin />
            </a>
            <a
              href="https://github.com/amrbahnas"
              target="_blank"
              rel="noreferrer"
              className="text-3xl"
              title={t("social.github")}
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
