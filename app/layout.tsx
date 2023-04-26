import { type Metadata } from "next";
import { Press_Start_2P } from "next/font/google";

const font = Press_Start_2P({
  weight: "400",
  variable: "--font-press-start-2p",
  subsets: ["latin", "latin-ext"],
});

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
    <html lang="en" className={font.variable}>
      <body>{children}</body>
    </html>
  );
}
