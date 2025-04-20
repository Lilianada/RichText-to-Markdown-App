import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { BuyMeCoffee } from "@/components/buy-me-coffee"
import { Toaster } from "@/components/ui/toaster"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: {
    default: "Text to Markdown Converter | Fast, Accurate & Private Tool",
    template: "%s | Text to Markdown App",
  },
  description:
    "Convert rich text, HTML, or plain text to clean Markdown instantly with our privacy-focused, modern app. Enjoy live preview, one-click copy/export, and seamless workflow for developers, writers, and content creators.",
  keywords: [
    "text to markdown",
    "markdown converter",
    "rich text to markdown",
    "HTML to markdown",
    "markdown editor",
    "live markdown preview",
    "privacy-focused markdown tool",
    "productivity",
    "content creation",
    "developer tools",
    "modern UI",
    "fast markdown conversion"
  ],
  authors: [{ name: "Lilian Okeke" }],
  creator: "Lilian Okeke",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://lilyslab.xyz",
    title: "Text to Markdown Converter | Fast, Accurate & Private Tool",
    description:
      "Convert rich text, HTML, or plain text to clean Markdown instantly with our privacy-focused, modern app. Enjoy live preview, one-click copy/export, and seamless workflow for developers, writers, and content creators.",
    siteName: "Text to Markdown App",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 1200,
        alt: "Text to Markdown App Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Text to Markdown Converter | Fast, Accurate & Private Tool",
    description:
      "Convert rich text, HTML, or plain text to clean Markdown instantly with our privacy-focused, modern app. Enjoy live preview, one-click copy/export, and seamless workflow for developers, writers, and content creators.",
    creator: "@lilian_ada_",
    images: ["/logo.png"],
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function() {
  try {
    var theme = localStorage.getItem('markdown-theme');
    if (!theme || theme === 'system') {
      var systemDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      theme = systemDark ? 'dark' : 'light';
    }
    document.documentElement.classList.remove('light', 'dark');
    document.documentElement.classList.add(theme);
  } catch (e) {}
})();
            `,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto+Mono&family=Roboto+Slab:wght@300;400;700&family=Roboto:wght@300;400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          {children}
          <BuyMeCoffee />
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
