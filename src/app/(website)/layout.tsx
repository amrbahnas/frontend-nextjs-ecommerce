"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { UseCartCountHandler } from "@/hooks/onceProjectRun/useCartCountHandler";
import useMergeCartHandler from "@/hooks/onceProjectRun/useMergeCartHandler";
import Breadcrumb from "../../components/ui/breadcrumb";
import useCheckVerifiedEmail from "@/hooks/onceProjectRun/useCheckVerifiedEmail";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  UseCartCountHandler();
  useMergeCartHandler();
  useCheckVerifiedEmail();

  return (
    <div>
      <Navbar />
      <Breadcrumb />
      {children}
      <Footer />
    </div>
  );
}
