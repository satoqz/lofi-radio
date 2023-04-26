import { type Metadata } from "next";

import "../styles/index.css";

export const metadata: Metadata = {
  title: "Lofi Radio",
  authors: {
    name: "satoqz",
    url: "https://github.com/satoqz",
  },
  manifest: "/manifest.json",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  robots: {
    index: true,
    follow: false,
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
