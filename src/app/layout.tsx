import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Header } from "@/components/layout/Header";
import Providers from "./providers";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL("https://maiconlara.com.br"),

  title: {
    default: "Maicon Lara | Frontend & Fullstack Developer",
    template: "%s | Maicon Lara",
  },

  description:
    "Mid-Level Fullstack Developer with 3+ years of experience, specialized in creating scalable and high-performance applications. I work mainly with Next.js, TypeScript, React and Node.js, always aiming maintainable code and outstanding user experiences.",

  authors: [{ name: "Maicon Lara" }],
  creator: "Maicon Lara",

  alternates: {
    canonical: "https://maiconlara.com.br",
  },

  openGraph: {
    title: "Maicon Lara | Frontend & Fullstack Developer",
    description:
      "Mid-Level Fullstack Developer with 3+ years of experience, specialized in creating scalable and high-performance applications.",
    url: "https://maiconlara.com.br",
    siteName: "Maicon Lara",
    images: [
      {
        url: "/og-image.webp",
        width: 1200,
        height: 630,
        alt: "Portfolio de Maicon Lara",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },

  robots: {
    index: true,
    follow: true,
  },

  twitter: {
    card: "summary_large_image",
    site: "@MaiconLara",
    title: "Maicon Lara | Frontend & Fullstack Developer",
    description:
      "Mid-Level Fullstack Developer with 3+ years of experience, specialized in creating scalable and high-performance applications.",
    images: ["/og-image.webp"],
  },

  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },

  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">
        <Script
          id="schema-person"
          type="application/ld+json"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Maicon Lara",
              url: "https://maiconlara.com.br/",
              jobTitle: "Frontend & Fullstack Developer",
              sameAs: [
                "https://github.com/maiconlara",
                "https://www.linkedin.com/in/maiconlara",
              ],
            }),
          }}
        />
        <Providers>
          <TooltipProvider>
            <div className="min-h-screen">
              <Header />
              <main className="pt-16">{children}</main>
            </div>
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}
