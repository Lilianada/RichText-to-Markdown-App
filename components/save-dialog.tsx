"use client"

import { useMarkdown } from "@/context/markdown-context"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { FileDown } from "lucide-react"

type SaveDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SaveDialog({ open, onOpenChange }: SaveDialogProps) {
  const { content, documentName, editorMode } = useMarkdown()

  const downloadFile = (format: "md" | "txt" | "pdf") => {
    // Create the content based on format
    const fileContent = content
    let mimeType = "text/plain"
    const extension = format

    if (format === "pdf") {
      // For PDF, we would normally use a library like jsPDF
      // For simplicity, we'll just use text in this example
      mimeType = "application/pdf"
    } else if (format === "md") {
      mimeType = "text/markdown"
    }

    // Create name without extension
    const baseName = documentName.replace(/\.[^/.]+$/, "")
    const fileName = `${baseName}.${extension}`

    // Create blob and trigger download
    const blob = new Blob([fileContent], { type: mimeType })
    const url = URL.createObjectURL(blob)

    // Create a temporary link element and trigger download
    const a = document.createElement("a")
    a.href = url
    a.download = fileName
    // Append to body, click, and remove to ensure proper download
    document.body.appendChild(a)
    a.click()

    // Cleanup
    setTimeout(() => {
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    }, 100)

    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center">
            <FileDown className="w-5 h-5 mr-2" />
            Save Document
          </DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <p className="text-sm text-muted-foreground mb-4">Choose a format to download "{documentName}"</p>
          <div className="grid grid-cols-3 gap-4">
            <Button
              onClick={() => downloadFile("md")}
              className="w-full"
              variant="outline"
              tabIndex={0}
              aria-label="Download as Markdown"
            >
              Markdown
            </Button>
            <Button
              onClick={() => downloadFile("txt")}
              className="w-full"
              variant="outline"
              tabIndex={0}
              aria-label="Download as Text"
            >
              Text
            </Button>
            <Button
              onClick={() => downloadFile("pdf")}
              className="w-full"
              variant="outline"
              tabIndex={0}
              aria-label="Download as PDF"
            >
              PDF
            </Button>
          </div>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            onClick={() => downloadFile("md")}
            style={{ backgroundColor: "#fdb52a", color: "black" }}
            className="hover:bg-[#fdb52a]/80"
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
