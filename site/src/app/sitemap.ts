import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clarity-engine.ai";
  // Use a fixed date for static pages — only update when content actually changes
  const siteLastUpdated = new Date("2026-04-07");

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${base}/`,
      lastModified: siteLastUpdated,
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${base}/tools/`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/blog/`,
      lastModified: siteLastUpdated,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${base}/about/`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/contact/`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${base}/media-kit/`,
      lastModified: siteLastUpdated,
      changeFrequency: "monthly",
      priority: 0.4,
    },
    {
      url: `${base}/privacy/`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/terms/`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${base}/affiliate-disclosure/`,
      lastModified: siteLastUpdated,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  const toolUrls: MetadataRoute.Sitemap = tools.map((t) => ({
    url: `${base}/tools/${t.slug}/`,
    lastModified: siteLastUpdated,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const blogUrls: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticPages, ...toolUrls, ...blogUrls];
}
