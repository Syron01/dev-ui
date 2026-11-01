import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "DEV UI — Un-Common Components for ShadCN/UI",
  description:
    "106+ Outstanding animated components. No extra packages — just one file for each component. Free & open source.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body className="antialiased min-h-screen bg-black text-white selection:bg-white selection:text-black">
        {children}
      </body>
    </html>
  );
}
