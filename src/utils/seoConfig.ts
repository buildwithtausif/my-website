import type { ImageMetadata } from "astro";
import defaultOgImage from "@res/images/ogbanner.webp";
import ogImageProjects from "@res/images/ogbannerprojects.webp";
import ogImageBlog from "@res/images/ogbannerblog.webp";

export interface SEOProps {
  title: string;
  desc?: string;
  keywords?: string;
  image?: ImageMetadata;
  type?: string;
}

/**
 * Global default SEO Configuration
 */
export const globalSEO: SEOProps = {
  title: "Tausif Alam – Backend & Full Stack Developer",
  desc: "Backend-focused engineer building scalable apps with Node.js and PostgreSQL. Explore Tausif Alam’s projects and portfolio.",
  keywords: "Tausif Alam, buildwithtausif, backend developer, Node.js developer, full stack developer, PostgreSQL, web developer portfolio, system design, software engineer India",
  type: "website",
  image: defaultOgImage,
};

/**
 * Page-specific SEO Configuration
 * Add your specific page paths (without trailing slash) here.
 */
export const pageSEOConfig: Record<string, Partial<SEOProps>> = {
  // Home page uses the global defaults completely, but you can override here
  "/": {
    title: "Tausif Alam – Backend & Full Stack Developer",
  },
  "/projects": {
    title: "Projects – Tausif Alam | Full Stack & Backend Work",
    desc: "Explore Tausif Alam’s projects, from backend systems to full stack apps built with Node.js, PostgreSQL, and modern web tech.",
    image: ogImageProjects,
  },
  "/blog": {
    title: "Tausif's Blog – Code, Systems & Insights",
    desc: "Developer blog by Tausif Alam on coding, system design, decisions, and lessons from projects, tech, and life.",
    keywords: "Tausif Alam blog, developer blog, system design, Node.js blog, backend development, programming insights, buildwithtausif",
    image: ogImageBlog,
  }
};

/**
 * Fallback mechanism to get the SEO for a given path.
 * This will merge the global defaults with any specific page configuration.
 */
export function getSEOForPath(pathname: string): SEOProps {
  // Normalize the pathname to match the keys in pageSEOConfig by stripping trailing slash
  const normalizedPath = pathname.replace(/\/$/, "") || "/";
  const matchedSEO = pageSEOConfig[normalizedPath] || {};

  // For dynamic paths under /project and /blog, fallback to specific banners if not strictly defined
  if (!pageSEOConfig[normalizedPath]) {
      if (normalizedPath.startsWith('/project/')) {
          matchedSEO.image = ogImageProjects;
      } else if (normalizedPath.startsWith('/blog/')) {
          matchedSEO.image = ogImageBlog;
      }
  }

  return {
    ...globalSEO,
    ...matchedSEO,
  };
}
