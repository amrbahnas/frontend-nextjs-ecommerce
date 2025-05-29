"use client";
import Footer from "@/components/footer/footer";
import Navbar from "@/components/navbar";
import useMergeCartHandler from "@/hooks/onceProjectRun/useMergeCartHandler";
import Breadcrumb from "../../../components/ui/breadcrumb";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useMergeCartHandler();

  return (
    <div>
      <Navbar />
      <Breadcrumb />
      {children}
      <Footer />
    </div>
  );
}
