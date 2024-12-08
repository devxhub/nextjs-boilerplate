"use server";

import { COOKIE_LOCALE, DEFAULT_LOCALE } from "@/lib";
import { cookies } from "next/headers";

async function getLang() {
  const cookieStore = await cookies();
  return cookieStore.get(COOKIE_LOCALE)?.value || DEFAULT_LOCALE;
}

export { getLang };
