export {};
// Make this file a module.
// Without this, TypeScript treats it as a global script,
// which can pollute the global namespace.

export type Roles = 'admin' | 'user';
// Define a type called "Roles" which can only be 'admin' or 'user'.
// This ensures type safety and autocomplete wherever you use Roles.

declare global {
  // Start a global declaration block.
  // Everything inside here extends the global namespace,
  // making it accessible throughout the project.

  interface CustomJwtSessionClaims {
    // Define a new interface called CustomJwtSessionClaims.
    // We will use this to extend Clerk's JWT session claims with our custom metadata.

    metadata: {
      // Add a "metadata" object to the session claims.
      // This is where we store additional info about the user, like role.

      role?: Roles;
      // Optional field "role" inside metadata.
      // Can be 'admin' or 'user', or undefined if not set.
    };
  }
}

// For example

// {
//   "sub": "user_id_123",
//   "email": "user@example.com",
//   "metadata": {
//     "role": "admin"
//   }
// }
