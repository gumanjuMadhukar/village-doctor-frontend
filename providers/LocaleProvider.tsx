import React, { createContext, useContext, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { DEFAULT_LANGUAGE, SUPPORTED_LANGUAGES, SupportedLanguage } from '../configs/i18n';

interface LocaleProviderProps {
  children: React.ReactNode;
}

interface LocaleContextProps {
  changeLanguage: (lang: SupportedLanguage) => void;
  language: SupportedLanguage;
}

const LOCALE_LOCAL_STORAGE_KEY = 'locale';

export const LocaleContext: React.Context<LocaleContextProps> = createContext({
  changeLanguage: (_lang: SupportedLanguage) => {
    return;
  },
  language: DEFAULT_LANGUAGE
});

export function LocaleProvider(props: LocaleProviderProps) {
  const { children } = props;
  const { i18n } = useTranslation();
  const language = useMemo<SupportedLanguage>(() => {
    return i18n.language as SupportedLanguage;
  }, [i18n.language]);

  useEffect(() => {
    const localStorageValue = localStorage.getItem(LOCALE_LOCAL_STORAGE_KEY);
    if (localStorageValue && SUPPORTED_LANGUAGES.find(l => l === localStorageValue)) {
      void i18n.changeLanguage(localStorageValue);
    }
  }, [i18n]);

  const changeLanguage = (lang: string) => {
    void i18n.changeLanguage(lang);
    localStorage.setItem(LOCALE_LOCAL_STORAGE_KEY, lang);
  };

  return <LocaleContext.Provider value={{ changeLanguage, language }}>{children}</LocaleContext.Provider>;
}

export const useLocale = () => useContext(LocaleContext);
