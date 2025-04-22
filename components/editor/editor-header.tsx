"use client"

import { Button } from "@/components/ui/button"
import * as DropdownMenu from "@radix-ui/react-dropdown-menu"
import { ArrowLeftRight, ChevronsUpDown, Eye, Upload, Download, Trash2 } from "lucide-react"

type ConversionMode = 'richtext-to-markdown' | 'markdown-to-richtext' | 'markdown-to-html' | 'html-to-markdown';

interface EditorHeaderProps {
  conversionMode: ConversionMode;
  conversionModeLabels: Record<ConversionMode, string>;
  handleSetConversionMode: (mode: ConversionMode) => void;
  showPreviewPane: boolean;
  setShowPreviewPane: (show: boolean) => void;
  handleImportClick: () => void;
  characterCount: number;
  isMounted: boolean;
  hasContent: boolean;
  handleDownload: (format: 'md' | 'html' | 'txt') => void;
  handleClear: () => void;
  canDownloadMd: boolean;
  canDownloadHtml: boolean;
  canDownloadTxt: boolean;
}

const EditorHeader: React.FC<EditorHeaderProps> = ({
  conversionMode,
  conversionModeLabels,
  handleSetConversionMode,
  showPreviewPane,
  setShowPreviewPane,
  handleImportClick,
  characterCount,
  isMounted,
  hasContent,
  handleDownload,
  handleClear,
  canDownloadMd,
  canDownloadHtml,
  canDownloadTxt,
}) => {

  const mobileToggleLabel = showPreviewPane ? "Switch to Input" : "Switch to Preview";

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-1">
      {/* Left Side: Mode Switcher & Mobile Toggle */}
      <div className="flex flex-wrap items-center justify-start gap-2 w-full">
        {/* Mode Switcher Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <ArrowLeftRight className="h-4 w-4" />
              <span>{conversionModeLabels[conversionMode]}</span>
              <ChevronsUpDown className="h-3 w-3 opacity-50 ml-1" />
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content sideOffset={8} className="bg-card border border-border rounded-md shadow-lg min-w-[180px] p-1 z-50">
            <DropdownMenu.Label className='px-2 text-sm font-semibold text-foreground'>Conversion Modes</DropdownMenu.Label>
            <DropdownMenu.Separator className="my-1 bg-border h-px" />
            {(Object.keys(conversionModeLabels) as ConversionMode[]).map((mode) => (
              <DropdownMenu.Item
                key={mode}
                asChild
              >
                <button
                  type="button"
                  onClick={() => handleSetConversionMode(mode)}
                  disabled={mode === conversionMode}
                  className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm outline-none hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
                >
                  {conversionModeLabels[mode]}
                </button>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Mobile Preview Toggle Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowPreviewPane(!showPreviewPane)}
          aria-label={mobileToggleLabel}
          className="flex md:hidden items-center gap-1"
        >
          <Eye className="h-4 w-4" />
          <span>{showPreviewPane ? "Input" : "Preview"}</span>
        </Button>
      </div>

      {/* Right Side: Actions (Import, Character Count, Download, Clear) */}
      <div className="flex flex-wrap items-center justify-start sm:justify-end w-full gap-2 ">
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

        {/* Character Count Display - Render only on client */}
        <div className="text-sm text-muted-foreground px-2 py-1.5 rounded-md bg-muted border min-w-[90px] text-center">
          {isMounted ? `${characterCount} characters` : `0 characters`}
        </div>

        {/* Download Dropdown */}
        <DropdownMenu.Root>
          <DropdownMenu.Trigger asChild>
            <Button variant="outline" size="sm" aria-label="Download options" className="flex items-center gap-1" disabled={!hasContent}>
              <Download className="h-4 w-4" />
              <span>Download</span>
            </Button>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            align="end"
            className="bg-card border border-border rounded-md shadow-lg min-w-[150px] p-1 z-50 w-48"
            sideOffset={5}
            data-state-open-class="animate-in fade-in-0 zoom-in-95 slide-in-from-top-2"
            data-state-closed-class="animate-out fade-out-0 zoom-out-95 slide-out-to-top-2"
          >
            <DropdownMenu.Item asChild>
              <button
                type="button"
                onClick={() => handleDownload('md')}
                disabled={!canDownloadMd}
                className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm outline-none hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
              >
                Download as .md
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 bg-border h-px" />
            <DropdownMenu.Item asChild>
              <button
                type="button"
                onClick={() => handleDownload('html')}
                disabled={!canDownloadHtml}
                className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm outline-none hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
              >
                Download as .html
              </button>
            </DropdownMenu.Item>
            <DropdownMenu.Separator className="my-1 bg-border h-px" />
            <DropdownMenu.Item asChild>
              <button
                type="button"
                onClick={() => handleDownload('txt')}
                disabled={!canDownloadTxt}
                className="flex items-center w-full px-2 py-1.5 text-sm rounded-sm outline-none hover:bg-accent focus:bg-accent data-[disabled]:pointer-events-none data-[disabled]:opacity-50 cursor-pointer"
              >
                Download as .txt
              </button>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>

        {/* Clear Button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleClear}
          disabled={!hasContent}
          aria-label="Clear input and output"
          className="flex items-center gap-1"
        >
          <Trash2 className="h-4 w-4" />
          <span>Clear</span>
        </Button>
      </div>
    </div>
  )
}

export default EditorHeader; 