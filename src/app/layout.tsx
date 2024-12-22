import { ReactQueryClientProvider } from "@/providers";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-geist-sans",
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Next.js Boilerplate",
  description: "Next.js Boilerplate with TailwindCSS and Typescript",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className={`${poppins.variable} antialiased`}>
        <ReactQueryClientProvider>
          {children}
          <ToastContainer />
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
