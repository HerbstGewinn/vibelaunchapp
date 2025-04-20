import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, PlayCircle, ChevronDown, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';

const Launch = () => {
  const [openPlatforms, setOpenPlatforms] = useState<number[]>([]);
  const togglePlatform = (index: number) => {
    setOpenPlatforms(current => current.includes(index) ? current.filter(i => i !== index) : [...current, index]);
  };
  const launchItems = [{
    text: "All features completed and tested",
    completed: false
  }, {
    text: "SEO optimization completed",
    completed: false
  }, {
    text: "Analytics tracking implemented",
    completed: false
  }, {
    text: "Error tracking configured",
    completed: false
  }, {
    text: "Documentation updated",
    completed: false
  }, {
    text: "Performance optimization completed",
    completed: false
  }, {
    text: "Launch announcement prepared",
    completed: false
  }, {
    text: "Launch platforms selected",
    completed: false
  }];
  const launchPlatforms = [{
    name: "Reddit",
    description: "Share in relevant subreddits",
    link: "https://www.reddit.com/",
    icon: "🔴",
    hasDropdown: true,
    communities: ["r/SideProject", "r/Startup", "r/WebDev", "r/Programming", "r/TechStartups", "r/IndieHackers", "r/Entrepreneur", "r/SaaS", "r/AlphaAndBetaUsers", "r/IMadeThis", "r/Launchmystartup", "r/microsaas", "r/chatgptcoding", "r/nocode", "r/lovable"]
  }, {
    name: "Twitter/X",
    description: "Create a launch thread",
    link: "https://twitter.com/",
    icon: "𝕏",
    hasDropdown: true,
    communities: ["#BuildInPublic", "#IndieSaaS", "#SaaS", "#NoCode", "Indie Hackers Community", "Product Hunt Makers Community", "SaaStr Community", "SaaS Growth Hacks", "Micro SaaS Founders", "#LaunchWeek"]
  }, {
    name: "Online Directories",
    description: "List in tech directories",
    link: "https://alternativeto.net/",
    icon: "📖",
    hasDropdown: true,
    communities: ["Theres an Ai for that", "AItechsuite", "topai.tools", "aimojo.io", "eliteai.tools", "alltopstartups.com", "Saasgenius", "betalist", "AlternativeTo", "BetaList", "Launching Next", "StartupStash", "SaaSHub", "GetApp", "Capterra", "G2 Crowd", "StackShare", "SaaSworthy"]
  }, {
    name: "Discord Communities",
    description: "Share in relevant tech servers",
    link: "https://discord.com/",
    icon: "🎮",
    hasDropdown: true,
    communities: ["Furlough", "Makerlog", "No Code Founders", "Lovable", "Indiehackers", "Saastr"]
  }, {
    name: "Product Hunt",
    description: "Reach tech-savvy early adopters",
    link: "https://www.producthunt.com/",
    icon: "🏠",
    hasDropdown: false
  }, {
    name: "Hacker News",
    description: "Share your Show HN post",
    link: "https://news.ycombinator.com/",
    icon: "🔶",
    hasDropdown: false
  }, {
    name: "LinkedIn",
    description: "Share with professional network",
    link: "https://www.linkedin.com/",
    icon: "🔵",
    hasDropdown: false
  }];
  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold inline-flex items-center gap-2">
          <span className="bg-gradient-to-r from-white via-launch-cyan to-white bg-clip-text text-transparent">
            Launch
          </span>
          <span className="text-launch-cyan animate-bounce">🚀</span>
        </h1>
        <p className="text-launch-text-muted max-w-3xl">
          Prepare your application for launch with a comprehensive checklist and platform strategy.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              Launch Checklist
            </CardTitle>
            <CardDescription>Track your launch preparation progress</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={launchItems} taskId="setup_launch" category="launch" />
          </CardContent>
        </Card>
      </div>
      
      <Card className="bg-launch-card-bg border-gray-800">
        <CardHeader>
          <CardTitle className="text-white">Launch Platforms</CardTitle>
          <CardDescription>Recommended platforms for announcing your product</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-4">
            {launchPlatforms.map((platform, index) => (
              <Collapsible 
                key={index} 
                open={openPlatforms.includes(index)} 
                onOpenChange={() => togglePlatform(index)} 
                className={`rounded-md transition-all duration-200 ${index < 4 ? 'border border-launch-cyan/40 hover:border-launch-cyan' : 'border border-gray-800 hover:border-gray-700'}`}
              >
                <CollapsibleTrigger asChild>
                  <div className="p-4 bg-launch-dark rounded-md w-full cursor-pointer">
                    <div className="flex items-center gap-3 justify-between">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{platform.icon}</div>
                        <div className="flex-1 text-left">
                          <h3 className="text-white font-medium">{platform.name}</h3>
                          <p className="text-launch-text-muted text-sm">{platform.description}</p>
                        </div>
                      </div>
                      <ChevronDown className={`h-5 w-5 text-launch-cyan transition-transform duration-200 ${openPlatforms.includes(index) ? 'rotate-180' : ''}`} />
                    </div>
                  </div>
                </CollapsibleTrigger>
                <CollapsibleContent className="p-4 bg-launch-dark/50">
                  <div className="flex flex-col gap-2">
                    <a 
                      href={platform.link} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="text-launch-cyan text-sm flex items-center hover:underline"
                    >
                      Visit platform <ExternalLink className="h-4 w-4 ml-1" />
                    </a>
                    {platform.hasDropdown && (
                      <div className="mt-2">
                        <h4 className="text-white text-sm font-medium mb-2">Recommended Communities</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          {platform.communities.map((community, idx) => (
                            <div key={idx} className="text-sm text-white/80 bg-launch-dark p-2 rounded border border-gray-800">
                              {community}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </CollapsibleContent>
              </Collapsible>
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
      <PageFeedback category="launch" />
    </div>
  );
};

export default Launch;
