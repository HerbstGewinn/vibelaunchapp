import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, PlayCircle, Shield, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TodoList } from '@/components/common/TodoList';

const Security = () => {
  const securityItems = [
    { text: "Row Level Security (RLS) enabled on all tables", completed: false },
    { text: "API keys not exposed in client code", completed: false },
    { text: "Authentication properly implemented", completed: false },
    { text: "Environment variables secured", completed: false },
    { text: "CORS policies configured", completed: false },
    { text: "Content Security Policy (CSP) configured", completed: false },
    { text: "Sensitive data encrypted", completed: false },
    { text: "Regular security updates applied", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Security Audit</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Ensure your application follows security best practices and doesn't expose sensitive information.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Security Checklist</CardTitle>
            <CardDescription>Current security status of your application</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={securityItems} taskId="setup_security" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Security Report</CardTitle>
            <CardDescription>Results from your most recent security audit</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex flex-col items-center justify-center text-center">
            <Shield className="h-16 w-16 text-launch-cyan mb-4" />
            <p className="text-white text-lg font-medium">No security audit has been run yet</p>
            <p className="text-launch-text-muted mt-2 max-w-md">
              Run a security audit to scan your GitHub repository for potential security issues and get detailed recommendations.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Security Best Practices</CardTitle>
            <CardDescription>Follow these guidelines to secure your application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Row Level Security (RLS)</h3>
                <p className="text-launch-text-muted text-sm">
                  Enable RLS on all Supabase tables and create policies to restrict data access based on user ID.
                </p>
                <a 
                  href="https://supabase.com/docs/guides/auth/row-level-security" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">API Key Security</h3>
                <p className="text-launch-text-muted text-sm">
                  Never expose sensitive API keys in client-side code. Use Edge Functions to make authenticated requests.
                </p>
                <a 
                  href="https://supabase.com/docs/guides/functions" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Authentication</h3>
                <p className="text-launch-text-muted text-sm">
                  Implement proper authentication flow with Supabase Auth and protect routes that require authentication.
                </p>
                <a 
                  href="https://supabase.com/docs/guides/auth" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Environment Variables</h3>
                <p className="text-launch-text-muted text-sm">
                  Store sensitive information in environment variables and never commit them to your repository.
                </p>
                <a 
                  href="https://vercel.com/docs/concepts/projects/environment-variables" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Security;
