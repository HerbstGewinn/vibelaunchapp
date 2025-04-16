import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle, Copy, Check, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
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
- Vite.JS for fast development and hot-reloading`
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
- Vite.JS (development & bundling)`
}, {
  id: 3,
  title: "Immersive 3D Scroll",
  description: "Scroll-based 3D object animations, immersive narrative UI",
  demoUrl: "#",
  style: "immersive3d",
  prompt: `Develop an immersive product showcase page using 3D Scroll-Triggered Storytelling. Each scroll interaction animates 3D objects, creating a cinematic narrative journey.

Components (use Three.js, GSAP ScrollTrigger, Vite.JS):
- 3D Product Journey: Scroll-triggered, realistic 3D object transformations—rotation, scaling, and repositioning—telling a visual product story (implemented with Three.js and GSAP ScrollTrigger).
- Interactive 3D Timeline: A timeline bar smoothly animating and highlighting milestones upon scrolling, with embedded 3D elements appearing at each key step.

Suggested Libraries:
- Three.js (for detailed 3D rendering)
- GSAP ScrollTrigger (scroll animations)
- Vite.JS (rapid setup & hot-reloading)`
}, {
  id: 4,
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
- Vite.JS (fast asset bundling)`
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
- Vite.JS (high-performance dev setup)`
}];
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
  return <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Design <span className="text-launch-cyan">Templates</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">Tired of your App looking too Generic ? Try out our variety of design prompts !</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {designTemplates.map(template => <Card key={template.id} className={cn("transition-all duration-300 hover:scale-[1.02]", getCardClassName(template.style))}>
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
                  <Code className="w-4 h-4 inline mr-1" /> LLM Prompt
                </h4>
                <div className={cn("text-xs rounded p-3 relative max-h-24 overflow-y-auto", template.style === 'brutalism' ? "bg-gray-200 text-black" : "bg-gray-900 text-gray-300 border border-gray-700")}>
                  {template.prompt}
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button variant="outline" size="sm" className={cn("w-full text-xs gap-2", template.style === 'brutalism' ? "bg-black text-white hover:bg-gray-800 border-0" : "border-gray-700")} onClick={() => copyPrompt(template.id, template.prompt)}>
                {copiedId === template.id ? <>
                    <Check className="w-4 h-4" /> Copied!
                  </> : <>
                    <Copy className="w-4 h-4" /> Copy Prompt
                  </>}
              </Button>
            </CardFooter>
          </Card>)}
      </div>
    </div>;
};
export default Designs;