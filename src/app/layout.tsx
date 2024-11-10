import ProgressBarLayout from "@/components/layout/progressBarLayout";
import { Metadata } from "next";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AntDLayout from "../components/layout/antDLayout";
import ReactQueryLayout from "../components/layout/reactQueryLayout";
import "./globals.css";
import InitialChecks from "@/components/layout/initailCheckes";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "E-Commerce Application",
  description: "A complete e-commerce application with Next.js and Node.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AntDLayout>
          <ReactQueryLayout>
            {/* {children} */}
            <ProgressBarLayout>{children}</ProgressBarLayout>
            <InitialChecks />
          </ReactQueryLayout>
        </AntDLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
