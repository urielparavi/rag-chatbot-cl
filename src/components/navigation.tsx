import {
  SignInButton,
  SignOutButton,
  SignUpButton,
  SignedOut,
  SignedIn,
} from '@clerk/nextjs'; // Import Clerk components for authentication UI
import { Button } from './ui/button'; // Import a custom Button component (e.g., from Shadcn UI)

// Navigation component for the top navbar
export const Navigation = () => {
  return (
    // Main nav element with a bottom border
    <nav className="border-b border-[var(--foreground)]/10">
      {/* Container for nav content, flex layout with spacing */}
      <div className="flex container h-16 items-center justify-between px-4 mx-auto">
        {/* Logo / app name on the left */}
        <div className="text-xl font-semibold">RAG Chatbot</div>

        {/* Container for authentication buttons */}
        <div className="flex gap-2">
          {/* Render these buttons only when the user is NOT signed in */}
          <SignedOut>
            <SignInButton mode="modal">
              {/* Custom button that opens Sign In modal */}
              <Button variant="ghost">Sign In</Button>
            </SignInButton>

            <SignUpButton mode="modal">
              {/* Custom button that opens Sign Up modal */}
              <Button>Sign Up</Button>
            </SignUpButton>
          </SignedOut>

          {/* Render these buttons only when the user IS signed in */}
          <SignedIn>
            <SignOutButton>
              {/* Custom button for signing out */}
              <Button variant="outline">Sign Out</Button>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  );
};
