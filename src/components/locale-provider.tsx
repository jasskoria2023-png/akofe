"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import type { Locale } from "@/lib/copy";

type LocaleContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  children,
  initialLocale,
}: {
  children: ReactNode;
  initialLocale: Locale;
}) {
  const [locale, setLocaleState] = useState(initialLocale);

  function setLocale(nextLocale: Locale) {
    setLocaleState(nextLocale);
    document.cookie = `akofe-locale=${nextLocale}; Path=/; Max-Age=31536000; SameSite=Lax`;
  }

  return (
    <LocaleContext.Provider value={{ locale, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (!context) {
    throw new Error("useLocale must be used within LocaleProvider");
  }
  return context;
}
