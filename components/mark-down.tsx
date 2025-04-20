"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import UserInput from "./user-input"
import Preview from "./preview"
import { useMarkdown } from "@/context/markdown-context"
import { useMobileMenu } from "@/context/mobile-menu-context"
import { Eye, EyeOff } from "lucide-react"

type MarkDownProps = {
  windowWidth: number
}

export default function MarkDown({ windowWidth }: MarkDownProps) {
  const { displayPreview, displayInput, togglePreview, toggleInput } = useMarkdown()
  const { menuOpen } = useMobileMenu()
  const [resizeMouseDown, setResizeMouseDown] = useState(false)
  const [centerPosition, setCenterPosition] = useState<{ clientX: number; screenWidth: number } | null>(null)
  const [markOverlay, setMarkOverlay] = useState(false)
  const [prevOverlay, setPrevOverlay] = useState(false)
  const [newVisit, setNewVisit] = useState<boolean>(() => {
    if (typeof window !== "undefined") {
      return JSON.parse(localStorage.getItem("mark-new-visit") || "false")
    }
    return false
  })

  const userInputRef = useRef<HTMLDivElement>(null)

  // Ensure both panels are displayed on desktop
  useEffect(() => {
    if (windowWidth >= 768) {
      if (!displayInput) toggleInput()
      if (!displayPreview) togglePreview()
    }
  }, [windowWidth, displayInput, displayPreview, toggleInput, togglePreview])

  useEffect(() => {
    if (displayInput) {
      setCenterPosition(null)
      setMarkOverlay(false)
      setPrevOverlay(false)
    }
  }, [displayInput])

  useEffect(() => {
    if (newVisit) {
      localStorage.setItem("mark-new-visit", "true")
    }
  }, [newVisit])

  // Reset layout when screen size changes between mobile and desktop
  useEffect(() => {
    const isMobile = windowWidth < 768
    if (isMobile) {
      setCenterPosition(null)
    }
  }, [windowWidth])

  const handleResize = (e: React.MouseEvent<HTMLDivElement>) => {
    if (resizeMouseDown) {
      setNewVisit(true)
      setCenterPosition({
        clientX: e.clientX,
        screenWidth: window.innerWidth,
      })
    }
  }

  const turnoffMouseDown = () => {
    setResizeMouseDown(false)
  }

  const setOverlay = (element: "mark" | "prev", value: boolean) => {
    if (element === "mark") {
      setMarkOverlay(value)
    } else {
      setPrevOverlay(value)
    }
  }

  const fieldsWidthStyles = () => {
    // On mobile, use full width
    if (windowWidth < 768) {
      return {
        markdown: {
          width: "100%",
        },
        preview: {
          width: "100%",
        },
      }
    }

    // On desktop with both panels
    if (centerPosition === null) {
      return {
        markdown: {
          width: "50%",
        },
        preview: {
          width: "50%",
        },
      }
    } else {
      const mousePosition = centerPosition.clientX
      const screenWidth = centerPosition.screenWidth

      let firstWidth = (mousePosition / screenWidth) * 100
      let secondWidth = 100 - firstWidth

      // Ensure minimum width for panels
      if (screenWidth - mousePosition < 376) {
        secondWidth = (376 / screenWidth) * 100
        firstWidth = 100 - secondWidth
      }

      if (mousePosition < 300) {
        firstWidth = (300 / screenWidth) * 100
        secondWidth = 100 - firstWidth
      }

      if (userInputRef.current && userInputRef.current.clientWidth < 300) {
        setOverlay("mark", true)
      } else {
        setOverlay("mark", false)
        setOverlay("prev", false)
      }

      return {
        markdown: {
          width: `${firstWidth}%`,
        },
        preview: {
          width: `${secondWidth}%`,
        },
      }
    }
  }

  // Toggle button for mobile view
  const toggleMobileView = () => {
    togglePreview()
    toggleInput()
  }

  return (
    <div
      className="flex flex-1 overflow-hidden flex-col md:flex-row relative"
      onMouseMove={handleResize}
      onMouseUp={turnoffMouseDown}
      onMouseLeave={turnoffMouseDown}
    >
      {/* Always show input on desktop, toggle on mobile */}
      <div
        ref={userInputRef}
        className={`h-full md:h-auto flex-1 overflow-hidden ${windowWidth < 768 && !displayInput ? "hidden" : ""}`}
        style={windowWidth >= 768 ? fieldsWidthStyles().markdown : undefined}
      >
        <UserInput />
      </div>

      {/* Resizer only on desktop */}
      {windowWidth >= 768 && (
        <div
          className="w-1 bg-mark-300 dark:bg-mark-600 cursor-col-resize"
          onMouseDown={() => setResizeMouseDown(true)}
        />
      )}

      {/* Always show preview on desktop, toggle on mobile */}
      <div
        className={`h-full md:h-auto flex-1 overflow-hidden ${windowWidth < 768 && !displayPreview ? "hidden" : ""}`}
        style={windowWidth >= 768 ? fieldsWidthStyles().preview : undefined}
      >
        <Preview />
      </div>

      {/* Floating toggle button for mobile view when preview is hidden */}
      {windowWidth < 768 && !displayPreview && (
        <button
          onClick={toggleMobileView}
          className="fixed bottom-20 right-5 z-50 bg-[#fdb52a] text-black p-3 rounded-full shadow-lg"
          aria-label="Show preview"
        >
          <Eye className="w-5 h-5" />
        </button>
      )}

      {/* Floating toggle button for mobile view when editor is hidden */}
      {windowWidth < 768 && !displayInput && (
        <button
          onClick={toggleMobileView}
          className="fixed bottom-20 right-5 z-50 bg-[#fdb52a] text-black p-3 rounded-full shadow-lg"
          aria-label="Show editor"
        >
          <EyeOff className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}
