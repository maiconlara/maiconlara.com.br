import "server-only";
import { cache } from "react";
import type { Locale } from "./config";

export type Dictionary = typeof import("./dictionaries/pt-BR.json");

const loaders: Record<Locale, () => Promise<Dictionary>> = {
  "pt-BR": () =>
    import("./dictionaries/pt-BR.json").then((m) => m.default as Dictionary),
  "en-US": () =>
    import("./dictionaries/en-US.json").then((m) => m.default as Dictionary),
  "es-ES": () =>
    import("./dictionaries/es-ES.json").then((m) => m.default as Dictionary),
};

export const getDictionary = cache(
  async (locale: Locale): Promise<Dictionary> => loaders[locale]()
);
