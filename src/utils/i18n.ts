import { defaultLang, languages, type Language } from '../config/i18n';
import enTranslations from '../content/i18n/en.json';
import deTranslations from '../content/i18n/de.json';

// Import all translation files
const translations: Record<Language, typeof enTranslations> = {
  en: enTranslations,
  de: deTranslations,
  // For now, fallback to English for other languages
  fr: enTranslations,
  es: enTranslations,
  it: enTranslations,
  pt: enTranslations
};

export function getLangFromUrl(url: URL): Language {
  const [, lang] = url.pathname.split('/');
  if (lang in languages) return lang as Language;
  return defaultLang;
}

export function useTranslations(lang: Language) {
  return function t(key: string, params: Record<string, string> = {}): string {
    const keys = key.split('.');
    let value: any = translations[lang] || translations[defaultLang];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        // Fallback to default language
        value = translations[defaultLang];
        for (const fallbackKey of keys) {
          if (value && typeof value === 'object') {
            value = value[fallbackKey];
          }
        }
        break;
      }
    }
    
    // Replace parameters
    if (typeof value === 'string') {
      return value.replace(/\{\{(\w+)\}\}/g, (match, param) => {
        return params[param] || match;
      });
    }
    
    return key; // Return key if translation not found
  };
}

export function getLocalizedPath(path: string, lang: Language): string {
  const isDefaultLang = lang === defaultLang;
  
  // Remove existing language prefix if present
  const cleanPath = path.replace(/^\/[a-z]{2}\//, '/');
  
  // Add language prefix for non-default languages
  if (!isDefaultLang) {
    return `/${lang}${cleanPath}`;
  }
  
  return cleanPath;
}

export function getAlternateLanguageLinks(currentPath: string): Array<{
  lang: Language;
  url: string;
  label: string;
}> {
  return Object.entries(languages).map(([lang, config]) => ({
    lang: lang as Language,
    url: getLocalizedPath(currentPath, lang as Language),
    label: config.name
  }));
}

// Get browser language preference
export function getBrowserLanguage(): Language {
  if (typeof window === 'undefined') return defaultLang;
  
  const browserLang = navigator.language.split('-')[0];
  if (browserLang in languages) {
    return browserLang as Language;
  }
  
  return defaultLang;
}

// Format date according to locale
export function formatDate(date: Date, lang: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
    pt: 'pt-PT'
  };
  
  return new Intl.DateTimeFormat(localeMap[lang], {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).format(date);
}

// Format number according to locale
export function formatNumber(num: number, lang: Language): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
    pt: 'pt-PT'
  };
  
  return new Intl.NumberFormat(localeMap[lang]).format(num);
}

// Format currency according to locale
export function formatCurrency(amount: number, lang: Language, currency: string = 'USD'): string {
  const localeMap: Record<Language, string> = {
    en: 'en-US',
    de: 'de-DE',
    fr: 'fr-FR',
    es: 'es-ES',
    it: 'it-IT',
    pt: 'pt-PT'
  };
  
  return new Intl.NumberFormat(localeMap[lang], {
    style: 'currency',
    currency: currency
  }).format(amount);
}