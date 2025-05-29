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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Info */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <div className="text-2xl font-bold tracking-wide text-gray-800">
                {t("brand")}
              </div>
            </Link>
            <p className="text-gray-500 leading-relaxed">{t("description")}</p>
            <div className="space-y-3">
              <a
                href="mailto:elbahnsawy.work@gmail.com"
                className="flex items-center gap-2 text-nowrap text-gray-600 hover:text-primary transition-colors"
              >
                <span className="material-icons-outlined text-lg">
                  {t("emailUs")}
                </span>
                <span>elbahnsawy.work@gmail.com</span>
              </a>
              <a
                href={`https://wa.me/${phoneNumber}`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors text-nowrap"
              >
                <FaWhatsapp className="text-lg" />
                <span>{phoneNumber.replace("+", "")}</span>
              </a>
            </div>
            <div className="flex gap-4">
              <a
                href="https://www.facebook.com/amr.bahnas.75"
                target="_blank"
                rel="noreferrer"
                className="text-2xl    hover:text-blue-500 transition-colors"
              >
                <SiFacebook />
              </a>
              <a
                href="https://www.instagram.com/amr_elbahnsawy/"
                target="_blank"
                rel="noreferrer"
                className="text-2xl   hover:text-pink-500 transition-colors"
              >
                <SiInstagram />
              </a>
              <a
                href="https://www.linkedin.com/in/amr-elbahnsawy/"
                target="_blank"
                rel="noreferrer"
                className="text-2xl   hover:text-blue-500 transition-colors"
              >
                <SiLinkedin />
              </a>
              <a
                href="https://github.com/amrbahnas"
                target="_blank"
                rel="noreferrer"
                className="text-2xl   hover:text-gray-500 transition-colors"
              >
                <SiGithub />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{t("shop")}</h3>
            <div className="space-y-4">
              <Link
                href="/list?cat=66fc7bc1ce2284e5c7c337ae"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                {t("men")}
              </Link>
              <Link
                href="?cat=66fc7f18e3bd2937a6e60771"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                {t("sport")}
              </Link>
              <Link
                href="/list"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                {t("allProducts")}
              </Link>
            </div>
          </div>

          {/* Help */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">{t("help")}</h3>
            <div className="space-y-4">
              <Link
                href="/contact-us"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                href="/customer-service"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                {t("customerService")}
              </Link>
              <Link
                href="/profile"
                className="block text-gray-500 hover:text-primary transition-colors"
              >
                {t("myAccount")}
              </Link>
            </div>
          </div>

          {/* Payment Methods */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-800">
              {t("paymentMethods")}
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <NextImage
                src="/discover.png"
                alt="Discover"
                width={60}
                height={40}
                className="hover:scale-105 transition-transform"
              />
              <NextImage
                src="/skrill.png"
                alt="Skrill"
                width={60}
                height={40}
                className="hover:scale-105 transition-transform"
              />
              <NextImage
                src="/paypal.png"
                alt="PayPal"
                width={60}
                height={40}
                className="hover:scale-105 transition-transform"
              />
              <NextImage
                src="/mastercard.png"
                alt="Mastercard"
                width={60}
                height={40}
                className="hover:scale-105 transition-transform"
              />
              <NextImage
                src="/visa.png"
                alt="Visa"
                width={60}
                height={40}
                className="hover:scale-105 transition-transform"
              />
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 text-sm">
            <div className="text-gray-500">
              {t("copyright")} &copy; 2024 {t("brand")}.{" "}
              {t("allRightsReserved")}
            </div>
            <div className="flex flex-wrap justify-center gap-6">
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
            </div>
          </div>
        </div>
      </Container>
    </footer>
  );
};

export default memo(Footer);
