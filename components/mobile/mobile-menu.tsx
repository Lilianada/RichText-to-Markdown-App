"use client"

import { useMobileMenu } from "@/context/mobile-menu-context"
import { useMarkdown } from "@/context/markdown-context"
import ToggleComponent from "./toggle-component"
import { X, Save, FileUp, Trash2, BookText } from "lucide-react"
import { useState } from "react"
import SaveDialog from "../save-dialog"
import WordCount from "../word-count"

export default function MobileMenu() {
  const { menuOpen, toggleMenu } = useMobileMenu()
  const { documentName } = useMarkdown()
  const [saveDialogOpen, setSaveDialogOpen] = useState(false)

  if (!menuOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden">
      <div className="bg-white dark:bg-mark-800 w-64 h-full p-6 flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h2 className="app-heading-s text-mark-500">MENU</h2>
          <button
            onClick={toggleMenu}
            className="text-mark-500 hover:text-mark-700 dark:hover:text-mark-300"
            tabIndex={0}
            aria-label="Close menu"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                toggleMenu()
              }
            }}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-4">
          <h3 className="text-sm font-semibold mb-2 text-mark-500">Current Document</h3>
          <p className="text-sm dark:text-white">{documentName}</p>
        </div>

        <div className="mb-4">
          <WordCount />
        </div>

        <div className="space-y-4 mb-6">
          <button
            onClick={() => {
              setSaveDialogOpen(true)
              toggleMenu()
            }}
            className="w-full py-3 px-4 rounded flex items-center bg-[#fdb52a] hover:bg-[#fdb52a]/80 text-black"
            tabIndex={0}
            aria-label="Save document"
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setSaveDialogOpen(true)
                toggleMenu()
              }
            }}
          >
            <Save className="w-5 h-5 mr-2" />
            <span>Save Document</span>
          </button>

          <div className="grid gap-2">
            <button
              onClick={() => {
                document.getElementById("file-import-input")?.click()
                toggleMenu()
              }}
              className="py-2 px-3 rounded flex items-center justify-center bg-mark-200 dark:bg-mark-700 text-mark-700 dark:text-mark-200"
              tabIndex={0}
              aria-label="Import file"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("file-import-input")?.click()
                  toggleMenu()
                }
              }}
            >
              <FileUp className="w-4 h-4 mr-1" />
              <span className="text-sm">Import</span>
            </button>

            <button
              onClick={() => {
                document.getElementById("delete-button")?.click()
                toggleMenu()
              }}
              className="py-2 px-3 rounded flex items-center justify-center bg-mark-200 dark:bg-mark-700 text-mark-700 dark:text-mark-200"
              tabIndex={0}
              aria-label="Delete document"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("delete-button")?.click()
                  toggleMenu()
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" />
              <span className="text-sm">Delete</span>
            </button>

            <button
              onClick={() => {
                document.getElementById("cheat-sheet-button")?.click()
                toggleMenu()
              }}
              className="py-2 px-3 rounded flex items-center justify-center bg-mark-200 dark:bg-mark-700 text-mark-700 dark:text-mark-200"
              tabIndex={0}
              aria-label="Markdown cheat sheet"
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  document.getElementById("cheat-sheet-button")?.click()
                  toggleMenu()
                }
              }}
            >
              <BookText className="w-4 h-4 mr-1" />
              <span className="text-sm">Cheat Sheet</span>
            </button>
          </div>
        </div>

        <div className="mt-auto">
          <h3 className="text-sm font-semibold mb-2 text-mark-500">Theme</h3>
          <ToggleComponent />
        </div>
      </div>

      <SaveDialog open={saveDialogOpen} onOpenChange={setSaveDialogOpen} />
    </div>
  )
}
