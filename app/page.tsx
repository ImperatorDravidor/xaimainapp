"use client";

import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import { BeamsBackground } from "@/components/ui/beams-background";
import { Button } from "@/components/ui/button";
import { CardSpotlight } from "@/components/ui/card-spotlight";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  
  // Auto-redirect removed
  
  return (
    <BeamsBackground intensity="subtle">
      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <Image
              src="/xanderai.svg"
              alt="XanderAI"
              width={220}
              height={70}
              className="h-auto"
              priority
            />
          </div>
          <h1 className="text-5xl font-light text-white mb-4">
            Intelligent <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">Teams</span>
          </h1>
          <h1 className="text-5xl font-light text-white mb-6">
            for the Future of Work
          </h1>
        </motion.div>
        
        <CardSpotlight className="max-w-xl">
          <div className="text-center relative z-10">
            <h2 className="text-2xl font-medium text-white mb-4">Welcome to XanderAI</h2>
            <p className="text-white/70 mb-6">
              Sign in to access your AI-powered workspace.
            </p>
            
            <Link href="/authentication/login">
              <Button className="bg-white text-black hover:bg-white/90">
                Sign In to Your Account
              </Button>
            </Link>
          </div>
        </CardSpotlight>
      </div>
    </BeamsBackground>
  );
}
