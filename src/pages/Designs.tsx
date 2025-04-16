
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Copy, Check, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const designTemplates = [
  {
    id: 1,
    title: "Minimalistic Glassmorphism",
    description: "Translucent elements, soft gradients, blur effects, subtle shadows",
    demoUrl: "#",
    style: "glassmorphism",
    prompt: "Create a component using minimalistic glassmorphism design. Use translucent panels with 10-20% opacity, soft white/blue gradients, and subtle blur effects (backdrop-filter: blur(10px)). Add thin borders with low opacity and gentle box-shadows. Text should be high contrast with the background. Implement hover states that slightly increase transparency and glow. The overall aesthetic should be clean, modern, and lightweight."
  },
  {
    id: 2,
    title: "Neo-Brutalism",
    description: "Bold typography, high contrast, raw edges, animated type",
    demoUrl: "#",
    style: "brutalism",
    prompt: "Design a neo-brutalist component with bold, oversized typography (font-weight: 800) and high contrast colors. Use raw, unrefined edges with thick, visible borders (3-5px solid). Incorporate deliberate misalignments or asymmetry in the layout. Text should be in sans-serif fonts like Helvetica or Arial. Add hover animations that are intentionally abrupt rather than smooth. Include bold background colors with no gradients. The aesthetic should feel raw, honest, and deliberately unpolished."
  },
  {
    id: 3,
    title: "Immersive 3D Scroll",
    description: "Scroll-based 3D object animations, immersive narrative UI",
    demoUrl: "#",
    style: "immersive3d",
    prompt: "Create a component with immersive 3D scroll-triggered animations. Use perspective transformations and CSS 3D transforms for depth. Implement scroll-based animations where elements rotate, scale, or move in 3D space as the user scrolls. Link animation progress directly to scroll position using IntersectionObserver. Create a narrative flow where content reveals sequentially. Consider using libraries like Three.js or vanilla CSS 3D transforms for the 3D effects. The experience should feel cinematic and engage users through scroll interaction."
  },
  {
    id: 4,
    title: "Retro-Futuristic Synthwave",
    description: "Neon colors, grids, glitch animations, VHS aesthetics",
    demoUrl: "#",
    style: "synthwave",
    prompt: "Design a retro-futuristic synthwave component with neon colors (hot pink #ff6ec7, electric blue #00d9ff, and purple #b967ff). Use dark backgrounds with bright grid patterns that fade into the horizon. Implement scanline effects (linear repeating gradients) and subtle VHS glitch animations using CSS keyframes. Include elements that glow with text-shadow and box-shadow. Typography should use retrofuturistic fonts like 'Outrun future' or 'Chakra Petch'. Create a nostalgic 80s aesthetic that still feels futuristic."
  },
  {
    id: 5,
    title: "Interactive Collage & Scrapbook",
    description: "Tactile elements, layered textures, interactive collage-style content",
    demoUrl: "#",
    style: "collage",
    prompt: "Create an interactive collage/scrapbook component with layered elements at different z-indices. Use paper textures, tape elements, and subtle drop shadows to create depth. Position elements with slight rotations (transform: rotate()) to appear handplaced. Implement hover states that lift elements slightly. Consider subtle parallax effects for depth. Add interactive elements like flip animations or draggable pieces. Typography should include handwritten-style fonts and appear to be pasted onto the background. The aesthetic should feel tactile, personal, and handcrafted."
  },
  {
    id: 6,
    title: "Cyberpunk Digital Interface",
    description: "Dark interface, neon highlights, HUD-style interactivity, futuristic micro-animations",
    demoUrl: "#",
    style: "cyberpunk",
    prompt: "Design a cyberpunk digital interface component with a dark background and neon accent colors (cyan #00ffd5, pink #ff0055). Create HUD-style elements with thin borders and minimal backgrounds. Add scanline effects (linear-gradient) at 10-15% opacity. Implement glitch animations using CSS clip-path and transforms on hover. Use monospace fonts like 'Share Tech Mono' for data displays. Include micro-animations for all state changes. Consider adding animated data flows using repeating gradients. The interface should feel high-tech, slightly dystopian, and inspired by sci-fi interfaces."
  }
];

