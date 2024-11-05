import { ThemeProvider as NextThemesProvider } from "next-themes";
import { type ThemeProviderProps } from "next-themes/dist/types";
import { auth } from "../auth";
import { SessionProvider } from "next-auth/react";

export default async function Providers({
  children,
  ...props
}: Readonly<ThemeProviderProps>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </SessionProvider>
  );
}
