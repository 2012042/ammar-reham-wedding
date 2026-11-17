import type { Metadata, Viewport } from "next";
import "./globals.css";

const title = "عمار & رهام | دعوة زفاف";
const description = "ندعوكم لمشاركتنا فرحتنا — الأحد 22 . 11 . 2026";
const ogImage = {
  url: "/og.jpg",
  width: 1200,
  height: 630,
  alt: "دعوة زفاف عمار ورهام",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://ammar-reham.vercel.app"
  ),
  title,
  description,
  openGraph: {
    type: "website",
    url: "/",
    siteName: "عمار & رهام",
    locale: "ar_AR",
    title,
    description,
    images: [ogImage],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [ogImage.url],
  },
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#f7f2e9",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Aref+Ruqaa:wght@400;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Tajawal:wght@300;400;500;700&display=swap"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
