import { MetadataRoute } from "next";
import { defaultLocale, locales } from "@/i18n/config";

const SITE_URL = "https://maiconlara.com.br";

interface RouteConfig {
  path: string;
  priority: number;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
}

const routes: RouteConfig[] = [
  { path: "", priority: 1, changeFrequency: "weekly" },
  { path: "/projects", priority: 0.8, changeFrequency: "weekly" },
  { path: "/about", priority: 0.7, changeFrequency: "monthly" },
  { path: "/about/stack", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact", priority: 0.7, changeFrequency: "monthly" },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.flatMap((route) => {
    const languages = Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${route.path}`])
    );
    languages["x-default"] = `${SITE_URL}/${defaultLocale}${route.path}`;

    return locales.map((locale) => ({
      url: `${SITE_URL}/${locale}${route.path}`,
      lastModified: now,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
      alternates: { languages },
    }));
  });
}
