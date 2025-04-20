"use client"

import { useState } from "react"
import { Trash2 } from "lucide-react"
import { useMarkdown } from "@/context/markdown-context"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

export default function DeleteComponent() {
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const { resetContent, documentName } = useMarkdown()

  const toggleModal = () => {
    setShowDeleteModal((prevState) => !prevState)
  }

  const handleDelete = () => {
    resetContent()
    toggleModal()
  }

  return (
    <>
      <button
        id="delete-button"
        className="p-4 text-mark-100 hover:text-mark-300 transition-colors"
        onClick={toggleModal}
        tabIndex={0}
        aria-label="Delete document"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleModal()
          }
        }}
      >
        <Trash2 className="w-5 h-5" />
      </button>

      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Trash2 className="w-5 h-5 mr-2 text-destructive" />
              Delete this document?
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to delete "{documentName}" and its contents? This action cannot be reversed.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              style={{ backgroundColor: "#fdb52a", color: "black" }}
              className="hover:bg-[#fdb52a]/80"
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
