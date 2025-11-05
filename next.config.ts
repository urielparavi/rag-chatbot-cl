import type { NextConfig } from 'next';
// Import the TypeScript type 'NextConfig' from Next.js.
// This allows TypeScript to know the structure and types of the Next.js configuration object.

const nextConfig: NextConfig = {
  /* config options here */
  serverExternalPackages: ['pdf-parse'],
  // Tell Next.js that 'pdf-parse' is an external package.
  // This means Next.js should NOT try to bundle it into the server build.
  // Instead, it will be loaded directly from node_modules at runtime.
  // Required for Node.js-only packages that might not bundle correctly,
  // like 'pdf-parse', which uses Node APIs like Buffer.
};

export default nextConfig;
// Export the Next.js configuration object so Next.js can use it during build and runtime.
