'use client'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

interface CheatSheetDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function CheatSheetDialog({ open, onOpenChange }: CheatSheetDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card border-border max-h-[90vh] overflow-y-auto max-w-2xl w-full">
        <DialogHeader>
          <DialogTitle className="text-foreground">Markdown Formatting Cheat Sheet</DialogTitle>
          <DialogDescription className="mt-4 text-sm text-foreground">
             {/* Cheat sheet content will be added here */}
             <p>Markdown examples coming soon...</p>
             <p> - Headings</p>
             <p> - Bold/Italic</p>
             <p> - Lists</p>
             <p> - Links</p>
             <p> - Code blocks</p>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  )
}
