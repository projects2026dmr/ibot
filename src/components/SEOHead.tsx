import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string; // "/powiat/kartuski"
  ogType?: "website" | "article";
  imageUrl?: string; // optional custom OG/Twitter image
  robots?: string; // e.g. "index, follow"
}

export default function SEOHead({
  title,
  description,
  canonicalPath = "",
  ogType = "website",
  imageUrl,
  robots = "index, follow"
}: SEOHeadProps) {
  useEffect(() => {
    const removeIfExists = (selector: string) => {
      document.querySelectorAll(selector).forEach((el) => el.remove());
    };

    // Clean previous meta tags
    removeIfExists("meta[name='description']");
    removeIfExists("meta[name='robots']");
    removeIfExists("meta[name='theme-color']");
    removeIfExists("meta[property^='og:']");
    removeIfExists("meta[name^='twitter:']");
    removeIfExists("link[rel='canonical']");

    // Title
    document.title = title;

    // Description
    const metaDesc = document.createElement("meta");
    metaDesc.name = "description";
    metaDesc.content = description;
    document.head.appendChild(metaDesc);

    // Robots
    const metaRobots = document.createElement("meta");
    metaRobots.name = "robots";
    metaRobots.content = robots;
    document.head.appendChild(metaRobots);

    // Theme color
    const theme = document.createElement("meta");
    theme.name = "theme-color";
    theme.content = "#0f172a"; // slate-900
    document.head.appendChild(theme);

    // Canonical (hash temizleme)
    const canonical = document.createElement("link");
    canonical.rel = "canonical";
    const origin = window.location.origin;
    const cleanCanonical = (origin + canonicalPath).split("#")[0];
    canonical.href = cleanCanonical;
    document.head.appendChild(canonical);

    // OG image fallback
    const finalImage =
      imageUrl ||
      `${origin}/og/default.jpg`; // fallback image (sen ekleyeceksin)

    // OG tags
    const ogTags = [
      ["og:title", title],
      ["og:description", description],
      ["og:url", cleanCanonical],
      ["og:type", ogType],
      ["og:site_name", "iBOT Agencja SEO"],
      ["og:image", finalImage]
    ];

    ogTags.forEach(([property, content]) => {
      const tag = document.createElement("meta");
      tag.setAttribute("property", property);
      tag.content = content;
      document.head.appendChild(tag);
    });

    // Twitter tags
    const twitterTags = [
      ["twitter:card", "summary_large_image"],
      ["twitter:title", title],
      ["twitter:description", description],
      ["twitter:image", finalImage]
    ];

    twitterTags.forEach(([name, content]) => {
      const tag = document.createElement("meta");
      tag.name = name;
      tag.content = content;
      document.head.appendChild(tag);
    });

    // Cleanup on unmount
    return () => {
      removeIfExists("meta[name='description']");
      removeIfExists("meta[name='robots']");
      removeIfExists("meta[name='theme-color']");
      removeIfExists("meta[property^='og:']");
      removeIfExists("meta[name^='twitter:']");
      removeIfExists("link[rel='canonical']");
    };
  }, [title, description, canonicalPath, ogType, imageUrl, robots]);

  return null;
}
