"use client"

import dynamic from 'next/dynamic'
import { Card, CardContent } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import 'react-quill/dist/quill.snow.css'

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(
  () => import('react-quill'),
  { ssr: false }
)

interface InputPanelProps {
  className?: string;
  inputType: 'richtext' | 'markdown' | 'html';
  inputId: string;
  inputLabel: string;
  inputPlaceholder: string;
  isMounted: boolean;
  htmlContent: string;
  setHtmlContent: (value: string) => void;
  markdownContent: string;
  setMarkdownContent: (value: string) => void;
  rawHtmlContent: string;
  setRawHtmlContent: (value: string) => void;
}

const InputPanel: React.FC<InputPanelProps> = ({
  className,
  inputType,
  inputId,
  inputLabel,
  inputPlaceholder,
  isMounted,
  htmlContent,
  setHtmlContent,
  markdownContent,
  setMarkdownContent,
  rawHtmlContent,
  setRawHtmlContent,
}) => {
  return (
    <Card className={`h-full flex-col bg-card transition-opacity duration-300 ease-in-out ${className}`}>
      <CardContent className="p-4 flex flex-col flex-1 h-full overflow-hidden">
        <div className="flex justify-between items-center mb-2 flex-shrink-0">
          <Label htmlFor={inputId} className="text-sm font-medium text-foreground">
            {inputLabel}
          </Label>
          {/* Clear button is now in the header */}
        </div>

        {/* Conditional Input Area */}
        <div className="flex-1 overflow-hidden relative border border-border rounded-md">
          {inputType === 'richtext' && isMounted && (
            <ReactQuill
              id={inputId}
              theme="snow"
              value={htmlContent}
              onChange={setHtmlContent}
              placeholder={inputPlaceholder}
              className="h-full w-full bg-card text-foreground"
              modules={{
                toolbar: [
                  [{ 'header': [1, 2, 3, false] }],
                  ['bold', 'italic', 'underline', 'strike', 'blockquote', 'code-block'],
                  [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
                  ['link', 'image'],
                  ['clean']
                ],
              }}
            />
          )}
          {inputType === 'markdown' && (
            <Textarea
              id={inputId}
              value={markdownContent}
              onChange={(e) => setMarkdownContent(e.target.value)}
              placeholder={inputPlaceholder}
              className="absolute inset-0 w-full h-full resize-none font-mono text-sm bg-card border-none rounded-md p-3 overflow-y-auto text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={inputLabel}
            />
          )}
          {inputType === 'html' && (
            <Textarea
              id={inputId}
              value={rawHtmlContent}
              onChange={(e) => setRawHtmlContent(e.target.value)}
              placeholder={inputPlaceholder}
              className="absolute inset-0 w-full h-full resize-none font-mono text-sm bg-card border-none rounded-md p-3 overflow-y-auto text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label={inputLabel}
            />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InputPanel; 