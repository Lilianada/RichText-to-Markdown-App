'use client'
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion } from "framer-motion"
import { Github } from "lucide-react"


export default function Home() {
  return (

    <div className="p-4 h-full">
      <motion.div
        className="flex-1 flex flex-col space-y-6 items-center justify-center h-full"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}>

        <div className="container mx-auto px-4 py-24 flex flex-col items-center relative z-10 bg-gradient-radial from-pink-500/70 via-transparent to-transparent">
          {/* Logo above H1 */}
          <Image src="/images/logo.png" alt="Logo" width={60} height={60} className="mb-6" />
          <h1 className="text-2xl md:text-4xl font-bold text-zinc-800 dark:text-zinc-200 text-center mb-3">
            Richtext to Markdown Editor
          </h1>
          <p className="max-w-2xl text-base md:text-lg text-zinc-800 dark:text-zinc-200 text-center mb-8">
            Convert your rich text to markdown with ease.
          </p>
          <div className="flex justify-center gap-3">
          <a href="/editor">
            <Button
              type="submit"
              className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold px-6 py-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow"
            >
              Get Started
            </Button>
            </a>
            <a href="https://github.com/Lilianada/RichText-to-Markdown-Editor" target="_blank" rel="noopener noreferrer">
            <Button className="bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 font-semibold px-6 py-2 rounded-md hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow">
              <Github className="mr-2 h-5 w-5" />
              Star on GitHub
            </Button>
          </a>
          </div>
        </div>


      </motion.div>
    </div>
  )
}
