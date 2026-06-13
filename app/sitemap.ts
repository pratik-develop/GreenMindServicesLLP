import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = 'https://www.greenmindservices.com'
  const now = new Date()

  const staticRoutes = [
    { url: `${base}/`,                      priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: `${base}/services`,              priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${base}/about`,                 priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/industries`,            priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/projects`,              priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${base}/resources`,             priority: 0.8,  changeFrequency: 'weekly'  as const },
    { url: `${base}/contact`,               priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${base}/clients`,               priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: `${base}/policies/privacy-policy`,     priority: 0.3, changeFrequency: 'yearly'  as const },
    { url: `${base}/policies/terms-conditions`,   priority: 0.3, changeFrequency: 'yearly'  as const },
  ].map(r => ({ ...r, lastModified: now }))

  const serviceSlugRoutes = [
    'environmental-impact-assessments',
    'environmental-compliance',
    'environmental-monitoring',
    'esg-disclosure-reporting',
  ].map(slug => ({
    url: `${base}/services/${slug}`,
    lastModified: now,
    priority: 0.85,
    changeFrequency: 'monthly' as const,
  }))

  const resourceSlugRoutes = [
    'understanding-environmental-impact-assessments',
    'esg-reporting-trends-2024',
    'how-to-get-cto-in-assam',
    'brsr-reporting-requirements-2025',
    'waste-management-rules-india',
    'eia-notification-2006-guide',
    'environmental-audit-checklist',
    'carbon-footprinting-for-msmes',
  ].map(slug => ({
    url: `${base}/resources/${slug}`,
    lastModified: now,
    priority: 0.7,
    changeFrequency: 'monthly' as const,
  }))

  return [...staticRoutes, ...serviceSlugRoutes, ...resourceSlugRoutes]
}
