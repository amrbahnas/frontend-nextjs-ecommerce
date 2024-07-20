import "./globals.css";
import "react-toastify/dist/ReactToastify.css";
import { Inter } from "next/font/google";
import { ToastContainer } from "react-toastify";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AntDLayout from "../components/layout/antDLayout";
import ReactQueryLayout from "../components/layout/reactQueryLayout";
import ProgressBarLayout from "@/components/layout/progressBarLayout";
import { Metadata } from "next";

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
            <ProgressBarLayout>
              <Navbar />
              {children}
              <Footer />
            </ProgressBarLayout>
          </ReactQueryLayout>
        </AntDLayout>
        <ToastContainer />
      </body>
    </html>
  );
}
