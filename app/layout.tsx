import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://softwala.com"),
  title: "Softwala • We build apps that matter",
  description: "Building productive software solutions with a soul. Based in Bangladesh.",
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Softwala • We build apps that matter",
    description: "Building productive software solutions with a soul. Based in Bangladesh.",
    images: [{ url: "/preview.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Softwala • We build apps that matter",
    description: "Building productive software solutions with a soul. Based in Bangladesh.",
    images: ["/preview.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
