export const languages = {
  en: { 
    name: 'English', 
    flag: '🇺🇸',
    code: 'en',
    dir: 'ltr'
  },
  de: { 
    name: 'Deutsch', 
    flag: '🇩🇪',
    code: 'de',
    dir: 'ltr'
  },
  fr: { 
    name: 'Français', 
    flag: '🇫🇷',
    code: 'fr',
    dir: 'ltr'
  },
  es: { 
    name: 'Español', 
    flag: '🇪🇸',
    code: 'es',
    dir: 'ltr'
  },
  it: { 
    name: 'Italiano', 
    flag: '🇮🇹',
    code: 'it',
    dir: 'ltr'
  },
  pt: { 
    name: 'Português', 
    flag: '🇵🇹',
    code: 'pt',
    dir: 'ltr'
  }
} as const;

export type Language = keyof typeof languages;

export const defaultLang: Language = 'en';

export const i18nConfig = {
  defaultLocale: defaultLang,
  locales: Object.keys(languages) as Language[],
  routing: {
    prefixDefaultLocale: false,
    strategy: 'pathname' as const
  },
  fallback: {
    de: 'en',
    fr: 'en',
    es: 'en',
    it: 'en',
    pt: 'en'
  } as Record<Language, Language>
};

// Business-specific terminology adaptations
export const businessTerms = {
  'app-marketing': {
    en: {
      cta: 'Download Now',
      trial: 'Start Free Trial',
      features: 'Features',
      pricing: 'Pricing',
      testimonials: 'User Reviews'
    },
    de: {
      cta: 'Jetzt herunterladen',
      trial: 'Kostenlos testen',
      features: 'Funktionen',
      pricing: 'Preise',
      testimonials: 'Nutzerbewertungen'
    },
    fr: {
      cta: 'Télécharger maintenant',
      trial: 'Essai gratuit',
      features: 'Fonctionnalités',
      pricing: 'Tarifs',
      testimonials: 'Avis utilisateurs'
    },
    es: {
      cta: 'Descargar ahora',
      trial: 'Prueba gratuita',
      features: 'Características',
      pricing: 'Precios',
      testimonials: 'Reseñas de usuarios'
    },
    it: {
      cta: 'Scarica ora',
      trial: 'Prova gratuita',
      features: 'Funzionalità',
      pricing: 'Prezzi',
      testimonials: 'Recensioni utenti'
    },
    pt: {
      cta: 'Baixar agora',
      trial: 'Teste grátis',
      features: 'Recursos',
      pricing: 'Preços',
      testimonials: 'Avaliações de usuários'
    }
  },
  'consulting': {
    en: {
      cta: 'Schedule Consultation',
      trial: 'Book Discovery Call',
      features: 'Services',
      pricing: 'Engagement Models',
      testimonials: 'Client Success Stories'
    },
    de: {
      cta: 'Beratung vereinbaren',
      trial: 'Erstgespräch buchen',
      features: 'Leistungen',
      pricing: 'Zusammenarbeitsmodelle',
      testimonials: 'Kundenerfolge'
    },
    fr: {
      cta: 'Planifier une consultation',
      trial: 'Réserver un appel découverte',
      features: 'Services',
      pricing: 'Modèles d\'engagement',
      testimonials: 'Témoignages clients'
    },
    es: {
      cta: 'Programar consulta',
      trial: 'Reservar llamada inicial',
      features: 'Servicios',
      pricing: 'Modelos de colaboración',
      testimonials: 'Casos de éxito'
    },
    it: {
      cta: 'Prenota consulenza',
      trial: 'Prenota chiamata conoscitiva',
      features: 'Servizi',
      pricing: 'Modelli di collaborazione',
      testimonials: 'Storie di successo'
    },
    pt: {
      cta: 'Agendar consulta',
      trial: 'Agendar chamada inicial',
      features: 'Serviços',
      pricing: 'Modelos de engajamento',
      testimonials: 'Casos de sucesso'
    }
  }
};