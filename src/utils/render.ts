import { marked } from 'marked'

export const render = (text: string) => marked.parse(text)
