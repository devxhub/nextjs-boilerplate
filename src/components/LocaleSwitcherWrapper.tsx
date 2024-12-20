"use client";
import dynamic from "next/dynamic";

const LocaleSwitcher = dynamic(() => import("@/components/LocaleSwitcher"), { ssr: false });

export default function LocaleSwitcherWrapper() {
  return <LocaleSwitcher />;
}
