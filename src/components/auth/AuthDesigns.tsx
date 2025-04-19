import React from 'react';
import AuthDesignCard from './AuthDesignCard';
import { AuthDesignTemplate } from '@/types/auth-designs';
const authDesignTemplates: AuthDesignTemplate[] = [{
  id: 1,
  title: "High Converting Authentication Template",
  description: "Professional, modern auth design optimized for conversion",
  imageUrl: "/lovable-uploads/9fb3e038-fc54-4507-b6aa-ee1846e9cfae.png",
  style: 'modern',
  prompt: `Design a modern sign-in page UI for a web app. The layout should include:

A logo or app name at the top with a tagline underneath.

A "Sign in with Google" button at the top.

A divider with "OR" separating the Google option from manual sign-in.

Email and Password fields, each with appropriate icons and placeholders.

A password visibility toggle icon.

A prominent "Sign In" button.

"Forgot your password?" and "Sign up" links below the button.

Also, add a "Sign Up" page that will be linked to the Sign Up page. Design it matching the landing page, too!

Use clean, modern fonts, rounded corners, and consistent spacing.
Choose a color palette and branding that suits the landing page and creates a professional, cohesive look.`
}, {
  id: 2,
  title: "Sign Up Template",
  description: "Clean, focused registration flow",
  imageUrl: "/lovable-uploads/770c33b4-90ca-4bc9-8164-713413257dd7.png",
  style: 'modern',
  prompt: `Design a matching sign-up page with:
- Clean, modern typography
- Consistent branding with sign-in page
- Full name input field with user icon
- Email input with mail icon
- Password field with visibility toggle
- Clear password requirements
- Prominent "Create Account" button
- Link back to sign in page
- Matching dark theme and rounded corners`
}];
const AuthDesigns = () => {
  return <div className="space-y-6 my-8">
      <div className="space-y-2">
        <h2 className="text-2xl font-bold text-white">
          Authentication <span className="text-launch-cyan">Template</span>
        </h2>
        <p className="text-gray-400">
          Choose from these pre-designed authentication templates to enhance your user experience
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {authDesignTemplates.map(template => <AuthDesignCard key={template.id} template={template} />)}
      </div>
    </div>;
};
export default AuthDesigns;