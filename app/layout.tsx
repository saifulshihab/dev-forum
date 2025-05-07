import { AppSidebar } from "@/components/sidebar";
import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Dev Forum",
  description: "An online platform for software developers."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.className} antialiased`}>
        <main className="m-auto flex h-screen max-w-3/4 bg-gray-100">
          <AppSidebar />
          {children}
        </main>
      </body>
    </html>
  );
}
