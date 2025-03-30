
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Copy, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";

const Deployment = () => {
  const { toast } = useToast();
  
  const todoItems = [
    { text: "Initialize Git repository", completed: false },
    { text: "Connect repository to GitHub", completed: false },
    { text: "Create Vercel account", completed: false },
    { text: "Import GitHub repository to Vercel", completed: false },
    { text: "Configure environment variables", completed: false },
    { text: "Set up custom domain (if applicable)", completed: false },
    { text: "Configure build settings", completed: false },
    { text: "Deploy application", completed: false },
  ];

  const copyPrompt = () => {
    const promptText = document.getElementById('deployment-prompt-text')?.textContent;
    if (promptText) {
      navigator.clipboard.writeText(promptText);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard",
      });
    }
  };
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Deployment</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Deploy your application to production using GitHub and Vercel for continuous deployment.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Todo Checklist
            </CardTitle>
            <CardDescription>Track your deployment progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-2 p-2 rounded-md hover:bg-launch-dark/50 transition-colors">
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <span className="text-white">{item.text}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2 hover:bg-launch-cyan hover:text-black transition-colors">
              Save Progress <CheckCircle className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn how to deploy with Vercel</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-br from-black/80 to-gray-800/80 rounded-md flex items-center justify-center border border-gray-800 h-full group cursor-pointer">
                <PlayCircle className="h-16 w-16 text-launch-cyan/70 group-hover:text-launch-cyan group-hover:scale-110 transition-all" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-launch-cyan" />
              Documentation
            </CardTitle>
            <CardDescription>Official GitHub and Vercel resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "GitHub Quickstart", url: "https://docs.github.com/en/get-started/quickstart" },
              { title: "Vercel Documentation", url: "https://vercel.com/docs" },
              { title: "Deploying React with Vercel", url: "https://vercel.com/guides/deploying-react-with-vercel" },
              { title: "Environment Variables Guide", url: "https://vercel.com/docs/concepts/projects/environment-variables" }
            ].map((item, index) => (
              <a 
                key={index}
                href={item.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-launch-cyan/0 via-launch-cyan/5 to-launch-cyan/0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                <span className="text-white z-10">{item.title}</span>
                <ExternalLink className="h-4 w-4 text-launch-cyan z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-launch-cyan/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="h-5 w-5 text-launch-cyan" />
              LLM Prompt Example
            </CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div id="deployment-prompt-text" className="bg-launch-dark/80 p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono relative shadow-inner">
              <p>Help me configure continuous deployment for my React application with:</p>
              <br />
              <p>1. GitHub repository setup with proper branching strategy</p>
              <p>2. Vercel project configuration for preview deployments</p>
              <p>3. Environment variable management for development and production</p>
              <p>4. Custom domain setup with SSL</p>
              <p>5. Build optimization for faster deployments</p>
              <p>6. Deployment protection and rollback strategies</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-end">
            <Button 
              variant="outline" 
              className="flex items-center gap-2 bg-gradient-to-r from-launch-cyan/10 to-transparent hover:from-launch-cyan/20 hover:to-transparent border-launch-cyan/50"
              onClick={copyPrompt}
            >
              <Copy className="h-4 w-4" />
              Copy Prompt
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Deployment;
