
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Copy, Check, Code, LayoutTemplate, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const designTemplates = [{
  id: 1,
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
- Vite.JS for fast development and hot-reloading`,
  aboutPrompt: `Design a clean, minimalistic '/About' page using the Glassmorphism style, featuring softly blurred translucent panels and subtle gradient highlights. Include:
- A short, welcoming company/team introduction card with gentle hover interactions (MagicUI or Framer Motion).
- Beautiful translucent "team cards," each revealing team member info with smooth fade-in animations on hover.
- A background featuring subtle pastel gradients smoothly animating slowly over time.
- Include minimal, elegant typography (sans-serif, thin weights) and ample whitespace to emphasize clarity.`
}, {
  id: 2,
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
- Vite.JS (development & bundling)`,
  aboutPrompt: `Create an '/About' page in bold Neo-Brutalism style, embracing raw aesthetics with strong contrast and animated typography:
- Start with an oversized typographic header dramatically animating into view using GSAP (slide-in from sides or letter-by-letter animation).
- Present company/team information in large, bold paragraphs with intentionally irregular alignment and high-contrast backgrounds.
- Include dynamic hover effects for each "team member block," such as exaggerated shadow shifts, shape distortion, or animated borders (use 21st.dev or GSAP).
- Typography should be loud and attention-grabbing—think chunky fonts and stark color contrasts like black on white, yellow on black.`
}, {
  id: 3,
  title: "Animated Gradient Minimalism",
  description: "Smoothly animated gradients, clean typography, elegant interactions",
  demoUrl: "#",
  style: "gradient",
  prompt: `You're a skilled React frontend developer specializing in sleek, minimalistic interfaces using smooth gradient animations, React, Vite.JS, and Framer Motion.

Style:
Animated Gradient Minimalism. Smoothly animated gradients, clean typography, elegant and subtle interactions.

Components (Detailed):
- **Animated Gradient Hero Section**:
  A full-screen background gradient that smoothly transitions colors using CSS or SVG animations, paired with minimalist typography that gently fades and slides into view using Framer Motion.
- **Interactive Gradient Cards**:
  Beautiful, minimal cards featuring gradient border animations that smoothly shift and glow subtly upon hover, creating an elegant interactive experience using MagicUI or Framer Motion.

Suggested Libraries:
- **Framer Motion** (fluid UI animations)
- **MagicUI** (interactive gradient animations)
- **Vite.JS** (fast dev environment)

Generate production-ready, component-based React code with clear comments now.`,
  aboutPrompt: `Design an immersive, narrative-driven '/About' page leveraging scroll-triggered 3D storytelling techniques:
- Introduce a scrolling journey: as the user scrolls, smoothly animate 3D scenes (Three.js & GSAP ScrollTrigger) revealing key milestones of the company/team story in an engaging narrative.
- Showcase a central interactive 3D scene highlighting team members; clicking a member smoothly transitions camera focus, revealing their bio and achievements.
- Incorporate cinematic lighting and subtle particle effects (Three.js particle systems) that enhance the immersive atmosphere.
- Typography and text should smoothly fade-in, synchronized precisely with 3D scroll animations.`
}, {
  id: 4,
  title: "Retro Arcade Pixel UI",
  description: "Pixel-art visuals, arcade-inspired animations, vibrant retro palettes",
  demoUrl: "#",
  style: "retro-arcade",
  prompt: `You're an experienced React developer passionate about creating nostalgic retro arcade-style interfaces, utilizing pixel-art aesthetics, React, Vite.JS, and interactive animations.

Style:
Retro Arcade Pixel UI. Pixel-art visuals, arcade-inspired animations, vibrant retro color palettes.

Components (Detailed):
- **Pixel-Art Animated Hero Banner**:
  Animated title using pixel-art fonts and CSS sprite animations, triggered on page load. Implement subtle nostalgic "flicker" and retro color shifts using CSS keyframes or GSAP.
- **Interactive Arcade Buttons**:
  Retro-inspired pixel-art buttons featuring hover animations (color flashes, subtle scale effects), complete with authentic arcade button sounds triggered by interactions.

Suggested Libraries:
- **GSAP** (sprite and retro animations)
- **21st.dev** (interactive buttons)
- **Vite.JS** (efficient bundling)

Create modular, clean React/Vite.JS components with clear asset and animation management now.`,
  aboutPrompt: `Craft an '/About' page in nostalgic, neon-infused Synthwave style, rich with retro aesthetics:
- Neon-glow animated section titles that appear with subtle glitch animations (CSS/GLSL shaders, GSAP).
- Profile cards for each team member designed as retro-futuristic "cards" with neon grids behind them, animating with a slight VHS distortion effect on hover (21st.dev, GSAP).
- Background elements featuring animated neon grids or 80s-style geometric shapes subtly pulsing or moving to evoke the Synthwave era.
- Use bold, retro-futuristic typography with neon outlines and glow effects consistently throughout the page.`
}, {
  id: 5,
  title: "Fluid Liquid UI",
  description: "Organic, flowing visual effects with realistic liquid animations",
  demoUrl: "#",
  style: "fluid",
  prompt: `You're a frontend React developer specialized in fluid, organic UI animations utilizing React, Vite.JS, shaders, Three.js, and Framer Motion.

Style:
Fluid Liquid UI. Organic, flowing visual effects with realistic liquid animations, interactive fluid interactions, and smooth transitions.

Components (Detailed):
- **Interactive Liquid Canvas Background**:
  Full-page WebGL-based liquid/fluid simulation using Three.js shaders, subtly responding to cursor movements for immersive interactions. Ensure smooth, performance-optimized animations.
- **Liquid Animated Typography**:
  Visually captivating hero typography animated with liquid fill effects using GLSL shaders or SVG masks, transitioning fluidly and organically upon scroll or load.

Suggested Libraries:
- **Three.js** (fluid simulation & shaders)
- **Framer Motion** (interactive typography animation)
- **Vite.JS** (high performance)

Produce clearly structured, optimized React components with detailed inline explanations now.`,
  aboutPrompt: `Design an engaging, tactile '/About' page in Interactive Collage & Scrapbook style:
- Team bios presented as interactive, draggable scrapbook notes and Polaroid photos (Framer Motion, MagicUI).
- Allow users to rearrange and explore notes; each interactive element has tactile hover effects, such as subtle rotation or lift animation upon hover or drag.
- Background includes realistic textures—torn paper, masking tape, and sketches that animate subtly upon scrolling or hovering.
- Typography should resemble handwriting or typewriter fonts to reinforce the physical, handcrafted aesthetic.`
}, {
  id: 6,
  title: "Aurora Borealis Interactive Showcase",
  description: "Northern Lights-inspired visuals, mesmerizing animations",
  demoUrl: "#",
  style: "aurora",
  prompt: `You're a frontend developer specialized in creating visually stunning interactive experiences using React, Vite.JS, Three.js, and custom GLSL shaders.

Style:
Aurora Borealis Interactive Showcase. Northern Lights-inspired visuals, soft, mesmerizing animations, and visually immersive interactions.

Components (Detailed):
- **Aurora WebGL Canvas**:
  A Three.js/WebGL canvas realistically simulating Aurora Borealis using custom GLSL shaders, with smooth, subtle animations creating a hypnotic visual effect. The animation gently responds to user interactions, like cursor movement.
- **Interactive Aurora UI Cards**:
  Beautifully transparent info cards overlaying the Aurora background, smoothly revealing shimmering aurora gradients and gentle glowing text effects on hover using Framer Motion or MagicUI animations.

Suggested Libraries:
- **Three.js** (GLSL shader-based aurora visuals)
- **Framer Motion/MagicUI** (smooth interactions)
- **Vite.JS** (fast dev environment)

Generate detailed, modular React/Vite.JS code, clearly commented for easy implementation`,
  aboutPrompt: `Create a dynamic '/About' page inspired by Cyberpunk Digital Interface style with futuristic HUD elements:
- Begin with an animated neon HUD-style title header, flickering into existence using Three.js and GSAP.
- Display interactive team member profiles as HUD-style cards, outlined in neon highlights and glowing dynamically; hovering reveals futuristic animations and detailed data pop-ups (use Three.js with shader effects and GSAP animations).
- Background of the page should be dark, tech-inspired, animated subtly with moving circuitry lines or futuristic data grids.
- Typography must be sleek, digital-looking, using neon colors (cyan, magenta, electric blue) for highlights.`
}, {
  id: 7,
  title: "Retro-Futuristic Synthwave",
  description: "Neon colors, grids, glitch animations, VHS aesthetics",
  demoUrl: "#",
  style: "synthwave",
  prompt: `Create an immersive landing page using a nostalgic Retro-Futuristic Synthwave aesthetic, incorporating neon colors, grid patterns, glitch effects, and VHS-style interactions.

Components (Vite.JS, 21st.dev, CSS & GLSL shaders):
- Neon Glitch Headers: Vibrant neon-glow animated headlines incorporating intermittent glitch animations triggered randomly or upon interaction (CSS or shaders).
- Interactive VHS Buttons: Buttons with dynamic neon borders and glitch distortion upon hover/click, mimicking VHS tape rewind effects (use 21st.dev UI or custom CSS/GSAP).

Suggested Libraries:
- 21st.dev (interactive retro-styled UI components)
- GSAP (for VHS-style animations)
- Vite.JS (fast asset bundling)`,
  aboutPrompt: `Craft an '/About' page in nostalgic, neon-infused Synthwave style, rich with retro aesthetics:
- Neon-glow animated section titles that appear with subtle glitch animations (CSS/GLSL shaders, GSAP).
- Profile cards for each team member designed as retro-futuristic "cards" with neon grids behind them, animating with a slight VHS distortion effect on hover (21st.dev, GSAP).
- Background elements featuring animated neon grids or 80s-style geometric shapes subtly pulsing or moving to evoke the Synthwave era.
- Use bold, retro-futuristic typography with neon outlines and glow effects consistently throughout the page.`
}, {
  id: 8,
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
- Vite.JS (for rapid iteration)`,
  aboutPrompt: `Design an engaging, tactile '/About' page in Interactive Collage & Scrapbook style:
- Team bios presented as interactive, draggable scrapbook notes and Polaroid photos (Framer Motion, MagicUI).
- Allow users to rearrange and explore notes; each interactive element has tactile hover effects, such as subtle rotation or lift animation upon hover or drag.
- Background includes realistic textures—torn paper, masking tape, and sketches that animate subtly upon scrolling or hovering.
- Typography should resemble handwriting or typewriter fonts to reinforce the physical, handcrafted aesthetic.`
}, {
  id: 9,
  title: "Cyberpunk Digital Interface",
  description: "Dark interface, neon highlights, HUD-style interactivity, futuristic micro-animations",
  demoUrl: "#",
  style: "cyberpunk",
  prompt: `Create an advanced, futuristic dashboard page inspired by Cyberpunk Digital Interface style. Dark themes with neon highlights, sleek HUD-style panels, and futuristic micro-animations.

Components (Three.js, Vite.JS, GSAP, custom shaders):
- Animated Neon HUD Panel: Futuristic dashboard elements rendered in neon-glow with animated micro-interactions—panels dynamically expand or contract based on user clicks (Three.js with custom shader effects).
- Interactive Neon Widgets: Widgets visualizing data with animated neon bars, rings, and graphs; interactive behaviors include smooth hover highlighting and detailed pop-ups (use GSAP animations & 21st.dev UI).

Suggested Libraries:
- Three.js (advanced HUD rendering)
- GSAP (smooth neon micro-animations)
- 21st.dev (interactive UI components)
- Vite.JS (high-performance dev setup)`,
  aboutPrompt: `Create a dynamic '/About' page inspired by Cyberpunk Digital Interface style with futuristic HUD elements:
- Begin with an animated neon HUD-style title header, flickering into existence using Three.js and GSAP.
- Display interactive team member profiles as HUD-style cards, outlined in neon highlights and glowing dynamically; hovering reveals futuristic animations and detailed data pop-ups (use Three.js with shader effects and GSAP animations).
- Background of the page should be dark, tech-inspired, animated subtly with moving circuitry lines or futuristic data grids.
- Typography must be sleek, digital-looking, using neon colors (cyan, magenta, electric blue) for highlights.`
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
        return "border border-white/20 bg-white/10 backdrop-blur-md shadow-lg";
      case 'brutalism':
        return "border-4 border-black bg-white text-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]";
      case 'gradient':
        return "bg-gradient-to-br from-purple-500/70 to-pink-500/70 border border-white/20 shadow-lg";
      case 'retro-arcade':
        return "bg-indigo-900 border-2 border-yellow-400 shadow-[0_0_10px_rgba(234,179,8,0.6)]";
      case 'fluid':
        return "bg-gradient-to-r from-cyan-900/80 to-blue-900/80 border border-cyan-400/30 shadow-lg";
      case 'aurora':
        return "bg-gradient-to-br from-teal-900/70 to-purple-900/70 border border-teal-400/30 shadow-lg";
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
      case 'gradient':
        return "text-white font-medium tracking-wide";
      case 'retro-arcade':
        return "text-yellow-400 font-bold uppercase tracking-wider";
      case 'fluid':
        return "text-cyan-100 font-semibold tracking-wide";
      case 'aurora':
        return "text-teal-100 font-medium tracking-wide";
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
      case 'gradient':
        return "text-white/80";
      case 'retro-arcade':
        return "text-yellow-200";
      case 'fluid':
        return "text-cyan-200/80";
      case 'aurora':
        return "text-teal-200/80";
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
  
  const getPromptBackgroundClassName = (style: string) => {
    switch (style) {
      case 'glassmorphism':
        return "bg-gray-900/80 backdrop-blur-sm text-gray-300 border border-gray-700";
      case 'brutalism':
        return "bg-gray-200 text-black border-2 border-black";
      case 'gradient':
        return "bg-gray-900/80 backdrop-blur-sm text-gray-300 border border-white/20";
      case 'retro-arcade':
        return "bg-indigo-950 text-yellow-100 border border-yellow-400";
      case 'fluid':
        return "bg-gray-900/80 backdrop-blur-sm text-cyan-200 border border-cyan-500/30";
      case 'aurora':
        return "bg-gray-900/80 backdrop-blur-sm text-teal-200 border border-teal-500/30";
      case 'synthwave':
        return "bg-gray-900/90 backdrop-blur-sm text-pink-200 border border-pink-500/30";
      case 'collage':
        return "bg-amber-100 text-gray-800 border border-amber-300";
      case 'cyberpunk':
        return "bg-gray-950 text-cyan-300 border border-cyan-500/30 font-mono text-xs";
      default:
        return "bg-gray-900 text-gray-300 border border-gray-700";
    }
  };

  const getCopyButtonText = (template: typeof designTemplates[0], isAboutTab: boolean) => {
    if (isAboutTab) {
      return copiedId === template.id + 100 ? 'Copied!' : 'Copy About Prompt';
    }
    return copiedId === template.id ? 'Copied!' : 'Copy Design Prompt';
  };

  const handleCopyPrompt = (template: typeof designTemplates[0], isAboutTab: boolean) => {
    const prompt = isAboutTab ? template.aboutPrompt : template.prompt;
    const copyId = isAboutTab ? template.id + 100 : template.id;
    
    navigator.clipboard.writeText(prompt);
    setCopiedId(copyId);
    toast({
      title: `${isAboutTab ? 'About Prompt' : 'Design Prompt'} copied`,
      description: "The prompt has been copied to your clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopiedId(null), 2000);
  };
  
  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Design <span className="text-launch-cyan">Templates</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">Tired of your App looking too Generic? Try out our variety of design prompts!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {designTemplates.map(template => (
          <Card key={template.id} className={cn("transition-all duration-300 hover:scale-[1.02]", getCardClassName(template.style))}>
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
                <Tabs defaultValue="design" className="w-full">
                  <TabsList className={cn(
                    "w-full grid grid-cols-2 mb-2", 
                    template.style === 'brutalism' ? "bg-gray-200" : "bg-gray-800/50",
                    template.style === 'retro-arcade' && "bg-indigo-950",
                    template.style === 'synthwave' && "bg-purple-950"
                  )}>
                    <TabsTrigger 
                      value="design" 
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        template.style === 'brutalism' ? "data-[state=active]:bg-black data-[state=active]:text-white" : "",
                        template.style === 'retro-arcade' ? "data-[state=active]:bg-indigo-800 data-[state=active]:text-yellow-300" : "",
                        template.style === 'synthwave' ? "data-[state=active]:bg-purple-900 data-[state=active]:text-pink-300" : "",
                        template.style === 'gradient' ? "data-[state=active]:bg-purple-700/70 data-[state=active]:text-white" : "",
                        template.style === 'fluid' ? "data-[state=active]:bg-cyan-900/80 data-[state=active]:text-cyan-100" : "",
                        template.style === 'aurora' ? "data-[state=active]:bg-teal-900/80 data-[state=active]:text-teal-100" : "",
                        template.style === 'cyberpunk' ? "data-[state=active]:bg-gray-900 data-[state=active]:text-cyan-400" : ""
                      )}
                    >
                      <LayoutTemplate className="w-3.5 h-3.5" /> Design
                    </TabsTrigger>
                    <TabsTrigger 
                      value="about" 
                      className={cn(
                        "flex items-center gap-1 text-xs",
                        template.style === 'brutalism' ? "data-[state=active]:bg-black data-[state=active]:text-white" : "",
                        template.style === 'retro-arcade' ? "data-[state=active]:bg-indigo-800 data-[state=active]:text-yellow-300" : "",
                        template.style === 'synthwave' ? "data-[state=active]:bg-purple-900 data-[state=active]:text-pink-300" : "",
                        template.style === 'gradient' ? "data-[state=active]:bg-purple-700/70 data-[state=active]:text-white" : "",
                        template.style === 'fluid' ? "data-[state=active]:bg-cyan-900/80 data-[state=active]:text-cyan-100" : "",
                        template.style === 'aurora' ? "data-[state=active]:bg-teal-900/80 data-[state=active]:text-teal-100" : "",
                        template.style === 'cyberpunk' ? "data-[state=active]:bg-gray-900 data-[state=active]:text-cyan-400" : ""
                      )}
                    >
                      <Info className="w-3.5 h-3.5" /> About
                    </TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="design" className="mt-0">
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
                  </TabsContent>
                  
                  <TabsContent value="about" className="mt-0">
                    <h4 className={cn("text-sm font-medium mb-2", template.style === 'brutalism' ? "text-black" : "text-white")}>
                      <Info className="w-4 h-4 inline mr-1" /> About Page Prompt
                    </h4>
                    <ScrollArea 
                      className={cn(
                        "text-xs rounded relative group",
                        expandedPromptId === template.id + 100 ? "max-h-80" : "max-h-24", // Use different ID range for about prompts
                        getPromptBackgroundClassName(template.style),
                        "transition-all duration-300 ease-in-out",
                        "hover:ring-2 hover:ring-launch-cyan/50",
                        "cursor-pointer",
                        "transform hover:scale-[1.01]"
                      )}
                      clickable={true}
                      onContentClick={() => togglePromptExpansion(template.id + 100)} // Use different ID range for about prompts
                    >
                      <div className={cn(
                        "p-3 relative",
                        "after:content-['Click_to_expand'] after:absolute after:bottom-1 after:right-1",
                        "after:text-[0.6rem] after:text-launch-cyan/50 after:opacity-0",
                        "group-hover:after:opacity-100",
                        "transition-opacity duration-300"
                      )}>
                        {template.aboutPrompt}
                      </div>
                    </ScrollArea>
                  </TabsContent>
                </Tabs>
              </div>
            </CardContent>
            <CardFooter>
              <Tabs defaultValue="design" className="w-full">
                <TabsContent value="design" className="mt-0 p-0 w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "w-full text-xs gap-2", 
                      template.style === 'brutalism' 
                        ? "bg-black text-white hover:bg-gray-800 border-0" 
                        : template.style === 'retro-arcade' 
                          ? "bg-indigo-800 text-yellow-300 border-yellow-400 hover:bg-indigo-700"
                          : template.style === 'gradient'
                            ? "bg-purple-800/50 text-white border-white/30 hover:bg-purple-700/50"
                            : template.style === 'fluid'
                              ? "bg-blue-900/50 text-cyan-100 border-cyan-400/30 hover:bg-blue-800/50"
                            : template.style === 'aurora'
                              ? "bg-purple-900/50 text-teal-100 border-teal-400/30 hover:bg-purple-800/50"
                            : "border-gray-700"
                    )} 
                    onClick={() => handleCopyPrompt(template, false)}
                  >
                    {copiedId === template.id ? (
                      <>
                        <Check className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> {getCopyButtonText(template, false)}
                      </>
                    )}
                  </Button>
                </TabsContent>
                
                <TabsContent value="about" className="mt-0 p-0 w-full">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className={cn(
                      "w-full text-xs gap-2", 
                      template.style === 'brutalism' 
                        ? "bg-black text-white hover:bg-gray-800 border-0" 
                        : template.style === 'retro-arcade' 
                          ? "bg-indigo-800 text-yellow-300 border-yellow-400 hover:bg-indigo-700"
                          : template.style === 'gradient'
                            ? "bg-purple-800/50 text-white border-white/30 hover:bg-purple-700/50"
                            : template.style === 'fluid'
                              ? "bg-blue-900/50 text-cyan-100 border-cyan-400/30 hover:bg-blue-800/50"
                            : template.style === 'aurora'
                              ? "bg-purple-900/50 text-teal-100 border-teal-400/30 hover:bg-purple-800/50"
                            : "border-gray-700"
                    )} 
                    onClick={() => handleCopyPrompt(template, true)}
                  >
                    {copiedId === template.id + 100 ? (
                      <>
                        <Check className="w-4 h-4" /> Copied!
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" /> {getCopyButtonText(template, true)}
                      </>
                    )}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Designs;
