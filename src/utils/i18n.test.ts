import { describe, it, expect, beforeEach } from 'vitest';
import {
  getLangFromUrl,
  useTranslations,
  getLocalizedPath,
  getAlternateLanguageLinks,
  formatDate,
  formatNumber,
  formatCurrency
} from './i18n';
import { defaultLang } from '../config/i18n';

describe('i18n utilities', () => {
  describe('getLangFromUrl', () => {
    it('should return default language for root path', () => {
      const url = new URL('http://localhost:4321/');
      expect(getLangFromUrl(url)).toBe(defaultLang);
    });

    it('should extract language from URL path', () => {
      const url = new URL('http://localhost:4321/de/about');
      expect(getLangFromUrl(url)).toBe('de');
    });

    it('should return default language for non-language path', () => {
      const url = new URL('http://localhost:4321/about');
      expect(getLangFromUrl(url)).toBe(defaultLang);
    });

    it('should handle all supported languages', () => {
      const languages = ['en', 'de', 'fr', 'es', 'it', 'pt'];
      languages.forEach(lang => {
        const url = new URL(`http://localhost:4321/${lang}/`);
        expect(getLangFromUrl(url)).toBe(lang);
      });
    });
  });

  describe('useTranslations', () => {
    it('should return translation function', () => {
      const t = useTranslations('en');
      expect(typeof t).toBe('function');
    });

    it('should translate simple keys', () => {
      const t = useTranslations('en');
      const result = t('nav.home');
      expect(result).toBe('Home');
    });

    it('should translate nested keys', () => {
      const t = useTranslations('en');
      const result = t('nav.about');
      expect(result).toBe('About');
    });

    it('should handle parameters in translations', () => {
      const t = useTranslations('en');
      const result = t('meta.description', { appName: 'TestApp' });
      expect(result).toContain('TestApp');
    });

    it('should return key if translation not found', () => {
      const t = useTranslations('en');
      const result = t('nonexistent.key');
      expect(result).toBe('nonexistent.key');
    });

    it('should fallback to default language', () => {
      const t = useTranslations('de');
      // Since de.json might not have all translations, it should fall back
      const result = t('nav.home');
      expect(typeof result).toBe('string');
    });
  });

  describe('getLocalizedPath', () => {
    it('should return unchanged path for default language', () => {
      const path = '/about';
      const result = getLocalizedPath(path, defaultLang);
      expect(result).toBe('/about');
    });

    it('should add language prefix for non-default languages', () => {
      const path = '/about';
      const result = getLocalizedPath(path, 'de');
      expect(result).toBe('/de/about');
    });

    it('should handle root path', () => {
      const path = '/';
      const result = getLocalizedPath(path, 'fr');
      expect(result).toBe('/fr/');
    });

    it('should remove existing language prefix before adding new one', () => {
      const path = '/de/about';
      const result = getLocalizedPath(path, 'fr');
      expect(result).toBe('/fr/about');
    });
  });

  describe('getAlternateLanguageLinks', () => {
    it('should return array of language links', () => {
      const result = getAlternateLanguageLinks('/about');
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(6); // 6 languages
    });

    it('should include lang, url, and label for each language', () => {
      const result = getAlternateLanguageLinks('/about');
      result.forEach(link => {
        expect(link).toHaveProperty('lang');
        expect(link).toHaveProperty('url');
        expect(link).toHaveProperty('label');
      });
    });

    it('should generate correct URLs for each language', () => {
      const result = getAlternateLanguageLinks('/about');
      const deLink = result.find(l => l.lang === 'de');
      expect(deLink?.url).toBe('/de/about');

      const enLink = result.find(l => l.lang === 'en');
      expect(enLink?.url).toBe('/about'); // Default language has no prefix
    });
  });

  describe('formatDate', () => {
    it('should format date according to locale', () => {
      const date = new Date('2025-09-30');
      const resultEn = formatDate(date, 'en');
      const resultDe = formatDate(date, 'de');

      expect(typeof resultEn).toBe('string');
      expect(typeof resultDe).toBe('string');
      expect(resultEn).not.toBe(resultDe);
    });

    it('should handle all supported languages', () => {
      const date = new Date('2025-09-30');
      const languages = ['en', 'de', 'fr', 'es', 'it', 'pt'] as const;

      languages.forEach(lang => {
        const result = formatDate(date, lang);
        expect(typeof result).toBe('string');
        expect(result.length).toBeGreaterThan(0);
      });
    });
  });

  describe('formatNumber', () => {
    it('should format numbers according to locale', () => {
      const num = 1234567.89;
      const resultEn = formatNumber(num, 'en');
      const resultDe = formatNumber(num, 'de');

      expect(typeof resultEn).toBe('string');
      expect(typeof resultDe).toBe('string');
      // German uses different separators than English
      expect(resultEn).not.toBe(resultDe);
    });

    it('should handle integers', () => {
      const num = 1000;
      const result = formatNumber(num, 'en');
      expect(result).toContain('1');
      expect(result).toContain('000');
    });
  });

  describe('formatCurrency', () => {
    it('should format currency according to locale', () => {
      const amount = 1234.56;
      const resultEn = formatCurrency(amount, 'en', 'USD');
      const resultDe = formatCurrency(amount, 'de', 'EUR');

      expect(typeof resultEn).toBe('string');
      expect(typeof resultDe).toBe('string');
    });

    it('should include currency symbol', () => {
      const amount = 100;
      const result = formatCurrency(amount, 'en', 'USD');
      expect(result).toMatch(/\$|USD/);
    });

    it('should handle different currencies', () => {
      const amount = 100;
      const usd = formatCurrency(amount, 'en', 'USD');
      const eur = formatCurrency(amount, 'en', 'EUR');

      expect(usd).not.toBe(eur);
    });
  });
});