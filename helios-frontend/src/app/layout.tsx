import type { Metadata } from "next";
import "./globals.css";

import Navbar from "@components/Navbar";
import Footer from "@components/Footer"

export const metadata: Metadata = {
  title: "Helios",
  description: "Landsat SR app.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div id="header">
          <Navbar />
        </div>
        <main id="content">
          {children}
        </main>
        <div id="footer">
          <Footer />
        </div>
      </body>
    </html>
  );
}
