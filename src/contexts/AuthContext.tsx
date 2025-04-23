import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { Database } from '@/integrations/supabase/types';

type Subscription = Database['public']['Tables']['subscriptions']['Row'];

interface UserProfile {
  id: string;
  name?: string;
  email?: string;
  avatar_url?: string;
}

interface AuthContextType {
  user: User | null;
  profile: UserProfile | null;
  session: Session | null;
  loading: boolean;
  signin: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  signInWithGoogle: () => Promise<void>;
  signout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Set up auth state listener first
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, currentSession) => {
        setSession(currentSession);
        setUser(currentSession?.user ?? null);

        if (currentSession?.user) {
          // Use setTimeout to avoid deadlock when fetching profile
          setTimeout(() => {
            fetchUserProfile(currentSession.user.id);
          }, 0);
        } else {
          setProfile(null);
        }
      }
    );

    // Then check for existing session
    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      
      if (currentSession?.user) {
        fetchUserProfile(currentSession.user.id);
      }
      
      setLoading(false);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();
        
      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        setProfile(data);
      }
    } catch (error) {
      console.error('Error in fetchUserProfile:', error);
    }
  };

  const signin = async (email: string, password: string) => {
    setLoading(true);
    
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      
      if (error) throw error;
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true);
    
    try {
      // This is the critical part - we need to use signUp to create an auth record
      const { data, error } = await supabase.auth.signUp({ 
        email, 
        password,
        options: {
          data: {
            name
          }
        }
      });
      
      if (error) throw error;
      
      // Check if user was created
      if (!data.user) {
        throw new Error('User creation failed. Please try again.');
      }
      
      // We don't need to manually create a profile since the database trigger will handle that
      
    } catch (error) {
      console.error('Signup failed:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };
  
  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });
      
      if (error) throw error;
    } catch (error) {
      console.error('Google sign in failed:', error);
      throw error;
    }
  };
  
  const signout = async () => {
    try {
      await supabase.auth.signOut();
      navigate('/signin');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };
  
  const value = {
    user,
    profile,
    session,
    loading,
    signin,
    signup,
    signInWithGoogle,
    signout
  };
  
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [checkingSubscription, setCheckingSubscription] = useState(true);
  const [hasActiveSubscription, setHasActiveSubscription] = useState(false);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/signin');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user && !authLoading) {
      const checkSubscription = async () => {
        setCheckingSubscription(true);
        try {
          const { data, error } = await supabase
            .from('subscriptions')
            .select('status')
            .eq('user_id', user.id)
            .in('status', ['active', 'succeeded', 'trialing'])
            .maybeSingle();

          if (error && error.code !== 'PGRST116') {
            console.error("Error checking subscription:", error);
            toast.error('Failed to verify subscription status.');
            setHasActiveSubscription(false);
            return;
          }

          const isActive = !!data;
          setHasActiveSubscription(isActive);

          const isBillingPage = location.pathname === '/dashboard/settings' && new URLSearchParams(location.search).get('tab') === 'billing';
          if (!isActive && !isBillingPage) {
            console.log('No active subscription found, creating checkout session...');
            setIsRedirecting(true);
            const { data: checkoutData, error: checkoutError } = await supabase.functions.invoke('create-checkout', {
              body: { plan: 'lifetime', currency: 'usd' },
            });

            if (checkoutError) throw checkoutError;

            if (checkoutData?.url) {
              setCheckoutUrl(checkoutData.url);
            } else {
              throw new Error('Could not retrieve checkout URL.');
            }
          }
        } catch (err) {
          console.error('Error during subscription check or checkout creation:', err);
          toast.error(`Error: ${err instanceof Error ? err.message : 'An unexpected error occurred.'}`);
          setHasActiveSubscription(false);
        } finally {
          setCheckingSubscription(false);
          if (!checkoutUrl) {
            setIsRedirecting(false);
          }
        }
      };
      checkSubscription();
    } else if (!authLoading) {
      setCheckingSubscription(false);
    }
  }, [user, authLoading, location.pathname, location.search]);

  useEffect(() => {
    if (checkoutUrl) {
      window.location.href = checkoutUrl;
    }
  }, [checkoutUrl]);

  const isLoading = authLoading || checkingSubscription || isRedirecting;

  if (isLoading) {
    let loadingMessage = "Loading...";
    if (authLoading) loadingMessage = "Authenticating...";
    else if (checkingSubscription) loadingMessage = "Verifying subscription...";
    else if (isRedirecting) loadingMessage = "Redirecting to checkout...";

    return <div className="flex items-center justify-center h-screen text-white bg-launch-dark">{loadingMessage}</div>;
  }

  const isBillingPage = location.pathname === '/dashboard/settings' && new URLSearchParams(location.search).get('tab') === 'billing';
  return user && (hasActiveSubscription || isBillingPage) ? <>{children}</> : null;
};
