import "./globals.css";
import AuthProvider from "./providers/AuthProvider";
import AppProviderWrapper from "@/hooks/AppProviderWrapper";

export const metadata = {
  title: "Orion AI",
  description:
    "Host or join video meetings with real-time voice translation, AI chat, meeting summaries, and more.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={` bg-white text-black antialiased`}>
        <AuthProvider>
          <AppProviderWrapper>{children}</AppProviderWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
