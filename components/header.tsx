"use client"

import React from "react";

// Tooltip component for instant appearance
const Tooltip = ({ content, children }: { content: string; children: React.ReactNode }) => {
  const [visible, setVisible] = React.useState(false);
  return (
    <span
      style={{ position: 'relative', display: 'inline-block' }}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
    >
      {children}
      {visible && (
        <span
          role="tooltip"
          aria-label={content}
          style={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            bottom: '-25%',
            background: '#222',
            color: '#fff',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '0.85em',
            whiteSpace: 'nowrap',
            zIndex: 1000,
            pointerEvents: 'none',
          }}
        >
          {content}
        </span>
      )}
    </span>
  );
};

import { useState } from "react"
import { useMobileMenu } from "@/context/mobile-menu-context"
import { useTheme } from "./theme-provider"
import { useMarkdown } from "@/context/markdown-context"
import { Menu, Moon, Sun, Save } from "lucide-react"
import DeleteComponent from "./delete-component"
import DocumentNameEditor from "./document-name-editor"
import SaveDialog from "./save-dialog"
import FileImport from "./file-import"
import WordCount from "./word-count"
import CheatSheet from "./cheat-sheet"

export default function WebsiteHeader() {
  const { menuOpen, toggleMenu } = useMobileMenu()
  const { theme, setTheme } = useTheme()
  const { documentName, setDocumentName } = useMarkdown()
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  const isDark = theme === "dark"

  const toggleTheme = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <header className="flex items-center bg-mark-700 text-white h-14">
      <div className="flex items-center">
        <button
          className="p-4 md:hidden"
          onClick={toggleMenu}
          tabIndex={0}
          aria-label="Toggle menu"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleMenu()
            }
          }}
        >
          <Tooltip content="Toggle menu"><Menu className="w-6 h-6" /></Tooltip>
        </button>
        <div className="hidden md:flex items-center p-4 border-r border-mark-600">
          <h1 className="font-bold">MARKDOWN</h1>
        </div>
        <div className="p-4">
          <DocumentNameEditor />
        </div>
      </div>
      <div className="ml-auto flex items-center">
        <div className="hidden md:flex items-center px-4">
          <WordCount />
        </div>
        {/* Only show on desktop */}
        <div className="hidden md:block">
          <Tooltip content="Cheat sheet"><CheatSheet /></Tooltip>
        </div>
        {/* Only show on desktop */}
        <div className="hidden md:block">
          <Tooltip content="Import file"><FileImport /></Tooltip>
        </div>
        <Tooltip content="Delete document"><DeleteComponent /></Tooltip>
        <button
          className="p-4"
          onClick={toggleTheme}
          tabIndex={0}
          aria-label="Toggle theme"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              toggleTheme()
            }
          }}
        >
          {isDark ? (
            <Sun className="w-5 h-5" />
          ) : (
            <Moon className="w-5 h-5" />
          )}
        </button>

        <button
          onClick={() => setSaveDialogOpen(true)}
          className="mx-4 px-4 py-2 rounded bg-[#fdb52a] hover:bg-[#fdb52a]/80 text-black flex items-center"
          tabIndex={0}
          aria-label="Save document"
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              setSaveDialogOpen(true)
            }
          }}
        >
          <Save className="w-5 h-5" />
          <span className="sr-only">Save</span>
        </button>
      </div>

      <SaveDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} />
    </header>
  )
}
