import type { MetadataRoute } from 'next'
import { siteUrl } from '../src/lib/seo'

const AI_BOTS = ['OAI-SearchBot', 'GPTBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-User', 'PerplexityBot', 'Google-Extended', 'Applebot-Extended']

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/' },
      ...AI_BOTS.map((userAgent) => ({ userAgent, allow: '/' })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  }
}
