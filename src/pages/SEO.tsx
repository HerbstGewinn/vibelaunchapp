import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, ExternalLink, PlayCircle, Copy, Check } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from '@/hooks/use-toast';

const SEO = () => {
  const [copiedPrompt, setCopiedPrompt] = useState(false);
  const { toast } = useToast();

  const ssgPrompt = `#IMPLEMENT SSG (STATIC SITE GENERATION) EXACTLY AS PER THE BELOW WITHOUT DEVIATION

##FOLLOWING IMPLEMENTATION PROVIDE ME WITH INSTRUCTION ON HOW TO MANUALLY REPLACE/UPDATE THE EXISTING SCRIPTS NODE IN THE PACKAGE.JSON  INCLUDING ANY TRAILING COMMAS

# Added placeholder to insert rendered content
diff --git index.html index.html
--- index.html
+++ index.html
@@ -13 +13 @@
-    <div id="root"></div>
+    <div id="root"><!--app-html--></div>

# Added prerender script to generate static HTML
# NOTE THIS MUST BE .JS AS WILL BE RUN VIA NODE
diff --git prerender.js prerender.js
new file mode 100644
--- /dev/null
+++ prerender.js
@@ -0,0 +1,35 @@
+import fs from 'node:fs'
+import path from 'node:path'
+import URL from 'node:url'

+const __dirname = path.dirname(URL.fileURLToPath(import.meta.url))
+const toAbsolute = (p) => path.resolve(__dirname, p)

+const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
+const { render } = await import('./dist/server/entry-server.js')

+const routesToPrerender = fs
+  .readdirSync(toAbsolute('src/pages'))
+  .map((file) => {
+    const name = file.replace(/\.tsx$/, '').toLowerCase()
+    return name === 'index' ? ⁠ / ⁠ : ⁠ /${name} ⁠
+  })

+;(async () => {
+  for (const URL of routesToPrerender) {
+    const appHtml = render(URL);
+    const html = template.replace(⁠ <!--app-html--> ⁠, appHtml)

+    const filePath = ⁠ dist${URL === '/' ? '/index' : URL}.html ⁠
+    fs.writeFileSync(toAbsolute(filePath), html)
+    console.log('pre-rendered:', filePath)
+  }
+})()

# Removed BrowserRouter since SSR requires StaticRouter
diff --git src/App.tsx src/App.tsx
--- src/App.tsx
+++ src/App.tsx
@@ -6 +6 @@
-import { BrowserRouter, Routes, Route } from "react-router-dom";
+import { Routes, Route } from "react-router-dom";

@@ -20,11 +20,9 @@
-      <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/varieties" element={<Varieties />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </AnimatePresence>
-      </BrowserRouter> # Moved BrowserRouter to main.tsx for conditional usage

# Added entry-server.tsx to handle SSG rendering
diff --git src/entry-server.tsx src/entry-server.tsx
new file mode 100644
--- /dev/null
+++ src/entry-server.tsx
@@ -0,0 +1,14 @@
+import ReactDOMServer from 'react-dom/server';
+import { StaticRouter } from 'react-router-dom/server';
+import App from './App';

+export function render(url: string) {
+  const html = ReactDOMServer.renderToString(
+    <StaticRouter location={url}>
+      <App />
+    </StaticRouter>
+  );
+  
+  return html;
+}

# Added hydration for SSG and moved BrowserRouter to main.tsx
diff --git src/main.tsx src/main.tsx
--- src/main.tsx
+++ src/main.tsx
@@ -1 +1,2 @@
-import { createRoot } from 'react-dom/client'
+import { createRoot, hydrateRoot } from 'react-dom/client'
+import { BrowserRouter } from 'react-router-dom'

@@ -5 +6,12 @@
-createRoot(document.getElementById("root")!).render(<App />);
+const root = document.getElementById("root")!;
+const app = (
+  <BrowserRouter>
+    <App />
+  </BrowserRouter>
+);

+# Use hydration for SSR in production
+if (import.meta.env.PROD) {
+  hydrateRoot(root, app);
+} else {
+  createRoot(root).render(app);
+}

# Updated build script to support SSG and prerendering
# NOTE: PROVIDE INSTRUCTION ON HOW TO DO THIS MANUALLY AS THIS CANNOT BE IMPLEMENTED BY YOU
diff --git package.json package.json
--- package.json
+++ package.json
@@ -8 +8,4 @@
-    "build": "vite build",
+    "build": "npm run build:client && npm run build:server && npm run build:prerender",
+    "build:client": "vite build", # Builds the client-side app
+    "build:server": "vite build --ssr src/entry-server.tsx --outDir dist/server", # Builds the SSR entry point
+    "build:prerender": "node prerender"; # Runs prerendering to generate static pages`;

  const copyPrompt = () => {
    navigator.clipboard.writeText(ssgPrompt);
    setCopiedPrompt(true);
    toast({
      title: "Prompt copied",
      description: "The SSG prompt has been copied to your clipboard.",
      duration: 2000,
    });
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  const todoItems = [
    { text: "Meta tags set (Title, Meta Description)", completed: false },
    { text: "Run the Prompt for Static Site Generation (SSG)", completed: false },
    { text: "Generate Sitemap.xml with all indexable pages includeded", completed: false },
    { text: "Robots.txt created", completed: false },
    { text: "Mobile-friendly", completed: false },
    { text: "Fast loading", completed: false },
    { text: "Sitemap submitted to Google Search Console & page index requested", completed: false },
    { text: "Google Analytics Snippet added in <head> section", completed: false },
    { text: "Run SEO Checker", completed: false }
  ];

  return (
    <div className="p-6 space-y-6">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-br from-launch-cyan via-white to-launch-cyan bg-clip-text text-transparent hover:scale-105 transition-transform">
          Search Engine Optimization
        </h1>
        <p className="text-launch-text-muted max-w-3xl">
          Optimize your application for search engines and improve your visibility online.
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-launch-cyan" />
              SEO Checklist
            </CardTitle>
            <CardDescription>Track your SEO optimization progress</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={todoItems} taskId="setup_seo" category="seo" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Learn SEO optimization techniques</CardDescription>
          </CardHeader>
          <CardContent>
            <AspectRatio ratio={16 / 9}>
              <div className="bg-gradient-to-br from-black/80 to-gray-800/80 rounded-md flex items-center justify-center border border-gray-800 h-full group cursor-pointer">
                <PlayCircle className="h-16 w-16 text-launch-cyan/70 group-hover:text-launch-cyan group-hover:scale-110 transition-all" />
              </div>
            </AspectRatio>
          </CardContent>
        </Card>
      </div>

      {/* SSG Prompt Section */}
      <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader>
          <CardTitle className="text-white flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-launch-cyan" />
            Fixing the SEO Problem - prompt for SSG
          </CardTitle>
          <CardDescription>
            <ol className="list-decimal list-inside space-y-2 mt-2 text-gray-400">
              <li>Paste in the prompt below exactly</li>
              <li>Follow the Lovable instructions to copy/paste in the new Build script into your Packages folder</li>
            </ol>
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <ScrollArea 
            className={cn(
              "text-xs rounded relative group",
              "bg-launch-dark/60 backdrop-blur-sm text-gray-300",
              "border border-launch-cyan/10",
              "hover:border-launch-cyan/30",
              "transition-all duration-300 ease-in-out",
              "hover:ring-1 hover:ring-launch-cyan/20",
              "h-[400px]"
            )}
          >
            <pre className="p-4 font-mono">
              {ssgPrompt}
            </pre>
          </ScrollArea>
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
            onClick={copyPrompt}
          >
            {copiedPrompt ? (
              <>
                <Check className="h-4 w-4 text-launch-cyan" /> Copied!
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-launch-cyan" /> Copy SSG Prompt
              </>
            )}
          </Button>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-launch-cyan" />
              Documentation
            </CardTitle>
            <CardDescription>Official SEO resources</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { title: "Google Search Central", url: "https://developers.google.com/search" },
              { title: "Moz SEO Learning Center", url: "https://moz.com/learn/seo" },
              { title: "Yoast SEO Blog", url: "https://yoast.com/seo-blog/" },
              { title: "Backlinko", url: "https://backlinko.com/" }
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
      <PageFeedback category="seo" />
    </div>
  );
};

export default SEO;
