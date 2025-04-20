
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Copy, Check } from 'lucide-react';
import { cn } from "@/lib/utils";
import { AuthDesignTemplate } from '@/types/auth-designs';
import { useToast } from "@/hooks/use-toast";
import AuthImagePreview from './AuthImagePreview';

interface AuthDesignCardProps {
  template: AuthDesignTemplate;
}

const AuthDesignCard = ({ template }: AuthDesignCardProps) => {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyPrompt = () => {
    navigator.clipboard.writeText(template.prompt);
    setCopied(true);
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const getPromptPreview = (prompt: string) => {
    const previewLength = 100;
    return prompt.length > previewLength 
      ? `${prompt.substring(0, previewLength)}...`
      : prompt;
  };

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:scale-[1.02]",
      template.style === 'glassmorphic' && "bg-white/10 backdrop-blur-md border-white/20",
      template.style === 'minimal' && "bg-launch-dark border-gray-800",
      template.style === 'modern' && "bg-gradient-to-br from-launch-dark-blue to-launch-dark border-launch-cyan/20"
    )}>
      <CardHeader>
        <CardTitle className="text-white">{template.title}</CardTitle>
        <CardDescription className="text-gray-400">{template.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <AuthImagePreview imageUrl={template.imageUrl} title={template.title} />
        <div className="bg-launch-dark/50 rounded-md p-3 text-sm text-gray-300 border border-gray-800">
          <pre className="whitespace-pre-wrap font-mono text-xs">
            {getPromptPreview(template.prompt)}
          </pre>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          variant="outline"
          className="w-full gap-2 border-gray-800 hover:bg-launch-cyan hover:text-black"
          onClick={copyPrompt}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" /> Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" /> Copy Prompt
            </>
          )}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default AuthDesignCard;
