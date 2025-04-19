
import React from 'react';
import AuthDesignCard from './AuthDesignCard';
import { AuthDesignTemplate } from '@/types/auth-designs';

const authDesignTemplates: AuthDesignTemplate[] = [{
  id: 1,
  title: "Sign In Template",
  description: "Professional, modern auth design optimized for conversion",
  imageUrl: "/lovable-uploads/d3f76e3e-1f64-452c-8dfd-9eb2eff2f46e.png",
  style: 'modern',
  prompt: `Design a modern sign-in page UI for a web app. The layout should include: A logo or app name at the top with a tagline underneath...`
}, {
  id: 2,
  title: "Sign Up Template",
  description: "Clean, focused registration flow",
  imageUrl: "/lovable-uploads/0e65ad78-78b5-4380-8c8b-bb2a12773595.png",
  style: 'modern',
  prompt: `Design a matching sign-up page with: Clean, modern typography...`
}];

const AuthDesigns = () => {
  return (
    <div className="space-y-6 my-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Authentication <span className="text-launch-cyan">Template</span>
        </h2>
        <p className="text-gray-400">
          Choose from these pre-designed authentication templates to enhance your user experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authDesignTemplates.map(template => (
          <AuthDesignCard key={template.id} template={template} />
        ))}
      </div>
    </div>
  );
};

export default AuthDesigns;
