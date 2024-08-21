export const getExcerpt = (text: string) =>
  text.match(/^(?:(?!^#|!\[|^-{3,}|^={3,}).)*?(\S(?:(?!\n\n).)*\S)/s)?.[1]

export const getCleanExcerpt = (text: string) => {
  const match = getExcerpt(text)

  if (match && match[1]) {
    return match[1]
      .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1') // Remove links
      .replace(/[*_~`]/g, '') // Remove bold, italic, strikethrough, and inline code formatting
      .replace(/\s+/g, ' ') // Replace multiple whitespaces with a single space
      .trim() // Remove leading and trailing whitespace
  } else {
    return ''
  }
}
