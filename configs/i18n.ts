import i18n, { InitOptions } from 'i18next';
import { initReactI18next } from 'react-i18next';

import { en } from '../assets/i18n/en';
import { np } from '../assets/i18n/np';

export const DEFAULT_NS = 'general';

export type SupportedLanguage = 'np' | 'en';
export const SUPPORTED_LANGUAGES: SupportedLanguage[] = ['np', 'en'];
export const DEFAULT_LANGUAGE: SupportedLanguage = 'np';
export const i18nConfig: InitOptions = {
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  supportedLngs: SUPPORTED_LANGUAGES,
  defaultNS: DEFAULT_NS,
  resources: { np, en },
  ns: Object.keys(np),
  interpolation: {
    escapeValue: false
  },
  appendNamespaceToCIMode: true,
  pluralSeparator: '_'
};

void i18n.use(initReactI18next).init(i18nConfig);

export default i18n;
