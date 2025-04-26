import React from 'react';
import { ExternalLink, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AiPrompt } from './AiPrompt'; // Assuming AiPrompt is in the same directory
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface SecurityTopicProps {
  title: string;
  checklistId: string; // To potentially link back to checklist item state
  description: string;
  risk: string;
  learnMoreUrl?: string;
  cursorPrompt?: string;
  lovablePrompt?: string;
}

export const SecurityTopic: React.FC<SecurityTopicProps> = ({
  title,
  description,
  risk,
  learnMoreUrl,
  cursorPrompt,
  lovablePrompt
}) => {
  return (
    <div className="p-4 bg-launch-dark rounded-md border border-gray-800 mb-4">
      <h3 className="text-white font-medium mb-2 flex items-center">
        {title}
        <TooltipProvider delayDuration={100}>
          <Tooltip>
            <TooltipTrigger asChild>
              <HelpCircle className="h-4 w-4 text-gray-400 ml-2 cursor-help" />
            </TooltipTrigger>
            <TooltipContent className="bg-launch-dark border-gray-700 text-white max-w-xs">
              <p className="text-sm font-semibold mb-1">Risk if not implemented:</p>
              <p className="text-xs">{risk}</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </h3>
      <p className="text-launch-text-muted text-sm mb-3">
        {description}
      </p>
      {learnMoreUrl && (
        <a
          href={learnMoreUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-launch-cyan text-xs flex items-center mb-3 hover:underline"
        >
          Learn more <ExternalLink className="h-3 w-3 ml-1" />
        </a>
      )}

      {(cursorPrompt || lovablePrompt) && (
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1" className="border-b-0">
            <AccordionTrigger className="text-xs text-launch-cyan hover:no-underline py-2 justify-start gap-1">
               AI Implementation Help
            </AccordionTrigger>
            <AccordionContent className="pt-2 pb-0">
              {cursorPrompt && <AiPrompt toolName="Cursor" prompt={cursorPrompt} />}
              {lovablePrompt && <AiPrompt toolName="Lovable" prompt={lovablePrompt} />}
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      )}
    </div>
  );
}; 