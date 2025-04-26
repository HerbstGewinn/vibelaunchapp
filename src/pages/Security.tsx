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
import { v4 as uuidv4 } from 'uuid';
import { useTaskProgress } from '@/hooks/useTaskProgress';

// Extend the base type to include processed fields
interface ProcessedSecurityItem extends SecurityItemData {
  dbId: string;
  effectiveStatus: SecurityItemData['status'];
}

const Security = () => {
  const { tasks, toggleTaskComplete } = useTaskProgress();
  const [selectedItemId, setSelectedItemId] = useState<string | null>(securityData[0]?.id || null); // Select first item initially

  // Process security data with task progress
  const processedSecurityItems: ProcessedSecurityItem[] = useMemo(() => {
    return securityData.map(staticItem => {
      // First try to find an existing task
      const existingTask = tasks.find(t =>
        t.category === 'security' &&
        t.task_name === staticItem.title
      );

      if (existingTask) {
        // If we found an existing task, use its ID
        return {
          ...staticItem,
          dbId: existingTask.id,
          effectiveStatus: existingTask.completed ? 'Done' : 'To-Do'
        };
      }

      // For new tasks, generate a stable UUID based on the title
      // This ensures the same ID is generated across renders
      const titleHash = staticItem.title.split('').reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
      }, 0);
      const stableUuid = uuidv4({ random: new Uint8Array(16).map(() => titleHash % 256) });

      return {
        ...staticItem,
        dbId: stableUuid,
        effectiveStatus: staticItem.status === 'Handled by Platform' || staticItem.status === 'N/A' 
          ? staticItem.status 
          : 'To-Do'
      };
    });
  }, [securityData, tasks]);

  const selectedItem = useMemo(() => {
    // Find the selected item from the processed list for detailed view
    return processedSecurityItems.find(item => item.id === selectedItemId) as ProcessedSecurityItem | null; // Ensure correct type
  }, [selectedItemId, processedSecurityItems]);

  const handleSelectItem = (id: string) => {
    setSelectedItemId(id);
  };

  const handleToggleTask = async (item: ProcessedSecurityItem) => {
    try {
      const isCompleting = item.effectiveStatus === 'To-Do';
      await toggleTaskComplete(item.dbId, isCompleting, 'security', item.title);
    } catch (error) {
      console.error("Failed to toggle task:", error);
      // Consider adding user feedback here (e.g., toast notification)
    }
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
    const totalApplicable = processedSecurityItems.filter(item => item.effectiveStatus !== 'N/A').length;
    const completed = processedSecurityItems.filter(item => item.effectiveStatus === 'Done' || item.effectiveStatus === 'Handled by Platform').length;
    return totalApplicable > 0 ? Math.round((completed / totalApplicable) * 100) : 0;
  }, [processedSecurityItems]);

  const groupedItems = useMemo(() => {
    return processedSecurityItems.reduce((acc, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item);
      return acc;
    }, {} as Record<SecurityItemData['category'], ProcessedSecurityItem[]>);
  }, [processedSecurityItems]);

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
            <Accordion type="single" defaultValue="Frontend" className="w-full">
              {(Object.keys(groupedItems) as SecurityItemData['category'][]).map(category => {
                const categoryItems = groupedItems[category] || [];
                const completedInCategory = categoryItems.filter((i: ProcessedSecurityItem) => i.effectiveStatus === 'Done' || i.effectiveStatus === 'Handled by Platform').length;
                const totalInCategory = categoryItems.filter((i: ProcessedSecurityItem) => i.effectiveStatus !== 'N/A').length;
                return (
                  <AccordionItem value={category} key={category} className="border-gray-700">
                    <AccordionTrigger className="text-white hover:no-underline">
                      {category} Security ({completedInCategory}/{totalInCategory})
                    </AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-1 pt-2">
                        {categoryItems.map((item: ProcessedSecurityItem) => (
                          <li key={item.id}>
                            <div
                              onClick={() => handleSelectItem(item.id)}
                              className={cn(
                                "w-full flex items-center gap-3 p-2 rounded-md text-left text-sm transition-all duration-200 cursor-pointer",
                                selectedItemId === item.id
                                  ? "bg-launch-dark text-white"
                                  : "text-gray-300 hover:bg-launch-dark hover:text-white",
                                "group"
                              )}
                            >
                              <div className="relative">
                                {item.effectiveStatus === 'Done' ? (
                                  <CheckCircle className="h-4 w-4 text-green-500 transition-all" />
                                ) : item.effectiveStatus === 'To-Do' ? (
                                  <>
                                    <Circle className="h-4 w-4 text-gray-400 group-hover:text-gray-300 transition-all" />
                                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                                      <CheckCircle className="h-4 w-4 text-gray-300/50" />
                                    </div>
                                  </>
                                ) : item.effectiveStatus === 'Handled by Platform' ? (
                                  <ShieldCheck className="h-4 w-4 text-blue-500" />
                                ) : (
                                  <Circle className="h-4 w-4 text-gray-500" />
                                )}
                              </div>
                              <span className="flex-grow truncate">{item.title}</span>
                              <ChevronRight className={cn(
                                "h-4 w-4 text-gray-500 transition-opacity duration-200",
                                selectedItemId === item.id ? "opacity-100" : "opacity-0"
                              )}/>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
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
             <div className="mt-6 w-full">
               <PageFeedback 
                 category="github-security-integration" 
                 question="Would you find this helpful?"
               />
             </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section: Security Actions & Guidance */}
      {selectedItem && (
        <Card className="bg-launch-card-bg border-gray-800">
          <CardHeader>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="relative">
                  {selectedItem.effectiveStatus === 'Done' ? (
                    <CheckCircle className="h-5 w-5 text-green-500 transition-all" />
                  ) : selectedItem.effectiveStatus === 'To-Do' ? (
                    <>
                      <Circle className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-all" />
                      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                        <CheckCircle className="h-5 w-5 text-gray-300/50" />
                      </div>
                    </>
                  ) : selectedItem.effectiveStatus === 'Handled by Platform' ? (
                    <ShieldCheck className="h-5 w-5 text-blue-500" />
                  ) : (
                    <Circle className="h-5 w-5 text-gray-500" />
                  )}
                </div>
                <CardTitle className="text-white">{selectedItem.title}</CardTitle>
              </div>
              {(selectedItem.effectiveStatus === 'To-Do' || selectedItem.effectiveStatus === 'Done') && (
                <Button
                  size="sm"
                  variant="outline"
                  className={cn(
                    "transition-all duration-200",
                    selectedItem.effectiveStatus === 'Done'
                      ? "border-green-600/50 text-green-500 hover:bg-green-900/10 hover:border-green-500"
                      : "border-gray-600/50 text-gray-400 hover:bg-gray-700/10 hover:border-gray-400"
                  )}
                  onClick={() => handleToggleTask(selectedItem)}
                >
                  {selectedItem.effectiveStatus === 'Done' ? (
                    <>
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Completed
                    </>
                  ) : (
                    <>
                      <Circle className="h-4 w-4 mr-2" />
                      Mark Complete
                    </>
                  )}
                </Button>
              )}
              {selectedItem.effectiveStatus === 'Handled by Platform' && (
                <Badge variant="default" className="bg-blue-800 text-blue-200">Handled by Platform</Badge>
              )}
              {selectedItem.effectiveStatus === 'N/A' && (
                <Badge variant="default" className="bg-gray-800 text-gray-200">Not Applicable</Badge>
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