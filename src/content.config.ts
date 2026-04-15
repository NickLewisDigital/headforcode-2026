import { defineCollection, z } from 'astro:content'
import { glob } from 'astro/loaders'
import { CATEGORIES } from '@/data/categories'

const blog = defineCollection({
	loader: glob({
		pattern: '**/*.{md,mdx}',
		base: './src/content/blog',
		generateId: ({ entry }) => entry.replace(/\.(md|mdx)$/, '')
	}),
	// Type-check frontmatter using a schema
	schema: z.object({
		title: z.string().max(80),
		description: z.string(),
		// Transform string to Date object
		pubDate: z
			.string()
			.or(z.date())
			.transform((val) => new Date(val)),
		heroImage: z.string(),
		category: z.enum(CATEGORIES),
		tags: z.array(z.string()),
		draft: z.boolean().default(false),
		pinned: z.boolean().default(false)
	})
})

export const collections = { blog }
