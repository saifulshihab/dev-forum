import Header from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { AuthSessionProvider } from "@/components/contexts/auth-session-provider";
import { TooltipProvider } from "@/components/ui/tooltip";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export const metadata: Metadata = {
  title: "Dev Forum",
  description: "An online platform for software developers.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <AuthSessionProvider session={session}>
            <TooltipProvider>
              <main className="m-auto flex h-screen max-w-screen-xl border-r border-dashed">
                <AppSidebar />
                <div className="w-full">
                  <Header />
                  {children}
                </div>
              </main>
            </TooltipProvider>
          </AuthSessionProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
