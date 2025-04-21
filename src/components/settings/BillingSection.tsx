import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Loader2, CreditCard, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Database } from '@/integrations/supabase/types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

export const BillingSection = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [isManaging, setIsManaging] = useState(false);
  const [subscription, setSubscription] = useState<Subscription | null>(null);
  const [loadingPlan, setLoadingPlan] = useState<'lifetime' | null>(null);

  useEffect(() => {
    console.log('user', user);
    if (user?.id) {
      loadSubscription();
    }
  }, [user?.id]);

  const loadSubscription = async () => {
    try {
      console.log('Fetching subscription for user:', user?.id);
      const { data, error } = await supabase
        .from('subscriptions')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      console.log('Subscription query result:', { data, error });

      if (error && error.code !== 'PGRST116') {
        console.error("Error loading subscription:", error);
        toast.error('Failed to load subscription details');
        return;
      }

      console.log('Final subscription data:', data);
      
      setSubscription(data);
    } catch (error) {
      console.error("Error loading subscription:", error);
      toast.error('Failed to load subscription details');
    } finally {
      setLoading(false);
    }
  };

  const handleManageSubscription = async () => {
    setIsManaging(true);
    try {
      const { data: { url }, error } = await supabase.functions.invoke('create-portal-session');
      
      if (error) {
        throw error;
      }
      
      if (url) {
        window.location.href = url;
      }
    } catch (error) {
      console.error("Error creating portal session:", error);
      toast.error('Failed to access billing portal');
    } finally {
      setIsManaging(false);
    }
  };

  const handleSubscribe = async (plan: 'lifetime') => {
    if (!user) {
      return;
    }

    setLoadingPlan(plan);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        body: { 
          plan,
          currency: 'usd'
        },
      });

      if (error) throw error;
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('Failed to create checkout session');
      setLoadingPlan(null);
    }
  };

  if (loading) {
    return (
      <Card className="bg-launch-card-bg border-gray-800">
        <CardContent className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  const planName = subscription?.plan_name || 'Free Plan';
  const isActive = subscription?.status === 'active' || subscription?.status === 'succeeded';
  const isTrialing = subscription?.status === 'trialing';
  const endDate = subscription?.current_period_end 
    ? new Date(subscription.current_period_end).toLocaleDateString()
    : null;

  return (
    <Card className="bg-launch-card-bg border-gray-800">
      <CardHeader>
        <CardTitle className="text-white">Plans & Billing</CardTitle>
        <CardDescription>Manage your subscription and billing settings</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-white font-medium">Current Plan</h3>
          <div className="p-4 bg-launch-dark rounded-md border border-gray-800">
            <div className="flex items-center justify-between mb-2">
              <div>
                <p className="text-white">{planName}</p>
                <p className="text-launch-text-muted text-sm">
                  {isTrialing ? (
                    <>Trial Period (Ends on {endDate})</>
                  ) : isActive ? (
                    <>Active {subscription?.cancel_at_period_end && '(Cancels at end of period)'}</>
                  ) : (
                    'Upgrade to access premium features'
                  )}
                </p>
              </div>
              {subscription ? (
                <Button 
                  onClick={handleManageSubscription} 
                  disabled={isManaging}
                  className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium"
                >
                  {isManaging ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <CreditCard className="h-4 w-4 mr-2" />
                  )}
                  Manage Subscription
                </Button>
              ) : (
                <Button 
                  className="bg-launch-cyan hover:bg-launch-cyan/80 text-black font-medium"
                  onClick={() => handleSubscribe('lifetime')}
                  disabled={loadingPlan !== null}
                >
                  {loadingPlan === 'lifetime' ? (
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                  ) : (
                    <Plus className="h-4 w-4 mr-2" />
                  )}
                  Upgrade to Lifetime Plan
                </Button>
              )}
            </div>
            {subscription && endDate && (
              <div className="border-t border-gray-800 mt-4 pt-4">
                <h4 className="text-white text-sm font-medium mb-1">Next Payment</h4>
                <p className="text-launch-text-muted text-sm">{endDate}</p>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BillingSection; 