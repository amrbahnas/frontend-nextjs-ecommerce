"use client";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import useMergeCartHandler from "@/hooks/onceProjectRun/useMergeCartHandler";
import Breadcrumb from "../../components/ui/breadcrumb";
import useCheckUser from "@/hooks/onceProjectRun/useCheckUser";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useMergeCartHandler();
  useCheckUser();

  return (
    <div>
      <Navbar />
      <Breadcrumb />
      {children}
      <Footer />
    </div>
  );
}
