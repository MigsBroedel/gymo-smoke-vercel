import { derived, writable } from "svelte/store";
import translations from "./translations";

export const locale = writable("en");
export const locales = Object.keys(translations);

interface TranslationVars {
  [key: string]: string | number;
}

interface Translations {
  [locale: string]: {
    [key: string]: string;
  };
}

function translate(
  locale: string,
  key: string,
  vars: TranslationVars = {},
): string {
  // Let's throw some errors if we're trying to use keys/locales that don't exist.
  // We could improve this by using Typescript and/or fallback values.
  if (!key) throw new Error("no key provided to $t()");
  if (!locale) throw new Error(`no translation for key "${key}"`);

  // Grab the translation from the translations object.
  let text = (translations as Translations)[locale][key];

  if (!text) throw new Error(`no translation found for ${locale}.${key}`);

  // Replace any passed in variables in the translation string.
  Object.keys(vars).map((k) => {
    const regex = new RegExp(`{{${k}}}`, "g");
    text = text.replace(regex, String(vars[k]));
  });

  return text;
}

interface TranslateFunction {
  (key: string, vars?: TranslationVars): string;
}

export const t = derived<typeof locale, TranslateFunction>(
  locale,
  ($locale): TranslateFunction =>
    (key: string, vars: TranslationVars = {}) =>
      translate($locale, key, vars),
);
