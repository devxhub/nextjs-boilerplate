"use client";
import { getLang, setLang } from "@/actions";
import { useEffect, useState } from "react";

export default function LocaleSwitcher() {
  const [locale, setLocale] = useState("");

  useEffect(() => {
    const fetchLocale = async () => {
      const locale = await getLang();
      setLocale(locale);
    };
    fetchLocale();
  }, []);

  const handleChange = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const newLocale = event.target.value;
    await setLang(newLocale);
    setLocale(newLocale);
  };

  return (
    <div className="mt-5">
      <label htmlFor="language-select" className="mr-2">
        Select Language:
      </label>
      <select id="language-select" value={locale} onChange={handleChange}>
        <option value="en">English</option>
        <option value="fr">French</option>
      </select>
    </div>
  );
}
