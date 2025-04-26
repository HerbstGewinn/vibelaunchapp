// Define the structure for security actions
export interface SecurityAction {
  type: 'platform' | 'vibelaunch' | 'lovable' | 'cursor' | 'manual';
  title?: string; // e.g., "Platform Handling", "Lovable Prompt"
  description?: string;
  prompt?: string;
  verification?: string;
  learnMoreUrl?: string;
}

// Define the structure for each security item
export interface SecurityItemData {
  id: string;
  category: 'Frontend' | 'Backend' | 'Practical';
  title: string;
  status: 'To-Do' | 'Done' | 'Handled by Platform' | 'N/A';
  briefDescription: string;
  why: string;
  actions: SecurityAction[];
}

// --- DETAILED SECURITY ITEM DATA ---
export const securityData: SecurityItemData[] = [
  // == Frontend ==
  {
    id: 'https',
    category: 'Frontend',
    title: 'Use HTTPS Everywhere',
    status: 'Handled by Platform',
    briefDescription: 'Ensures traffic is encrypted.',
    why: 'Encrypts traffic between users and your app, preventing snooping and tampering. Essential for trust and security.',
    actions: [
      {
        type: 'platform',
        title: 'Platform Handling',
        description: '✅ Most modern hosting platforms (like Replit, Vercel, Netlify) enable HTTPS automatically. Verify your site URL starts with https://.',
        learnMoreUrl: 'https://web.dev/why-https/'
      }
    ]
  },
  {
    id: 'input_validation',
    category: 'Frontend',
    title: 'Input validation and sanitization',
    status: 'To-Do',
    briefDescription: 'Prevents XSS attacks via user input.',
    why: 'Prevents malicious users from injecting harmful code (like Cross-Site Scripting - XSS) through forms or URL parameters, which could steal user data or deface your site.',
    actions: [
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement Validation & Sanitization',
        prompt: `Review all user input fields (forms, URL parameters) and API endpoints in my application. Ensure server-side validation (checking data types, lengths, formats) and output sanitization (escaping HTML characters before displaying user content) are implemented to prevent XSS attacks. Recommend specific code changes or libraries (like 'zod' for validation, 'dompurify' for client-side sanitization if needed).`,
        verification: `Test submitting '<script>alert("XSS")</script>' into input fields. The script should be displayed as harmless text, not executed as an alert.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/Cross_Site_Scripting_(XSS)'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Implement Validation & Sanitization',
        prompt: `Analyze my project (focus on API routes/server functions and frontend components handling user input). Identify all points where user input is received. Apply server-side validation using 'zod' library for expected data types and constraints. Ensure any user-generated content rendered in the frontend is properly sanitized/escaped (check framework defaults or use 'dompurify' if inserting raw HTML). Refactor the code to include these protections.`,
        verification: `Test submitting '<script>alert("XSS")</script>' into input fields. The script should be displayed as harmless text, not executed as an alert.`,
      }
    ]
  },
  {
    id: 'browser_storage',
    category: 'Frontend',
    title: "Don't store sensitive data in the browser",
    status: 'To-Do',
    briefDescription: 'LocalStorage/SessionStorage are insecure.',
    why: "Data in LocalStorage or client-side code (JavaScript variables) is easily accessible to anyone using the browser's developer tools and vulnerable to XSS attacks. Never store API keys, secrets, or long-lived tokens there.",
    actions: [
      {
        type: 'manual',
        title: 'Manual Check',
        description: `Inspect your browser's LocalStorage/SessionStorage (Application tab in DevTools) while using your app. Review your frontend JavaScript files for hardcoded secrets or sensitive data being stored. Ensure no API keys or other confidential information are present.`,
        learnMoreUrl: 'https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Scan for Browser Storage Issues',
        prompt: `Scan my frontend JavaScript code. Identify any potential instances where sensitive information (like API keys, tokens longer than session IDs, passwords) might be stored in window.localStorage, window.sessionStorage, or directly in globally accessible variables. Flag these for removal.`,
        verification: 'Manually check browser storage and flagged code sections after running.'
      }
    ]
  },
  {
    id: 'frontend_api_keys',
    category: 'Frontend',
    title: 'Never expose API keys in frontend',
    status: 'To-Do',
    briefDescription: 'API keys belong on the backend.',
    why: 'Exposed API keys (e.g., for Stripe, OpenAI, Supabase service roles) in your frontend code can be easily stolen and used maliciously, potentially costing you money or compromising user data. They MUST only be used server-side.',
    actions: [
      {
        type: 'vibelaunch',
        title: 'Use Environment Variables / Secrets',
        description: `✅ Store sensitive keys in your hosting platform's environment variables or secrets management (like Replit Secrets, Vercel Environment Variables). Access them ONLY from your backend code (API routes, serverless functions).`,
        learnMoreUrl: 'https://vercel.com/docs/projects/environment-variables'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Secure API Keys',
        prompt: `Identify any API keys hardcoded in my frontend files. Help me move them to server-side environment variables (e.g., process.env accessed via Replit Secrets or Vercel Env Vars). If my frontend needs to trigger actions requiring these keys, create backend API endpoints (e.g., /api/proxy-service) that securely use the keys from environment variables. Modify the frontend code to call these new backend endpoints instead of accessing external services directly.`,
        verification: 'Ensure keys are removed from frontend code and calls now go through your backend proxy endpoints.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Refactor to Secure API Keys',
        prompt: `Scan my frontend codebase for hardcoded API key patterns (sk_..., pk_..., Bearer, etc.). Refactor the code to: 1. Remove these keys. 2. Create corresponding backend API routes (e.g., in Next.js '/pages/api/') that read the keys from environment variables (process.env.MY_API_KEY). 3. Update the frontend components to call these new internal API routes instead of the external services directly.`,
        verification: 'Verify keys are gone from frontend bundles and functionality still works via the new API routes.'
      }
    ]
  },
  {
    id: 'csrf',
    category: 'Frontend',
    title: 'CSRF Protection',
    status: 'To-Do',
    briefDescription: 'Prevents tricked form submissions.',
    why: 'Cross-Site Request Forgery (CSRF) allows attackers to trick logged-in users into unknowingly submitting requests to your application (e.g., changing their password, deleting data) via malicious links or sites.',
    actions: [
      {
        type: 'platform',
        title: 'Framework/Platform Handling',
        description: `Modern frameworks and authentication solutions (like Supabase Auth with HttpOnly, SameSite cookies) often provide significant CSRF protection. Verify your framework's documentation and ensure recommended security settings (especially for cookies) are enabled.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/csrf'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Explain CSRF & Check Setup',
        prompt: `Explain CSRF attacks simply. Review my application setup (mention framework, e.g., Next.js with Supabase Auth) and check if common CSRF protections are likely in place (e.g., SameSite cookie attributes, anti-CSRF tokens if applicable). Suggest configuration checks or code snippets to ensure protection is active.`,
        verification: 'Check cookie settings in browser devtools and framework configuration files.'
      }
    ]
  },

  // == Backend ==
  {
    id: 'auth_fundamentals',
    category: 'Backend',
    title: 'Authentication Fundamentals',
    status: 'To-Do',
    briefDescription: 'Securely verify user identity.',
    why: 'Ensures only legitimate users can access protected parts of your application. Incorrect implementation can lead to unauthorized access.',
    actions: [
      {
        type: 'platform',
        title: 'Platform Auth Handling',
        description: `✅ If using a managed authentication service like Supabase Auth, Replit Auth, Firebase Auth, etc., core authentication security (like password hashing, session management) is typically handled for you. Ensure you are using it correctly to protect routes/data.`,
        learnMoreUrl: 'https://supabase.com/docs/guides/auth'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt (if custom auth): Secure Password Storage',
        prompt: `I am building custom user authentication. Review my backend code for user registration and login. Ensure that when storing passwords, a strong, slow hashing algorithm (like bcrypt or Argon2) is used. Also ensure each password uses a unique salt, stored alongside the hash. Provide code examples/corrections for Node.js/Express (or specify language/framework).`,
        verification: 'Check the database schema for separate hash and salt columns. Verify the auth code uses bcrypt/Argon2 with generated salts.',
        learnMoreUrl: 'https://owasp.org/www-project-password-storage-cheat-sheet/'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Protect Routes',
        prompt: `Analyze my application's routing (e.g., Next.js pages/app router, Express routes). Identify routes/API endpoints that handle sensitive data or actions but don't enforce user authentication. Implement middleware or checks using my authentication library (e.g., Supabase Auth \`getUser()\`, Passport.js) to protect these routes, returning a 401/403 error or redirecting if the user is not authenticated.`,
        verification: 'Attempt to access protected routes while logged out; you should be blocked.'
      }
    ]
  },
  {
    id: 'rls',
    category: 'Backend',
    title: 'Authorization / Row Level Security (RLS)',
    status: 'To-Do',
    briefDescription: 'Ensure users only access their own data.',
    why: 'Authentication confirms *who* the user is, but authorization confirms *what* they are allowed to do. Without proper checks (like RLS in databases), users might access or modify data belonging to others.',
    actions: [
      {
        type: 'platform',
        title: 'Database RLS (Supabase Example)',
        description: `If using Supabase, enable Row Level Security (RLS) on tables containing user-specific data. Create policies to restrict SELECT, INSERT, UPDATE, DELETE operations based on the authenticated user's ID (auth.uid()).`,
        learnMoreUrl: 'https://supabase.com/docs/guides/auth/row-level-security'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Generate RLS Policies',
        prompt: `Generate Supabase SQL commands to enable Row Level Security (RLS) and create policies for a table named 'documents' with a 'user_id' column. Policies should ensure: 1. Users are authenticated. 2. Users can only SELECT their own documents. 3. Users can only INSERT documents with their own user_id. 4. Users can only UPDATE/DELETE their own documents.`,
        verification: 'Test data access in Supabase SQL editor or client library using different user sessions.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Apply RLS Policies',
        prompt: `Connect to my Supabase project. Identify tables storing user-specific data (look for 'user_id', 'owner_id', etc.). For each such table, generate appropriate Row Level Security (RLS) policies ensuring authenticated users can only access/modify their own data (matching user_id == auth.uid()). Apply these policies using SQL commands.`,
        verification: 'Test data access rules using Supabase client library with different authenticated users.'
      }
    ]
  },
  {
    id: 'endpoint_protection',
    category: 'Backend',
    title: 'API Endpoint Protection',
    status: 'To-Do',
    briefDescription: 'Secure every API endpoint.',
    why: 'Every single API endpoint that performs actions or returns data must be protected with authentication and authorization checks. Forgotten or unprotected endpoints are common entry points for attackers.',
    actions: [
      {
        type: 'manual',
        title: 'Manual Review',
        description: `List all your backend API routes/serverless functions. For each one, verify that appropriate authentication (Is the user logged in?) and authorization (Does this user have permission?) checks are performed before executing the main logic.`
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Audit API Endpoints',
        prompt: `Analyze all my API routes/serverless functions (e.g., in /pages/api/, /app/api/, /functions/). For each endpoint, verify that authentication checks (e.g., checking for a valid session/user) and, where necessary, authorization checks (e.g., checking ownership or roles) are performed before processing the request. Flag any endpoints missing these checks.`,
        verification: 'Review the flagged endpoints and add necessary security checks.'
      }
    ]
  },
  {
    id: 'sql_injection',
    category: 'Backend',
    title: 'SQL Injection Prevention',
    status: 'To-Do',
    briefDescription: 'Prevent database manipulation.',
    why: 'If user input is directly inserted into database queries, attackers can inject malicious SQL commands to steal, modify, or delete your entire database. Always use parameterized queries or an ORM.',
    actions: [
      {
        type: 'platform',
        title: 'ORM/Query Builder Handling',
        description: `✅ Most modern ORMs (like Prisma, TypeORM, Kysely) and query builders (like Supabase client library, Knex.js) automatically handle SQL injection protection using parameterized queries. Ensure you are using these tools correctly and not constructing SQL strings manually with user input.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/SQL_Injection'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Check for Raw SQL Issues',
        prompt: `Scan my backend code for any instances where raw SQL query strings are constructed by concatenating user-provided input. Flag these as potential SQL injection vulnerabilities. Recommend rewriting them using parameterized queries or the methods provided by my database client library/ORM (specify if known, e.g., Supabase JavaScript client, Prisma).`,
        verification: 'Ensure no code directly concatenates user input into SQL strings.'
      }
    ]
  },

  // == Practical ==
  {
    id: 'dependencies',
    category: 'Practical',
    title: 'Keep Dependencies Updated',
    status: 'To-Do',
    briefDescription: 'Patch known vulnerabilities.',
    why: 'Software libraries (npm packages, etc.) often have security vulnerabilities discovered after release. Keeping them updated is crucial to patch these holes before attackers exploit them.',
    actions: [
      {
        type: 'manual',
        title: 'Manual Check & Update',
        description: `Regularly run 'npm audit' or 'yarn audit' in your project directory. Review the reported vulnerabilities. Update dependencies using 'npm update'/'yarn upgrade' or 'npm install package@latest'/'yarn add package@latest'. Test your application after updating.`,
        learnMoreUrl: 'https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Explain Audit & Update',
        prompt: `Explain how to check for security vulnerabilities in npm/yarn dependencies using the 'audit' command. Show the commands to update dependencies to their latest safe versions.`,
        verification: 'Run `npm audit` / `yarn audit` again after updating to see if vulnerabilities are resolved.'
      }
    ]
  },
  {
    id: 'error_handling',
    category: 'Practical',
    title: 'Proper Error Handling',
    status: 'To-Do',
    briefDescription: "Don't leak sensitive details.",
    why: "Detailed error messages exposed to users (e.g., stack traces, database errors) can reveal information about your application's structure, libraries used, or even data, helping attackers find vulnerabilities.",
    actions: [
      {
        type: 'manual',
        title: 'Manual Check',
        description: `Test error conditions in your app (e.g., invalid input, failed API calls). Ensure that users see generic, friendly error messages. Check logs for detailed error information, but ensure stack traces or sensitive details aren't sent back in API responses in production environments.`
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement Safe Error Handling',
        prompt: `Review my backend error handling code (e.g., in API routes, server functions). Ensure that in production environments, detailed errors (like stack traces) are logged internally but NEVER sent back to the client. Clients should receive generic error messages (e.g., { message: "Internal Server Error" }) with appropriate HTTP status codes (like 500). Show code examples for catching errors and responding safely in Node.js/Express (or specify framework).`,
        verification: 'Trigger an error in production mode; the browser should show a generic message, not a stack trace.'
      }
    ]
  },
  {
    id: 'secure_cookies',
    category: 'Practical',
    title: 'Secure Cookies',
    status: 'To-Do',
    briefDescription: 'Set HttpOnly, Secure, SameSite.',
    why: 'Cookies used for sessions or storing sensitive info need security attributes: HttpOnly (prevents JavaScript access, mitigating XSS), Secure (sent only over HTTPS), SameSite=Lax/Strict (mitigates CSRF).',
    actions: [
      {
        type: 'platform',
        title: 'Auth Library Defaults',
        description: `Check the documentation for your authentication library (e.g., Supabase Auth). It often handles setting secure cookie attributes by default or provides configuration options. Ensure these options are enabled.`
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Configure Secure Cookies',
        prompt: `Show code examples for setting secure cookie attributes (HttpOnly, Secure, SameSite=Lax) when creating session cookies in Node.js/Express using the 'cookie-parser' or 'express-session' library (or specify framework/library). Explain why each attribute is important.`,
        verification: 'Inspect cookies in browser devtools (Application tab > Cookies) to verify attributes are set correctly.'
      }
    ]
  },
  {
    id: 'rate_limiting_practical',
    category: 'Practical',
    title: 'Rate Limiting',
    status: 'To-Do',
    briefDescription: 'Prevent brute-force & abuse.',
    why: 'Without rate limiting, attackers can flood your login endpoints with password guesses (brute-force) or hammer costly API endpoints, potentially locking out users, increasing your costs, or causing denial of service.',
    actions: [
      {
        type: 'platform',
        title: 'Platform/Gateway Rate Limiting',
        description: `Your hosting provider (Vercel, Netlify) or API Gateway might offer built-in rate limiting features. Check their documentation. This is often the easiest way to implement basic rate limiting.`,
        learnMoreUrl: 'https://vercel.com/docs/security/rate-limits'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement API Rate Limiting',
        prompt: `Show how to implement basic IP-based rate limiting for a specific API route (e.g., '/api/login') in my Node.js/Express backend using the '@upstash/ratelimit' library with Redis or Vercel KV. Limit requests to 10 per minute per IP address.`,
        verification: 'Test the endpoint by sending rapid requests; you should receive a 429 Too Many Requests error after exceeding the limit.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Add Rate Limiting Middleware',
        prompt: `Identify sensitive API routes in my project (e.g., login, signup, password reset, resource-intensive endpoints). Implement rate limiting middleware using '@upstash/ratelimit' and Vercel KV/Upstash Redis. Apply this middleware to the identified routes with appropriate limits (e.g., 5 requests per 10 seconds per IP).`,
        verification: 'Test hitting the rate-limited endpoints rapidly to ensure 429 errors are returned correctly.'
      }
    ]
  },
]; 