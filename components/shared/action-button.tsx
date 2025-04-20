"use client"

import type React from "react"

type ActionButtonProps = {
  buttonType?: string
  onClick?: () => void
  children: React.ReactNode
  className?: string
}

export default function ActionButton({ buttonType, onClick, children, className = "" }: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} ${buttonType === "primary" ? "bg-mark-orange hover:bg-mark-orange-hover text-white" : ""}`}
      tabIndex={0}
      aria-label="Action button"
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          onClick?.()
        }
      }}
    >
      {children}
    </button>
  )
}
