"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { marked } from "marked"

type EditorMode = "markdown" | "text"

type MarkdownContextType = {
  content: string
  preview: string
  displayPreview: boolean
  displayInput: boolean
  documentName: string
  editorMode: EditorMode
  togglePreview: () => void
  toggleInput: () => void
  updateContent: (newContent: string) => void
  setDocumentName: (name: string) => void
  toggleEditorMode: () => void
  resetContent: () => void
}

const MarkdownContext = createContext<MarkdownContextType | undefined>(undefined)

const defaultMarkdown = `# Welcome to Markdown

Markdown is a lightweight markup language that you can use to add formatting elements to plaintext text documents.

## How to use this?

1. Write markdown in the markdown editor window
2. See the rendered markdown in the preview window

### Features

- Create headings, paragraphs, links, blockquotes, inline-code, code blocks, and lists
- Name and save the document to access again later
- Choose between Light or Dark mode depending on your preference

> This is an example of a blockquote. If you would like to learn more about markdown syntax, you can visit this [markdown cheatsheet](https://www.markdownguide.org/cheat-sheet/).

#### Headings

To create a heading, add the hash sign (#) before the heading. The number of number signs you use should correspond to the heading level. You'll see in this guide that we've used all six heading levels (not necessarily in the correct way you should use headings!) to illustrate how they should look.

##### Lists

You can see examples of ordered and unordered lists above.

###### Code Blocks

This markdown editor allows for inline-code snippets, like this: \`<p>I'm inline</p>\`. It also allows for larger code blocks like this:

\`\`\`
<main>
  <h1>This is a larger code block</h1>
</main>
\`\`\``

// Function to convert markdown to plain text
const markdownToText = (markdown: string): string => {
  // Basic conversion, can be enhanced for more complex markdown
  return markdown
    .replace(/#{1,6}\s?([^\n]+)/g, "$1") // Headers
    .replace(/\*\*([^*]+)\*\*/g, "$1") // Bold
    .replace(/\*([^*]+)\*/g, "$1") // Italic
    .replace(/`([^`]+)`/g, "$1") // Inline code
    .replace(/```[\s\S]*?```/g, (match) => {
      // Code blocks - extract content between backticks
      const content = match.replace(/```([\s\S]*?)```/g, "$1").trim()
      return content
    })
    .replace(/\[([^\]]+)\]$$([^)]+)$$/g, "$1 ($2)") // Links - fixed regex
    .replace(/^\s*[-+*]\s+/gm, "• ") // Unordered lists
    .replace(/^\s*\d+\.\s+/gm, (match) => match) // Ordered lists
    .replace(/^\s*>\s+/gm, "") // Blockquotes
}

// Function to convert plain text to markdown
const textToMarkdown = (text: string): string => {
  // This is a simplified conversion, more logic can be added
  return text
    .replace(/^(.+)$/gm, (match, p1) => {
      // Check if line looks like a heading (all caps, short)
      if (p1.toUpperCase() === p1 && p1.length < 50 && p1.trim() !== "") {
        return `# ${p1}`
      }
      return p1
    })
    .replace(/•\s+(.+)$/gm, "- $1") // Convert bullet points to markdown lists
    .replace(/(\w+)\s+$$https?:\/\/[^)]+$$/g, "[$1]($2)") // Convert URLs with text to markdown links
}

export function MarkdownProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState(defaultMarkdown)
  const [preview, setPreview] = useState("")
  const [displayPreview, setDisplayPreview] = useState(true) // Default to true
  const [displayInput, setDisplayInput] = useState(true) // Default to true
  const [documentName, setDocumentName] = useState("untitled-document.md")
  const [editorMode, setEditorMode] = useState<EditorMode>("markdown")
  const [windowWidth, setWindowWidth] = useState(typeof window !== "undefined" ? window.innerWidth : 0)

  // Track window width for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    if (typeof window !== "undefined") {
      setWindowWidth(window.innerWidth)
      window.addEventListener("resize", handleResize)
      return () => window.removeEventListener("resize", handleResize)
    }
  }, [])

  // Ensure both panels are visible on desktop
  useEffect(() => {
    if (windowWidth >= 768) {
      setDisplayInput(true)
      setDisplayPreview(true)
    }
  }, [windowWidth])

  useEffect(() => {
    updatePreview(content, editorMode)
  }, [content, editorMode])

  const updatePreview = (text: string, mode: EditorMode) => {
    if (mode === "markdown") {
      const html = marked.parse(text)
      setPreview(html.toString())
    } else {
      // If in text mode, convert text to markdown for preview
      const markdown = textToMarkdown(text)
      const html = marked.parse(markdown)
      setPreview(html.toString())
    }
  }

  const updateContent = (newContent: string) => {
    setContent(newContent)
  }

  const togglePreview = () => {
    // On mobile, toggle preview
    if (windowWidth < 768) {
      setDisplayPreview((prevState) => !prevState)
    }
  }

  const toggleInput = () => {
    // On mobile, toggle input
    if (windowWidth < 768) {
      setDisplayInput((prevState) => !prevState)
    }
  }

  const toggleEditorMode = () => {
    setEditorMode((prevMode) => {
      const newMode = prevMode === "markdown" ? "text" : "markdown"

      // Convert content based on the new mode
      if (newMode === "text") {
        setContent(markdownToText(content))
      } else {
        setContent(textToMarkdown(content))
      }

      return newMode
    })
  }

  const resetContent = () => {
    setContent("")
    setDocumentName("untitled-document.md")
  }

  return (
    <MarkdownContext.Provider
      value={{
        content,
        preview,
        displayPreview,
        displayInput,
        documentName,
        editorMode,
        togglePreview,
        toggleInput,
        updateContent,
        setDocumentName,
        toggleEditorMode,
        resetContent,
      }}
    >
      {children}
    </MarkdownContext.Provider>
  )
}

export function useMarkdown() {
  const context = useContext(MarkdownContext)
  if (context === undefined) {
    throw new Error("useMarkdown must be used within a MarkdownProvider")
  }
  return context
}
