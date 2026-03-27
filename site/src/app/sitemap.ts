import { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://clarity-engine.ai";
  const toolUrls = tools.map((t) => ({
    url: `${base}/tools/${t.slug}/`,
    lastModified: new Date(),
  }));
  const blogUrls = posts.map((p) => ({
    url: `${base}/blog/${p.slug}/`,
    lastModified: new Date(p.publishedAt),
  }));
  return [
    { url: base + "/", lastModified: new Date() },
    { url: base + "/tools/", lastModified: new Date() },
    { url: base + "/blog/", lastModified: new Date() },
    { url: base + "/about/", lastModified: new Date() },
    ...toolUrls,
    ...blogUrls,
  ];
}
