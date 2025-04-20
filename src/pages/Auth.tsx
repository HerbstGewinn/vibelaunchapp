import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useToast } from "@/hooks/use-toast";
import AuthDesigns from '@/components/auth/AuthDesigns';
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';

const Auth = () => {
  const { toast } = useToast();
  
  const todoItems = [
    { text: "Setup Supabase project", completed: false },
    { text: "Enable Auth Providers (Email, Google)", completed: false },
    { text: "Visit Google Bigcloud, configure redirect URLs", completed: false },
    { text: "Choose a Sign In Template & run the prompt", completed: false },
    { text: "Setup Auth flow", completed: false },
    { text: "Test Auth Flow End to End", completed: false }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-launch-cyan to-white bg-clip-text text-transparent">
          Authentication
        </h1>
        <p className="text-launch-text-muted max-w-3xl">
          Set up authentication for your application using Supabase Auth. Follow the checklist and resources below to get started.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Authentication Checklist
            </CardTitle>
            <CardDescription>Track your progress with authentication setup</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={todoItems} taskId="setup_auth" category="auth" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn how to implement Supabase Auth</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-br from-black/80 to-gray-800/80 rounded-md flex items-center justify-center border border-gray-800 h-full group cursor-pointer">
                <PlayCircle className="h-12 w-12 md:h-16 md:w-16 text-launch-cyan/70 group-hover:text-launch-cyan group-hover:scale-110 transition-all" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>

      <AuthDesigns />
      
      <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow w-full">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <ExternalLink className="h-5 w-5 text-launch-cyan" />
            Documentation
          </CardTitle>
          <CardDescription>Official Supabase Auth resources</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
              <span className="text-white z-10">{item.title}</span>
              <ExternalLink className="h-4 w-4 text-launch-cyan z-10 group-hover:translate-x-1 transition-transform" />
            </a>
          ))}
        </CardContent>
      </Card>
      <PageFeedback category="auth" />
    </div>
  );
};

export default Auth;
