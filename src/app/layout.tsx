import { Metadata } from "next";
import { Inter } from "next/font/google";
import ProgressBarLayout from "@/components/layout/progressBarLayout";
import AntDLayout from "@/components/layout/antDLayout";
import ReactQueryLayout from "@/components/layout/reactQueryLayout";
import OnlineStatus from "@/components/layout/onlineStatus";
import { Toaster } from "react-hot-toast";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shope-Amr",
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
            <OnlineStatus>
              <ProgressBarLayout>{children}</ProgressBarLayout>

              <Toaster />
            </OnlineStatus>
          </ReactQueryLayout>
        </AntDLayout>
      </body>
    </html>
  );
}
