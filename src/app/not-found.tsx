import Link from "next/link";
import { RiHomeLine } from "@remixicon/react";
import { defaultLocale } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

import "./globals.css";

export default async function GlobalNotFound() {
  const dict = await getDictionary(defaultLocale);

  return (
    <html lang={defaultLocale}>
      <body className="font-sans antialiased">
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="text-center px-4">
            <h1 className="text-8xl font-bold text-gradient mb-4">404</h1>
            <h2 className="text-2xl font-semibold mb-2">
              {dict.notFound.title}
            </h2>
            <p className="text-muted-foreground mb-8">
              {dict.notFound.description}
            </p>
            <Link
              href={`/${defaultLocale}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              <RiHomeLine className="w-4 h-4" />
              {dict.notFound.backHome}
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
