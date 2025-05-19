"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BeamsBackground } from "@/components/ui/beams-background";
import { useClerk, useUser } from "@clerk/nextjs";

export default function SSOCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user, isLoaded } = useUser();
  const { session } = useClerk();

  useEffect(() => {
    if (!isLoaded || !session) return;
    
    // Determine if this is a new user based on session creation time
    const createdAt = session.createdAt ? new Date(session.createdAt) : null;
    const isNewUser = createdAt && 
      (Date.now() - createdAt.getTime() < 5 * 60 * 1000); // Within 5 minutes of session creation
    
    // Get the "next" URL parameter value
    let next = searchParams.get("next") || "/recap";
    
    // Add new_user parameter if this is a new user
    if (isNewUser && next.includes('/recap')) {
      next = `/recap?new_user=true`;
    } else if (isNewUser) {
      next = `/recap?new_user=true`;
    }
    
    // Redirect after a short delay
    const timeout = setTimeout(() => {
      router.push(next);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router, searchParams, isLoaded, session]);

  return (
    <BeamsBackground intensity="subtle">
      <div className="relative z-10 h-screen w-full flex flex-col justify-center items-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-t-blue-500 border-white/20 rounded-full animate-spin mx-auto mb-6"></div>
          <h1 className="text-2xl font-light text-white mb-2">
            Completing Authentication
          </h1>
          <p className="text-white/60">You will be redirected shortly...</p>
        </div>
      </div>
    </BeamsBackground>
  );
} 