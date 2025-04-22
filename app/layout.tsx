import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import { BuyMeCoffee } from "@/components/buy-me-coffee";
import StructuredData from "@/components/StructuredData";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rich Text to Markdown  Editor (and vice-versa) | LilysLab",
  description:
    "Effortlessly convert content between Rich Text (HTML) and Markdown with LilysLab's online tool. Use our WYSIWYG editor (Quill) or paste Markdown. Perfect for developers, writers, and content creators needing seamless format conversion.",
  keywords: [
    "rich text to markdown",
    "markdown to rich text",
    "html to markdown",
    "markdown to html",
    "wysiwyg to markdown",
    "online editor",
    "react quill",
    "turndown js",
    "marked js",
    "content conversion tool",
    "developer productivity",
    "writing tools",
    "html editor online",
    "markdown preview",
    "Lilian Okeke",
    "LilysLab",
    "Lily's Lab",
  ],
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/logo.png",
  },
  authors: [{ name: "Lilian Okeke", url: "https://lilyslab.xyz" }],
  alternates: {
    canonical: "https://lilyslab.xyz/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://richtext-to-markdown-editor.vercel.app",
    title: "Online Rich Text <=> Markdown  Editor | LilysLab",
    description:
      "Convert HTML/Rich Text to Markdown and Markdown back to Rich Text easily online. Features a WYSIWYG editor and real-time preview.",
    siteName: "Lily's Lab",
    images: [
      {
        url: "/images/og-image-editor.png",
        width: 1200,
        height: 630,
        alt: "LilysLab Rich Text to Markdown Editor Tool Interface",
      },
      {
        url: "/images/logo.png",
        width: 1200,
        height: 1200,
        alt: "LilysLab Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@LilysLab",
    creator: "@YourTwitterHandle",
    title: "Rich Text <=> Markdown Editor | Quick Online Tool | LilysLab",
    description:
      "Need to convert Rich Text to Markdown or vice-versa? Try this easy online tool with a WYSIWYG editor and instant preview.",
    images: [
      {
        url: "/images/twitter-card-editor.png",
        alt: "Preview of the Rich Text / Markdown Editor Tool",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"></meta>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <main className="flex h-screen flex-col bg-background dark:bg-[#0d0d0d] transition-colors duration-300 gap-4 main-noise-bg">
            <Header />
            {children}
            <Toaster />
            <Footer />
          </main>
        <BuyMeCoffee />
        </ThemeProvider>
      </body>
    </html>
  );
}
