"use client"

import React from 'react'
import { Metadata } from 'next'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import Link from 'next/link'

// export const metadata: Metadata = {
//   title: "Rich Text to Markdown Cheat Sheet: Formatting Guide | Lily's Lab",
//   description:
//     "Lily's Lab's comprehensive Rich Text to Markdown cheat sheet! Master Markdown syntax with easy examples. Learn formatting for headings, lists, links, code, and more for efficient content creation.",
//   keywords: [
//     "rich text to markdown cheat sheet",
//     "markdown cheat sheet",
//     "markdown syntax guide",
//     "markdown formatting examples",
//     "rich text to markdown",
//     "markdown tutorial",
//     "markdown reference",
//     "Lily's Lab",
//     "markdown editor",
//   ],
//   alternates: {
//     canonical: "https://lilyslab.xyz/cheat-sheet",
//   },
//   openGraph: {
//     title: "Rich Text to Markdown Cheat Sheet: Formatting Guide | Lily's Lab",
//     description: "Your quick reference for converting Rich Text to Markdown syntax.",
//     url: "https://lilyslab.xyz/cheat-sheet",
//     images: [
//       { url: "/images/og-markdown-cheatsheet.png", width: 1200, height: 630, alt: "Rich Text to Markdown Cheat Sheet" },
//     ],
//   },
//   twitter: {
//     card: "summary_large_image",
//     title: "Rich Text to Markdown Cheat Sheet | Lily's Lab",
//     description: "Convert Rich Text to Markdown easily with this quick guide and formatting tips.",
//     images: ["/images/twitter-markdown-cheatsheet.png"],
//   },
// };

const CodeExample = ({ title, children }: { title: string, children: React.ReactNode }) => (
  <Card className="mb-4 bg-muted/50 dark:bg-muted/30 border-border">
    <CardHeader className="pb-2 pt-3 px-4">
      <CardTitle className="text-base font-medium text-foreground">{title}</CardTitle>
    </CardHeader>
    <CardContent className="px-4 pb-3">
      <pre className="font-mono text-sm bg-background dark:bg-zinc-800 p-3 rounded-md overflow-x-auto text-muted-foreground whitespace-pre-wrap">
        <code>{children}</code>
      </pre>
    </CardContent>
  </Card>
);

export default function CheatSheetPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center text-foreground">Rich Text to Markdown Cheat Sheet</h1>

      <section className="mb-10 p-6 rounded-lg border bg-card">
        <h2 className="text-2xl font-semibold mb-4 text-primary">Markdown Basics</h2>
        <div className="space-y-4 text-sm text-card-foreground">
          <p>
            <strong>What is Markdown?</strong> Markdown is a simple markup language using plain text formatting. It's easy to read and write and is widely used for formatting text on the web.
          </p>
          <p>
            <strong>Why use Markdown?</strong> Markdown excels for its simplicity, readability, and portability. It allows you to format text quickly without the complexity of rich text editors.
          </p>
          <p>
            <strong>Rich Text to Markdown:</strong> Convert your content effortlessly to Markdown for easy sharing and formatting across various platforms.
          </p>
        </div>
      </section>

      <hr className="my-8 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Basic Markdown Formatting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeExample title="Headings (Convert Rich Text Titles)">
            # Heading 1\n## Heading 2\n### Heading 3\n#### Heading 4\n##### Heading 5\n###### Heading 6
          </CodeExample>

          <CodeExample title="Emphasis (Italics, Bold, Strikethrough)">
            *Italic text* or _Italic text_\n**Bold text** or __Bold text__\n***Bold and italic*** or ___Bold and italic___\n~~Strikethrough~~
          </CodeExample>

          <CodeExample title="Blockquotes (Quoting Text)">
            &gt; This is a blockquote.\n&gt; It can span multiple lines.\n&gt;\n&gt; &gt; Nested blockquotes are possible.
          </CodeExample>

          <CodeExample title="Lists - Unordered (Bullet Points)">
            * Item 1\n* Item 2\n  * Sub-item A (indent)\n  * Sub-item B\n\n{/* You can also use - or + */}\n- Item A\n+ Item B
          </CodeExample>

          <CodeExample title="Lists - Ordered (Numbered)">
            1. First item\n2. Second item\n3. Third item\n   1. Sub-item (indent maintains numbering)
          </CodeExample>

          <CodeExample title="Horizontal Rule (Page Breaks)">
            ---\n***\n___
          </CodeExample>
        </div>
      </section>

      <hr className="my-8 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Links and Images in Markdown</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeExample title="Links (Adding Hyperlinks)">
            [Link text](https://www.example.com)\n[Link with title](https://www.example.com \"Visit Example\")\n&lt;https://www.automatic-link.com&gt; {/* Angle brackets create links */}
          </CodeExample>

          <CodeExample title="Images (Embedding Visuals)">
            ![Alt text](/path/to/image.jpg)\n![Alt text with title](/path/to/image.jpg \"Image Title\")
          </CodeExample>
        </div>
      </section>

      <hr className="my-8 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Code Formatting</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeExample title="Inline Code (Highlighting Code Snippets)">
            Use the `printf()` function.
          </CodeExample>

          <CodeExample title="Code Blocks (Displaying Multi-Line Code)">
            ``````
            \n{/* Indented code blocks (4 spaces) also work */}
    // This is an indented code block
    line 2;
          </CodeExample>
        </div>
      </section>

      <hr className="my-8 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Advanced Markdown Syntax</h2>
        <p className="text-sm text-muted-foreground mb-4">Explore extended Markdown features for enhanced formatting.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeExample title="Tables (Creating Tabular Data)">
            | Header 1 | Header 2 | Header 3 |\n| :------- | :------: | -------: |\n| Align L  | Center   | Align R  |\n| Cell 1   | Cell 2   | Cell 3   |
          </CodeExample>

          <CodeExample title="Task Lists (Creating Checklists)">
            - [x] Write the code\n- [ ] Write the docs\n- [ ] Deploy the app
          </CodeExample>

          <CodeExample title="Footnotes (Adding References)">
            Here is a footnote reference,[^1].\n\n                [^1]: This is the footnote definition.
          </CodeExample>

          <CodeExample title="Definition Lists (Defining Terms)">
            Term 1\n                : Definition 1\n\n                Term 2\n                : Definition 2a\n                : Definition 2b
          </CodeExample>

          <CodeExample title="Highlighting (Emphasizing Text)">
            Use ==highlighted text== for emphasis.
          </CodeExample>

          <CodeExample title="Emoji (Adding Emojis)">
            :+1: :smile: :sparkles:
          </CodeExample>
        </div>
      </section>

      <hr className="my-8 border-border" />

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-6 text-primary">Working with HTML</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CodeExample title="Escaping Characters (Displaying Special Characters)">
            Use a backslash \\ to escape special characters:\n\\*literal asterisks\\*\n\\`literal backticks\\`\n\\# literal hash
          </CodeExample>

          <CodeExample title="HTML (Embedding HTML Elements)">
            You can often include raw HTML:\n&lt;div style=\"color: blue;\"&gt;\n  This is blue text.\n&lt;/div&gt;
          </CodeExample>
        </div>
      </section>

      <div className="text-center text-sm text-muted-foreground mt-12">
        Need more details? Check the <Link href="https://commonmark.org/help/" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">CommonMark Spec</Link> or <Link href="https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary">GitHub's Guide</Link>.
      </div>
    </div>
  );
}
