import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/config/fonts";
import { ThemeProvider } from "next-themes";
import Providers from "@/Providers";

export const metadata: Metadata = {
  title: "Juanes Barber's",
  description: "Un sitio web para reservar citas de barberos",
};

export default function RootLayout({
  children,
  modal,
}: Readonly<{
  children: React.ReactNode;
  modal: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <body className={`${montserrat.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>
            {children}
            {modal}
          </Providers>
        </ThemeProvider>
      </body>
    </html>
  );
}
