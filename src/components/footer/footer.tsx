import Image from "next/image";
import Link from "next/link";
import Container from "../ui/container";
import NextImage from "../ui/nextImage";
import { FaWhatsapp } from "react-icons/fa";
import { SiFacebook, SiInstagram, SiLinkedin, SiGithub } from "react-icons/si";
import { memo } from "react";
import { useTranslations } from "next-intl";
import Newsletter from "./newsletter";

const Footer = () => {
  const t = useTranslations("Footer");
  const phoneNumber = "+201064480375"; // Format for WhatsApp

  return (
    <footer className="bg-gray-50 text-gray-600 mt-24">
      {/* Newsletter Section */}
      <Newsletter />

      {/* Main Footer */}
      <Container className="py-16">
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <article className="space-y-6">
            <header>
              <Link href="/" className="block">
                <h2 className="text-2xl font-bold tracking-wide text-gray-800 m-0">
                  {t("brand")}
                </h2>
              </Link>
            </header>
            <p className="text-gray-500 leading-relaxed">{t("description")}</p>

            <address className="space-y-3 not-italic">
              <a
                href="mailto:elbahnsawy.work@gmail.com"
                className="flex items-center gap-2 text-nowrap text-gray-600 hover:text-primary transition-colors"
              >
                <span
                  className="material-icons-outlined text-lg"
                  aria-hidden="true"
                >
                  {t("emailUs")}
                </span>
                <span>elbahnsawy.work@gmail.com</span>
              </a>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors text-nowrap"
                aria-label={`Contact us on WhatsApp at ${phoneNumber}`}
              >
                <FaWhatsapp className="text-lg" aria-hidden="true" />
                <span>{phoneNumber.replace("+", "")}</span>
              </a>
            </address>

            <nav aria-label="Social media links">
              <ul className="flex gap-4 list-none p-0 m-0">
                <li>
                  <a
                    href="https://www.facebook.com/amr.bahnas.75"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl hover:text-blue-500 transition-colors"
                    aria-label="Follow us on Facebook"
                  >
                    <SiFacebook />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.instagram.com/amr_elbahnsawy/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl hover:text-pink-500 transition-colors"
                    aria-label="Follow us on Instagram"
                  >
                    <SiInstagram />
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/amr-elbahnsawy/"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl hover:text-blue-500 transition-colors"
                    aria-label="Connect with us on LinkedIn"
                  >
                    <SiLinkedin />
                  </a>
                </li>
                <li>
                  <a
                    href="https://github.com/amrbahnas"
                    target="_blank"
                    rel="noreferrer"
                    className="text-2xl hover:text-gray-500 transition-colors"
                    aria-label="View our GitHub profile"
                  >
                    <SiGithub />
                  </a>
                </li>
              </ul>
            </nav>
          </article>

          {/* Quick Links */}
          <nav className="space-y-6" aria-label="Shop categories">
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              {t("shop")}
            </h3>
            <ul className="space-y-4 list-none p-0 m-0">
              <li>
                <Link
                  href="/list?cat=66fc7bc1ce2284e5c7c337ae"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("men")}
                </Link>
              </li>
              <li>
                <Link
                  href="?cat=66fc7f18e3bd2937a6e60771"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("sport")}
                </Link>
              </li>
              <li>
                <Link
                  href="/list"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("allProducts")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Help */}
          <nav className="space-y-6" aria-label="Customer support">
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              {t("help")}
            </h3>
            <ul className="space-y-4 list-none p-0 m-0">
              <li>
                <Link
                  href="/contact-us"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("contactUs")}
                </Link>
              </li>
              <li>
                <Link
                  href="/customer-service"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("customerService")}
                </Link>
              </li>
              <li>
                <Link
                  href="/profile"
                  className="block text-gray-500 hover:text-primary transition-colors"
                >
                  {t("myAccount")}
                </Link>
              </li>
            </ul>
          </nav>

          {/* Payment Methods */}
          <section className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800 m-0">
              {t("paymentMethods")}
            </h3>
            <figure>
              <figcaption className="sr-only">
                Accepted payment methods
              </figcaption>
              <ul className="grid grid-cols-3 gap-4 list-none p-0 m-0">
                <li>
                  <NextImage
                    src="/discover.png"
                    alt="Discover Card accepted"
                    width={60}
                    height={40}
                    className="hover:scale-105 transition-transform"
                  />
                </li>
                <li>
                  <NextImage
                    src="/skrill.png"
                    alt="Skrill accepted"
                    width={60}
                    height={40}
                    className="hover:scale-105 transition-transform"
                  />
                </li>
                <li>
                  <NextImage
                    src="/paypal.png"
                    alt="PayPal accepted"
                    width={60}
                    height={40}
                    className="hover:scale-105 transition-transform"
                  />
                </li>
                <li>
                  <NextImage
                    src="/mastercard.png"
                    alt="Mastercard accepted"
                    width={60}
                    height={40}
                    className="hover:scale-105 transition-transform"
                  />
                </li>
                <li>
                  <NextImage
                    src="/visa.png"
                    alt="Visa accepted"
                    width={60}
                    height={40}
                    className="hover:scale-105 transition-transform"
                  />
                </li>
              </ul>
            </figure>
          </section>
        </section>

        {/* Bottom Bar */}
        <section className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <p className="text-gray-500 m-0">
              {t("copyright")} &copy; 2025 {t("brand")}.{" "}
              {t("allRightsReserved")}
            </p>
            <aside className="flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{t("language")}:</span>
                <span className="text-gray-600">
                  {t("unitedStates")} | {t("english")}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-400">{t("currency")}:</span>
                <span className="text-gray-600">$ {t("egp")}</span>
              </div>
            </aside>
          </div>
        </section>
      </Container>
    </footer>
  );
};

export default memo(Footer);
