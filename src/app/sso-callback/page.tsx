"use client";

import { useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { BeamsBackground } from "@/components/ui/beams-background";
// import { useClerk, useUser } from "@clerk/nextjs";

function SSOCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  // const { user, isLoaded } = useUser();
  const user = null;
  const isLoaded = true;
  // const { session } = useClerk();
  const session = null;

  useEffect(() => {
    // Simplified redirect without Clerk
    const next = searchParams.get("next") || "/recap";
    
    // Redirect after a short delay
    const timeout = setTimeout(() => {
      router.push(next);
    }, 1500);

    return () => clearTimeout(timeout);
  }, [router, searchParams]);

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

export default function SSOCallback() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
      </div>
    }>
      <SSOCallbackContent />
    </Suspense>
  );
} 