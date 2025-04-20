"use client"

import { useTheme } from "../theme-provider"
import { Moon, Sun } from "lucide-react"

export default function ToggleComponent() {
  const { theme, setTheme } = useTheme()

  const isDark = theme === "dark"

  const toggleDarkMode = () => {
    setTheme(isDark ? "light" : "dark")
  }

  return (
    <div className="flex items-center">
      <Sun className="w-5 h-5 text-mark-500" />
      <button
        className={`mx-3 w-12 h-6 rounded-full p-1 ${isDark ? "bg-[#fdb52a]" : "bg-mark-500"}`}
        onClick={toggleDarkMode}
        tabIndex={0}
        aria-label="Toggle dark mode"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            toggleDarkMode()
          }
        }}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full transform transition-transform ${isDark ? "translate-x-6" : ""}`}
        />
      </button>
      <Moon className="w-5 h-5 text-mark-500" />
    </div>
  )
}
