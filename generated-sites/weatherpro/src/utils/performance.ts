export interface PerformanceConfig {
  enableMetrics: boolean;
  thresholds: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
    fcp: number; // First Contentful Paint
    ttfb: number; // Time to First Byte
  };
}

export const defaultThresholds: PerformanceConfig['thresholds'] = {
  lcp: 2500, // 2.5s
  fid: 100,  // 100ms
  cls: 0.1,  // 0.1
  fcp: 1800, // 1.8s
  ttfb: 600  // 600ms
};

export interface PerformanceMetric {
  name: string;
  value: number;
  threshold: number;
  passed: boolean;
  timestamp: number;
}

class PerformanceMonitor {
  private config: PerformanceConfig;
  private metrics: PerformanceMetric[] = [];
  private observer?: PerformanceObserver;

  constructor(config: PerformanceConfig) {
    this.config = config;
    this.initializeMonitoring();
  }

  private initializeMonitoring(): void {
    if (!this.config.enableMetrics || typeof window === 'undefined') {
      return;
    }

    // Web Vitals monitoring
    this.observeWebVitals();
    
    // Navigation timing
    this.measureNavigationTiming();
    
    // Resource loading
    this.observeResourceTiming();
  }

  private observeWebVitals(): void {
    // LCP (Largest Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      this.recordMetric('lcp', lastEntry.startTime, this.config.thresholds.lcp);
    }).observe({ type: 'largest-contentful-paint', buffered: true });

    // FID (First Input Delay)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        this.recordMetric('fid', entry.processingStart - entry.startTime, this.config.thresholds.fid);
      });
    }).observe({ type: 'first-input', buffered: true });

    // CLS (Cumulative Layout Shift)
    let clsValue = 0;
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: any) => {
        if (!entry.hadRecentInput) {
          clsValue += entry.value;
        }
      });
      this.recordMetric('cls', clsValue, this.config.thresholds.cls);
    }).observe({ type: 'layout-shift', buffered: true });

    // FCP (First Contentful Paint)
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry) => {
        if (entry.name === 'first-contentful-paint') {
          this.recordMetric('fcp', entry.startTime, this.config.thresholds.fcp);
        }
      });
    }).observe({ type: 'paint', buffered: true });
  }

  private measureNavigationTiming(): void {
    if (typeof window === 'undefined') return;

    const timing = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    if (timing) {
      // TTFB (Time to First Byte)
      const ttfb = timing.responseStart - timing.requestStart;
      this.recordMetric('ttfb', ttfb, this.config.thresholds.ttfb);

      // DOM Load Time
      const domLoadTime = timing.domContentLoadedEventEnd - timing.domContentLoadedEventStart;
      this.recordMetric('dom_load_time', domLoadTime, 1000);

      // Total Load Time
      const totalLoadTime = timing.loadEventEnd - timing.navigationStart;
      this.recordMetric('total_load_time', totalLoadTime, 3000);
    }
  }

  private observeResourceTiming(): void {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach((entry: PerformanceResourceTiming) => {
        const duration = entry.responseEnd - entry.requestStart;
        
        // Track slow resources
        if (duration > 1000) { // > 1s
          this.recordMetric(`slow_resource_${entry.initiatorType}`, duration, 1000);
        }
      });
    }).observe({ type: 'resource', buffered: true });
  }

  private recordMetric(name: string, value: number, threshold: number): void {
    const metric: PerformanceMetric = {
      name,
      value: Math.round(value * 100) / 100, // Round to 2 decimals
      threshold,
      passed: value <= threshold,
      timestamp: Date.now()
    };

    this.metrics.push(metric);

    // Send to analytics if available
    if (typeof window !== 'undefined' && (window as any).analytics) {
      (window as any).analytics.trackPerformanceMetric(name, value);
    }

    console.log(`Performance metric: ${name} = ${metric.value}${name === 'cls' ? '' : 'ms'} (threshold: ${threshold}${name === 'cls' ? '' : 'ms'}) - ${metric.passed ? '✅' : '❌'}`);
  }

  getMetrics(): PerformanceMetric[] {
    return [...this.metrics];
  }

  getFailedMetrics(): PerformanceMetric[] {
    return this.metrics.filter(metric => !metric.passed);
  }

  getLighthouseScore(): number {
    const coreMetrics = this.metrics.filter(m => 
      ['lcp', 'fid', 'cls', 'fcp', 'ttfb'].includes(m.name)
    );

    if (coreMetrics.length === 0) return 0;

    const passedCount = coreMetrics.filter(m => m.passed).length;
    return Math.round((passedCount / coreMetrics.length) * 100);
  }

  generateReport(): string {
    const score = this.getLighthouseScore();
    const failed = this.getFailedMetrics();

    let report = `Performance Report - Score: ${score}/100\n`;
    report += `=====================================\n\n`;

    if (failed.length === 0) {
      report += '✅ All performance metrics passed!\n';
    } else {
      report += '❌ Failed Metrics:\n';
      failed.forEach(metric => {
        report += `  - ${metric.name}: ${metric.value}ms (threshold: ${metric.threshold}ms)\n`;
      });
    }

    report += '\n📊 All Metrics:\n';
    this.metrics.forEach(metric => {
      const status = metric.passed ? '✅' : '❌';
      report += `  ${status} ${metric.name}: ${metric.value}${metric.name === 'cls' ? '' : 'ms'}\n`;
    });

    return report;
  }
}

let monitor: PerformanceMonitor | null = null;

export const initPerformanceMonitoring = (config: PerformanceConfig = { 
  enableMetrics: true, 
  thresholds: defaultThresholds 
}): void => {
  monitor = new PerformanceMonitor(config);
};

export const getPerformanceMonitor = (): PerformanceMonitor | null => monitor;

export const measurePageLoad = async (): Promise<PerformanceMetric[]> => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') {
      resolve([]);
      return;
    }

    // Wait for load event
    if (document.readyState === 'complete') {
      resolve(monitor?.getMetrics() || []);
    } else {
      window.addEventListener('load', () => {
        // Give a little time for all metrics to be collected
        setTimeout(() => {
          resolve(monitor?.getMetrics() || []);
        }, 1000);
      });
    }
  });
};

// Image optimization utility
export const optimizeImages = (): void => {
  if (typeof window === 'undefined') return;

  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.dataset.src;
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Resource hints utility
export const addResourceHints = (resources: Array<{ href: string; as?: string; type?: string }>): void => {
  if (typeof document === 'undefined') return;

  resources.forEach(resource => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = resource.href;
    if (resource.as) link.setAttribute('as', resource.as);
    if (resource.type) link.setAttribute('type', resource.type);
    document.head.appendChild(link);
  });
};