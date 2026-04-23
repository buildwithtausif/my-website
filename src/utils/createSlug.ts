/**
 * Creates a URL-friendly slug from a content entry's ID.
 * The entry ID is derived from the filename by Astro's glob loader,
 * ensuring the slug always matches the canonical URL path.
 *
 * @param entryId - The content entry's `id` (filename without extension, set by Astro's glob loader)
 * @returns A URL-safe, lowercase slug
 */
export default function createSlug(entryId: string): string {
  return (
    entryId
      // remove leading & trailing whitespace
      .trim()
      // remove special characters except hyphens (hyphens are valid in slugs)
      .replace(/[^A-Za-z0-9\- ]/g, "")
      // replace spaces with hyphens
      .replace(/\s+/g, "-")
      // collapse multiple consecutive hyphens into one
      .replace(/-{2,}/g, "-")
      // remove leading & trailing separators
      .replace(/^-+|-+$/g, "")
      // output lowercase
      .toLowerCase()
  );
}
