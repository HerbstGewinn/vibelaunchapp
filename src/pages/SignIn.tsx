
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { FcGoogle } from 'react-icons/fc';
import { Separator } from '@/components/ui/separator';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signin, signInWithGoogle } = useAuth();
  const { toast } = useToast();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await signin(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to VibeLaunch!",
      });
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      toast({
        title: "Google login failed",
        description: "There was an issue signing in with Google",
        variant: "destructive",
      });
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-launch-dark">
      <div className="w-full max-w-md px-8 py-10 bg-launch-dark-blue rounded-xl shadow-lg border border-gray-800">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2">
            <span className="text-white">Vibe</span>
            <span className="text-launch-cyan">Launch</span>
          </h1>
          <p className="text-launch-text-muted">Sign in to track your launch progress</p>
        </div>
        
        <Button 
          type="button"
          onClick={handleGoogleSignIn}
          variant="outline" 
          className="w-full mb-6 bg-gray-900 text-white border-gray-800 hover:bg-gray-800 flex items-center justify-center gap-2"
        >
          <FcGoogle className="h-5 w-5" />
          Sign in with Google
        </Button>
        
        <div className="relative mb-6">
          <Separator className="bg-gray-800" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-launch-dark-blue px-2 text-xs text-gray-400">
            OR
          </div>
        </div>
        
        <form onSubmit={handleSignIn} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm text-foreground font-medium">
              Email address
            </label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm text-foreground font-medium">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-500" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 bg-gray-900 border-gray-800 text-white"
                required
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-3 text-gray-500 hover:text-gray-300"
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
          </div>

          <Button 
            type="submit" 
            disabled={isLoading}
            className="w-full bg-launch-cyan hover:opacity-90 text-black font-medium"
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm">
          <Link to="/forgot-password" className="text-launch-cyan hover:underline">
            Forgot your password?
          </Link>
        </div>

        <div className="mt-4 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-launch-cyan hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
