
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

const Auth = () => {
  const todoItems = [
    { text: "Setup Supabase project", completed: false },
    { text: "Enable Auth providers (Email, Google, etc.)", completed: false },
    { text: "Configure redirect URLs", completed: false },
    { text: "Implement sign in component", completed: false },
    { text: "Implement sign up component", completed: false },
    { text: "Add auth guards to protected routes", completed: false },
    { text: "Test auth flow end to end", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Authentication Setup</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Set up authentication for your application using Supabase Auth. Follow the checklist and resources below to get started.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Todo Checklist</CardTitle>
            <CardDescription>Track your progress with authentication setup</CardDescription>
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
            <CardDescription>Learn how to implement Supabase Auth</CardDescription>
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
            <CardDescription>Official Supabase Auth resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <a 
              href="https://supabase.com/docs/guides/auth" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Supabase Auth Documentation</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://supabase.com/docs/guides/auth/social-login" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Social Login Setup</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan" />
            </a>
            <a 
              href="https://supabase.com/docs/reference/javascript/auth-signin" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors"
            >
              <span className="text-white">Auth API Reference</span>
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

export default Auth;
