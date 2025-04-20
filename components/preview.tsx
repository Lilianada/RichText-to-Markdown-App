"use client"

import { useMarkdown } from "@/context/markdown-context"
import { Eye, EyeOff } from "lucide-react"

export default function Preview() {
  const { preview, togglePreview, toggleInput, displayInput, editorMode } = useMarkdown()

  const toggleMobile = () => {
    togglePreview()
    toggleInput()
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between bg-mark-200 dark:bg-mark-800 p-4">
        <h2 className="app-heading-s text-mark-500">PREVIEW</h2>
        <button
          className="md:hidden text-mark-500"
          onClick={toggleMobile}
          tabIndex={0}
          aria-label="Toggle editor"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMobile()
            }
          }}
        >
          {displayInput ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
        </button>
      </div>
      <div
        className="flex-1 p-4 overflow-auto bg-white dark:bg-mark-900 preview-container text-sm"
        dangerouslySetInnerHTML={{ __html: preview }}
      />
    </div>
  )
}
