
export const metadata = {
  title: "Orion AI - Login",
  description: "Host or join video meetings with real-time voice translation, AI chat, meeting summaries, and more.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={` bg-white text-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
