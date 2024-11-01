"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UseCartCountHandler } from "@/hooks/onceProjectRun/useCartCountHandler";
import useMergeCartHandler from "@/hooks/onceProjectRun/useMergeCartHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  UseCartCountHandler();
  useMergeCartHandler();
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
