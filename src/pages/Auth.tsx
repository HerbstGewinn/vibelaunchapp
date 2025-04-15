import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import TweetCarousel from '@/components/auth/TweetCarousel';

const Auth = () => {
  const { toast } = useToast();

  const todoItems = [{
    text: "Setup Supabase project",
    completed: false
  }, {
    text: "Enable Auth providers (Email, Google, etc.)",
    completed: false
  }, {
    text: "Configure redirect URLs",
    completed: false
  }, {
    text: "Implement sign in component",
    completed: false
  }, {
    text: "Implement sign up component",
    completed: false
  }, {
    text: "Add auth guards to protected routes",
    completed: false
  }, {
    text: "Test auth flow end to end",
    completed: false
  }];

  const copyPrompt = () => {
    const promptText = document.getElementById('auth-prompt-text')?.textContent;
    if (promptText) {
      navigator.clipboard.writeText(promptText);
      toast({
        title: "Copied to clipboard",
        description: "The prompt has been copied to your clipboard"
      });
    }
  };

  return (
    <div className="p-4 md:p-6 space-y-4 md:space-y-6">
      <h1 className="text-2xl md:text-3xl font-bold text-launch-cyan">Authentication</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Set up authentication for your application using Supabase Auth. Follow the checklist and resources below to get started.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Todo Checklist
            </CardTitle>
            <CardDescription>Track your progress with authentication setup</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-3">
            {todoItems.map((item, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-2 p-2 rounded-md hover:bg-launch-dark/50 transition-colors"
              >
                <div className="mt-1 shrink-0">
                  {item.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <span className="text-white text-sm md:text-base">{item.text}</span>
              </div>
            ))}
          </CardContent>
          <CardFooter className="p-4 md:p-6">
            <Button 
              variant="outline" 
              className="w-full sm:w-auto flex items-center gap-2 hover:bg-launch-cyan hover:text-black transition-colors"
            >
              Save Progress 
              <CheckCircle className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn how to implement Supabase Auth</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-br from-black/80 to-gray-800/80 rounded-md flex items-center justify-center border border-gray-800 h-full group cursor-pointer">
                <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-launch-cyan/70 group-hover:text-launch-cyan group-hover:scale-110 transition-all" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>

      <div className="my-4 md:my-8">
        <TweetCarousel />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-launch-cyan" />
              Documentation
            </CardTitle>
            <CardDescription>Official Supabase Auth resources</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0 space-y-3">
            {[
              {
                title: "Supabase Auth Documentation",
                url: "https://supabase.com/docs/guides/auth"
              },
              {
                title: "Social Login Setup",
                url: "https://supabase.com/docs/guides/auth/social-login"
              },
              {
                title: "Auth API Reference",
                url: "https://supabase.com/docs/reference/javascript/auth-signin"
              }
            ].map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-launch-cyan/0 via-launch-cyan/5 to-launch-cyan/0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                <span className="text-white text-sm md:text-base z-10">{item.title}</span>
                <ExternalLink className="h-4 w-4 text-launch-cyan z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-launch-cyan/20 to-transparent rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl"></div>
          <CardHeader className="p-4 md:p-6">
            <CardTitle className="text-lg md:text-xl text-white flex items-center gap-2">
              <Copy className="h-5 w-5 text-launch-cyan" />
              LLM Prompt Example
            </CardTitle>
            <CardDescription>Copy and customize for your project</CardDescription>
          </CardHeader>
          <CardContent className="p-4 md:p-6 pt-0">
            <div id="auth-prompt-text" className="bg-launch-dark/80 p-4 rounded-md border border-gray-800 text-sm md:text-base text-gray-300 font-mono relative shadow-inner space-y-3">
              <p>Create a secure authentication system using Supabase Auth with the following features:</p>
              <br />
              <p>1. Email/password sign up with email verification</p>
              <p>2. Social login with Google and GitHub</p>
              <p>3. Password reset functionality</p>
              <p>4. Protected routes using auth guards</p>
              <p>5. User profile management</p>
              <p>6. Session persistence between page reloads</p>
            </div>
          </CardContent>
          <CardFooter className="p-4 md:p-6 flex justify-end">
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

export default Auth;
