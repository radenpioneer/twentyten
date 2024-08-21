import { defineCollection, z, reference } from 'astro:content'

export const collections = {
  site: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string().max(64),
        slogan: z.string().max(160),
        description: z.string().max(160),
        lang: z.enum(['en', 'id']),
        image: image(),
        favicon: z.any().optional()
      })
  }),

  posts: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string().max(160),
        date: z.date(),
        subtitle: z.string().max(160).optional(),
        description: z.string().max(160).optional(),
        tags: z
          .array(
            z.object({
              name: z.string().max(64),
              slug: z.string()
            })
          )
          .optional(),
        lang: z.enum(['en', 'id']),
        draft: z.boolean().optional(),
        image: image().optional()
      })
  }),

  pages: defineCollection({
    type: 'content',
    schema: ({ image }) =>
      z.object({
        title: z.string().max(160),
        description: z.string().max(160).optional(),
        image: image().optional()
      })
  }),

  menu: defineCollection({
    type: 'data',
    schema: ({ image }) =>
      z.object({
        title: z.string().max(64),
        description: z.string().max(160).optional(),
        items: z.array(
          z.discriminatedUnion('discriminant', [
            z.object({
              discriminant: z.literal('page'),
              value: reference('pages')
            }),
            z.object({
              discriminant: z.literal('link'),
              value: z.object({
                title: z.string(),
                url: z.string(),
                icon: image().optional()
              })
            })
          ])
        )
      })
  })
}
