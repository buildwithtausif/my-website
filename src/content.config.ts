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
const project = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: 'src/content/project',
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string().nonempty()),
    pubDate: z.date(),
    github: z.string().optional(),
    version: z.string().optional(),
    onHomePage: z.boolean().default(false)
  })
});

export const collections = { blog, project };