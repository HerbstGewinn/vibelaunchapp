
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-launch-dark">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-launch-cyan mb-4">404</h1>
        <p className="text-xl text-white mb-6">Oops! Page not found</p>
        <Button asChild className="bg-launch-cyan text-black hover:opacity-90">
          <a href="/dashboard">Return to Dashboard</a>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
