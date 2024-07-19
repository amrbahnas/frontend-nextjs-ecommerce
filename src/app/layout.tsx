import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";
import AntdLayout from "./antdLayout";
import ReactQueryLayout from ".//reactQueryLayout";

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
        <NextTopLoader
          color="##007BFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px ##9B7029,0 0 5px ##9B7029"
        />
        <ToastContainer />
        <AntdLayout>
          <ReactQueryLayout>
            <Navbar />
            {children}
            <Footer />
          </ReactQueryLayout>
        </AntdLayout>
      </body>
    </html>
  );
}
