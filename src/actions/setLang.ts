"use server";

import { COOKIE_LOCALE } from "@/lib";
import { cookies } from "next/headers";

async function setLang(locale: string) {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_LOCALE, locale);
}

export { setLang };
