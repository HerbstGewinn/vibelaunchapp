
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { PlayCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

const designTemplates = [
  {
    id: 1,
    title: "Dashboard Template",
    description: "Modern dark theme dashboard with analytics and task management.",
    demoUrl: "#"
  },
  {
    id: 2,
    title: "Authentication Flow",
    description: "Seamless sign-in and registration process with social providers.",
    demoUrl: "#"
  },
  {
    id: 3,
    title: "Settings Interface",
    description: "User preferences and account management interface.",
    demoUrl: "#"
  }
];

const Designs = () => {
  return (
    <div className="flex-1 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">
          Design <span className="text-launch-cyan">Templates</span>
        </h1>
        <p className="text-gray-400 text-sm md:text-base">
          Explore our collection of design templates and video demonstrations
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {designTemplates.map((template) => (
          <Card key={template.id} className="bg-launch-dark border-gray-800">
            <CardHeader>
              <CardTitle className="text-white">{template.title}</CardTitle>
              <CardDescription>{template.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative rounded-lg overflow-hidden bg-black/50 border border-gray-800">
                <AspectRatio ratio={16 / 9}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="w-16 h-16 rounded-full hover:scale-105 transition-transform"
                    >
                      <PlayCircle className="w-16 h-16 text-launch-cyan" />
                    </Button>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </AspectRatio>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Designs;
