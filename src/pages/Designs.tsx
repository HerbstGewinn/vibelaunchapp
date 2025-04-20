import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Copy, Check, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';

const designTemplates = [{
  id: 1,
  title: "Gradient Deploy",
  description: "Modern, gradient-rich SaaS design with smooth transitions",
  demoUrl: "#",
  style: "glassmorphism",
  prompt: `Design a sophisticated SaaS landing page featuring vibrant gradients and smooth transitions.

Components (use Vite.JS, Framer Motion):
- Gradient Hero Section: Dynamic gradient backgrounds that subtly shift on scroll
- Feature Grid: Clean, modern cards with gradient accents and hover states
- CTAs: Bold gradient buttons with micro-interactions

Suggested Libraries:
- Framer Motion (for smooth transitions)
- Vite.JS (development & bundling)`
}, {
  id: 2,
  title: "Dark Cosmos",
  description: "Space-themed dark mode SaaS interface with stellar accents",
  demoUrl: "#",
  style: "glassmorphism",
  prompt: `Create a cosmic-themed SaaS dashboard with dark mode aesthetics and star-like particle effects.

Components (use Vite.JS, Three.js):
- Starfield Background: Subtle particle system creating a space-like atmosphere
- Dashboard Widgets: Dark glass cards with cosmic accent colors
- Navigation: Constellation-inspired menu with glowing highlights

Suggested Libraries:
- Three.js (for particle effects)
- Vite.JS (for development)`
}, {
  id: 3,
  title: "Cosmic Beam",
  description: "Light trails and beam effects for modern SaaS platforms",
  demoUrl: "#",
  style: "glassmorphism",
  prompt: `Design a modern SaaS platform with light beam effects and dynamic trails.

Components (use Vite.JS, GSAP):
- Light Trail Hero: Animated light beams that follow cursor movement
- Feature Cards: Clean designs with subtle beam accents
- Pricing Section: Dynamic beam highlights on hover

Suggested Libraries:
- GSAP (for beam animations)
- Vite.JS (for rapid development)`
}, {
  id: 4,
  title: "Neo-Brutalism",
  description: "Bold typography, high contrast, raw edges, animated type",
  demoUrl: "#",
  style: "brutalism",
  prompt: `Create an impactful, bold homepage using the Neo-Brutalism aesthetic, showcasing stark contrasts, animated typography, and edgy, raw layouts.

Components (use Vite.JS, GSAP animations, 21st.dev):
- Hero Typewriter Banner: Bold, oversized typography animating onto the screen with rhythmic typewriter effect and intentional glitches (use GSAP or anime.js).
- Interactive Button Set: High-contrast brutalist buttons with exaggerated hover interactions, including shape morphing and dynamic shadow animations (consider 21st.dev for rich UI interactions).

Suggested Libraries:
- GSAP (for bold typographic animations)
- 21st.dev (interactive buttons & rich micro-interactions)
- Vite.JS (development & bundling)`
}, {
  id: 5,
  title: "Interactive Collage & Scrapbook",
  description: "Tactile elements, layered textures, interactive collage-style content",
  demoUrl: "#",
  style: "collage",
  prompt: `Design a portfolio site using a creative Interactive Collage & Scrapbook style. The design should evoke tactile interactions, textured backgrounds, and draggable scrapbook elements.

Components (Vite.JS, MagicUI, Framer Motion):
- Draggable Image Collage: Interactive draggable image elements that users can move around, stack, and rearrange freely (Framer Motion or MagicUI's draggable component).
- Animated Scrapbook Testimonials: Hand-drawn styled testimonial cards appearing on scroll or hover, revealing handwritten text animations and subtle parallax movements (Framer Motion/MagicUI).

Suggested Libraries:
- Framer Motion (drag, drop, animation)
- MagicUI (smooth interactive behaviors)
- Vite.JS (for rapid iteration)`
}, {
  id: 6,
  title: "Minimalistic Glassmorphism",
  description: "Translucent elements, soft gradients, blur effects, subtle shadows",
  demoUrl: "#",
  style: "glassmorphism",
  prompt: `Design a highly interactive landing page using Minimalistic Glassmorphism. The layout features translucent cards with vibrant pastel gradients, subtle background blur effects, and delicate shadows.

Components (use Vite.JS, MagicUI, or similar):
- Interactive Glass Cards: Translucent, glass-effect information cards with gradient glow and animated micro-interactions—hovering over cards subtly shifts their tilt (consider MagicUI's tilt effect).
- Gradient Glass Navigation: A responsive navbar with blurred translucent glass background, featuring smooth expanding/collapsing menus upon interaction.

Suggested Libraries:
- MagicUI (for fluid animations and interactions)
- Vite.JS for fast development and hot-reloading`
}];

