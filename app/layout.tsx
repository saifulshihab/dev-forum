import { AppSidebar } from "@/components/sidebar";
import { ThemeProvider } from "@/components/theme-provider";
import { Button } from "@/components/ui/button";
import { TooltipProvider } from "@/components/ui/tooltip";
import { LogInIcon } from "lucide-react";
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
          <TooltipProvider>
            <main className="m-auto flex h-screen max-w-3/4 border-r border-dashed">
              <AppSidebar />
              <div className="w-full">
                <div className="flex h-[3.125rem] shrink-0 justify-end border-b border-dashed px-4">
                  <div className="inline-flex items-center gap-2">
                    <Button variant="ghost">
                      <LogInIcon />
                      Login
                    </Button>
                    <Button variant="ghost">Register</Button>
                  </div>
                </div>
                {children}
              </div>
            </main>
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
