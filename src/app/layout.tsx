import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Skiper Open UI — Premium Micro-Interactions & Animated Components",
  description:
    "Open-source alternative to paid animation kits. 100+ fluid micro-interactions, spring physics, and shadcn/ui compatible components for Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased min-h-screen bg-[#09090b] text-[#fafafa]">
        {children}
      </body>
    </html>
  );
}
