"use client";

import { useEffect, useState } from "react";
import Cookies from "js-cookie";

interface LanguageChangerProps {
  className?: string;
  currentLocale?: string;
}

export function LanguageChanger({
  className,
  currentLocale = "id",
}: LanguageChangerProps) {
  const [locale, setLocale] = useState(currentLocale);

  const languages = [
    { code: "id", flag: "🇮🇩", name: "ID" },
    { code: "en", flag: "🇺🇸", name: "EN" },
  ];

  const handleLanguageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newLocale = event.target.value;
    setLocale(newLocale);
    Cookies.set("locale", newLocale);
    window.location.reload();
  };

  return (
    <div className={className}>
      <label htmlFor="language-select" className="sr-only">
        Select language
      </label>
      <select
        id="language-select"
        value={locale}
        onChange={handleLanguageChange}
        className="bg-transparent border border-border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent cursor-pointer appearance-none relative"
        aria-label="Select language"
      >
        {languages.map((language) => (
          <option key={language.code} value={language.code}>
            {language.flag} {language.name}
          </option>
        ))}
      </select>
    </div>
  );
}
