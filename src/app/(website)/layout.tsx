"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import useCheckUserEmailVerification from "@/hooks/atEachNavigate/useCheckUserEmailVerification";
import { UseCartCountHandler } from "@/hooks/onceProjectRun/useCartCountHandler";
import useMergeCartHandler from "@/hooks/onceProjectRun/useMergeCartHandler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  UseCartCountHandler();
  useMergeCartHandler();
  useCheckUserEmailVerification();
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
