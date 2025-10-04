import NextAuth, { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import { config } from "@/config";
import { getMyProfileByEmail } from "@/services/Users";
import { cookies } from "next/headers";

// ✅ Extend types
declare module "next-auth" {
  interface Session {
    user?: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    refreshToken?: string;
  }
}

const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt",
  },

  providers: [
    GoogleProvider({
      clientId: config().Google_Client_ID!,
      clientSecret: config().Google_Client_Secret!,
    }),
    GitHubProvider({
      clientId: config().Github_Client_ID!,
      clientSecret: config().Github_Client_Secret!,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    // STEP 1️⃣ Handle sign-in (Google/GitHub)
    async signIn({ user, account }) {
      try {
        const existingUser = await getMyProfileByEmail(user.email as string);

        // Optional: Auto-register if user doesn’t exist

        if (!existingUser?.data && account && user?.email) {
          // Use provider access_token as bearer token
          const providerToken = account.access_token;
          //   console.log({ "reg token for frontend": providerToken });
          await fetch(`${config().Backend_URL}/users/registerViaProviders`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `${providerToken}`,
            },
            body: JSON.stringify({
              name: user.name,
              email: user.email,
              password: Math.random().toString(36).slice(-10),
              imgUrl: user.image || "",
              authProvider: account?.provider,
            }),
          });
        }

        return true;
      } catch (err) {
        console.error("OAuth sign-in error:", err);
        return false;
      }
    },

    // STEP 2️⃣ After sign-in, issue backend tokens and store in cookies
    async jwt({ token, account, user }) {
      try {
        // Only call backend once (first login)
        if (account && user?.email) {
          // Use provider access_token as bearer token
          const providerToken = account.access_token;
          //   console.log({ "token for frontend": providerToken });
          const response = await fetch(
            `${config().Backend_URL}/auth/login-through-providers`,
            {
              method: "POST",
              headers: {
                Authorization: `${providerToken}`,
              },
            }
          );

          const data = await response.json();
          console.log({ "login response form nextauth": data });
          if (data?.data?.accessToken && data?.data?.refreshToken) {
            token.accessToken = data.data.accessToken;
            token.refreshToken = data.data.refreshToken;

            // ✅ Save tokens to HTTP-only cookies
            const cookieStore = await cookies();
            cookieStore.set("accessToken", data.data.accessToken);
            cookieStore.set("refreshToken", data.data.refreshToken);
          }
        }

        return token;
      } catch (err) {
        console.error("JWT callback error:", err);
        return token;
      }
    },

    // STEP 3️⃣ Expose tokens to session (optional, frontend use)
    async session({ session }) {
      session.user = {
        ...session.user,
      };
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
