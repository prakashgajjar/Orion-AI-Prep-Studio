"use client";

import Head from "next/head";

export default function CustomHead({
  title = "Zint - AI-Powered Video Meetings",
  description = "Host or join video meetings with real-time voice translation, AI chat, meeting summaries, and more.",
//   image = "https://vibemeet.com/og-image.png",
//   url = "https://vibemeet.com",
}) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content="video meeting, ai, gpt, translation, real-time voice, zoom alternative" />
      <meta name="theme-color" content="#2563EB" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={image} />
      <meta property="og:url" content={url} /> */}
      <meta property="og:type" content="website" />
    </Head>
  );
}
