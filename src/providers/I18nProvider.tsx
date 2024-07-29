import { useTranslation } from "react-i18next";
import React, { createContext } from "react";

// Define the context type
export interface I18nContextType {
  i18n: any;
  t: any;
}

// Create the context
export const i18nContext = createContext<I18nContextType | null>(null);

// I18nProvider component
function I18nProvider({ children }: { children: React.ReactNode }) {
  const { i18n, t } = useTranslation();

  // Provide the i18n object to the context
  return (
    <i18nContext.Provider value={{ i18n, t }}>{children}</i18nContext.Provider>
  );
}

export default I18nProvider;
