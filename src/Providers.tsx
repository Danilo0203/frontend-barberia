"use client";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { SessionProvider } from "next-auth/react";
import { auth } from "../auth";

export default async function Providers({
  children,
  ...props
}: Readonly<ThemeProviderProps>) {
  const session = await auth();
  return (
    <NextThemesProvider {...props}>
      <SessionProvider session={session}>{children}</SessionProvider>
    </NextThemesProvider>
  );
}
