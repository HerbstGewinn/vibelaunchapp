import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Circle, ExternalLink, Search, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';

const SEO = () => {
  const seoItems = [
    { text: "Meta tags properly configured", completed: false },
    { text: "Sitemap.xml file present", completed: false },
    { text: "Robots.txt file configured", completed: false },
    { text: "Semantic HTML structure", completed: false },
    { text: "Mobile responsiveness", completed: false },
    { text: "Page load speed optimized", completed: false },
    { text: "Structured data implemented", completed: false },
    { text: "Canonical URLs set", completed: false },
  ];
  
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-3xl font-bold text-launch-cyan">SEO Audit</h1>
      <p className="text-launch-text-muted max-w-3xl">
        Optimize your site for search engines and improve your visibility online.
      </p>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">Run SEO Audit</CardTitle>
            <CardDescription>Enter your site URL to analyze SEO performance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col sm:flex-row gap-3">
              <Input 
                placeholder="https://example.com" 
                className="bg-launch-dark border-gray-800 text-white flex-grow"
              />
              <Button className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium whitespace-nowrap">
                Run SEO Audit
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">SEO Checklist</CardTitle>
            <CardDescription>Current SEO status of your site</CardDescription>
          </CardHeader>
          <CardContent>
            <TodoList items={seoItems} taskId="setup_seo" category="seo" />
          </CardContent>
        </Card>
        
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">SEO Report</CardTitle>
            <CardDescription>Results from your most recent SEO audit</CardDescription>
          </CardHeader>
          <CardContent className="h-[320px] flex flex-col items-center justify-center text-center">
            <Search className="h-16 w-16 text-launch-cyan mb-4" />
            <p className="text-white text-lg font-medium">No SEO audit has been run yet</p>
            <p className="text-launch-text-muted mt-2 max-w-md">
              Run an SEO audit to analyze your site's search engine optimization and get detailed recommendations for improvement.
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid grid-cols-1 gap-6">
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <CardTitle className="text-white">SEO Best Practices</CardTitle>
            <CardDescription>Follow these guidelines to improve your search ranking</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Meta Tags</h3>
                <p className="text-launch-text-muted text-sm">
                  Include title, description, and Open Graph tags on all pages for better search visibility.
                </p>
                <a 
                  href="https://moz.com/learn/seo/meta-description" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Sitemap & Robots.txt</h3>
                <p className="text-launch-text-muted text-sm">
                  Create a sitemap.xml file and configure robots.txt to help search engines crawl your site effectively.
                </p>
                <a 
                  href="https://developers.google.com/search/docs/crawling-indexing/sitemaps/overview" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Performance Optimization</h3>
                <p className="text-launch-text-muted text-sm">
                  Optimize page load speed by compressing images, using lazy loading, and minimizing JavaScript.
                </p>
                <a 
                  href="https://web.dev/fast/" 
                  target="_blank"
                  rel="noopener noreferrer" 
                  className="text-launch-cyan text-xs flex items-center mt-2 hover:underline"
                >
                  Learn more <ExternalLink className="h-3 w-3 ml-1" />
                </a>
              </div>
              <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
                <h3 className="text-white font-medium mb-2">Structured Data</h3>
                <p className="text-launch-text-muted text-sm">
                  Implement JSON-LD structured data to enhance your search results with rich snippets.
                </p>
                <a 
                  href="https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data" 
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
      <PageFeedback category="seo" />
    </div>
  );
};

export default SEO;
