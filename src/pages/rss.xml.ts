import rss from '@astrojs/rss'
import type { APIRoute } from 'astro'
import { getCollection, getEntry } from 'astro:content'

export const GET: APIRoute = async ({ site: siteURL }) => {
  const site = await getEntry('site', 'site')
  const posts = await getCollection('posts')
  return rss({
    title: site.data.title,
    description: site.data.description,
    site: siteURL!,
    stylesheet: '/rss.xsl',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/post/${post.slug}/`
    }))
  })
}