const Designs = () => {
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [expandedPromptId, setExpandedPromptId] = useState<number | null>(null);
  const { toast } = useToast();
  
  const copyPrompt = (id: number, prompt: string) => {
    navigator.clipboard.writeText(prompt);
    setCopiedId(id);
    toast({
      title: "Prompt copied",
      description: "The prompt has been copied to your clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  const togglePromptExpansion = (id: number) => {
    setExpandedPromptId(expandedPromptId === id ? null : id);
  };
  
  const getCardClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "border border-white/20 bg-white/10 backdrop-blur-md shadow-lg hover:shadow-xl transition-all";
      case 'brutalism':
        return "border-4 border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-1 hover:translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all";
      case 'collage':
        return "bg-launch-dark border border-gray-800 shadow-lg hover:shadow-xl hover:border-launch-cyan/30 transition-all";
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
      case 'collage':
        return "text-white font-medium tracking-wide";
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
      case 'collage':
        return "text-gray-300";
      default:
        return "text-gray-300";
    }
  };
  
  const getPromptBackgroundClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "bg-gray-900/80 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-launch-cyan/30";
      case 'brutalism':
        return "bg-gray-200 text-black border-2 border-black";
      case 'collage':
        return "bg-gray-900/80 backdrop-blur-sm text-gray-300 border border-gray-700 hover:border-launch-cyan/30";
      default:
        return "bg-gray-900 text-gray-300 border border-gray-700";
    }
  };

  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Design <span className="text-launch-cyan">Templates</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">Tired of your App looking too Generic? Try out our variety of design prompts!</p>
      </div>

      {/* SaaS Templates Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">
          SaaS <span className="text-launch-cyan">Templates</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {designTemplates.slice(0, 3).map(template => (
            <Card key={template.id} className={cn("transition-all duration-300", getCardClassName(template.style))}>
              <CardHeader>
                <CardTitle className={getTitleClassName(template.style)}>{template.title}</CardTitle>
                <CardDescription className={getDescriptionClassName(template.style)}>
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn("relative rounded-lg overflow-hidden border", template.style === 'brutalism' ? "border-black" : "border-gray-800")}>
                  <AspectRatio ratio={16 / 9}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full hover:scale-105 transition-transform">
                        <PlayCircle className={cn("w-16 h-16", template.style === 'brutalism' ? "text-black" : "text-launch-cyan")} />
                      </Button>
                    </div>
                    <div className={cn("absolute inset-0", template.style !== 'brutalism' && "bg-gradient-to-t from-black/50 to-transparent")} />
                  </AspectRatio>
                </div>
                <div className="mt-4">
                  <h4 className={cn("text-sm font-medium mb-2", template.style === 'brutalism' ? "text-black" : "text-white")}>
                    <Code className="w-4 h-4 inline mr-1" /> Design Prompt
                  </h4>
                  <ScrollArea 
                    className={cn(
                      "text-xs rounded relative group",
                      expandedPromptId === template.id ? "max-h-80" : "max-h-24",
                      getPromptBackgroundClassName(template.style),
                      "transition-all duration-300 ease-in-out",
                      "hover:ring-2 hover:ring-launch-cyan/50",
                      "cursor-pointer",
                      "transform hover:scale-[1.01]"
                    )}
                    clickable={true}
                    onContentClick={() => togglePromptExpansion(template.id)}
                  >
                    <div className={cn(
                      "p-3 relative",
                      "after:content-['Click_to_expand'] after:absolute after:bottom-1 after:right-1",
                      "after:text-[0.6rem] after:text-launch-cyan/50 after:opacity-0",
                      "group-hover:after:opacity-100",
                      "transition-opacity duration-300"
                    )}>
                      {template.prompt}
                    </div>
                  </ScrollArea>
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
                      : "bg-launch-dark border-gray-700 hover:border-launch-cyan/30 hover:bg-launch-dark/80"
                  )} 
                  onClick={() => copyPrompt(template.id, template.prompt)}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Design Prompt
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Creative Templates Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-white">
          Creative <span className="text-launch-cyan">Templates</span>
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {designTemplates.slice(3).map(template => (
            <Card key={template.id} className={cn("transition-all duration-300", getCardClassName(template.style))}>
              <CardHeader>
                <CardTitle className={getTitleClassName(template.style)}>{template.title}</CardTitle>
                <CardDescription className={getDescriptionClassName(template.style)}>
                  {template.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className={cn("relative rounded-lg overflow-hidden border", template.style === 'brutalism' ? "border-black" : "border-gray-800")}>
                  <AspectRatio ratio={16 / 9}>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full hover:scale-105 transition-transform">
                        <PlayCircle className={cn("w-16 h-16", template.style === 'brutalism' ? "text-black" : "text-launch-cyan")} />
                      </Button>
                    </div>
                    <div className={cn("absolute inset-0", template.style !== 'brutalism' && "bg-gradient-to-t from-black/50 to-transparent")} />
                  </AspectRatio>
                </div>
                <div className="mt-4">
                  <h4 className={cn("text-sm font-medium mb-2", template.style === 'brutalism' ? "text-black" : "text-white")}>
                    <Code className="w-4 h-4 inline mr-1" /> Design Prompt
                  </h4>
                  <ScrollArea 
                    className={cn(
                      "text-xs rounded relative group",
                      expandedPromptId === template.id ? "max-h-80" : "max-h-24",
                      getPromptBackgroundClassName(template.style),
                      "transition-all duration-300 ease-in-out",
                      "hover:ring-2 hover:ring-launch-cyan/50",
                      "cursor-pointer",
                      "transform hover:scale-[1.01]"
                    )}
                    clickable={true}
                    onContentClick={() => togglePromptExpansion(template.id)}
                  >
                    <div className={cn(
                      "p-3 relative",
                      "after:content-['Click_to_expand'] after:absolute after:bottom-1 after:right-1",
                      "after:text-[0.6rem] after:text-launch-cyan/50 after:opacity-0",
                      "group-hover:after:opacity-100",
                      "transition-opacity duration-300"
                    )}>
                      {template.prompt}
                    </div>
                  </ScrollArea>
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
                      : "bg-launch-dark border-gray-700 hover:border-launch-cyan/30 hover:bg-launch-dark/80"
                  )} 
                  onClick={() => copyPrompt(template.id, template.prompt)}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4" /> Copy Design Prompt
                    </>
                  )}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Designs;
