import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Blog collection schema
const blog = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default('Anonymous'),
    category: z.enum(['app-marketing', 'consulting', 'book', 'general']).default('general'),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional(),
    lang: z.enum(['en', 'de', 'fr', 'es', 'it', 'pt']).default('en'),
    draft: z.boolean().default(false),
    featured: z.boolean().default(false),
    readingTime: z.number().optional()
  })
});

// i18n collection - for translation files
const i18n = defineCollection({
  loader: glob({ pattern: '**/*.json', base: './src/content/i18n' }),
  schema: z.record(z.any()) // JSON translation files have dynamic structure
});

export const collections = {
  blog,
  i18n
};