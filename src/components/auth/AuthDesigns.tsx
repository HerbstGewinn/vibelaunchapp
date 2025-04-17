
import React from 'react';
import AuthDesignCard from './AuthDesignCard';
import { AuthDesignTemplate } from '@/types/auth-designs';

const authDesignTemplates: AuthDesignTemplate[] = [
  {
    id: 1,
    title: "Modern Authentication",
    description: "Clean, modern auth pages with gradient accents",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&auto=format",
    style: 'modern',
    prompt: `Create a modern authentication page with:
- Gradient-accented cards
- Social login options
- Clean typography
- Smooth transitions
- Password strength indicator
- Dark mode support`
  },
  {
    id: 2,
    title: "Minimal Authentication",
    description: "Simple, focused auth experience",
    imageUrl: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=800&auto=format",
    style: 'minimal',
    prompt: `Design a minimal authentication interface with:
- Single-column layout
- Essential fields only
- Clear error states
- Simple animations
- Focus on typography
- Subtle hover effects`
  },
  {
    id: 3,
    title: "Glassmorphic Auth",
    description: "Modern glass-effect authentication",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&auto=format",
    style: 'glassmorphic',
    prompt: `Implement a glassmorphic auth design featuring:
- Frosted glass effect cards
- Blurred backgrounds
- Subtle shadows
- Light border accents
- Smooth transitions
- Social login integration`
  }
];

const AuthDesigns = () => {
  return (
    <div className="space-y-6 my-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Authentication <span className="text-launch-cyan">Templates</span>
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
