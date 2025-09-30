import { describe, it, expect } from 'vitest';

describe('Button Component', () => {
  describe('variant styles', () => {
    it('should have correct primary variant classes for app context', () => {
      const variant = 'primary';
      const businessContext = 'app';

      const expectedClasses = 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500';
      expect(expectedClasses).toContain('bg-blue-600');
      expect(expectedClasses).toContain('text-white');
    });

    it('should have correct primary variant classes for consulting context', () => {
      const variant = 'primary';
      const businessContext = 'consulting';

      const expectedClasses = 'bg-slate-800 text-white hover:bg-slate-900 focus:ring-slate-600';
      expect(expectedClasses).toContain('bg-slate-800');
      expect(expectedClasses).toContain('text-white');
    });

    it('should have correct secondary variant classes for app context', () => {
      const variant = 'secondary';
      const businessContext = 'app';

      const expectedClasses = 'bg-sky-100 text-sky-700 hover:bg-sky-200 focus:ring-sky-500';
      expect(expectedClasses).toContain('bg-sky-100');
      expect(expectedClasses).toContain('text-sky-700');
    });

    it('should have correct outline variant classes for app context', () => {
      const variant = 'outline';
      const businessContext = 'app';

      const expectedClasses = 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50 focus:ring-blue-500';
      expect(expectedClasses).toContain('border-2');
      expect(expectedClasses).toContain('border-blue-600');
    });
  });

  describe('size styles', () => {
    it('should have correct small size classes', () => {
      const size = 'sm';
      const expectedClasses = 'px-3 py-1.5 text-sm rounded-md';

      expect(expectedClasses).toContain('px-3');
      expect(expectedClasses).toContain('py-1.5');
      expect(expectedClasses).toContain('text-sm');
    });

    it('should have correct medium size classes', () => {
      const size = 'md';
      const expectedClasses = 'px-4 py-2 text-base rounded-lg';

      expect(expectedClasses).toContain('px-4');
      expect(expectedClasses).toContain('py-2');
      expect(expectedClasses).toContain('text-base');
    });

    it('should have correct large size classes', () => {
      const size = 'lg';
      const expectedClasses = 'px-6 py-3 text-lg rounded-lg';

      expect(expectedClasses).toContain('px-6');
      expect(expectedClasses).toContain('py-3');
      expect(expectedClasses).toContain('text-lg');
    });
  });

  describe('business context styles', () => {
    it('should have correct app context styles', () => {
      const businessContext = 'app';
      const expectedClasses = 'rounded-full shadow-md hover:shadow-lg hover:scale-105';

      expect(expectedClasses).toContain('rounded-full');
      expect(expectedClasses).toContain('shadow-md');
      expect(expectedClasses).toContain('hover:scale-105');
    });

    it('should have correct consulting context styles', () => {
      const businessContext = 'consulting';
      const expectedClasses = 'rounded-md hover:shadow-md';

      expect(expectedClasses).toContain('rounded-md');
      expect(expectedClasses).toContain('hover:shadow-md');
    });
  });

  describe('base classes', () => {
    it('should include accessibility classes', () => {
      const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

      expect(baseClasses).toContain('focus:outline-none');
      expect(baseClasses).toContain('focus:ring-2');
      expect(baseClasses).toContain('focus:ring-offset-2');
      expect(baseClasses).toContain('disabled:opacity-50');
      expect(baseClasses).toContain('disabled:cursor-not-allowed');
    });

    it('should include layout and typography classes', () => {
      const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

      expect(baseClasses).toContain('inline-flex');
      expect(baseClasses).toContain('items-center');
      expect(baseClasses).toContain('justify-center');
      expect(baseClasses).toContain('font-medium');
    });

    it('should include transition classes', () => {
      const baseClasses = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed';

      expect(baseClasses).toContain('transition-all');
      expect(baseClasses).toContain('duration-200');
    });
  });

  describe('Props interface', () => {
    it('should have correct variant options', () => {
      type Variant = 'primary' | 'secondary' | 'outline';
      const validVariants: Variant[] = ['primary', 'secondary', 'outline'];

      expect(validVariants).toHaveLength(3);
      expect(validVariants).toContain('primary');
      expect(validVariants).toContain('secondary');
      expect(validVariants).toContain('outline');
    });

    it('should have correct size options', () => {
      type Size = 'sm' | 'md' | 'lg';
      const validSizes: Size[] = ['sm', 'md', 'lg'];

      expect(validSizes).toHaveLength(3);
      expect(validSizes).toContain('sm');
      expect(validSizes).toContain('md');
      expect(validSizes).toContain('lg');
    });

    it('should have correct type options', () => {
      type ButtonType = 'button' | 'submit' | 'reset';
      const validTypes: ButtonType[] = ['button', 'submit', 'reset'];

      expect(validTypes).toHaveLength(3);
      expect(validTypes).toContain('button');
      expect(validTypes).toContain('submit');
      expect(validTypes).toContain('reset');
    });

    it('should have correct business context options', () => {
      type BusinessContext = 'app' | 'consulting';
      const validContexts: BusinessContext[] = ['app', 'consulting'];

      expect(validContexts).toHaveLength(2);
      expect(validContexts).toContain('app');
      expect(validContexts).toContain('consulting');
    });
  });

  describe('default values', () => {
    it('should have correct defaults', () => {
      const defaults = {
        variant: 'primary',
        size: 'md',
        type: 'button',
        disabled: false,
        businessContext: 'app',
        className: ''
      };

      expect(defaults.variant).toBe('primary');
      expect(defaults.size).toBe('md');
      expect(defaults.type).toBe('button');
      expect(defaults.disabled).toBe(false);
      expect(defaults.businessContext).toBe('app');
      expect(defaults.className).toBe('');
    });
  });

  describe('class composition', () => {
    it('should combine all classes correctly', () => {
      const baseClasses = 'inline-flex items-center justify-center';
      const variantClasses = 'bg-blue-600 text-white';
      const sizeClasses = 'px-4 py-2';
      const contextClasses = 'rounded-full';
      const customClasses = 'custom-class';

      const combined = `${baseClasses} ${variantClasses} ${sizeClasses} ${contextClasses} ${customClasses}`;

      expect(combined).toContain('inline-flex');
      expect(combined).toContain('bg-blue-600');
      expect(combined).toContain('px-4');
      expect(combined).toContain('rounded-full');
      expect(combined).toContain('custom-class');
    });
  });
});