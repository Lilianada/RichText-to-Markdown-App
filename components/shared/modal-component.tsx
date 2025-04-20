"use client"

import type React from "react"

type ModalComponentProps = {
  displayValue: boolean
  heading?: string
  onClose: () => void
  children: React.ReactNode
}

export default function ModalComponent({ displayValue, heading, onClose, children }: ModalComponentProps) {
  if (!displayValue) return null

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).id === "modal-overlay") {
      onClose()
    }
  }

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      onClick={handleClick}
    >
      <div className="bg-white dark:bg-mark-800 rounded-md p-6 max-w-md w-full">
        {heading && <h2 className="text-xl font-bold mb-4">{heading}</h2>}
        {children}
      </div>
    </div>
  )
}
