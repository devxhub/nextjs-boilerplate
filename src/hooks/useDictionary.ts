import en from "@/dictionaries/en.json";
import fr from "@/dictionaries/fr.json";
import { COOKIE_LOCALE, DEFAULT_LOCALE } from "@/lib";
import { Locale } from "@/types";
import { getCookie } from "cookies-next/client";

const dictionaries = { en, fr };

function useDictionary() {
  const locale = getCookie(COOKIE_LOCALE) || DEFAULT_LOCALE;

  if (!dictionaries[locale as Locale]) {
    throw new Error(`Unsupported locale: ${locale}`);
  }

  return dictionaries[locale as Locale];
}

export { useDictionary };
