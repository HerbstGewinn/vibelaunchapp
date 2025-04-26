import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CheckCircle, ExternalLink, PlayCircle, Copy, AlertTriangle, ChevronDown, ChevronUp, ChevronRight } from "lucide-react";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { TodoList } from '@/components/common/TodoList';
import { PageFeedback } from '@/components/common/PageFeedback';
import { useToast } from "@/hooks/use-toast";
import { paymentContent, paymentResources, PaymentStep, PaymentSubTask } from '@/data/paymentContent';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useTaskProgress } from '@/hooks/useTaskProgress';
import { cn } from "@/lib/utils";
import { v4 as uuidv4 } from 'uuid';

const Payment = () => {
  const { toast } = useToast();
  const { tasks, toggleTaskComplete } = useTaskProgress();
  const [expandedPrompts, setExpandedPrompts] = useState<Record<string, boolean>>({});
  const [activeStep, setActiveStep] = useState(paymentContent[0].id);

  const copyToClipboard = async (text: string) => {
    await navigator.clipboard.writeText(text);
    toast({
      title: "Copied to clipboard",
      description: "The prompt has been copied to your clipboard."
    });
  };

  const togglePrompt = (taskId: string) => {
    setExpandedPrompts(prev => ({
      ...prev,
      [taskId]: !prev[taskId]
    }));
  };

  const handleTaskCompletion = async (taskId: string, title: string, isCompleted: boolean) => {
    try {
      // Find existing task ID if it exists
      const existingTask = tasks.find(t => t.category === 'payment' && t.task_name === title);
      const taskUuid = existingTask ? existingTask.id : uuidv4();
      
      await toggleTaskComplete(taskUuid, isCompleted, 'payment', title);
      toast({
        title: isCompleted ? "Task completed" : "Task uncompleted",
        description: isCompleted ? "The task has been marked as done" : "The task has been marked as pending"
      });
    } catch (error) {
      console.error("Failed to toggle task:", error);
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive"
      });
    }
  };

  const isTaskCompleted = (title: string) => {
    return tasks.some(t => t.category === 'payment' && t.task_name === title && t.completed);
  };

  const renderSubTask = (subTask: PaymentSubTask, stepId: string) => {
    const isCompleted = isTaskCompleted(subTask.title);
    const shouldCollapse = subTask.prompt?.text.split('\n').length > 4;
    const isExpanded = expandedPrompts[`${stepId}_${subTask.id}`];

    return (
      <div key={subTask.id} className="mb-6 p-4 bg-launch-dark rounded-lg border border-gray-800 transition-all hover:border-launch-cyan/50">
        {subTask.isChecklistItem ? (
          <div 
            className={cn(
              "flex items-start justify-between p-3 rounded-md transition-all duration-200",
              "hover:bg-gray-800/30 hover:border-launch-cyan/20",
              "group"
            )}
          >
            <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTaskCompletion(uuidv4(), subTask.title, !isCompleted)}>
              <div className="relative">
                {isCompleted ? (
                  <CheckCircle className="h-5 w-5 text-green-500 transition-all" />
                ) : (
                  <>
                    <Circle className="h-5 w-5 text-gray-400 group-hover:text-gray-300 transition-all" />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity">
                      <CheckCircle className="h-5 w-5 text-gray-300/50" />
                    </div>
                  </>
                )}
              </div>
              <h4 className="font-semibold text-white group-hover:text-launch-cyan transition-colors">
                {subTask.title}
              </h4>
            </div>
            <Button
              size="sm"
              variant="outline"
              className={cn(
                "transition-all duration-200",
                isCompleted 
                  ? "border-green-600/50 text-green-500 hover:bg-green-900/10 hover:border-green-500"
                  : "border-gray-600/50 text-gray-400 hover:bg-gray-700/10 hover:border-gray-400"
              )}
              onClick={() => handleTaskCompletion(uuidv4(), subTask.title, !isCompleted)}
            >
              {isCompleted ? (
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
          </div>
        ) : (
          <h4 className="font-semibold text-white mb-2">
            {subTask.title}
          </h4>
        )}

        <div className="text-sm text-launch-text-muted space-y-2 mt-3">
          {subTask.description.map((desc, i) => <p key={i}>{desc}</p>)}
          {subTask.details && subTask.details.map((detail, i) => <p key={i} className="text-xs italic text-gray-400">{detail}</p>)}
          {subTask.important && subTask.important.map((imp, i) => (
            <div key={i} className="flex items-start text-sm text-yellow-400 bg-yellow-900/20 p-2 rounded border border-yellow-700/30 mt-2">
              <AlertTriangle className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
              <span>{imp}</span>
            </div>
          ))}
          {subTask.checks && (
            <div className="mt-3 space-y-1">
              <p className="font-medium text-gray-300">Verification Checks:</p>
              <ul className="list-disc list-inside space-y-1 pl-2">
                {subTask.checks.map((check, i) => <li key={i}>{check}</li>)}
              </ul>
            </div>
          )}
          {subTask.links && subTask.links.map((link, i) => (
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-launch-cyan hover:underline text-xs mr-3">
              {link.text} <ExternalLink className="h-3 w-3 ml-1" />
            </a>
          ))}
        </div>
        {subTask.prompt && (
          <div className="mt-4">
            <div className="p-3 bg-gray-900 rounded border border-gray-700">
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center">
                  <p className="text-xs font-semibold text-launch-cyan uppercase tracking-wider">{subTask.prompt.title}</p>
                  {shouldCollapse && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => togglePrompt(`${stepId}_${subTask.id}`)}
                      className="text-gray-400 hover:text-white ml-2 h-6 px-2"
                    >
                      {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => copyToClipboard(subTask.prompt.text)}
                  className="text-launch-cyan hover:text-launch-cyan/80 h-7 px-2"
                >
                  <Copy className="h-4 w-4 mr-1" /> Copy
                </Button>
              </div>
              <pre 
                className={cn(
                  "text-xs text-gray-300 whitespace-pre-wrap break-words font-mono bg-transparent p-0 m-0",
                  shouldCollapse && !isExpanded && "max-h-24 overflow-hidden"
                )}
              >
                {subTask.prompt.text}
              </pre>
              {shouldCollapse && !isExpanded && (
                <div className="text-center mt-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => togglePrompt(`${stepId}_${subTask.id}`)}
                    className="text-gray-400 hover:text-white"
                  >
                    Show More <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="p-6 space-y-8">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-4xl font-bold relative group">
          <span className="bg-gradient-to-r from-launch-cyan to-white bg-clip-text text-transparent inline-block transform transition-transform">Stripe Payments</span>
          <span className="absolute -top-2 -right-2 w-3 h-3 bg-launch-cyan rounded-full opacity-75 group-hover:animate-ping"></span>
        </h1>
        <p className="text-launch-text-muted max-w-3xl">
          Set up secure payment processing with Stripe for your application following these steps.
        </p>
      </div>

      {/* Steps Visualization */}
      <div className="flex items-center justify-center space-x-2 sm:space-x-4 p-4 bg-launch-dark rounded-lg border border-gray-800">
        {paymentContent.map((step, index) => (
          <React.Fragment key={step.id}>
            <div 
              className={cn(
                "flex flex-col items-center text-center cursor-pointer transition-all duration-200",
                activeStep === step.id && "scale-105"
              )}
              onClick={() => setActiveStep(step.id)}
            >
              <Badge 
                variant="secondary" 
                className={cn(
                  "mb-1 px-2.5 py-0.5",
                  activeStep === step.id 
                    ? "bg-launch-cyan/30 text-launch-cyan border-launch-cyan/40" 
                    : "bg-launch-cyan/10 text-launch-cyan/70 border-launch-cyan/20"
                )}
              >
                Step {index + 1}
              </Badge>
              <span className={cn(
                "text-xs sm:text-sm font-medium",
                activeStep === step.id ? "text-white" : "text-gray-400"
              )}>
                {step.title.split(':')[1].trim()}
              </span>
            </div>
            {index < paymentContent.length - 1 && (
              <ChevronRight className={cn(
                "h-5 w-5 flex-shrink-0",
                activeStep === step.id || activeStep === paymentContent[index + 1].id
                  ? "text-launch-cyan/50"
                  : "text-gray-600"
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content */}
      <Tabs value={activeStep} onValueChange={setActiveStep} className="w-full mt-6">
        {paymentContent.map((step) => (
          <TabsContent key={step.id} value={step.id}>
            <Card className="bg-launch-card-bg border-gray-800 shadow-lg overflow-hidden">
              <CardHeader className="bg-gradient-to-r from-launch-dark to-gray-900/80 border-b border-gray-700">
                <CardTitle className="text-white">{step.title}</CardTitle>
                <CardDescription>{step.description}</CardDescription>
              </CardHeader>
              <CardContent className="p-6 space-y-4">
                {step.subTasks.map((subTask) => renderSubTask(subTask, step.id))}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Resources and Video */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <ExternalLink className="h-5 w-5 text-launch-cyan" />
              Helpful Resources
            </CardTitle>
            <CardDescription>Official Stripe documentation & links</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {paymentResources.map((item, index) => (
              <a
                key={index}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 bg-launch-dark rounded-md hover:bg-gray-800 transition-colors group overflow-hidden relative"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-launch-cyan/0 via-launch-cyan/5 to-launch-cyan/0 opacity-0 group-hover:opacity-100 transform translate-x-full group-hover:translate-x-0 transition-all duration-700"></div>
                <span className="text-white z-10 text-sm">{item.title}</span>
                <ExternalLink className="h-4 w-4 text-launch-cyan z-10 group-hover:translate-x-1 transition-transform" />
              </a>
            ))}
          </CardContent>
        </Card>

        <Card className="bg-launch-card-bg border-gray-800 shadow-lg hover:shadow-xl transition-shadow">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <PlayCircle className="h-5 w-5 text-launch-cyan" />
              Tutorial Video
            </CardTitle>
            <CardDescription>Watch how to integrate Stripe payments</CardDescription>
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

      <PageFeedback category="payment" />
    </div>
  );
};

export default Payment;
