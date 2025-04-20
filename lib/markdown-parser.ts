import { marked } from "marked"

export const markdownParser = (text: string): string => {
  const html = marked.parse(text)
  return html.toString().trim()
}
