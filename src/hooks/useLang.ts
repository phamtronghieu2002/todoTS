import { useContext } from "react";
import { i18nContext, I18nContextType } from "../providers/I18nProvider"; // Import the missing type
export default function useLang() {
  const { i18n, t } = useContext(i18nContext) as I18nContextType;

  return { i18n, t };
}
