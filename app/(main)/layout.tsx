import { nextAuthOptions } from "@/auth";
import { AppSidebar } from "@/components/app-sidebar";
import { AuthProvider } from "@/components/contexts/auth-provider";
import { AuthSessionProvider } from "@/components/contexts/auth-session-provider";
import { ThemeProvider } from "@/components/contexts/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import SetupProfileAlert from "@/components/user/setup-profile-alert";
import { Analytics } from "@vercel/analytics/next";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "react-hot-toast";
import "../globals.css";

dayjs.extend(relativeTime);

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
  const session = await getServerSession(nextAuthOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${roboto.className} antialiased`}>
        <NextTopLoader color="#00857a" showSpinner={false} />
        <ThemeProvider
          enableSystem
          attribute="class"
          defaultTheme="dark"
          disableTransitionOnChange
        >
          <TooltipProvider>
            <AuthSessionProvider session={session}>
              <AuthProvider>
                <SetupProfileAlert />
                <main className="m-auto flex h-screen max-w-screen-xl border-r border-dashed">
                  <AppSidebar />
                  <div className="h-full flex-1 overflow-y-auto">
                    {children}
                  </div>
                </main>
              </AuthProvider>
            </AuthSessionProvider>
          </TooltipProvider>
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
        <Analytics />
      </body>
    </html>
  );
}
