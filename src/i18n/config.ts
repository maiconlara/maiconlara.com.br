export const locales = ["pt-BR", "en-US", "es-ES"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "pt-BR";

export const localeNames: Record<Locale, string> = {
  "pt-BR": "Português",
  "en-US": "English",
  "es-ES": "Español",
};

export const localeOpenGraph: Record<Locale, string> = {
  "pt-BR": "pt_BR",
  "en-US": "en_US",
  "es-ES": "es_ES",
};

export const localeCountryCode: Record<Locale, string> = {
  "pt-BR": "BR",
  "en-US": "US",
  "es-ES": "ES",
};

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
