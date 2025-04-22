"use client"

import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { Copy, Check } from 'lucide-react'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
)

interface OutputPanelProps {
  className?: string;
  outputType: 'markdown' | 'richtext' | 'html';
  outputId: string;
  outputLabel: string;
  outputPlaceholder: string;
  isMounted: boolean;
  markdownContent: string;
  htmlContent: string;
  rawHtmlContent: string;
  handleCopyOutput: () => Promise<void>;
  copied: boolean;
}

const OutputPanel: React.FC<OutputPanelProps> = ({
  className,
  outputType,
  outputId,
  outputLabel,
  outputPlaceholder,
  isMounted,
  markdownContent,
  htmlContent,
  rawHtmlContent,
  handleCopyOutput,
  copied,
}) => {
  const outputHasContent = !!(outputType === 'markdown' ? markdownContent : outputType === 'richtext' ? htmlContent : rawHtmlContent);

  return (
    <Card className={`h-full flex-col bg-muted/40 transition-opacity duration-300 ease-in-out ${className}`}>
      <CardContent className="p-4 flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex justify-between items-center mb-2 flex-wrap gap-2 flex-shrink-0">
          <Label htmlFor={outputId} className="text-sm font-medium text-foreground">
            {outputLabel}
          </Label>
          <div className="flex gap-2">
            {/* Copy Button */}
            <Button
              variant="outline"
              size="sm"
              onClick={handleCopyOutput}
              disabled={copied || !outputHasContent}
              className="flex items-center gap-1"
              aria-label={copied ? "Output Copied" : "Copy Output"}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied!" : "Copy"}
            </Button>
          </div>
        </div>

        {/* Conditional Output Area */}
        <div className="flex-1 overflow-hidden relative border border-border rounded-md bg-card">
          {outputType === 'markdown' && (
            <Textarea
              id={outputId}
              value={markdownContent}
              readOnly
              placeholder={outputPlaceholder}
              className="absolute inset-0 w-full h-full resize-none font-mono text-sm bg-muted border-none rounded-md p-3 overflow-y-auto text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={outputLabel}
            />
          )}
          {outputType === 'richtext' && isMounted && (
            <ReactQuill
              id={outputId}
              theme="snow"
              value={htmlContent}
              readOnly={true}
              placeholder={outputPlaceholder}
              className="h-full w-full bg-muted quill-read-only"
              modules={{ toolbar: false }}
            />
          )}
          {outputType === 'html' && (
            <Textarea
              id={outputId}
              value={rawHtmlContent}
              readOnly
              placeholder={outputPlaceholder}
              className="absolute inset-0 w-full h-full resize-none font-mono text-sm bg-muted border-none rounded-md p-3 overflow-y-auto text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={outputLabel}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default OutputPanel; 