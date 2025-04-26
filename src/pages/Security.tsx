import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import {
  CheckCircle, Circle, ExternalLink, Github, AlertTriangle, Lock, KeyRound, Network, Code, Server, FileWarning, ShieldCheck, HelpCircle,
  ChevronRight, Shield
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageFeedback } from '@/components/common/PageFeedback';
import { AiPrompt } from '@/components/security/AiPrompt';
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils"; // Assuming you have this utility
import { securityData, SecurityItemData, SecurityAction } from '@/data/securityContent';

const Security = () => {
  const [items, setItems] = useState<SecurityItemData[]>(securityData);
  const [selectedItemId, setSelectedItemId] = useState<string | null>(securityData[0]?.id || null); // Select first item initially

  const selectedItem = useMemo(() => {
    return items.find(item => item.id === selectedItemId) || null;
  }, [selectedItemId, items]);

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
  };

  const handleMarkAsDone = (id: string) => {
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, status: 'Done' } : item
      )
    );
    // If the currently selected item is marked done, maybe select the next 'To-Do' item?
    // Or just keep it selected.
  };

  const getStatusIcon = (status: SecurityItemData['status']) => {
    switch (status) {
      case 'Done':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'Handled by Platform':
        return <ShieldCheck className="h-4 w-4 text-blue-500" />;
      case 'N/A':
        return <Circle className="h-4 w-4 text-gray-500" />;
      case 'To-Do':
      default:
        return <Circle className="h-4 w-4 text-gray-400" />;
    }
  };

  const progress = useMemo(() => {
    const totalApplicable = items.filter(item => item.status !== 'N/A').length;
    const completed = items.filter(item => item.status === 'Done' || item.status === 'Handled by Platform').length;
    return totalApplicable > 0 ? Math.round((completed / totalApplicable) * 100) : 0;
  }, [items]);

  const groupedItems = useMemo(() => {
    return items.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<SecurityItemData['category'], SecurityItemData[]>);
  }, [items]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-launch-cyan via-white to-launch-cyan bg-clip-text text-transparent animate-pulse">Security Hub</h1>
        <p className="text-launch-text-muted max-w-3xl">
          Actionable steps and AI guidance to secure your application.
        </p>
      </div>

      {/* Top Section: Checklist & Report */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Security Checklist (Left Column) */}
        <Card className="lg:col-span-2 bg-launch-card-bg border-gray-800 shadow-lg">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white">Security Checklist</CardTitle>
              <div className="flex items-center gap-2">
                 <span className="text-sm text-gray-400">{progress}% Complete</span>
                 <Progress value={progress} className="w-32 h-2 bg-launch-dark" />
              </div>
            </div>
             <CardDescription>Select an item to see details and actions.</CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="multiple" defaultValue={['Frontend', 'Backend', 'Practical']} className="w-full">
              {(Object.keys(groupedItems) as SecurityItemData['category'][]).map(category => (
                <AccordionItem value={category} key={category} className="border-gray-700">
                  <AccordionTrigger className="text-white hover:no-underline">
                    {category} Security ({groupedItems[category].filter(i => i.status === 'Done' || i.status === 'Handled by Platform').length}/{groupedItems[category].filter(i => i.status !== 'N/A').length})
                    </AccordionTrigger>
                  <AccordionContent>
                    <ul className="space-y-1 pt-2">
                      {groupedItems[category].map(item => (
                        <li key={item.id}>
                          <button
                            onClick={() => handleSelectItem(item.id)}
                            className={cn(
                              "w-full flex items-center gap-3 p-2 rounded-md text-left text-sm transition-colors",
                              selectedItemId === item.id
                                ? "bg-launch-dark text-white"
                                : "text-gray-300 hover:bg-launch-dark hover:text-white"
                            )}
                          >
                            {getStatusIcon(item.status)}
                            <span className="flex-grow truncate">{item.title}</span>
                            <ChevronRight className={cn("h-4 w-4 text-gray-500 transition-opacity", selectedItemId === item.id ? "opacity-100" : "opacity-0")}/>
                          </button>
                        </li>
                      ))}
                    </ul>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </CardContent>
        </Card>

        {/* Security Report (Right Column) */}
        <Card className="lg:col-span-1 bg-launch-card-bg border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-white flex items-center gap-2">
                 <Github className="h-5 w-5" /> Security Report
              </CardTitle>
               <Badge variant="secondary" className="ml-2 bg-gray-600 text-gray-300 text-xs px-1.5 py-0.5">Soon</Badge>
            </div>
            <CardDescription>Automated scan results from GitHub</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center justify-center text-center h-[calc(100%-80px)]">
             <Shield className="h-12 w-12 text-launch-cyan mb-4 opacity-50" />
             <p className="text-launch-text-muted mt-2 text-sm max-w-md">
               Connect your GitHub repository to automatically scan for potential vulnerabilities and misconfigurations like exposed secrets or outdated dependencies.
             </p>
             <Button variant="outline" size="sm" className="mt-4 bg-transparent border-gray-600 text-gray-300 hover:bg-gray-700 hover:text-white" disabled>
               <Github className="h-4 w-4 mr-2" />
               Connect GitHub
             </Button>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Security Actions & Guidance */}
      {selectedItem && (
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
               <CardTitle className="text-white flex items-center gap-2">
                  {getStatusIcon(selectedItem.status)} {selectedItem.title}
               </CardTitle>
                {selectedItem.status === 'To-Do' && (
                  <Button size="sm" variant="outline" className="border-green-600 text-green-500 hover:bg-green-900 hover:text-green-400" onClick={() => handleMarkAsDone(selectedItem.id)}>
                     <CheckCircle className="h-4 w-4 mr-2"/> Mark as Done
                  </Button>
                )}
                 {selectedItem.status === 'Done' && (
                   <Badge variant="default" className="bg-green-800 text-green-200">Completed</Badge>
                 )}
                  {selectedItem.status === 'Handled by Platform' && (
                   <Badge variant="default" className="bg-blue-800 text-blue-200">Handled by Platform</Badge>
                 )}
            </div>
            <CardDescription>{selectedItem.briefDescription}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Why it Matters */}
            <div>
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center">
                 <HelpCircle className="h-4 w-4 mr-2 text-gray-400"/> Why it Matters
              </h3>
              <p className="text-launch-text-muted text-sm">{selectedItem.why}</p>
            </div>

            {/* How to Address */}
            <div>
               <h3 className="text-lg font-semibold text-white mb-3">How to Address</h3>
               <div className="space-y-4">
                {selectedItem.actions.map((action, index) => (
                  <div key={index} className="p-4 bg-launch-dark rounded-md border border-gray-700">
                    {action.title && <h4 className="text-sm font-semibold text-white mb-2">{action.title}</h4>}
                    {action.description && <p className="text-sm text-gray-300 mb-2">{action.description}</p>}
                    {action.learnMoreUrl && (
                       <a
                          href={action.learnMoreUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-launch-cyan text-xs flex items-center mb-2 hover:underline"
                        >
                          Learn more <ExternalLink className="h-3 w-3 ml-1" />
                        </a>
                    )}
                    {(action.type === 'lovable' || action.type === 'cursor') && action.prompt && (
                      <AiPrompt toolName={action.type === 'lovable' ? 'Lovable' : 'Cursor'} prompt={action.prompt} />
                    )}
                    {action.verification && (
                       <div className="mt-3 pt-3 border-t border-gray-600">
                          <p className="text-xs text-gray-400 font-medium mb-1">Verification:</p>
                          <p className="text-xs text-gray-400">{action.verification}</p>
                       </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>
      )}

       {/* TODO: Add Learn More link section at bottom if desired */}

      <PageFeedback category="security" />
    </div>
  );
};

export default Security;