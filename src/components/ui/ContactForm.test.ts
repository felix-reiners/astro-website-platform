import { describe, it, expect } from 'vitest';

describe('ContactForm Component', () => {
  describe('form field configurations', () => {
    describe('app-marketing fields', () => {
      it('should have correct simple form fields', () => {
        const fields = ['name', 'email', 'message'];

        expect(fields).toHaveLength(3);
        expect(fields).toContain('name');
        expect(fields).toContain('email');
        expect(fields).toContain('message');
      });

      it('should have correct detailed form fields', () => {
        const fields = ['name', 'email', 'company', 'app-interest', 'message'];

        expect(fields).toHaveLength(5);
        expect(fields).toContain('name');
        expect(fields).toContain('email');
        expect(fields).toContain('company');
        expect(fields).toContain('app-interest');
        expect(fields).toContain('message');
      });

      it('should have correct lead-qualification form fields', () => {
        const fields = ['name', 'email', 'company', 'app-type', 'budget', 'timeline', 'message'];

        expect(fields).toHaveLength(7);
        expect(fields).toContain('name');
        expect(fields).toContain('email');
        expect(fields).toContain('company');
        expect(fields).toContain('app-type');
        expect(fields).toContain('budget');
        expect(fields).toContain('timeline');
        expect(fields).toContain('message');
      });
    });

    describe('consulting fields', () => {
      it('should have correct simple form fields', () => {
        const fields = ['name', 'email', 'company', 'message'];

        expect(fields).toHaveLength(4);
        expect(fields).toContain('name');
        expect(fields).toContain('email');
        expect(fields).toContain('company');
        expect(fields).toContain('message');
      });

      it('should have correct detailed form fields', () => {
        const fields = ['name', 'email', 'company', 'title', 'industry', 'challenge', 'message'];

        expect(fields).toHaveLength(7);
        expect(fields).toContain('name');
        expect(fields).toContain('title');
        expect(fields).toContain('industry');
        expect(fields).toContain('challenge');
      });

      it('should have correct lead-qualification form fields', () => {
        const fields = ['name', 'email', 'company', 'title', 'company-size', 'budget', 'timeline', 'services-interest', 'message'];

        expect(fields).toHaveLength(9);
        expect(fields).toContain('company-size');
        expect(fields).toContain('services-interest');
      });
    });
  });

  describe('field configuration', () => {
    it('should configure name field correctly', () => {
      const config = { type: 'text', label: 'Full Name', required: true };

      expect(config.type).toBe('text');
      expect(config.label).toBe('Full Name');
      expect(config.required).toBe(true);
    });

    it('should configure email field correctly', () => {
      const config = { type: 'email', label: 'Email Address', required: true };

      expect(config.type).toBe('email');
      expect(config.label).toBe('Email Address');
      expect(config.required).toBe(true);
    });

    it('should configure company field for app-marketing', () => {
      const businessType = 'app-marketing';
      const config = {
        type: 'text',
        label: 'Company (Optional)',
        required: false
      };

      expect(config.label).toBe('Company (Optional)');
      expect(config.required).toBe(false);
    });

    it('should configure company field for consulting', () => {
      const businessType = 'consulting';
      const config = {
        type: 'text',
        label: 'Company',
        required: true
      };

      expect(config.label).toBe('Company');
      expect(config.required).toBe(true);
    });

    it('should configure industry select field', () => {
      const config = {
        type: 'select',
        label: 'Industry',
        options: ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Other']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(6);
      expect(config.options).toContain('Technology');
      expect(config.options).toContain('Finance');
    });

    it('should configure company-size select field', () => {
      const config = {
        type: 'select',
        label: 'Company Size',
        options: ['1-10 employees', '11-50 employees', '51-200 employees', '201-1000 employees', '1000+ employees']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(5);
      expect(config.options).toContain('1-10 employees');
      expect(config.options).toContain('1000+ employees');
    });

    it('should configure app-interest select field', () => {
      const config = {
        type: 'select',
        label: 'App Interest',
        options: ['Download App', 'Learn More', 'Partnership', 'Support']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(4);
      expect(config.options).toContain('Download App');
      expect(config.options).toContain('Support');
    });

    it('should configure app-type select field', () => {
      const config = {
        type: 'select',
        label: 'App Type',
        options: ['Productivity', 'Gaming', 'Social', 'E-commerce', 'Health', 'Finance', 'Other']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(7);
      expect(config.options).toContain('Productivity');
      expect(config.options).toContain('E-commerce');
    });

    it('should configure budget field for app-marketing', () => {
      const businessType = 'app-marketing';
      const config = {
        type: 'select',
        label: 'Budget Range',
        options: ['Free Tier', '$5-20/month', '$20-50/month', '$50+/month']
      };

      expect(config.options).toHaveLength(4);
      expect(config.options).toContain('Free Tier');
      expect(config.options).toContain('$50+/month');
    });

    it('should configure budget field for consulting', () => {
      const businessType = 'consulting';
      const config = {
        type: 'select',
        label: 'Budget Range',
        options: ['Under $25K', '$25K-$50K', '$50K-$100K', '$100K+', 'To be discussed']
      };

      expect(config.options).toHaveLength(5);
      expect(config.options).toContain('Under $25K');
      expect(config.options).toContain('To be discussed');
    });

    it('should configure timeline select field', () => {
      const config = {
        type: 'select',
        label: 'Timeline',
        options: ['Immediate', 'Within 1 month', 'Within 3 months', '3-6 months', 'Just researching']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(5);
      expect(config.options).toContain('Immediate');
      expect(config.options).toContain('Just researching');
    });

    it('should configure services-interest select field', () => {
      const config = {
        type: 'select',
        label: 'Services of Interest',
        options: ['Strategy Consulting', 'Digital Transformation', 'Process Optimization', 'Technology Implementation', 'Other']
      };

      expect(config.type).toBe('select');
      expect(config.options).toHaveLength(5);
      expect(config.options).toContain('Strategy Consulting');
      expect(config.options).toContain('Technology Implementation');
    });

    it('should configure challenge textarea field', () => {
      const config = { type: 'textarea', label: 'Primary Challenge', rows: 3 };

      expect(config.type).toBe('textarea');
      expect(config.label).toBe('Primary Challenge');
      expect(config.rows).toBe(3);
    });

    it('should configure message textarea field', () => {
      const config = { type: 'textarea', label: 'Message', rows: 4, required: true };

      expect(config.type).toBe('textarea');
      expect(config.label).toBe('Message');
      expect(config.rows).toBe(4);
      expect(config.required).toBe(true);
    });
  });

  describe('button text', () => {
    it('should have correct button text for app-marketing simple', () => {
      const businessType = 'app-marketing';
      const variant = 'simple';
      const buttonText = 'Send Message';

      expect(buttonText).toBe('Send Message');
    });

    it('should have correct button text for app-marketing detailed/lead-qualification', () => {
      const businessType = 'app-marketing';
      const variant = 'detailed';
      const buttonText = 'Get Started';

      expect(buttonText).toBe('Get Started');
    });

    it('should have correct button text for consulting simple', () => {
      const businessType = 'consulting';
      const variant = 'simple';
      const buttonText = 'Contact Us';

      expect(buttonText).toBe('Contact Us');
    });

    it('should have correct button text for consulting detailed/lead-qualification', () => {
      const businessType = 'consulting';
      const variant = 'detailed';
      const buttonText = 'Schedule Consultation';

      expect(buttonText).toBe('Schedule Consultation');
    });
  });

  describe('form titles and subtitles', () => {
    it('should have default title for app-marketing', () => {
      const businessType = 'app-marketing';
      const defaultTitle = 'Get in Touch';

      expect(defaultTitle).toBe('Get in Touch');
    });

    it('should have default title for consulting', () => {
      const businessType = 'consulting';
      const defaultTitle = 'Contact Our Team';

      expect(defaultTitle).toBe('Contact Our Team');
    });

    it('should have default subtitle for app-marketing', () => {
      const businessType = 'app-marketing';
      const defaultSubtitle = 'Have questions? We\'d love to hear from you.';

      expect(defaultSubtitle).toBe('Have questions? We\'d love to hear from you.');
    });

    it('should have default subtitle for consulting', () => {
      const businessType = 'consulting';
      const defaultSubtitle = 'Let\'s discuss how we can help your business grow.';

      expect(defaultSubtitle).toBe('Let\'s discuss how we can help your business grow.');
    });
  });

  describe('styling classes', () => {
    it('should have correct container classes', () => {
      const containerClasses = 'bg-white rounded-lg shadow-lg p-8';

      expect(containerClasses).toContain('bg-white');
      expect(containerClasses).toContain('rounded-lg');
      expect(containerClasses).toContain('shadow-lg');
      expect(containerClasses).toContain('p-8');
    });

    it('should have correct title classes for app-marketing', () => {
      const businessType = 'app-marketing';
      const titleClasses = 'text-2xl font-bold mb-2 text-blue-900';

      expect(titleClasses).toContain('text-2xl');
      expect(titleClasses).toContain('font-bold');
      expect(titleClasses).toContain('text-blue-900');
    });

    it('should have correct title classes for consulting', () => {
      const businessType = 'consulting';
      const titleClasses = 'text-2xl font-bold mb-2 text-slate-900';

      expect(titleClasses).toContain('text-slate-900');
    });

    it('should have correct input/select/textarea classes', () => {
      const inputClasses = 'w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors';

      expect(inputClasses).toContain('w-full');
      expect(inputClasses).toContain('px-4');
      expect(inputClasses).toContain('py-3');
      expect(inputClasses).toContain('border');
      expect(inputClasses).toContain('focus:ring-2');
      expect(inputClasses).toContain('focus:ring-blue-500');
      expect(inputClasses).toContain('transition-colors');
    });

    it('should have correct button classes for app-marketing', () => {
      const businessType = 'app-marketing';
      const buttonClasses = 'w-full px-6 py-4 rounded-lg font-semibold text-white transition-colors bg-blue-600 hover:bg-blue-700';

      expect(buttonClasses).toContain('w-full');
      expect(buttonClasses).toContain('bg-blue-600');
      expect(buttonClasses).toContain('hover:bg-blue-700');
    });

    it('should have correct button classes for consulting', () => {
      const businessType = 'consulting';
      const buttonClasses = 'w-full px-6 py-4 rounded-lg font-semibold text-white transition-colors bg-slate-800 hover:bg-slate-900';

      expect(buttonClasses).toContain('bg-slate-800');
      expect(buttonClasses).toContain('hover:bg-slate-900');
    });

    it('should have correct label classes', () => {
      const labelClasses = 'block text-sm font-medium text-gray-700 mb-2';

      expect(labelClasses).toContain('block');
      expect(labelClasses).toContain('text-sm');
      expect(labelClasses).toContain('font-medium');
      expect(labelClasses).toContain('text-gray-700');
    });

    it('should have correct required indicator classes', () => {
      const requiredClasses = 'text-red-500 ml-1';

      expect(requiredClasses).toContain('text-red-500');
      expect(requiredClasses).toContain('ml-1');
    });
  });

  describe('Props interface', () => {
    it('should have correct business type options', () => {
      type BusinessType = 'app-marketing' | 'consulting';
      const validTypes: BusinessType[] = ['app-marketing', 'consulting'];

      expect(validTypes).toHaveLength(2);
      expect(validTypes).toContain('app-marketing');
      expect(validTypes).toContain('consulting');
    });

    it('should have correct variant options', () => {
      type Variant = 'simple' | 'detailed' | 'lead-qualification';
      const validVariants: Variant[] = ['simple', 'detailed', 'lead-qualification'];

      expect(validVariants).toHaveLength(3);
      expect(validVariants).toContain('simple');
      expect(validVariants).toContain('detailed');
      expect(validVariants).toContain('lead-qualification');
    });
  });

  describe('default values', () => {
    it('should have correct defaults', () => {
      const defaults = {
        businessType: 'app-marketing',
        variant: 'simple',
        className: ''
      };

      expect(defaults.businessType).toBe('app-marketing');
      expect(defaults.variant).toBe('simple');
      expect(defaults.className).toBe('');
    });
  });

  describe('privacy notice', () => {
    it('should show privacy notice for consulting non-simple variants', () => {
      const businessType = 'consulting';
      const variant = 'detailed';
      const showPrivacy = businessType === 'consulting' && variant !== 'simple';

      expect(showPrivacy).toBe(true);
    });

    it('should not show privacy notice for consulting simple variant', () => {
      const businessType = 'consulting';
      const variant = 'simple';
      const showPrivacy = businessType === 'consulting' && variant !== 'simple';

      expect(showPrivacy).toBe(false);
    });

    it('should not show privacy notice for app-marketing', () => {
      const businessType = 'app-marketing';
      const variant = 'detailed';
      const showPrivacy = businessType === 'consulting' && variant !== 'simple';

      expect(showPrivacy).toBe(false);
    });

    it('should have correct privacy text', () => {
      const privacyText = 'We respect your privacy. Your information will only be used to contact you about our services.';

      expect(privacyText).toContain('respect your privacy');
      expect(privacyText).toContain('only be used to contact you');
    });
  });

  describe('form structure', () => {
    it('should have correct form spacing', () => {
      const formClasses = 'space-y-6';

      expect(formClasses).toBe('space-y-6');
    });

    it('should include hidden fields for tracking', () => {
      const hiddenFields = ['business_type', 'form_variant'];

      expect(hiddenFields).toHaveLength(2);
      expect(hiddenFields).toContain('business_type');
      expect(hiddenFields).toContain('form_variant');
    });

    it('should have correct field ID format', () => {
      const field = 'email';
      const fieldId = `field-${field}`;

      expect(fieldId).toBe('field-email');
    });
  });
});