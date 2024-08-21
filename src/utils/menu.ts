import { getEntry, type CollectionEntry } from 'astro:content'

export const transformMenu = async (menu: CollectionEntry<'menu'>) => {
  return await Promise.all(
    menu.data.items.map(async (item) => {
      if (item.discriminant === 'page') {
        const page = await getEntry('pages', item.value.slug)
        return {
          title: page.data.title,
          url: `/${page.slug}`
        }
      }
      return item.value
    })
  )
}
