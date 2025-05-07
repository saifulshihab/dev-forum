import { AppSidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
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
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <main className="m-auto flex h-screen max-w-3/4 border-r border-dashed">
            <AppSidebar />
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
