import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/models/userSchema.models";
import connectDB from "@/configs/db.config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    CredentialsProvider({
      name: "Developer Account",
      credentials: {
        email: { label: "Email (Any email)", type: "email", placeholder: "dev@example.com" },
        password: { label: "Password (Any password)", type: "password" }
      },
      async authorize(credentials) {
        await connectDB();
        const email = credentials?.email?.toLowerCase() || "developer@orion.ai";
        
        let user = await User.findOne({ email });
        if (!user) {
          user = await User.create({
            name: credentials?.email ? credentials.email.split("@")[0] : "Developer",
            email: email,
            image: "https://placehold.co/100",
            isVerified: true
          });
        }
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image
        };
      }
    })
  ],

  callbacks: {
    async signIn({ user }) {
      await connectDB();
      const existingUser = await User.findOne({ email: user.email });
      if (!existingUser) {
        await User.create({
          name: user.name,
          email: user.email,
          image: user.image,
        });
      }
      return true;
    },

    async jwt({ token, user }) {
      if (user) {
        await connectDB();
        const existingUser = await User.findOne({ email: user.email });
        token.id = existingUser._id; // ✅ your Mongo ID
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id; // ✅ use token.id — not sub!
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
