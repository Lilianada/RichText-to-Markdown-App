"use client"

import { usePathname } from "next/navigation";
import { useState, useEffect } from "react"
import { SquareCode, Sun, Moon, Info, MoreVertical, BookMarked } from "lucide-react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { motion } from "framer-motion"
import Link from "next/link"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import AboutDialog from "./about-dialog"
import CheatSheetDialog from "./cheat-sheet-dialog"

export default function Header() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [isAboutOpen, setIsAboutOpen] = useState(false)
  const [isCheatSheetOpen, setIsCheatSheetOpen] = useState(false)

  const pathname = usePathname();
  const isRichtextEditor = pathname === "/editor";

  // Ensure theme toggle only renders client-side
  useEffect(() => {
    setMounted(true)
  }, [])

  const handleThemeToggle = () => {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  };

  return (
    <motion.header
      className="border-b border-zinc-200 dark:border-zinc-800 py-4 px-6"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-2">
          <SquareCode className="h-6 w-6 text-zinc-800 dark:text-zinc-200" />
          <h1 className="text-base font-medium text-zinc-800 dark:text-zinc-200">Richtext to Markdown Editor</h1>
        </div>

        {/* Desktop Controls */}
        <div className="hidden md:flex items-center gap-2">
          <Link href={isRichtextEditor ? "/" : "/editor"}>
            <Button variant="outline" className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-accent/50">
              <span>{isRichtextEditor ? "Go to Home" : "Go to Editor"}</span>
            </Button>
          </Link>
          <Link href="/cheat-sheet" className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-accent/50">
            <BookMarked className="h-4 w-4" />
            <span>Cheat Sheet</span>
          </Link>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsAboutOpen(true)}
            className="flex items-center gap-1 text-sm font-medium text-zinc-700 dark:text-zinc-300 hover:bg-accent/50"
          >
            <Info className="h-4 w-4" />
            <span>About</span>
          </Button>

          {mounted && (
            <Button
              variant="ghost"
              size="icon"
              onClick={handleThemeToggle}
              className="h-9 w-9 text-zinc-600 dark:text-zinc-300 hover:bg-accent/50"
              aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            >
              {resolvedTheme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>
          )}
        </div>

        {/* Mobile/Tablet Dropdown Menu */}
        <div className="flex md:hidden items-center">
          <DropdownMenu.Root>
            <DropdownMenu.Trigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open menu">
                <MoreVertical className="h-6 w-6 text-zinc-600 dark:text-zinc-300" />
              </Button>
            </DropdownMenu.Trigger>
            <DropdownMenu.Content sideOffset={8} className="bg-card border border-border rounded-md shadow-lg min-w-[180px] p-1 z-50">
              <DropdownMenu.Item asChild>
                <Link
                  href={isRichtextEditor ? "/" : "/editor"}
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent text-sm text-foreground cursor-pointer"
                >
                  <SquareCode className="h-4 w-4" />
                  {isRichtextEditor ? "Go to Home" : "Go to Editor"}
                </Link>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 bg-border h-px" />
              <DropdownMenu.Item asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent text-sm text-foreground w-full"
                  onClick={() => setIsCheatSheetOpen(true)}
                >
                  <BookMarked className="h-4 w-4" />
                  Cheat Sheet
                </button>
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 bg-border h-px" />
              <DropdownMenu.Item >
                {mounted && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleThemeToggle}
                    className="flex items-center justify-start gap-2 px-3 py-2 rounded hover:bg-accent text-sm text-foreground w-full"
                    aria-label={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
                  >
                    {resolvedTheme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                    Toggle theme
                  </Button>
                )}
              </DropdownMenu.Item>
              <DropdownMenu.Separator className="my-1 bg-border h-px" />
              <DropdownMenu.Item asChild>
                <button
                  type="button"
                  className="flex items-center gap-2 px-3 py-2 rounded hover:bg-accent text-sm text-foreground w-full"
                  onClick={() => setIsAboutOpen(true)}
                >
                  <Info className="h-4 w-4" />
                  About
                </button>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
          <AboutDialog open={isAboutOpen} onOpenChange={setIsAboutOpen} />
          <CheatSheetDialog open={isCheatSheetOpen} onOpenChange={setIsCheatSheetOpen} />

        </div>
      </div>
    </motion.header>
  )
}
