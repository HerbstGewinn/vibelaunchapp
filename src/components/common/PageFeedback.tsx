import React, { useState } from 'react';
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface PageFeedbackProps {
  category: string;
  question?: string;
}

export const PageFeedback = ({ category, question = "Was this helpful?" }: PageFeedbackProps) => {
  const [hasVoted, setHasVoted] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleFeedback = async (helpful: boolean) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to provide feedback",
        variant: "destructive"
      });
      return;
    }

    try {
      const { error } = await supabase
        .from('category_reviews')
        .insert({
          user_id: user.id,
          category,
          helpful
        });

      if (error) throw error;

      setHasVoted(true);
      toast({
        title: "Thank you for your feedback!",
        description: helpful ? "We're glad this was helpful!" : "We'll work on improving this section.",
      });
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast({
        title: "Error submitting feedback",
        description: "Please try again later",
        variant: "destructive"
      });
    }
  };

  if (hasVoted) {
    return (
      <div className="flex items-center justify-center gap-2 text-sm text-gray-400">
        Thanks for your feedback!
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4 justify-end p-4">
      <span className="text-sm text-gray-400">{question}</span>
      <div className="flex gap-2">
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-green-500/10 hover:text-green-500"
          onClick={() => handleFeedback(true)}
        >
          <ThumbsUp className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="hover:bg-red-500/10 hover:text-red-500"
          onClick={() => handleFeedback(false)}
        >
          <ThumbsDown className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};
