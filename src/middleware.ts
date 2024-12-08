import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextRequest, NextResponse } from "next/server";
import { DEFAULT_LOCALE } from "./lib";

const locales = ["en", "fr"];

function getLocale(request: NextRequest) {
  const acceptedLanguage = request.headers.get("accept-language") ?? undefined;
  const headers = { "accept-language": acceptedLanguage };
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, DEFAULT_LOCALE);
}

export function middleware(request: NextRequest) {
  const locale = getLocale(request);
  const response = NextResponse.next();
  response.cookies.set("dxh_locale", locale);
  return response;
}

export const config = {
  matcher: ["/((?!_next).*)"],
};
