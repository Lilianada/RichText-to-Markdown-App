"use client"

import type React from "react"
import { useMarkdown } from "@/context/markdown-context"
import { Eye, Code, FileText } from "lucide-react"
import { useEffect, useRef, useState } from "react"

// Custom syntax highlighting function
const highlightMarkdown = (text: string) => {
  if (!text) return ""

  // Escape HTML to prevent XSS
  const escapeHtml = (unsafe: string) => {
    return unsafe
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
  }

  const escapedText = escapeHtml(text)

  // Apply highlighting with spans
  return escapedText
    .replace(/^(#{1,6}\s.+)$/gm, '<span class="text-[#fdb52a] font-bold">$1</span>') // Headers
    .replace(/(\*\*|__)(.*?)\1/g, '<span class="font-bold">$2</span>') // Bold
    .replace(/(\*|_)(.*?)\1/g, '<span class="italic">$2</span>') // Italic
    .replace(/~~(.*?)~~/g, '<span class="line-through">$1</span>') // Strikethrough
    .replace(/`([^`]+)`/g, '<span class="bg-mark-200 dark:bg-mark-700 px-1 rounded">$1</span>') // Inline code
    .replace(/^\s*(-|\*|\+)\s(.+)$/gm, '<span class="text-[#fdb52a]">$1</span> $2') // List items
    .replace(/^\s*(\d+\.)\s(.+)$/gm, '<span class="text-[#fdb52a]">$1</span> $2') // Numbered list items
    .replace(/^\s*(>)\s(.+)$/gm, '<span class="text-[#fdb52a]">$1</span> $2') // Blockquotes
    .replace(/\[(.*?)\]$$(.*?)$$/g, '[<span class="text-blue-500">$1</span>](<span class="text-green-500">$2</span>)') // Links - fixed regex
    .replace(/^(```[\s\S]*?```)$/gm, '<span class="text-purple-500">$1</span>') // Code blocks
    .replace(/^---+$/gm, '<span class="text-[#fdb52a]">$&</span>') // Horizontal rules
}

export default function UserInput() {
  const { content, updateContent, togglePreview, toggleInput, displayPreview, editorMode, toggleEditorMode } =
    useMarkdown()
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const highlightedRef = useRef<HTMLDivElement>(null)
  const [highlightedContent, setHighlightedContent] = useState("")

  useEffect(() => {
    // Update highlighted content when content changes
    if (editorMode === "markdown") {
      setHighlightedContent(highlightMarkdown(content))
    }
  }, [content, editorMode])

  useEffect(() => {
    // Sync scrolling between textarea and highlighted content
    const handleScroll = () => {
      if (highlightedRef.current && textareaRef.current) {
        highlightedRef.current.scrollTop = textareaRef.current.scrollTop
        highlightedRef.current.scrollLeft = textareaRef.current.scrollLeft
      }
    }

    const textarea = textareaRef.current
    if (textarea) {
      textarea.addEventListener("scroll", handleScroll)
      return () => textarea.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateContent(e.target.value)
  }

  const toggleMobile = () => {
    togglePreview()
    toggleInput()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-mark-200 dark:bg-mark-800 p-4">
        <div className="flex items-center">
          <h2 className="app-heading-s text-mark-500 mr-3">{editorMode === "markdown" ? "MARKDOWN" : "TEXT"}</h2>
          <button
            className="flex items-center text-mark-500 hover:text-mark-700 dark:hover:text-mark-300 text-xs bg-mark-100 dark:bg-mark-700 px-2 py-1 rounded"
            onClick={toggleEditorMode}
            tabIndex={0}
            aria-label={`Switch to ${editorMode === "markdown" ? "text" : "markdown"} mode`}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleEditorMode()
              }
            }}
          >
            {editorMode === "markdown" ? (
              <>
                <FileText className="w-3 h-3 mr-1" />
                <span>Switch to Text</span>
              </>
            ) : (
              <>
                <Code className="w-3 h-3 mr-1" />
                <span>Switch to Markdown</span>
              </>
            )}
          </button>
        </div>
        <button
          className="md:hidden text-mark-500"
          onClick={toggleMobile}
          tabIndex={0}
          aria-label="Toggle preview"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMobile()
            }
          }}
        >
          <Eye className="w-5 h-5" />
        </button>
      </div>
      <div className="relative flex-1">
        <textarea
          ref={textareaRef}
          className={`absolute inset-0 p-4 resize-none outline-none caret-black dark:caret-white text-sm w-full h-full z-10 ${editorMode === "markdown" ? "font-mono dark:bg-mark-900 bg-mark-100" : "font-sans bg-transparent"}`}
          value={content}
          onChange={handleChange}
          spellCheck={editorMode !== "markdown"}
        />
        <div
          ref={highlightedRef}
          className={`absolute inset-0 p-4 overflow-auto whitespace-pre-wrap text-sm pointer-events-none ${editorMode === "markdown" ? "font-mono" : "font-sans"} ${editorMode !== "markdown" ? "text-black dark:text-white" : ""}`}
          aria-hidden="true"
          dangerouslySetInnerHTML={{ __html: editorMode === "markdown" ? highlightedContent : content }}
        />
      </div>
    </div>
  )
}
