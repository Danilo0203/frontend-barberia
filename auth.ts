import NextAuth from "next-auth";
import authConfig from "./auth.config";

export const { auth, handlers, signIn, signOut } = NextAuth({
  callbacks: {
    // This method is not invoked when you persist sessions in a database.
    async jwt({ token, account }) {
      if (account) {
        const res = await fetch(
          `${process.env.STRAPI_BACKEND_URL}/api/auth/${account.provider}/callback?access_token=${account.access_token}`,
        );
        const data = await res.json();
        const { jwt, user } = data;
        token.accessToken = jwt;
        token.userId = user.id;
      }
      return token;
    },
    async session({ session, token, user }) {
      // Send properties to the client, like an access_token from a provider.
      session.user.accessToken = token.accessToken as string;
      session.user.userId = token.userId as number;
      return session;
    },
  },

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  ...authConfig,
});
