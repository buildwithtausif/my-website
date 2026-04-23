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
  title: "Tausif Alam | Full Stack Developer",
  desc: "Tausif Alam (buildwithtausif) is a backend-focused software engineer building scalable applications with Node.js, PostgreSQL, and modern web tech.",
  keywords: "buildwithtausif, Tausif Alam, Tausif Alam portfolio, software engineer, full stack developer, Node.js developer, backend developer, web developer, system design, freelancer, bsh_tausif",
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
    title: "Tausif Alam | Full Stack Developer",
  },
  "/projects": {
    title: "Projects | buildwithtausif",
    desc: "Showcase of all my built projects from tiny to huge, frontend to backend.",
    image: ogImageProjects,
  },
  "/blog": {
    title: "Tausif's Blog | delving into code, life and everything in between",
    desc: "A blog to share learnings, going deeper into decision making and decoding the system thinker and sometimes insights from life and books.",
    keywords: "buildwithtausif, developer blog, dev blog, tausif's blog, tausif alam blog, bsh_tausif",
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
