import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Danyame Recreational Village",
    template: "%s | Danyame Recreational Village",
  },
  description:
    "A vibrant leisure and entertainment destination in Akwatia, Eastern Region. Events, poolside sessions, food, nightlife, and more.",
  keywords: [
    "Danyame",
    "recreational village",
    "Akwatia",
    "events",
    "entertainment",
    "Ghana",
  ],
  openGraph: {
    type: "website",
    locale: "en_GH",
    siteName: "Danyame Recreational Village",
  },
};

export const viewport: Viewport = {
  themeColor: "#125E65",
};

// Revalidate CMS-backed pages on a short interval as a fallback when
// on-demand revalidation from Payload hooks is unavailable.
export const revalidate = 60;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <head>
        {/* Fontshare — Clash Grotesk (headings) + Satoshi (body) */}
        <link rel="preconnect" href="https://api.fontshare.com" />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-grotesk@400,500,600,700&f[]=satoshi@300,400,500,700&display=swap"
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
