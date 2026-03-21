import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://aurexissolution.com'

  // The core pages of your site
  const routes = [
    '',
    '/about',
    '/services',
    '/services/ai-automation',
    '/services/web-engineering',
    '/services/mobile-ecosystems',
    '/portfolio',
    '/blog',
    '/contact',
    '/login'
  ]

  const sitemapEntries = routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1 : 0.8,
  }))

  return sitemapEntries
}
