import { getLang } from "@/actions";
import { Locale } from "@/types";

const dictionaries = {
  en: () => import("../dictionaries/en.json").then((module) => module.default),
  fr: () => import("../dictionaries/fr.json").then((module) => module.default),
};

async function getDictionary() {
  const locale = await getLang();

  if (!dictionaries[locale as Locale]) {
    throw new Error(`Unsupported locale: ${locale}.`);
  }
  return dictionaries[locale as Locale]();
}

export { getDictionary };
