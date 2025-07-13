import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { auth, handlers, signIn, signOut } = NextAuth({
  providers: [GitHub],
  secret: process.env.AUTH_SECRET,
  callbacks: {
    async session({ session, user }) {
      console.log("session callback called", session);
      console.log("user callback called", user);
      return session;
    },
  },
});
