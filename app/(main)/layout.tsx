import { AuthSessionProvider } from "@/components/contexts/auth-session-provider";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import Header from "@/components/header";
import { AppSidebar } from "@/components/sidebar";
import { TooltipProvider } from "@/components/ui/tooltip";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"]
});

export const metadata: Metadata = {
  title: "Dev Forum",
  description: "An online platform for software developers."
};

export default async function RootLayout({
  children
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
                <div className="h-full w-full">
                  <Header />
                  <div className="h-[calc(100vh-3.125rem)] overflow-y-auto">
                    {children}
                  </div>
                </div>
              </main>
            </TooltipProvider>
          </AuthSessionProvider>
        </ThemeProvider>
        <Toaster
          position="bottom-center"
          toastOptions={{
            style: {
              backgroundColor: "#18181b",
              color: "#fff",
              fontSize: 14
            }
          }}
        />
      </body>
    </html>
  );
}
