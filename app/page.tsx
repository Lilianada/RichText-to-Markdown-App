"use client"

import { useState, useEffect } from "react"
import WebsiteHeader from "@/components/header"
import MarkDown from "@/components/mark-down"
import MobileMenu from "@/components/mobile/mobile-menu"
import { MobileMenuProvider } from "@/context/mobile-menu-context"
import { MarkdownProvider } from "@/context/markdown-context"
import Footer from "@/components/footer"

export default function Home() {
  const [windowWidth, setWindowWidth] = useState(0)

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }

    // Set initial width
    handleResize()

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    localStorage.setItem("mark-new-visit", "true")
    return () => {
      localStorage.setItem("mark-new-visit", "true")
    }
  }, [])

  return (
    <MobileMenuProvider>
      <MarkdownProvider>
        <div className="flex flex-col h-screen ">
          <WebsiteHeader />
          <div className="flex flex-1 overflow-hidden">
            <MarkDown windowWidth={windowWidth} />
            <MobileMenu />
          </div>
          <Footer />
        </div>
      </MarkdownProvider>
    </MobileMenuProvider>
  )
}