const Designs = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);

  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const getCardClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "border border-white/20 bg-white/10 backdrop-blur-md shadow-lg";
      case 'brutalism':
        return "border-4 border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
      case 'immersive3d':
        return "bg-gradient-to-br from-purple-900 to-blue-900 shadow-xl";
      case 'synthwave':
        return "bg-gradient-to-b from-purple-900 via-violet-800 to-indigo-900 border border-pink-500";
      case 'collage':
        return "bg-amber-50 shadow-md rotate-1";
      case 'cyberpunk':
        return "bg-gray-900 border border-cyan-500 shadow-[0_0_15px_rgba(0,255,213,0.4)]";
      default:
        return "bg-launch-dark border-gray-800";
    }
  };

  const getTitleClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "text-white font-light tracking-wide";
      case 'brutalism':
        return "text-black font-extrabold text-2xl uppercase";
      case 'immersive3d':
        return "text-white font-semibold";
      case 'synthwave':
        return "text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-cyan-400 font-bold";
      case 'collage':
        return "text-gray-800 font-medium rotate-[-1deg] font-serif";
      case 'cyberpunk':
        return "text-cyan-400 font-mono tracking-wider";
      default:
        return "text-white";
    }
  };

  const getDescriptionClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "text-white/70";
      case 'brutalism':
        return "text-black font-bold";
      case 'immersive3d':
        return "text-blue-200";
      case 'synthwave':
        return "text-pink-200";
      case 'collage':
        return "text-gray-700 font-serif italic rotate-[-0.5deg]";
      case 'cyberpunk':
        return "text-gray-400 font-mono text-sm";
      default:
        return "";
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Design <span className="text-launch-cyan">Templates</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Explore our collection of design templates with different styling approaches
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {designTemplates.map((template) => (
          <Card 
            key={template.id} 
            className={cn(
              "transition-all duration-300 hover:scale-[1.02]",
              getCardClassName(template.style)
            )}
          >
            <CardHeader>
              <CardTitle className={getTitleClassName(template.style)}>{template.title}</CardTitle>
              <CardDescription className={getDescriptionClassName(template.style)}>
                {template.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={cn(
                "relative rounded-lg overflow-hidden border", 
                template.style === 'brutalism' ? "border-black" : "border-gray-800"
              )}>
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-16 h-16 rounded-full hover:scale-105 transition-transform"
                    >
                      <PlayCircle className={cn(
                        "w-16 h-16", 
                        template.style === 'brutalism' ? "text-black" : "text-launch-cyan"
                      )} />
                    </Button>
                  </div>
                  <div className={cn(
                    "absolute inset-0", 
                    template.style !== 'brutalism' && "bg-gradient-to-t from-black/50 to-transparent"
                  )} />
                </AspectRatio>
              </div>
              <div className="mt-4">
                <h4 className={cn(
                  "text-sm font-medium mb-2", 
                  template.style === 'brutalism' ? "text-black" : "text-white"
                )}>
                  <Code className="w-4 h-4 inline mr-1" /> LLM Prompt
                </h4>
                <div className={cn(
                  "text-xs rounded p-3 relative max-h-24 overflow-y-auto",
                  template.style === 'brutalism' 
                    ? "bg-gray-200 text-black" 
                    : "bg-gray-900 text-gray-300 border border-gray-700"
                )}>
                  {template.prompt}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button 
                variant="outline" 
                size="sm" 
                className={cn(
                  "w-full text-xs gap-2",
                  template.style === 'brutalism' 
                    ? "bg-black text-white hover:bg-gray-800 border-0" 
                    : "border-gray-700"
                )}
                onClick={() => copyPrompt(template.id, template.prompt)}
              >
                {copiedId === template.id ? (
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
        ))}
      </div>
    </div>
  );
};

export default Designs;
