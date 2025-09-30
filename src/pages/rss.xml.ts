import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';
import type { APIContext } from 'astro';

export async function GET(context: APIContext) {
  const blog = await getCollection('blog', ({ data }) => {
    return !data.draft;
  });

  const sortedPosts = blog.sort(
    (a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
  );

  return rss({
    title: 'Multi-Template Platform Blog',
    description: 'Expert insights on app marketing, digital transformation, book publishing, and modern web development.',
    site: context.site || 'https://example.com',
    items: sortedPosts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id.replace(/\.md$/, '')}/`,
      author: post.data.author,
      categories: [post.data.category, ...post.data.tags],
      customData: post.data.updatedDate
        ? `<lastBuildDate>${post.data.updatedDate.toUTCString()}</lastBuildDate>`
        : undefined,
    })),
    customData: `<language>en-us</language>`,
    stylesheet: '/rss-styles.xsl',
  });
}
