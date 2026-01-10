import { useTranslations } from "next-intl";
import Link from "next/link";

/**
 * Server-rendered fallback for the slider that displays immediately
 * This drastically improves LCP by showing the first slide content
 * before Swiper.js loads
 */
const SliderFallback = () => {
  const t = useTranslations("HomePage.slider");

  return (
    <section
      className="h-screen max-h-[500px] relative"
      role="region"
      aria-label={t("springSale")}
    >
      <div className="w-full h-full flex flex-col gap-16 xl:flex-row items-center justify-center bg-gradient-to-r from-blue-50 to-yellow-50 dark:from-blue-900/20 dark:to-yellow-900/20">
        <div className="flex flex-col items-center justify-center gap-8 2xl:gap-12 text-center">
          <h2 className="text-xl lg:text-3xl 2xl:text-5xl">{t("saleOff")}</h2>
          <h1 className="text-5xl lg:text-6xl 2xl:text-8xl font-semibold">
            {t("springSale")}
          </h1>
          <Link href="/list">
            <button
              type="button"
              className="rounded-md bg-black text-white py-3 px-4 dark:bg-white dark:text-black text-base font-medium hover:opacity-90 transition-opacity"
            >
              {t("shopNow")}
            </button>
          </Link>
        </div>
      </div>
      {/* Pagination placeholder */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        <div className="w-3 h-3 rounded-full bg-primary"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        <div className="w-3 h-3 rounded-full bg-gray-300 dark:bg-gray-600"></div>
      </div>
    </section>
  );
};

export default SliderFallback;
