import type { MetadataRoute } from 'next';
import { headers } from 'next/headers';
import { programmes } from '@/lib/academy';
export const dynamic = 'force-dynamic';
export default async function sitemap():Promise<MetadataRoute.Sitemap>{const h=await headers();const base=process.env.SITE_URL || `${h.get('x-forwarded-proto') || 'https'}://${h.get('host') || 'ambit.academy'}`;return ['', '/classes', '/smart-learning', '/about', '/contact', '/privacy',...programmes.map(p=>`/classes/${p.slug}`)].map(path=>({url:base+path,changeFrequency:'monthly',priority:path===''?1:0.8}));}
