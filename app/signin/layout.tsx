import { Roboto } from "next/font/google";
import "../globals.css";
import { ThemeProvider } from "@/components/contexts/theme-provider";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
});

export default async function RootLayout({
  children,
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
          <main className="flex h-screen items-center justify-center">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
