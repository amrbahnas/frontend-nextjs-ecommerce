"use client";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import Breadcrumb from "../../../components/ui/breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <Breadcrumb />
      <main>{children}</main>
      <Footer />
    </>
  );
}
