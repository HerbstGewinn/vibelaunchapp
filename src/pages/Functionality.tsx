import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, PlayCircle, Lightbulb } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';

const Functionality = () => {
  const todoItems = [
    { text: "Define core features and user stories", completed: false },
    { text: "Create feature prioritization matrix", completed: false },
    { text: "Design user interface wireframes", completed: false },
    { text: "Plan database schema and relationships", completed: false },
    { text: "Set up development environment", completed: false },
    { text: "Implement core functionality MVP", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold relative">
          <span className="bg-gradient-to-r from-launch-cyan to-white bg-clip-text text-transparent">
            Functionality
          </span>
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-launch-cyan rounded-full animate-ping"></span>
        </h1>
        <p className="text-launch-text-muted max-w-3xl">
          Build and implement the core features that make your app valuable to users.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Functionality Checklist
            </CardTitle>
            <CardDescription>Track your feature development progress</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={todoItems} taskId="setup_functionality" category="functionality" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn feature development and implementation</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <video 
                className="w-full h-full rounded-md"
                controls
                preload="metadata"
              >
                <source 
                  src="https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/public-files//Launching%20Your%20SAS%20to%20the%20World%20(1).mp4" 
                  type="video/mp4" 
                />
                Your browser does not support the video tag.
              </video>
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
            <CardDescription>Essential resources for feature development</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Lean Startup Methodology", url: "https://theleanstartup.com/principles" },
              { title: "Design Thinking Process", url: "https://www.interaction-design.org/literature/topics/design-thinking" },
              { title: "User Persona Templates", url: "https://blog.hubspot.com/marketing/buyer-persona-research" },
              { title: "Market Research Guide", url: "https://blog.hubspot.com/marketing/how-to-do-market-research" }
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
      </div>
      <PageFeedback category="functionality" />
    </div>
  );
};

export default Functionality; 
