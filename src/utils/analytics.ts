export interface AnalyticsConfig {
  enabled: boolean;
  businessType: 'app-marketing' | 'consulting';
  debug?: boolean;
}

export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  businessContext?: string;
  timestamp?: number;
}

class Analytics {
  private config: AnalyticsConfig;
  private events: AnalyticsEvent[] = [];

  constructor(config: AnalyticsConfig) {
    this.config = config;
  }

  // Cookieless event tracking
  track(event: AnalyticsEvent): void {
    if (!this.config.enabled) return;

    const enrichedEvent: AnalyticsEvent = {
      ...event,
      timestamp: Date.now(),
      businessContext: this.config.businessType
    };

    // Store locally for batch sending
    this.events.push(enrichedEvent);

    if (this.config.debug) {
      console.log('Analytics Event:', enrichedEvent);
    }

    // Send immediately for critical events
    if (this.isCriticalEvent(event.event)) {
      this.flush();
    }
  }

  // Business-specific event tracking
  trackAppDownload(platform: 'ios' | 'android' | 'web', source?: string): void {
    this.track({
      event: 'app_download_click',
      category: 'engagement',
      label: platform,
      value: 1,
      businessContext: `download_${platform}_${source || 'unknown'}`
    });
  }

  trackConsultationRequest(formType: 'simple' | 'detailed' | 'lead-qualification'): void {
    this.track({
      event: 'consultation_request',
      category: 'conversion',
      label: formType,
      value: 1,
      businessContext: `consultation_${formType}`
    });
  }

  trackFeatureEngagement(featureId: string): void {
    this.track({
      event: 'feature_click',
      category: 'engagement',
      label: featureId,
      value: 1
    });
  }

  trackPricingView(tier: string): void {
    this.track({
      event: 'pricing_tier_view',
      category: 'interest',
      label: tier,
      value: 1
    });
  }

  trackLanguageSwitch(fromLang: string, toLang: string): void {
    this.track({
      event: 'language_switch',
      category: 'i18n',
      label: `${fromLang}_to_${toLang}`,
      value: 1
    });
  }

  trackPageView(path: string, title?: string): void {
    this.track({
      event: 'page_view',
      category: 'navigation',
      label: path,
      businessContext: `page_${this.config.businessType}`
    });
  }

  trackPerformanceMetric(metric: string, value: number): void {
    this.track({
      event: 'performance_metric',
      category: 'performance',
      label: metric,
      value: Math.round(value)
    });
  }

  // Batch send events to analytics endpoint
  async flush(): Promise<void> {
    if (this.events.length === 0) return;

    const payload = {
      events: this.events.splice(0),
      sessionId: this.getSessionId(),
      userAgent: navigator?.userAgent,
      viewport: {
        width: window?.innerWidth,
        height: window?.innerHeight
      },
      businessType: this.config.businessType
    };

    try {
      // Send to cookieless analytics endpoint
      await fetch('/api/analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
    } catch (error) {
      if (this.config.debug) {
        console.error('Analytics send failed:', error);
      }
      // Re-queue events for retry
      this.events.unshift(...payload.events);
    }
  }

  private isCriticalEvent(eventName: string): boolean {
    const criticalEvents = [
      'app_download_click',
      'consultation_request',
      'form_submission',
      'purchase_intent'
    ];
    return criticalEvents.includes(eventName);
  }

  private getSessionId(): string {
    // Generate cookieless session ID based on timestamp and random
    const sessionKey = 'analytics_session_id';
    let sessionId = sessionStorage?.getItem(sessionKey);
    
    if (!sessionId) {
      sessionId = `${Date.now()}_${Math.random().toString(36).substring(2)}`;
      sessionStorage?.setItem(sessionKey, sessionId);
    }
    
    return sessionId;
  }
}

// Global analytics instance
let analytics: Analytics | null = null;

export const initAnalytics = (config: AnalyticsConfig): void => {
  analytics = new Analytics(config);
  
  // Auto-track page views
  if (typeof window !== 'undefined') {
    analytics.trackPageView(window.location.pathname, document.title);
    
    // Track performance metrics
    if ('performance' in window) {
      const perfData = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      if (perfData) {
        analytics.trackPerformanceMetric('load_time', perfData.loadEventEnd - perfData.loadEventStart);
        analytics.trackPerformanceMetric('dom_content_loaded', perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart);
      }
    }
    
    // Flush events before page unload
    window.addEventListener('beforeunload', () => {
      analytics?.flush();
    });
  }
};

export const getAnalytics = (): Analytics | null => analytics;

// Convenience functions
export const track = (event: AnalyticsEvent): void => {
  analytics?.track(event);
};

export const trackAppDownload = (platform: 'ios' | 'android' | 'web', source?: string): void => {
  analytics?.trackAppDownload(platform, source);
};

export const trackConsultationRequest = (formType: 'simple' | 'detailed' | 'lead-qualification'): void => {
  analytics?.trackConsultationRequest(formType);
};

export const trackFeatureEngagement = (featureId: string): void => {
  analytics?.trackFeatureEngagement(featureId);
};

export const trackPricingView = (tier: string): void => {
  analytics?.trackPricingView(tier);
};

export const trackLanguageSwitch = (fromLang: string, toLang: string): void => {
  analytics?.trackLanguageSwitch(fromLang, toLang);
};