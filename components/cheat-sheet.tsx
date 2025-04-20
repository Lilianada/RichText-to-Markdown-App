"use client"

import { useState } from "react"
import { Book } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CheatSheet() {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        id="cheat-sheet-button"
        className="p-4 text-mark-100 hover:text-mark-300 transition-colors"
        onClick={() => setOpen(true)}
        tabIndex={0}
        aria-label="Markdown cheat sheet"
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            setOpen(true)
          }
        }}
      >
        <Book className="w-5 h-5" />
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto w-[95vw]">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">Markdown Cheat Sheet</DialogTitle>
          </DialogHeader>

          <Tabs defaultValue="overview" className="mt-4">
            <TabsList className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 mb-4 overflow-x-auto">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="basic">Basic</TabsTrigger>
              <TabsTrigger value="extended">Extended</TabsTrigger>
              <TabsTrigger value="alternate">Alternate</TabsTrigger>
              <TabsTrigger value="hacks">Hacks</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                <h3 className="text-lg font-bold mb-2">What is Markdown?</h3>
                <p className="text-sm">
                  Markdown is a lightweight markup language that you can use to add formatting elements to plaintext
                  text documents. Created by John Gruber in 2004, Markdown is now one of the world's most popular markup
                  languages.
                </p>
              </div>

              <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                <h3 className="text-lg font-bold mb-2">Why Use Markdown?</h3>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>It's easy to learn and simple to use</li>
                  <li>It's portable and platform-independent</li>
                  <li>It's future-proof and can be converted to many formats</li>
                  <li>It's widely used in blogging, messaging, documentation</li>
                </ul>
              </div>

              <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                <h3 className="text-lg font-bold mb-2">Markdown Flavors</h3>
                <p className="text-sm mb-2">
                  There are many Markdown variations or "flavors" that add additional features:
                </p>
                <ul className="list-disc pl-5 text-sm space-y-1">
                  <li>CommonMark - A standardized specification of Markdown</li>
                  <li>GitHub Flavored Markdown - Used on GitHub with additional features</li>
                  <li>MultiMarkdown - Adds tables, footnotes, and more</li>
                  <li>Markdown Extra - Adds features like tables and definition lists</li>
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="basic" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Headings</h3>
                  <div className="font-mono text-sm">
                    <p># Heading 1</p>
                    <p>## Heading 2</p>
                    <p>### Heading 3</p>
                    <p>#### Heading 4</p>
                    <p>##### Heading 5</p>
                    <p>###### Heading 6</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Emphasis</h3>
                  <div className="font-mono text-sm">
                    <p>*Italic text*</p>
                    <p>_Italic text_</p>
                    <p>**Bold text**</p>
                    <p>__Bold text__</p>
                    <p>***Bold and italic***</p>
                    <p>~~Strikethrough~~</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Lists</h3>
                  <div className="font-mono text-sm">
                    <p>1. Ordered item 1</p>
                    <p>2. Ordered item 2</p>
                    <p>3. Ordered item 3</p>
                    <p className="mt-2">- Unordered item</p>
                    <p>* Unordered item</p>
                    <p>+ Unordered item</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Links</h3>
                  <div className="font-mono text-sm">
                    <p>[Link text](https://example.com)</p>
                    <p>[Link with title](https://example.com "Title")</p>
                    <p>&lt;https://example.com&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Images</h3>
                  <div className="font-mono text-sm">
                    <p>![Alt text](image.jpg)</p>
                    <p>![Alt text](image.jpg "Title")</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Blockquotes</h3>
                  <div className="font-mono text-sm">
                    <p>&gt; This is a blockquote</p>
                    <p>&gt; Multiple lines</p>
                    <p>&gt;&gt; Nested blockquote</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Code</h3>
                  <div className="font-mono text-sm">
                    <p>`Inline code`</p>
                    <p>```</p>
                    <p>Code block</p>
                    <p>```</p>
                    <p>```javascript</p>
                    <p>// Code with syntax highlighting</p>
                    <p>```</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Horizontal Rule</h3>
                  <div className="font-mono text-sm">
                    <p>---</p>
                    <p>***</p>
                    <p>___</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="extended" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Tables</h3>
                  <div className="font-mono text-sm">
                    <p>| Header 1 | Header 2 |</p>
                    <p>| -------- | -------- |</p>
                    <p>| Cell 1 | Cell 2 |</p>
                    <p>| Cell 3 | Cell 4 |</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Task Lists</h3>
                  <div className="font-mono text-sm">
                    <p>- [x] Completed task</p>
                    <p>- [ ] Incomplete task</p>
                    <p>- [ ] Another task</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Footnotes</h3>
                  <div className="font-mono text-sm">
                    <p>Here's a sentence with a footnote.[^1]</p>
                    <p>[^1]: This is the footnote.</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Definition Lists</h3>
                  <div className="font-mono text-sm">
                    <p>term</p>
                    <p>: definition</p>
                    <p>another term</p>
                    <p>: another definition</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Emoji</h3>
                  <div className="font-mono text-sm">
                    <p>:smile: :heart: :thumbsup:</p>
                    <p className="text-xs mt-1 text-mark-500">
                      (Supported in GitHub Flavored Markdown and some other platforms)
                    </p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Highlighting</h3>
                  <div className="font-mono text-sm">
                    <p>==highlighted text==</p>
                    <p className="text-xs mt-1 text-mark-500">(Supported in some Markdown flavors)</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="alternate" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Alternate Headings</h3>
                  <div className="font-mono text-sm">
                    <p>Heading 1</p>
                    <p>=========</p>
                    <p>Heading 2</p>
                    <p>---------</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">HTML in Markdown</h3>
                  <div className="font-mono text-sm">
                    <p>&lt;div&gt;HTML content&lt;/div&gt;</p>
                    <p>&lt;span style="color: red"&gt;Red text&lt;/span&gt;</p>
                    <p>&lt;button&gt;Click me&lt;/button&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Escaping Characters</h3>
                  <div className="font-mono text-sm">
                    <p>\* Not italic \*</p>
                    <p>\# Not a heading</p>
                    <p>\[Not a link\]$$http://example.com$$</p>
                    <p className="mt-2">Escape with backslash: \ ` * _ {} [] () # + - . !</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Reference Links</h3>
                  <div className="font-mono text-sm">
                    <p>[link text][reference]</p>
                    <p>[reference]: https://example.com "Optional Title"</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="hacks" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Line Breaks</h3>
                  <div className="font-mono text-sm">
                    <p>End a line with two spaces </p>
                    <p>to create a line break.</p>
                    <p className="mt-2">Or use the HTML tag &lt;br&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Comments</h3>
                  <div className="font-mono text-sm">
                    <p>&lt;!-- This is a comment --&gt;</p>
                    <p>&lt;!--</p>
                    <p>Multi-line comment</p>
                    <p>--&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Collapsible Sections</h3>
                  <div className="font-mono text-sm">
                    <p>&lt;details&gt;</p>
                    <p>&lt;summary&gt;Click to expand&lt;/summary&gt;</p>
                    <p>Hidden content here.</p>
                    <p>&lt;/details&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Center Alignment</h3>
                  <div className="font-mono text-sm">
                    <p>&lt;div align="center"&gt;</p>
                    <p>Centered text</p>
                    <p>&lt;/div&gt;</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Custom ID Headings</h3>
                  <div className="font-mono text-sm">
                    <p>### My Heading {"{#custom-id}"}</p>
                    <p className="text-xs mt-1 text-mark-500">(Supported in some Markdown flavors)</p>
                  </div>
                </div>

                <div className="bg-mark-100 dark:bg-mark-800 p-4 rounded-md">
                  <h3 className="text-lg font-bold mb-2">Keyboard Keys</h3>
                  <div className="font-mono text-sm">
                    <p>&lt;kbd&gt;Ctrl&lt;/kbd&gt; + &lt;kbd&gt;C&lt;/kbd&gt;</p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </>
  )
}
