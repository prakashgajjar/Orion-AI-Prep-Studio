import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import CustomHead from "@/components/CustomeMetaData";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Zint - AI-Powered Video Meetings",
  description: "Host or join video meetings with real-time voice translation, AI chat, meeting summaries, and more.",
};



export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <CustomHead title="hey"/>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
