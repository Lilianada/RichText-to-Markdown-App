"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useMarkdown } from "@/context/markdown-context"
import { Edit2 } from "lucide-react"

export default function DocumentNameEditor() {
  const { documentName, setDocumentName } = useMarkdown()
  const [isEditing, setIsEditing] = useState(false)
  const [editValue, setEditValue] = useState(documentName)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isEditing])

  const handleStartEditing = () => {
    setIsEditing(true)
    setEditValue(documentName)
  }

  const handleSave = () => {
    if (editValue.trim()) {
      setDocumentName(editValue)
    }
    setIsEditing(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSave()
    } else if (e.key === "Escape") {
      setIsEditing(false)
    }
  }

  return (
    <div className="flex items-center">
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          className="bg-transparent border-b border-white text-white px-1 py-0.5 outline-none w-full text-sm"
          aria-label="Document name"
        />
      ) : (
        <div
          className="flex items-center cursor-pointer group"
          onClick={handleStartEditing}
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleStartEditing()
            }
          }}
          aria-label="Edit document name"
        >
          <span className="app-heading-s text-mark-500">{documentName}</span>
          <Edit2 className="w-4 h-4 ml-2 text-mark-500 opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
      )}
    </div>
  )
}
