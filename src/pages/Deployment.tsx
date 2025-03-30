
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Github } from "lucide-react";
import { Button } from "@/components/ui/button";

const Deployment = () => {
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
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Deployment</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Deploy your application to production using GitHub and Vercel for continuous deployment.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Todo Checklist</CardTitle>
            <CardDescription>Track your deployment progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {todoItems.map((item, index) => (
              <div key={index} className="flex items-start space-x-2">
                <div className="mt-1">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-launch-cyan" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <span className="text-white">{item.text}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2">
              Save Progress <CheckCircle className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Tutorial Video</CardTitle>
            <CardDescription>Learn how to deploy with Vercel</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/30 rounded-md flex items-center justify-center border border-gray-800">
              <PlayCircle className="h-16 w-16 text-launch-cyan/50" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Documentation</CardTitle>
            <CardDescription>Official GitHub and Vercel resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="https://docs.github.com/en/get-started/quickstart" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">GitHub Quickstart</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://vercel.com/docs" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Vercel Documentation</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://vercel.com/guides/deploying-react-with-vercel" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Deploying React with Vercel</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://vercel.com/docs/concepts/projects/environment-variables" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Environment Variables Guide</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">LLM Prompt Example</CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="bg-launch-dark p-4 rounded-md border border-gray-800 text-sm text-gray-300 font-mono">
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
          <CardFooter>
            <Button variant="outline" className="flex items-center gap-2">
              Copy Prompt
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Deployment;
