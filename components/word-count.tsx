"use client"

import { useMarkdown } from "@/context/markdown-context"
import { useEffect, useState } from "react"

export default function WordCount() {
  const { content } = useMarkdown()
  const [stats, setStats] = useState({ words: 0, characters: 0 })

  useEffect(() => {
    // Calculate word and character count
    const text = content.trim()
    const wordCount = text ? text.split(/\s+/).length : 0
    const charCount = text.length

    setStats({
      words: wordCount,
      characters: charCount,
    })
  }, [content])

  return (
    <div className="text-xs text-mark-400 flex items-center">
      <span className="mr-2">{stats.words} words</span>
      <span>{stats.characters} characters</span>
    </div>
  )
}
