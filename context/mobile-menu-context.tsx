"use client"

import type React from "react"

import { createContext, useContext, useState } from "react"

type MobileMenuContextType = {
  menuOpen: boolean
  toggleMenu: () => void
}

const MobileMenuContext = createContext<MobileMenuContextType | undefined>(undefined)

export function MobileMenuProvider({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => {
    setMenuOpen((prevState) => !prevState)
  }

  return <MobileMenuContext.Provider value={{ menuOpen, toggleMenu }}>{children}</MobileMenuContext.Provider>
}

export function useMobileMenu() {
  const context = useContext(MobileMenuContext)
  if (context === undefined) {
    throw new Error("useMobileMenu must be used within a MobileMenuProvider")
  }
  return context
}
