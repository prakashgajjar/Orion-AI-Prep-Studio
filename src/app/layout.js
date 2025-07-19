import "./globals.css";


export const metadata = {
  title: "Orion AI",
  description: "Host or join video meetings with real-time voice translation, AI chat, meeting summaries, and more.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` bg-black text-white antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
