
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, Rocket, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import { TodoList } from '@/components/common/TodoList';

const Launch = () => {
  const launchItems = [
    { text: "All features completed and tested", completed: false },
    { text: "SEO optimization completed", completed: false },
    { text: "Analytics tracking implemented", completed: false },
    { text: "Error tracking configured", completed: false },
    { text: "Documentation updated", completed: false },
    { text: "Performance optimization completed", completed: false },
    { text: "Launch announcement prepared", completed: false },
    { text: "Launch platforms selected", completed: false },
  ];
  
  const launchPlatforms = [
    { 
      name: "Reddit", 
      description: "Share in relevant subreddits",
      link: "https://www.reddit.com/",
      icon: "🔴",
      hasDropdown: true,
      communities: [
        "r/SideProject",
        "r/Startup",
        "r/WebDev",
        "r/Programming",
        "r/TechStartups",
        "r/IndieHackers",
        "r/Entrepreneur",
        "r/SaaS",
        "r/AlphaAndBetaUsers",
        "r/IMadeThis"
      ]
    },
    { 
      name: "Twitter/X", 
      description: "Create a launch thread",
      link: "https://twitter.com/",
      icon: "𝕏",
      hasDropdown: true,
      communities: [
        "#BuildInPublic",
        "#IndieHackers",
        "#NoCode",
        "#MakerCommunity",
        "#SideProject",
        "#ProductLaunch",
        "#IndieDevs",
        "#TechTwitter",
        "#StartupLife",
        "#DevCommunity"
      ]
    },
    { 
      name: "Online Directories", 
      description: "List in tech directories",
      link: "https://alternativeto.net/",
      icon: "📖",
      hasDropdown: true,
      communities: [
        "AlternativeTo",
        "BetaList",
        "Launching Next",
        "StartupStash",
        "SaaSHub",
        "GetApp",
        "Capterra",
        "G2 Crowd",
        "StackShare",
        "SaaSworthy"
      ]
    },
    { 
      name: "Discord Communities", 
      description: "Share in relevant tech servers",
      link: "https://discord.com/",
      icon: "🎮",
      hasDropdown: true,
      communities: [
        "Indie Hackers",
        "Dev.to",
        "Startup Grind",
        "Product School",
        "Startup Club",
        "Maker's Kitchen",
        "Launch Club",
        "SaaS Growth Hub",
        "Tech Founders",
        "Builder Space"
      ]
    },
    { 
      name: "Product Hunt", 
      description: "Reach tech-savvy early adopters",
      link: "https://www.producthunt.com/",
      icon: "🏠",
      hasDropdown: false
    },
    { 
      name: "Hacker News", 
      description: "Share your Show HN post",
      link: "https://news.ycombinator.com/",
      icon: "🔶",
      hasDropdown: false
    },
    { 
      name: "LinkedIn", 
      description: "Share with professional network",
      link: "https://www.linkedin.com/",
      icon: "🔵",
      hasDropdown: false
    }
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">Launch Preparation</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Prepare your application for launch with a comprehensive checklist and platform strategy.
      </p>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Launch Checklist</CardTitle>
            <CardDescription>Track your launch preparation progress</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={launchItems} taskId="setup_launch" category="launch" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Tutorial Video</CardTitle>
            <CardDescription>Learn about successful product launches</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="aspect-video bg-black/30 rounded-md flex items-center justify-center border border-gray-800">
              <PlayCircle className="h-16 w-16 text-launch-cyan/50" />
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-launch-card-bg border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Launch Platforms</CardTitle>
          <CardDescription>Recommended platforms for announcing your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {launchPlatforms.map((platform, index) => (
              <div 
                key={index} 
                className={`p-4 bg-launch-dark rounded-md border transition-all duration-200 ${
                  platform.hasDropdown 
                    ? 'border-launch-cyan hover:border-launch-cyan/80' 
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="text-2xl">{platform.icon}</div>
                  <div className="flex-1">
                    <h3 className="text-white font-medium">{platform.name}</h3>
                    <p className="text-launch-text-muted text-sm">{platform.description}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <a 
                        href={platform.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-launch-cyan text-xs flex items-center hover:underline"
                      >
                        Visit platform <ExternalLink className="h-3 w-3 ml-1" />
                      </a>
                      {platform.hasDropdown && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button 
                              variant="outline" 
                              size="sm"
                              className="text-xs bg-launch-cyan/10 border-launch-cyan/20 hover:bg-launch-cyan/20"
                            >
                              View Communities
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="w-56 bg-launch-dark border-gray-800">
                            {platform.communities.map((community, idx) => (
                              <DropdownMenuItem 
                                key={idx}
                                className="text-sm text-white hover:bg-launch-cyan/10"
                              >
                                {community}
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      
      <Card className="bg-launch-card-bg border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Successful Launch Examples</CardTitle>
          <CardDescription>Learn from these well-executed product launches</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Notion Product Hunt Launch</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Notion's launch featured a clear value proposition, engaging demo video, and active founder participation in comments.
              </p>
              <a 
                href="https://www.producthunt.com/products/notion" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
              >
                View example <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Figma Twitter Launch Thread</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Figma's launch thread highlighted key features with GIFs, customer testimonials, and a clear call-to-action.
              </p>
              <a 
                href="https://twitter.com/figma" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
              >
                View example <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Vercel Show HN Post</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Vercel (formerly Zeit) launched with a technical deep-dive that resonated with the Hacker News community.
              </p>
              <a 
                href="https://news.ycombinator.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
              >
                View example <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
            <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
              <h3 className="text-white font-medium">Supabase Reddit Launch</h3>
              <p className="text-launch-text-muted text-sm mt-1">
                Supabase launched with a developer-focused post in r/webdev that emphasized open-source and Firebase alternative positioning.
              </p>
              <a 
                href="https://www.reddit.com/r/webdev/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
              >
                View example <ExternalLink className="h-3 w-3 ml-1" />
              </a>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Launch;
