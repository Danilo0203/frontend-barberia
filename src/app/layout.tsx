import type { Metadata } from "next";
import "./globals.css";
import { montserrat } from "@/config/fonts";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
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
        {children}
        {modal}
      </body>
    </html>
  );
}
