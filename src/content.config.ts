import { defineCollection } from "astro/content/config";
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// articles
const blog = defineCollection({
  loader: glob({ 
    pattern: '**/*.{md,mdx}',
    base: 'src/content/blog',
  }),
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    tags: z.array(z.string().nonempty()),
    pubDate: z.date()
  })
});

export const collections = { blog };