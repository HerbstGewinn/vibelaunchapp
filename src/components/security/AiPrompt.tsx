import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Clipboard, Check } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface AiPromptProps {
  toolName: string;
  prompt: string;
}

export const AiPrompt: React.FC<AiPromptProps> = ({ toolName, prompt }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prompt);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
  };

  return (
    <div className="mt-3 p-4 bg-launch-dark-2 rounded-md border border-gray-700 relative">
      <h4 className="text-sm font-semibold text-white mb-2">Prompt for {toolName}</h4>
      <pre className="text-xs text-gray-300 whitespace-pre-wrap font-mono bg-transparent p-0 border-0">
        <code>{prompt}</code>
      </pre>
      <TooltipProvider delayDuration={100}>
        <Tooltip open={copied ? true : undefined}>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 h-6 w-6 text-gray-400 hover:text-white hover:bg-gray-700"
              onClick={handleCopy}
            >
              {copied ? <Check className="h-4 w-4 text-green-500" /> : <Clipboard className="h-4 w-4" />}
            </Button>
          </TooltipTrigger>
          <TooltipContent className="bg-launch-dark border-gray-700 text-white">
            <p>{copied ? "Copied!" : "Copy prompt"}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
}; 