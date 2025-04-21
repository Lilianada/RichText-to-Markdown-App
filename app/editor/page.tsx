"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import TurndownService from 'turndown'
import { marked } from 'marked'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Copy, Check, ArrowLeftRight, Upload, Download, Eye } from 'lucide-react'
/*
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu" // Temporarily commented out
*/
import { motion } from 'framer-motion'
import 'react-quill/dist/quill.snow.css'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
)

// Define conversion modes
type ConversionMode = 'richtext-to-markdown' | 'markdown-to-richtext';

const TextEditor = () => {
  const [htmlContent, setHtmlContent] = useState<string>('')
  const [markdownContent, setMarkdownContent] = useState<string>('')
  const [copied, setCopied] = useState<boolean>(false)
  const [conversionMode, setConversionMode] = useState<ConversionMode>('richtext-to-markdown')
  const [wordCount, setWordCount] = useState<number>(0)
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreviewPane, setShowPreviewPane] = useState<boolean>(false);

  // Determine Input/Output based on mode
  const isRtM = conversionMode === 'richtext-to-markdown';

  // Initialize TurndownService
  const turndownService = useMemo(() => new TurndownService(), [])

  // Convert HTML to Markdown
  useEffect(() => {
    if (conversionMode === 'richtext-to-markdown' && typeof window !== 'undefined') {
      const handler = setTimeout(() => {
        if (htmlContent) {
          // Basic plain text extraction for word count (could be more sophisticated)
          const tempDiv = document.createElement('div');
          tempDiv.innerHTML = htmlContent;
          const text = tempDiv.textContent || tempDiv.innerText || "";
          const currentWordCount = text.trim().split(/\s+/).filter(Boolean).length;
          setWordCount(currentWordCount);

          // Convert to Markdown
          const markdown = turndownService.turndown(htmlContent)
          setMarkdownContent(markdown)
        } else {
          setMarkdownContent('')
          setWordCount(0)
        }
      }, 300);
      return () => clearTimeout(handler);
    }
  }, [htmlContent, conversionMode, turndownService])

  // Convert Markdown to HTML
  useEffect(() => {
    if (conversionMode === 'markdown-to-richtext') {
      const handler = setTimeout(async () => {
        // Calculate word count from markdown input
        const currentWordCount = markdownContent.trim().split(/\s+/).filter(Boolean).length;
        setWordCount(currentWordCount);

        if (markdownContent) {
          try {
            const convertedHtml = await marked.parse(markdownContent, { async: true, gfm: true, breaks: true });
            setHtmlContent(convertedHtml)
          } catch (error) {
            console.error("Error converting Markdown to HTML:", error);
            setHtmlContent("<p>Error converting Markdown.</p>"); // Show error in preview
            setWordCount(0) // Reset word count on error
          }
        } else {
          setHtmlContent('')
        }
      }, 300);
      return () => clearTimeout(handler);
    }
  }, [markdownContent, conversionMode])

  // Handle copying the output
  const handleCopyOutput = useCallback(async () => {
    const outputToCopy = isRtM ? markdownContent : htmlContent;
    if (!outputToCopy) return
    try {
      await navigator.clipboard.writeText(outputToCopy);
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy output: ', err)
    }
  }, [markdownContent, htmlContent, isRtM])

  // Handle clearing both areas
  const handleClear = useCallback(() => {
    setHtmlContent('')
    setMarkdownContent('')
    setWordCount(0)
    setCopied(false)
  }, [])

  // Toggle conversion mode
  const handleToggleMode = useCallback(() => {
    setConversionMode(prevMode =>
      prevMode === 'richtext-to-markdown' ? 'markdown-to-richtext' : 'richtext-to-markdown'
    );
    handleClear(); // Clear fields on mode switch
  }, [handleClear]);

  // Handle file import click
  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  // Handle file selection
  const handleFileImport = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result as string;
      // Set content based on file type, switch mode to markdown input for simplicity
      if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setMarkdownContent(text);
        setHtmlContent(''); // Clear other field
        if (conversionMode === 'richtext-to-markdown') {
          setConversionMode('markdown-to-richtext'); // Switch to Md input mode
        }
      } else {
        // Handle unsupported file type (e.g., show a toast message)
        console.warn("Unsupported file type:", file.type);
        alert("Unsupported file type. Please import .md or .txt files.");
      }
    };
    reader.onerror = (e) => {
      console.error("Error reading file:", e);
      alert("Error reading file.");
    }
    reader.readAsText(file);

    // Reset file input value to allow importing the same file again
    event.target.value = '';
  };

  // Handle download
  const handleDownload = (format: 'txt' | 'md') => {
    const outputContent = isRtM ? markdownContent : turndownService.turndown(htmlContent); // Always download Markdown
    const filename = `converted_content.${format}`;
    const mimeType = format === 'txt' ? 'text/plain' : 'text/markdown';

    if (!outputContent) {
      alert("Nothing to download.");
      return;
    }

    const blob = new Blob([outputContent], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Labels and Placeholders
  const inputLabel = isRtM ? "Rich Text Input" : "Markdown Input";
  const outputLabel = isRtM ? "Markdown Output" : "Rich Text Output";
  const inputId = isRtM ? "rich-text-editor" : "markdown-input";
  const outputId = isRtM ? "markdown-output" : "rich-text-output";
  const inputPlaceholder = isRtM ? "Paste or type your rich text here..." : "Paste or type your markdown here...";
  const outputPlaceholder = isRtM ? "Converted Markdown will appear here..." : "Converted Rich Text will appear here...";

  // Mobile Preview/Input Toggle Label
  const mobileToggleLabel = showPreviewPane ? "Switch to Input" : "Switch to Preview";

  return (
    <motion.div
      className="flex-1 flex flex-col space-y-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Header Row with Mode Switch and Mobile Preview Toggle */}
      <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-1">
        <div className="flex flex-wrap items-center justify-between gap-2 w-full">
          <Button
            variant="outline"
            size="sm"
            onClick={handleToggleMode}
            aria-label={`Switch to ${isRtM ? 'Markdown to Rich Text' : 'Rich Text to Markdown'} mode`}
            className="flex items-center gap-1"
          >
            <ArrowLeftRight className="h-4 w-4" />
            <span>{isRtM ? 'Switch to Md → Rich Text' : 'Switch to Rich Text → Md'}</span>
          </Button>

          {/* Mobile Preview Toggle Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowPreviewPane(!showPreviewPane)}
            aria-label={mobileToggleLabel}
            className="flex md:hidden items-center gap-1" // Only show on mobile
          >
            <Eye className="h-4 w-4" />
            <span>{showPreviewPane ? "Input" : "Preview"}</span>
          </Button>
        </div>
        <div className="flex flex-wrap items-center justify-start sm:justify-end w-full gap-2 ">
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileImport}
            className="hidden"
            accept=".md,.txt" // Accept markdown and text files
          />
          <Button
            variant="outline"
            size="sm"
            onClick={handleImportClick}
            aria-label="Import file"
            className="flex items-center gap-1"
          >
            <Upload className="h-4 w-4" />
            <span>Import</span>
          </Button>

          {/* Word Count Display */}
          <div className="text-sm text-muted-foreground px-2 py-1 rounded-md bg-muted">
           {wordCount} words
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" aria-label="Download options" className="flex items-center gap-1">
                <Download className="h-4 w-4" />
                <span>Download</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              <DropdownMenuItem onClick={() => handleDownload('md')}>
                Download as .md
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleDownload('txt')}>
                Download as .txt
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>

      {/* Toolbar Row (Import, WC, Download) - remains the same */}

      {/* Main Editor Grid - Now toggles visibility on mobile */}
      {/* Added transition classes for opacity */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch flex-1 h-[65vh]">
        {/* Input Card - Left Side - Hidden on mobile when showPreviewPane is true */}
        <Card className={`h-full flex-col bg-card transition-opacity duration-300 ease-in-out ${showPreviewPane ? 'hidden md:flex' : 'flex'}`}>
          <CardContent className="p-4 flex flex-col flex-1 h-full overflow-hidden">
            {/* ... Input Card Content (Label, Clear Button, Conditional Input Area) ... */}
            <div className="flex justify-between items-center mb-2 flex-shrink-0">
              <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
                {inputLabel}
              </Label>
              <Button
                variant="outline"
                size="sm"
                onClick={handleClear}
                disabled={!htmlContent && !markdownContent}
                aria-label="Clear input and output"
              >
                Clear
              </Button>
            </div>

            {/* Conditional Input Area */}
            {isRtM ? (
              // Rich Text Input (Quill)
              typeof window !== 'undefined' && (
                <div className="flex-1 quill-container bg-card rounded-md border border-border overflow-hidden relative">
                  <ReactQuill
                    id={inputId}
                    theme="snow"
                    value={htmlContent}
                    onChange={setHtmlContent}
                    placeholder={inputPlaceholder}
                    className="h-full w-full"
                    modules={{ /* Toolbar config */
                      toolbar: [
                        [{ 'header': [1, 2, 3, false] }],
                        ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                        [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                        ['link', 'image'],
                        ['clean']
                      ],
                    }}
                  />
                </div>
              )
            ) : (
              // Markdown Input (Textarea)
              <Textarea
                id={inputId}
                value={markdownContent}
                onChange={(e) => setMarkdownContent(e.target.value)}
                placeholder={inputPlaceholder}
                className="flex-1 w-full resize-none font-mono text-sm bg-card border border-border rounded-md p-3 h-full overflow-y-auto text-foreground"
                aria-label={inputLabel}
                maxLength={undefined}
              />
            )}
          </CardContent>
        </Card>

        {/* Output Card - Right Side - Hidden on mobile unless showPreviewPane is true */}
        <Card className={`h-full flex-col bg-card transition-opacity duration-300 ease-in-out ${showPreviewPane ? 'flex' : 'hidden md:flex'}`}>
          <CardContent className="p-4 flex flex-col flex-1 h-full overflow-hidden">
            {/* ... Output Card Content (Label, Copy Button, Conditional Output Area) ... */}
            <div className="flex justify-between items-center mb-2 flex-wrap gap-2 flex-shrink-0">
              <Label htmlFor={outputId} className="text-sm font-medium text-foreground">
                {outputLabel}
              </Label>
              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyOutput}
                  disabled={copied || (isRtM ? !markdownContent : !htmlContent)}
                  className="flex items-center gap-1"
                  aria-label={copied ? "Output Copied" : "Copy Output"}
                >
                  {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
                  {copied ? "Copied!" : "Copy"}
                </Button>
              </div>
            </div>

            {/* Conditional Output Area */}
            {isRtM ? (
              // Markdown Output (Textarea)
              <Textarea
                id={outputId}
                value={markdownContent}
                readOnly
                placeholder={outputPlaceholder}
                className="flex-1 w-full resize-none font-mono text-sm bg-muted border border-border rounded-md p-3 h-full overflow-y-auto text-foreground"
                aria-label={outputLabel}
              />
            ) : (
              // Rich Text Output (Quill ReadOnly)
              typeof window !== 'undefined' && (
                <div className="flex-1 quill-container bg-card rounded-md border border-border overflow-hidden relative">
                  <ReactQuill
                    id={outputId}
                    theme="snow"
                    value={htmlContent}
                    readOnly={true}
                    placeholder={outputPlaceholder}
                    className="h-full w-full"
                    modules={{ toolbar: false }}
                  />
                </div>
              )
            )}
          </CardContent>
        </Card>
      </div>

      {/* Styles moved to app/globals.css */}
    </motion.div>
  )
}

export default TextEditor
