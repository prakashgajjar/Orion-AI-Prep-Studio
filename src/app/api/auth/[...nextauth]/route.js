import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import User from "@/models/userSchema.models";
import connectDB from "@/configs/db.config";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
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
