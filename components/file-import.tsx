"use client"

import type React from "react"

import { useRef } from "react"
import { useMarkdown } from "@/context/markdown-context"
import { FileUp } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export default function FileImport() {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { updateContent, setDocumentName } = useMarkdown()

  const handleImportClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click()
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Check file type
    const allowedTypes = [".md", ".markdown", ".txt", ".text"]
    const fileExtension = file.name.substring(file.name.lastIndexOf(".")).toLowerCase()

    if (!allowedTypes.includes(fileExtension)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a markdown (.md) or text (.txt) file.",
        variant: "destructive",
      })
      return
    }

    // Read file content
    const reader = new FileReader()
    reader.onload = (event) => {
      const content = event.target?.result as string
      if (content) {
        updateContent(content)
        setDocumentName(file.name)
        toast({
          title: "File imported",
          description: `Successfully imported ${file.name}`,
        })
      }
    }
    reader.onerror = () => {
      toast({
        title: "Error reading file",
        description: "There was an error reading the file.",
        variant: "destructive",
      })
    }
    reader.readAsText(file)

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".md,.markdown,.txt,.text"
        className="hidden"
        id="file-import-input"
        aria-label="Import file"
      />
      <button
        onClick={handleImportClick}
        className="p-4 text-mark-100 hover:text-mark-300 transition-colors"
        tabIndex={0}
        aria-label="Import file"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleImportClick()
          }
        }}
      >
        <FileUp className="w-5 h-5" />
      </button>
    </div>
  )
}
