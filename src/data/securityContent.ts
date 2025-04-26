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
        description: '✅ Most modern hosting platforms enable HTTPS automatically. Verify your site URL starts with https://.',
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
        prompt: `Review all user input fields (forms, URL parameters) and API endpoints in my application. Help me implement server-side validation (checking data types, lengths, formats) and output sanitization (escaping HTML characters before displaying user content) to prevent XSS attacks. Suggest appropriate validation and sanitization approaches for my tech stack.`,
        verification: `Test submitting '<script>alert("XSS")</script>' into input fields. The script should be displayed as harmless text, not executed as an alert.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/Cross_Site_Scripting_(XSS)'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Implement Validation & Sanitization',
        prompt: `Analyze my project's input handling. Identify all points where user input is received and displayed. Help me implement appropriate server-side validation and output sanitization using best practices for my tech stack. Ensure all user-generated content is properly escaped before display.`,
        verification: `Test submitting '<script>alert("XSS")</script>' into input fields. The script should be displayed as harmless text, not executed as an alert.`
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
        prompt: `Scan my frontend code. Identify any potential instances where sensitive information (like API keys, tokens longer than session IDs, passwords) might be stored in browser storage or directly in globally accessible variables. Help me implement secure alternatives based on my tech stack.`,
        verification: 'Manually check browser storage and flagged code sections after running.'
      }
    ]
  },
  {
    id: 'frontend_api_keys',
    category: 'Frontend',
    title: 'Protect API keys and sensitive data',
    status: 'To-Do',
    briefDescription: 'Protect API keys and sensitive data.',
    why: 'Sensitive data in frontend code or browser storage can be easily accessed and stolen. API keys, secrets, and sensitive user data must be properly protected.',
    actions: [
      {
        type: 'vibelaunch',
        title: 'Use Environment Variables / Secrets',
        description: `✅ Store sensitive keys in your hosting platform's environment variables or secrets management. Access them ONLY from your backend code. Never store sensitive data in browser storage (localStorage/sessionStorage).`,
        learnMoreUrl: 'https://owasp.org/www-community/vulnerabilities/Exposed_Environment_Variables'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Secure Sensitive Data',
        prompt: `Help me review my frontend code for sensitive data exposure. This includes: 1. API keys that should be moved to backend environment variables, 2. Sensitive data stored in browser storage, 3. Secrets in JavaScript variables. Guide me in implementing secure alternatives based on my tech stack.`,
        verification: 'Verify no sensitive data exists in frontend code, browser storage, or client-side variables.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Refactor Data Security',
        prompt: `Analyze my frontend for sensitive data exposure: 1. Scan for API keys and secrets that need backend relocation, 2. Check browser storage usage for sensitive data, 3. Review client-side data storage patterns. Help implement secure alternatives using appropriate backend endpoints and storage methods.`,
        verification: 'Confirm all sensitive data is properly secured and no secrets are exposed client-side.'
      }
    ]
  },
  {
    id: 'cookie_security',
    category: 'Frontend',
    title: 'Cookie Security & CSRF Protection',
    status: 'To-Do',
    briefDescription: 'Secure cookies and prevent CSRF.',
    why: 'Proper cookie security is essential for preventing various attacks including CSRF (Cross-Site Request Forgery). Cookies need proper attributes (HttpOnly, Secure, SameSite) and your app needs CSRF protection to prevent malicious sites from making unauthorized requests.',
    actions: [
      {
        type: 'platform',
        title: 'Framework/Platform Handling',
        description: `Modern frameworks often provide security features for cookies and CSRF. Review your framework's documentation and ensure recommended security settings are enabled.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/csrf'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement Cookie & CSRF Security',
        prompt: `Help me review and secure my application's cookie handling and CSRF protection. Guide me in: 1. Setting proper cookie security attributes (HttpOnly, Secure, SameSite), 2. Implementing CSRF tokens or other protections, 3. Ensuring forms and state-changing requests are protected.`,
        verification: 'Verify cookie security attributes and test CSRF protections against malicious requests.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Secure Cookie Configuration',
        prompt: `Analyze my application's cookie usage and CSRF vulnerabilities. Help me implement: 1. Secure cookie attributes for all cookies, 2. Appropriate CSRF protections for forms and state-changing requests, 3. Proper session handling.`,
        verification: 'Test cookie security and attempt CSRF attacks to verify protections.'
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
        description: `✅ If using a managed authentication service, core authentication security (like password hashing, session management) is typically handled for you. Ensure you are using it correctly to protect routes/data.`,
        learnMoreUrl: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Secure Authentication',
        prompt: `Review my authentication implementation. Help me ensure it follows security best practices like secure password storage, proper session management, and protecting sensitive routes. Guide me in implementing these securely with my chosen tech stack.`,
        verification: 'Verify secure password storage and protected routes work as expected.',
        learnMoreUrl: 'https://owasp.org/www-project-top-ten/2017/A2_2017-Broken_Authentication'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Protect Routes',
        prompt: `Analyze my application's routing. Identify routes and API endpoints that handle sensitive data or actions but don't enforce user authentication. Help me implement appropriate authentication and authorization checks using my chosen auth solution.`,
        verification: 'Attempt to access protected routes while logged out; you should be blocked.'
      }
    ]
  },
  {
    id: 'authorization',
    category: 'Backend',
    title: 'Authorization & Data Access Control',
    status: 'To-Do',
    briefDescription: 'Control data access at all levels.',
    why: 'Proper data access control requires both application-level authorization and database-level security. Authorization confirms what users can do, while Row Level Security (RLS) provides an additional critical layer at the database level, ensuring users can only access their authorized data regardless of application logic.',
    actions: [
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement Authorization',
        prompt: `Help me implement comprehensive data access control. Guide me in: 
1. Application-level authorization:
   - Setting up role-based access control
   - Implementing permission checks
   - Protecting sensitive operations
2. Database-level security (RLS):
   - Identifying tables needing row-level protection
   - Creating security policies for operations (SELECT, INSERT, UPDATE, DELETE)
   - Ensuring users can only access their own data`,
        verification: 'Test data access using different user roles and sessions to verify both application and database-level restrictions.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Configure Access Controls',
        prompt: `Analyze my application's data access patterns and security needs. Help me implement:
1. Application Authorization:
   - Role and permission system
   - Access control middleware
   - Authorization checks in business logic
2. Row Level Security:
   - Enable RLS on appropriate tables
   - Create policies for different operations
   - Implement user context-based restrictions`,
        verification: 'Verify access controls by testing with different user permissions and contexts at both application and database levels.'
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
        description: `List all your backend API routes. For each one, verify that appropriate authentication (Is the user logged in?) and authorization (Does this user have permission?) checks are performed before executing the main logic.`
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Audit API Endpoints',
        prompt: `Help me review all my API endpoints and implement proper authentication and authorization checks where needed. Guide me in implementing these securely with my chosen tech stack.`,
        verification: 'Review the endpoints and add necessary security checks.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Audit API Endpoints',
        prompt: `Analyze all my API endpoints. For each endpoint, verify authentication and authorization checks are properly implemented. Help me add appropriate security checks where they're missing.`,
        verification: 'Review the endpoints and verify security checks are working.'
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
        type: 'lovable',
        title: 'Lovable Prompt: Prevent SQL Injection',
        prompt: `Help me review my database queries for potential SQL injection vulnerabilities. Guide me in implementing proper query parameterization or using appropriate database access methods based on my tech stack.`,
        verification: 'Ensure no code directly concatenates user input into SQL strings.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Secure Database Access',
        prompt: `Review my database access code. Help me identify and fix potential SQL injection vulnerabilities by implementing proper query parameterization and following secure database access patterns.`,
        verification: 'Verify all database queries properly handle user input.'
      }
    ]
  },
  {
    id: 'api_security',
    category: 'Backend',
    title: 'API Security & Authorization',
    status: 'To-Do',
    briefDescription: 'Secure API access and data.',
    why: 'APIs need comprehensive security including authentication, authorization, and proper access controls. Each endpoint must verify the user is authenticated and authorized to access the requested data or perform the requested action.',
    actions: [
      {
        type: 'manual',
        title: 'Manual Review',
        description: `Review all API endpoints for proper security: 1. Authentication checks (Is the user logged in?), 2. Authorization rules (Does the user have permission?), 3. Data access controls (Is the user accessing only their data?)`
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement API Security',
        prompt: `Help me implement comprehensive API security. Guide me in: 1. Adding authentication checks to all endpoints, 2. Implementing proper authorization rules and role-based access, 3. Ensuring users can only access their own data, 4. Setting up proper error handling for unauthorized access.`,
        verification: 'Test API access with different user roles and verify proper access controls.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Secure API Endpoints',
        prompt: `Analyze all API endpoints and data access patterns. Help me implement: 1. Authentication middleware for protected routes, 2. Authorization rules based on user roles and permissions, 3. Data access controls to prevent unauthorized access, 4. Proper security response headers.`,
        verification: 'Verify endpoint security by testing with different user permissions and access patterns.'
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
    why: 'Software libraries often have security vulnerabilities discovered after release. Keeping them updated is crucial to patch these holes before attackers exploit them.',
    actions: [
      {
        type: 'lovable',
        title: 'Lovable Prompt: Update Dependencies',
        prompt: `Help me check for security vulnerabilities in my project dependencies and guide me through safely updating them based on my tech stack.`,
        verification: 'Run security audit tools again after updating to verify vulnerabilities are resolved.'
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
        type: 'lovable',
        title: 'Lovable Prompt: Implement Safe Error Handling',
        prompt: `Help me implement proper error handling that logs detailed errors internally but only shows appropriate user-friendly messages to clients. Guide me in setting this up with my tech stack.`,
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
        type: 'lovable',
        title: 'Lovable Prompt: Configure Secure Cookies',
        prompt: `Help me configure secure cookie settings for my application, ensuring proper HttpOnly, Secure, and SameSite attributes are set based on my tech stack.`,
        verification: 'Inspect cookies in browser devtools to verify attributes are set correctly.'
      }
    ]
  },
  {
    id: 'rate_limiting',
    category: 'Practical',
    title: 'Rate Limiting',
    status: 'To-Do',
    briefDescription: 'Prevent brute-force & abuse.',
    why: 'Without rate limiting, attackers can flood your login endpoints with password guesses (brute-force) or hammer costly API endpoints, potentially locking out users, increasing your costs, or causing denial of service.',
    actions: [
      {
        type: 'lovable',
        title: 'Lovable Prompt: Implement Rate Limiting',
        prompt: `Help me implement appropriate rate limiting for sensitive endpoints (like login, signup, password reset) based on my tech stack and infrastructure.`,
        verification: 'Test hitting the rate-limited endpoints rapidly to ensure limits are enforced.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Add Rate Limiting',
        prompt: `Identify sensitive endpoints in my application that need protection from abuse. Help me implement appropriate rate limiting based on my infrastructure to prevent brute force attacks and API abuse.`,
        verification: 'Test rate-limited endpoints to ensure proper throttling.'
      }
    ]
  },
  {
    id: 'ddos_protection',
    category: 'Backend',
    title: 'DDoS Protection',
    status: 'To-Do',
    briefDescription: 'Prevent service disruption from attacks.',
    why: 'Distributed Denial of Service (DDoS) attacks can overwhelm your servers with traffic, making your app unavailable to real users. Protection at the infrastructure level is essential.',
    actions: [
      {
        type: 'vibelaunch',
        title: 'Platform DDoS Protection',
        description: `✅ Choose a hosting platform or CDN that provides built-in DDoS protection with features like traffic filtering, rate limiting, and "Under Attack" mode.`,
        learnMoreUrl: 'https://owasp.org/www-community/attacks/Denial_of_Service'
      },
      {
        type: 'lovable',
        title: 'Lovable Prompt: Configure DDoS Protection',
        prompt: `Help me review and configure DDoS protection for my application. Guide me in: 1. Setting up infrastructure-level protection, 2. Configuring rate limiting and traffic rules, 3. Implementing "Under Attack" mode if needed.`,
        verification: 'Verify DDoS protection is active and properly configured in your hosting platform.'
      },
      {
        type: 'cursor',
        title: 'Cursor Prompt: Implement DDoS Safeguards',
        prompt: `Analyze my application's DDoS vulnerabilities. Help me: 1. Configure platform-level DDoS protection, 2. Set up appropriate rate limiting rules, 3. Implement traffic filtering and "Under Attack" mode configuration.`,
        verification: 'Check platform settings to confirm DDoS protection is properly enabled and configured.'
      }
    ]
  }
]; 