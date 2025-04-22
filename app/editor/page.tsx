"use client"

import { useState, useEffect, useMemo, useCallback, useRef } from 'react'
import dynamic from 'next/dynamic'
import TurndownService from 'turndown'
import { marked } from 'marked'
import { motion } from 'framer-motion'
import 'react-quill/dist/quill.snow.css'

// Import the new components
import EditorHeader from '@/components/editor/editor-header'
import InputPanel from '@/components/editor/input-panel'
import OutputPanel from '@/components/editor/output-panel'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
)

// Define conversion modes
type ConversionMode = 'richtext-to-markdown' | 'markdown-to-richtext' | 'markdown-to-html' | 'html-to-markdown';

const conversionModeLabels: Record<ConversionMode, string> = {
  'richtext-to-markdown': 'Rich Text → Markdown',
  'markdown-to-richtext': 'Markdown → Rich Text',
  'markdown-to-html': 'Markdown → HTML',
  'html-to-markdown': 'HTML → Markdown',
};

const TextEditor = () => {
  const [htmlContent, setHtmlContent] = useState<string>('') // For Quill editor (Rich Text)
  const [markdownContent, setMarkdownContent] = useState<string>('') // For Markdown Textarea
  const [rawHtmlContent, setRawHtmlContent] = useState<string>(''); // For HTML Textarea
  const [copied, setCopied] = useState<boolean>(false)
  const [conversionMode, setConversionMode] = useState<ConversionMode>('richtext-to-markdown')
  const [characterCount, setCharacterCount] = useState<number>(0) // Changed from wordCount
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPreviewPane, setShowPreviewPane] = useState<boolean>(false); // For mobile view toggle
  const [isMounted, setIsMounted] = useState(false);

  // Initialize TurndownService
  const turndownService = useMemo(() => new TurndownService({ headingStyle: 'atx', codeBlockStyle: 'fenced' }), [])

  // Effect to track client-side mounting
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // --- Conversion Logic Effects ---

  // Rich Text -> Markdown Effect
  useEffect(() => {
    if (conversionMode !== 'richtext-to-markdown' || !isMounted) return;

    const handler = setTimeout(() => {
      setCharacterCount(htmlContent.length);
      if (htmlContent) {
        const markdown = turndownService.turndown(htmlContent);
        setMarkdownContent(markdown);
      } else {
        setMarkdownContent('');
        setCharacterCount(0);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [htmlContent, conversionMode, turndownService, isMounted]);

  // Markdown -> Rich Text / HTML Effect
  useEffect(() => {
    if ((conversionMode !== 'markdown-to-richtext' && conversionMode !== 'markdown-to-html') || !isMounted) return;

    const handler = setTimeout(async () => {
      setCharacterCount(markdownContent.length);
      if (markdownContent) {
        try {
          const convertedHtml = await marked.parse(markdownContent, { async: true, gfm: true, breaks: true });
          if (conversionMode === 'markdown-to-richtext') {
            setHtmlContent(convertedHtml);
          } else {
            setRawHtmlContent(convertedHtml);
          }
        } catch (error) {
          console.error("Error converting Markdown to HTML:", error);
          if (conversionMode === 'markdown-to-richtext') {
            setHtmlContent("<p>Error converting Markdown.</p>");
          } else {
            setRawHtmlContent("<!-- Error converting Markdown -->");
          }
          setCharacterCount(0);
        }
      } else {
        if (conversionMode === 'markdown-to-richtext') {
          setHtmlContent('');
        } else {
          setRawHtmlContent('');
        }
        setCharacterCount(0);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [markdownContent, conversionMode, isMounted]);

  // HTML -> Markdown Effect
  useEffect(() => {
    if (conversionMode !== 'html-to-markdown' || !isMounted) return;

    const handler = setTimeout(() => {
      setCharacterCount(rawHtmlContent.length);
      if (rawHtmlContent) {
        try {
          const markdown = turndownService.turndown(rawHtmlContent);
          setMarkdownContent(markdown);
        } catch (error) {
          console.error("Error converting HTML to Markdown:", error);
          setMarkdownContent("<!-- Error converting HTML -->");
          setCharacterCount(0);
        }
      } else {
        setMarkdownContent('');
        setCharacterCount(0);
      }
    }, 300);
    return () => clearTimeout(handler);
  }, [rawHtmlContent, conversionMode, turndownService, isMounted]);


  // --- Handlers ---

  // Handle copying the output
  const handleCopyOutput = useCallback(async () => {
    let outputToCopy: string | null = null;
    let isRichText = false;

    switch (conversionMode) {
      case 'richtext-to-markdown':
      case 'html-to-markdown':
        outputToCopy = markdownContent;
        break;
      case 'markdown-to-richtext':
        outputToCopy = htmlContent; // Copying the underlying HTML for Rich Text
        isRichText = true;
        break;
      case 'markdown-to-html':
        outputToCopy = rawHtmlContent;
        break;
    }

    if (!outputToCopy) return;

    try {
      if (isRichText && navigator.clipboard && navigator.clipboard.write && typeof ClipboardItem !== 'undefined') {
        const blobHtml = new Blob([outputToCopy], { type: 'text/html' });
        const plainText = turndownService.turndown(outputToCopy);
        const blobText = new Blob([plainText], { type: 'text/plain' });

        const clipboardItem = new ClipboardItem({
          'text/html': blobHtml,
          'text/plain': blobText,
        });
        await navigator.clipboard.write([clipboardItem]);
      } else {
        await navigator.clipboard.writeText(outputToCopy);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy output: ', err);
      alert(`Failed to copy: ${err}`);
    }
  }, [markdownContent, htmlContent, rawHtmlContent, conversionMode, turndownService]);


  // Handle clearing all areas
  const handleClear = useCallback(() => {
    setHtmlContent('')
    setMarkdownContent('')
    setRawHtmlContent('')
    setCharacterCount(0)
    setCopied(false)
  }, [])

  // Handle setting conversion mode
  const handleSetConversionMode = useCallback((newMode: ConversionMode) => {
    if (
        (conversionMode === 'markdown-to-html' || conversionMode === 'markdown-to-richtext') &&
        (newMode === 'markdown-to-html' || newMode === 'markdown-to-richtext')
    ) {
        setConversionMode(newMode);
        setCopied(false);
    } else if (
        conversionMode === 'richtext-to-markdown' && newMode === 'html-to-markdown' ||
        conversionMode === 'html-to-markdown' && newMode === 'richtext-to-markdown'
    ) {
        // Allow switching between RT->MD and HTML->MD without clearing if needed (optional)
        // For now, keep clear behavior consistent
         handleClear();
         setConversionMode(newMode);
    }
     else {
        handleClear();
        setConversionMode(newMode);
    }
  }, [conversionMode, handleClear]);


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
      handleClear(); // Clear existing content first

      if (file.type === 'text/markdown' || file.name.endsWith('.md') || file.type === 'text/plain' || file.name.endsWith('.txt')) {
        setMarkdownContent(text);
        setConversionMode('markdown-to-richtext'); // Default to Md -> Rich Text after MD import
      } else if (file.type === 'text/html' || file.name.endsWith('.html')) {
        setRawHtmlContent(text);
        setConversionMode('html-to-markdown'); // Switch to HTML -> Md mode
      } else {
        console.warn("Unsupported file type:", file.type);
        alert("Unsupported file type. Please import .md, .txt, or .html files.");
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
  const handleDownload = (format: 'md' | 'html' | 'txt') => {
    let outputContent = '';
    let mimeType = '';
    let filename = `converted_content.${format}`;

    try {
      switch (format) {
        case 'md':
          mimeType = 'text/markdown';
          if (conversionMode === 'richtext-to-markdown' || conversionMode === 'html-to-markdown') {
            outputContent = markdownContent; // Already Markdown
          } else if (conversionMode === 'markdown-to-richtext') {
            outputContent = turndownService.turndown(htmlContent); // Convert Rich Text output
          } else { // markdown-to-html
            outputContent = markdownContent; // Original Markdown input
          }
          break;
        case 'html':
          mimeType = 'text/html';
          if (conversionMode === 'markdown-to-richtext') {
            outputContent = htmlContent; // Rich Text output (HTML)
          } else if (conversionMode === 'markdown-to-html') {
            outputContent = rawHtmlContent; // Raw HTML output
          } else if (conversionMode === 'richtext-to-markdown') {
            outputContent = htmlContent; // Original Rich Text Input
          } else { // html-to-markdown
            outputContent = rawHtmlContent; // Original HTML input
          }
          break;
        case 'txt':
          mimeType = 'text/plain';
          let sourceForTxt = '';
          // Prioritize output if available, otherwise use input
          if (conversionMode === 'richtext-to-markdown' || conversionMode === 'html-to-markdown') {
            sourceForTxt = markdownContent; // Use Markdown output
          } else if (conversionMode === 'markdown-to-richtext') {
            sourceForTxt = htmlContent; // Use Rich Text output
          } else if (conversionMode === 'markdown-to-html') {
            sourceForTxt = rawHtmlContent; // Use HTML output
          } else { // Use input based on mode
            if (conversionMode === 'richtext-to-markdown') sourceForTxt = htmlContent;
            else if (conversionMode === 'markdown-to-richtext' || conversionMode === 'markdown-to-html') sourceForTxt = markdownContent;
            else sourceForTxt = rawHtmlContent;
          }

          // Convert source (which might be HTML) to plain text
          if (isMounted) { // Use isMounted
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = sourceForTxt; // Handles both HTML and plain text reasonably well
            outputContent = tempDiv.textContent || tempDiv.innerText || "";
          } else {
            outputContent = sourceForTxt; // Fallback for non-browser env (shouldn't happen in client component)
          }
          break;
      }
    } catch (error) {
      console.error(`Error preparing download content for ${format}:`, error);
      alert(`Error preparing content for download as ${format}.`);
      return;
    }


    if (!outputContent && outputContent !== '') { // Allow downloading empty file
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

  // --- UI Configuration ---

  // Determine input/output types based on mode
  const inputType: 'richtext' | 'markdown' | 'html' = useMemo(() => {
    if (conversionMode === 'richtext-to-markdown') return 'richtext';
    if (conversionMode === 'markdown-to-richtext' || conversionMode === 'markdown-to-html') return 'markdown';
    if (conversionMode === 'html-to-markdown') return 'html';
    return 'richtext'; // Default fallback
  }, [conversionMode]);

  const outputType: 'markdown' | 'richtext' | 'html' = useMemo(() => {
    if (conversionMode === 'richtext-to-markdown' || conversionMode === 'html-to-markdown') return 'markdown';
    if (conversionMode === 'markdown-to-richtext') return 'richtext';
    if (conversionMode === 'markdown-to-html') return 'html';
    return 'markdown'; // Default fallback
  }, [conversionMode]);

  // Labels and Placeholders
  const inputLabel = useMemo(() => {
    if (inputType === 'richtext') return "Rich Text Input";
    if (inputType === 'markdown') return "Markdown Input";
    if (inputType === 'html') return "HTML Input";
    return "Input";
  }, [inputType]);

  const outputLabel = useMemo(() => {
    if (outputType === 'markdown') return "Markdown Output";
    if (outputType === 'richtext') return "Rich Text Output";
    if (outputType === 'html') return "HTML Output";
    return "Output";
  }, [outputType]);

  const inputId = `${inputType}-input`;
  const outputId = `${outputType}-output`;

  const inputPlaceholder = useMemo(() => {
    if (inputType === 'richtext') return "Paste or type your rich text here...";
    if (inputType === 'markdown') return "Paste or type your Markdown here...";
    if (inputType === 'html') return "Paste or type your HTML code here...";
    return "Input...";
  }, [inputType]);

  const outputPlaceholder = useMemo(() => {
    if (outputType === 'markdown') return "Converted Markdown will appear here...";
    if (outputType === 'richtext') return "Converted Rich Text will appear here...";
    if (outputType === 'html') return "Converted HTML will appear here...";
    return "Output...";
  }, [outputType]);


  // Mobile Preview/Input Toggle Label
  const mobileToggleLabel = showPreviewPane ? "Switch to Input" : "Switch to Preview";

  const hasContent = !!htmlContent || !!markdownContent || !!rawHtmlContent;

  // Determine if download options should be enabled
  const canDownloadMd = useMemo(() => {
    return (
      (conversionMode === 'richtext-to-markdown' && !!markdownContent) ||
      (conversionMode === 'html-to-markdown' && !!markdownContent) ||
      (conversionMode === 'markdown-to-richtext' && !!htmlContent) || // Needs conversion from HTML
      (conversionMode === 'markdown-to-html' && !!markdownContent) // Original MD input
    );
  }, [conversionMode, markdownContent, htmlContent]);

  const canDownloadHtml = useMemo(() => {
    return (
      (conversionMode === 'markdown-to-richtext' && !!htmlContent) ||
      (conversionMode === 'markdown-to-html' && !!rawHtmlContent) ||
      (conversionMode === 'richtext-to-markdown' && !!htmlContent) ||
      (conversionMode === 'html-to-markdown' && !!rawHtmlContent)
    );
  }, [conversionMode, htmlContent, rawHtmlContent]);

  const canDownloadTxt = hasContent; // Can always attempt text conversion if any content exists

  return (
    <motion.div
      className="flex-1 flex flex-col space-y-4 p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Hidden File Input */}
       <input
         type="file"
         ref={fileInputRef}
         onChange={handleFileImport}
         className="hidden"
         accept=".md,.txt,.html"
       />

      {/* Use the EditorHeader component */}
      <EditorHeader
        conversionMode={conversionMode}
        conversionModeLabels={conversionModeLabels}
        handleSetConversionMode={handleSetConversionMode}
        showPreviewPane={showPreviewPane}
        setShowPreviewPane={setShowPreviewPane}
        handleImportClick={handleImportClick}
        characterCount={characterCount}
        isMounted={isMounted}
        hasContent={hasContent}
        handleDownload={handleDownload}
        handleClear={handleClear}
        canDownloadMd={canDownloadMd}
        canDownloadHtml={canDownloadHtml}
        canDownloadTxt={canDownloadTxt}
      />

      {/* Main Editor Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch flex-1 min-h-[60vh] h-auto">
        {/* Use the InputPanel component */}
        <InputPanel
          className={showPreviewPane ? 'hidden md:flex' : 'flex'}
          inputType={inputType}
          inputId={inputId}
          inputLabel={inputLabel}
          inputPlaceholder={inputPlaceholder}
          isMounted={isMounted}
          htmlContent={htmlContent}
          setHtmlContent={setHtmlContent}
          markdownContent={markdownContent}
          setMarkdownContent={setMarkdownContent}
          rawHtmlContent={rawHtmlContent}
          setRawHtmlContent={setRawHtmlContent}
        />

        {/* Use the OutputPanel component */}
        <OutputPanel
          className={showPreviewPane ? 'flex' : 'hidden md:flex'}
          outputType={outputType}
          outputId={outputId}
          outputLabel={outputLabel}
          outputPlaceholder={outputPlaceholder}
          isMounted={isMounted}
          markdownContent={markdownContent}
          htmlContent={htmlContent}
          rawHtmlContent={rawHtmlContent}
          handleCopyOutput={handleCopyOutput}
          copied={copied}
        />
      </div>
       {/* Global styles for Quill can be kept or moved to a global CSS file */}
    </motion.div>
  )
}

export default TextEditor
