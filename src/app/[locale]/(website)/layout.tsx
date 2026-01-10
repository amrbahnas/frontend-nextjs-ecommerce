"use client";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import Breadcrumb from "../../../components/ui/breadcrumb";
import DemoVideoModal from "@/components/ui/demoVideoModal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      {/* Demo Video Modal - Shows on first visit */}
      <DemoVideoModal />

      {/* Skip Navigation Link for Accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:top-4 focus:left-4 focus:bg-primary focus:text-white focus:px-4 focus:py-2 focus:rounded-md focus:outline-none"
      >
        Skip to main content
      </a>
      <Navbar />
      <Breadcrumb />
      <main id="main-content">{children}</main>
      <Footer />
    </>
  );
}
