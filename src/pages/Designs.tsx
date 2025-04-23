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
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/bold.mp4",
  style: "glassmorphism",
  prompt: `LaunchPad – blue‑gradient SaaS deploy landing page

You are a UI/IX designer

Goal
Generate a production‑ready Vite + React landing site for LaunchPad, a "one‑click deploy & scale" platform. Re‑create this visual pattern (no screenshot supplied):

Top‑nav: tiny logo, 4 text links, "Log in" ghost link.

Hero: full‑width deep‑blue gradient (#0047FF → #001BFF). Left: H1 (max‑w‑md), sub‑p, primary CTA (white text, #001BFF bg). Right: large browser‑frame screenshot, overlapped by a small dark terminal card.

Under hero: grey logo strip (e.g., GitHub, DigitalOcean…).

Feature blocks (white bg): every block = short heading + para (left) + tilted screenshot card (right). Alternate tilt rotate‑2 & -rotate‑2. Repeat 6 times; two blocks per row on lg, stacked on sm.

Between feature rows: skinny icon bar (3 icons + captions).

Security band: light‑grey backdrop; world‑map SVG on left, small screenshot on right; 4 bullet tiles beneath.

Scale band: same layout (heading + screenshot) but reversed.

Connect resources band (heading + two small tilted screenshots).

Testimonials grid: 3 × 2 quote cards (border, rounded, author avatar).

FAQ: plain list of 6 links columns.

Bottom CTA: identical blue gradient bar ("Ready to ship?" + CTA & ghost link).

Footer: 3 columns links + newsletter field; beneath, tiny social icons row.

Content max‑width max-w-7xl mx-auto px-6, huge vertical spacing, plenty of white space.

Stack & Deps

nginx
Copy
Edit
Vite (React template)
Tailwind CSS ^3  darkMode:'class'
lucide‑react      icons
framer‑motion     fade/slide in view
Tailwind Theme Add‑on

js
Copy
Edit
fontFamily:{display:['Poppins'],body:['Inter']},
colors:{primary:'#0047FF',primaryDark:'#001BFF',surface:'#ffffff',muted:'#6B7280'},
Components
Button bg-primaryDark text-white py-2 px-6 rounded-md shadow hover:bg-primary
Card border border-gray-200 rounded-lg shadow-md p-6 bg-surface
Add motion.div with initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}.

Deliverables

Full Vite project (index.html, /src/components/*).

tailwind.config.js, package.json.

README with pnpm i, pnpm dev, pnpm build.

Reproduce the described layout, blue gradients, tilted screenshots, and airy spacing exactly—change only copy & brand to LaunchPad.

make the landing page mobile responsive and make sure to replace all images and video spots with either placeholders or AI generated pictures`
}, {
  id: 2,
  title: "Dark Cosmos",
  description: "Space-themed dark mode SaaS interface with stellar accents",
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/dark%20cosmos.mp4",
  style: "glassmorphism",
  prompt: `OrbitHub – cosmic‑dark community landing page

You are a UI/UX Designer. 

Goal
Generate a production‑ready Vite + React landing page for OrbitHub, a private community for senior makers. Replicate this layout & style (no image supplied):

Dark, near‑black background

Soft "cosmic horizon" radial glow behind every main heading

Centered 900 px column, huge vertical spacing

Rounded cards (1 px #2A2A2A border, 12 px radius)

Lime accent #C6FF00 for CTAs & pricing highlight

Stack & Deps

nginx
Copy
Edit
Vite (React template)
Tailwind CSS ^3      darkMode:'class'
lucide‑react          icons
framer‑motion         scroll fades/slides
@headlessui/react     FAQ accordion
Tailwind Theme Snippet

js
Copy
Edit
fontFamily:{display:['Playfair Display'],body:['Inter'],mono:['JetBrains Mono']},
colors:{accent:'#C6FF00',surface:'#0A0A0A',card:'#141414',text:'#E6E6E6',muted:'#8B8B8B'},
boxShadow:{glow:'0 0 120px 60px rgba(102,132,255,.08)'}
Section Outline (keep order)

Hero – left: H1, sub‑p, lime CTA; right: 2×2 avatar card. Radial glow bg.

Mini nav row (text links).

Faces strip (4 circular avatars).

Community benefits – 3 feature cards.

Quote block inside oval glow.

Member carousel (5 tiles) + "Join waitlist".

"Why join" list (3 bullets) over blurred circle.

Video testimonial (video + text + CTA).

Tiers – 2‑column plan card (Free vs Pro).

Neon‑green pricing card + comparison list.

FAQ accordion (6 items).

Tweet‑wall social proof (12 masonry cards).

Final CTA banner (portrait + text + button, lime glow).

Wrap each section in max-w-5xl mx-auto px-6. Use motion.div initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}}.

Components
Button: bg-accent text-black px-6 py-2 rounded-full font-semibold hover:bg-accent/80.
Card: bg-card border border-[#2A2A2A] rounded-xl p-6 shadow-glow/10.

Deliverables

Source in /src (components per section)

tailwind.config.js, package.json

README with pnpm i, pnpm dev, pnpm build

Match the described visual hierarchy exactly—only copy and brand differ. 

make the landing page mobile responsive and fill every picture and video placeholder with an AI generated version or a plceholder. `
}, {
  id: 3,
  title: "Cosmic Beam",
  description: "Light trails and beam effects for modern SaaS platforms",
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/cosmic.mp4",
  style: "glassmorphism",
  prompt: `NovaHub – cosmic‑beam collaboration landing page"

You are a UI/UX designer. 

Goal
Ship a Vite + React landing site for NovaHub, an "everything‑app" for teams. Re‑create this layout & vibe (image not provided):

Hero – midnight backdrop, vertical neon beam in center. Left column: H1, sub‑p, solid CTA. Right: dark‑UI screenshot framed by thin luminous border.

Grey logo bar under hero.

Productivity section (white bg): H2, two rows of 3 tilted feature shots (dark cards, subtle glow).

"Work together" section (pale‑blue wash bg): large video‑call panel with glow, 3 bullet icons below.

Dark band – H2 "Sync with GitHub" + single glow‑border screenshot; beneath, 4 small feature tiles.

"MetaBrain" grid (white): heading, 8 small cards (stats/images).

Knowledge blog strip: left card, right image, paragraph, code block.

Final CTA – dark cosmic orb + "Join the Movement" text, bright CTA; footer links below.

All content max‑w‑7xl mx‑auto‑px‑6, huge vertical spacing.

Stack

nginx
Copy
Edit
Vite (React)
Tailwind CSS ^3   darkMode:'class'
lucide‑react       icons
framer‑motion      fade/slide
Theme additions (tailwind.config.js)

js
Copy
Edit
fontFamily:{display:['Sora'],body:['Inter']},
colors:{beam:'#3A7BFF',beamLight:'#5F9BFF',surface:'#0d0d0f',card:'#16171a',muted:'#6b7280'}
Snippets
Primary button bg-beam text-white px-6 py-2 rounded-md shadow hover:bg-beamLight
Glow frame ring-1 ring-beam/40 rounded-xl overflow-hidden
Motion: initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}}.

Deliverables

/src components per section

tailwind.config.js, package.json

README (pnpm i, pnpm dev, pnpm build)

Replicate the cosmic beam hero, glow‑border screenshots, alternating dark/white bands, and generous spacing—change only copy & brand to NovaHub.

Make the landing page mobile responsive and make sure that all pictures or videos are replaced by either placeholders or AI generated pictures.`
}, {
  id: 4,
  title: "Neo-Brutalism",
  description: "Bold typography, high contrast, raw edges, animated type",
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/creative.mp4",
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
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/glassy.mp4",
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
  videoUrl: "https://xnqbmtsphlduhxrkaopt.supabase.co/storage/v1/object/public/design-videos/gradient.mp4",
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
  const [playingVideoId, setPlayingVideoId] = useState<number | null>(null);
  const { toast } = useToast();
  
  // Create a ref map for multiple videos
  const videoRefs = React.useRef<{ [key: number]: HTMLVideoElement | null }>({});
  
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
  
  const toggleVideoPlayback = async (id: number) => {
    try {
      const videoElement = videoRefs.current[id];
      
      if (playingVideoId === id) {
        if (videoElement) {
          await videoElement.pause();
        }
        setPlayingVideoId(null);
      } else {
        // Pause any currently playing video
        if (playingVideoId && videoRefs.current[playingVideoId]) {
          await videoRefs.current[playingVideoId]?.pause();
        }
        
        if (videoElement) {
          await videoElement.play();
          setPlayingVideoId(id);
        }
      }
    } catch (error) {
      console.error('Error toggling video playback:', error);
    }
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

  const renderVideo = (template: typeof designTemplates[0]) => {
    return (
      <div className="relative rounded-lg overflow-hidden border border-launch-cyan/10 bg-launch-dark/50">
        <AspectRatio ratio={16 / 9}>
          <video
            ref={el => videoRefs.current[template.id] = el}
            src={template.videoUrl}
            className="w-full h-full object-cover"
            controls={playingVideoId === template.id}
            playsInline
            preload="metadata"
            autoPlay={playingVideoId === template.id}
            onClick={(e) => {
              e.stopPropagation();
              toggleVideoPlayback(template.id);
            }}
            onEnded={() => setPlayingVideoId(null)}
          />
          {playingVideoId !== template.id && (
            <div 
              className="absolute inset-0 flex items-center justify-center cursor-pointer bg-black/30"
              onClick={() => toggleVideoPlayback(template.id)}
            >
              <Button variant="ghost" size="icon" className="w-16 h-16 rounded-full hover:scale-105 transition-transform">
                <PlayCircle className="w-16 h-16 text-launch-cyan" />
              </Button>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-launch-dark/80 to-transparent pointer-events-none" />
        </AspectRatio>
      </div>
    );
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
            <Card key={template.id} className={cn(
              "transition-all duration-300 hover:scale-[1.02]",
              "bg-launch-dark-blue/50 backdrop-blur-sm",
              "border border-launch-cyan/20",
              "hover:border-launch-cyan/40 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            )}>
              <CardHeader>
                <CardTitle className="text-white font-light tracking-wide">{template.title}</CardTitle>
                <CardDescription className="text-gray-400">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderVideo(template)}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2 text-white">
                    <Code className="w-4 h-4 inline mr-1 text-launch-cyan" /> Design Prompt
                  </h4>
                  <ScrollArea 
                    className={cn(
                      "text-xs rounded relative group",
                      expandedPromptId === template.id ? "max-h-80" : "max-h-24",
                      "bg-launch-dark/60 backdrop-blur-sm text-gray-300",
                      "border border-launch-cyan/10",
                      "hover:border-launch-cyan/30",
                      "transition-all duration-300 ease-in-out",
                      "hover:ring-1 hover:ring-launch-cyan/20",
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
                    "bg-launch-dark/60 backdrop-blur-sm",
                    "border-launch-cyan/20",
                    "hover:border-launch-cyan/40",
                    "hover:bg-launch-dark/80",
                    "text-gray-300",
                    "hover:text-white",
                    "transition-all duration-300"
                  )} 
                  onClick={() => copyPrompt(template.id, template.prompt)}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4 text-launch-cyan" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-launch-cyan" /> Copy Design Prompt
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
          {designTemplates.slice(3).map((template) => (
            <Card key={template.id} className={cn(
              "transition-all duration-300 hover:scale-[1.02]",
              "bg-launch-dark-blue/50 backdrop-blur-sm",
              "border border-launch-cyan/20",
              "hover:border-launch-cyan/40 hover:shadow-[0_0_15px_rgba(0,229,255,0.1)]"
            )}>
              <CardHeader>
                <CardTitle className="text-white font-light tracking-wide">{template.title}</CardTitle>
                <CardDescription className="text-gray-400">{template.description}</CardDescription>
              </CardHeader>
              <CardContent>
                {renderVideo(template)}
                <div className="mt-4">
                  <h4 className="text-sm font-medium mb-2 text-white">
                    <Code className="w-4 h-4 inline mr-1 text-launch-cyan" /> Design Prompt
                  </h4>
                  <ScrollArea 
                    className={cn(
                      "text-xs rounded relative group",
                      expandedPromptId === template.id ? "max-h-80" : "max-h-24",
                      "bg-launch-dark/60 backdrop-blur-sm text-gray-300",
                      "border border-launch-cyan/10",
                      "hover:border-launch-cyan/30",
                      "transition-all duration-300 ease-in-out",
                      "hover:ring-1 hover:ring-launch-cyan/20",
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
                    "bg-launch-dark/60 backdrop-blur-sm",
                    "border-launch-cyan/20",
                    "hover:border-launch-cyan/40",
                    "hover:bg-launch-dark/80",
                    "text-gray-300",
                    "hover:text-white",
                    "transition-all duration-300"
                  )} 
                  onClick={() => copyPrompt(template.id, template.prompt)}
                >
                  {copiedId === template.id ? (
                    <>
                      <Check className="w-4 h-4 text-launch-cyan" /> Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 text-launch-cyan" /> Copy Design Prompt
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
