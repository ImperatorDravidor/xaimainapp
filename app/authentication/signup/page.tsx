"use client";

import { SignUp } from "@clerk/nextjs";
import { BeamsBackground } from "@/components/ui/beams-background";
import Image from "next/image";
import { motion } from "framer-motion";
import ShufflingCards from "@/components/auth/ShufflingCards";
import Link from "next/link";
import { dark } from "@clerk/themes";

export default function SignupPage() {
  return (
    <BeamsBackground intensity="subtle">
      {/* Navigation bar with Home link */}
      <div className="absolute top-0 left-0 w-full p-4 md:p-6 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2 text-white/80 hover:text-white transition-colors group">
            <svg 
              className="w-5 h-5 text-blue-400 group-hover:text-blue-300 transition-colors" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" 
              />
            </svg>
            <span className="text-sm md:text-base font-medium">Home</span>
          </Link>
          
          <Link href="/authentication/login" className="text-white/80 hover:text-white text-sm md:text-base font-medium transition-colors">
            Already have an account? <span className="text-blue-400 hover:text-blue-300">Sign in</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 min-h-screen w-full flex items-center justify-center p-4 md:p-8">
        {/* Enhanced floating elements for visual interest */}
        <div className="absolute top-1/4 -left-20 w-60 h-60 rounded-full bg-blue-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/3 -right-20 w-60 h-60 rounded-full bg-violet-500/10 blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full bg-emerald-500/5 blur-3xl"></div>
        
        {/* Main content container */}
        <div className="max-w-7xl w-full min-h-[600px] flex flex-col lg:flex-row lg:items-center lg:gap-12 backdrop-blur-sm rounded-2xl border border-white/5 p-1">
          {/* Inner container with unified background for both columns */}
          <div className="w-full h-full flex flex-col lg:flex-row lg:items-stretch overflow-hidden rounded-xl bg-black/30 border border-white/10 shadow-2xl">
            {/* Left column - Sign Up Form */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              className="flex-1 w-full flex flex-col items-center justify-center py-8 px-4 md:px-8 relative"
            >
              {/* Brand at the top */}
              <motion.div 
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="mb-8 flex flex-col items-center"
              >
                <Link href="/">
                  <Image
                    src="/xanderai.svg"
                    alt="XanderAI"
                    width={180}
                    height={60}
                    className="h-auto"
                    priority
                  />
                </Link>
                
                <motion.h1 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="text-2xl md:text-3xl font-light text-white mt-6 text-center"
                >
                  Join the <motion.span 
                    className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 inline-block"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    AI Workforce
                  </motion.span> Revolution
                </motion.h1>
              </motion.div>
              
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="w-full max-w-md relative"
              >
                {/* Enhanced glowing accents */}
                <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/10 rounded-full blur-3xl"></div>
                
                {/* Cool Animated Border */}
                <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-r from-blue-500 to-violet-500 opacity-20 blur"></div>
                
                <SignUp 
                  appearance={{
                    baseTheme: dark,
                    elements: {
                      rootBox: "mx-auto w-full",
                      card: "bg-black/40 backdrop-blur-sm border border-white/10 shadow-xl rounded-xl relative z-10",
                      headerTitle: "text-white text-xl font-medium",
                      headerSubtitle: "text-white/70",
                      socialButtonsBlockButton: "bg-black/50 border border-white/10 text-white hover:bg-white/10 transition-colors",
                      socialButtonsBlockButtonText: "font-normal",
                      dividerLine: "bg-white/10",
                      dividerText: "text-white/70",
                      formFieldLabel: "text-white/80",
                      formFieldInput: "bg-black/30 border-white/10 text-white placeholder:text-white/40 focus:border-blue-500/50 focus:ring-blue-500/30 transition-all",
                      formFieldInputShowPasswordButton: "text-white/60 hover:text-white/90 transition-colors",
                      formButtonPrimary: "bg-gradient-to-r from-blue-500 to-violet-500 hover:from-blue-600 hover:to-violet-600 text-white shadow-lg border-0 transition-all duration-300",
                      footerActionText: "text-white/60",
                      footerActionLink: "text-blue-400 hover:text-blue-300 transition-colors",
                      formFieldWarningText: "text-amber-400",
                      formFieldErrorText: "text-red-400",
                    }
                  }}
                  routing="path"
                  path="/authentication/signup"
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="mt-8 text-sm text-white/60 text-center font-light max-w-md"
              >
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-300 to-violet-300 font-medium">
                  Unlock 24/7 productivity at a fraction of human cost
                </span>
                <span className="block mt-1 text-white/50 text-xs">
                  Break through growth constraints, slash operational expenses, and achieve new levels of efficiency
                </span>
              </motion.div>
            </motion.div>
            
            {/* Divider for visual separation */}
            <div className="hidden lg:block w-px bg-gradient-to-b from-white/0 via-white/10 to-white/0 self-stretch mx-1"></div>
            
            {/* Right column - Shuffling Cards */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex-1 hidden lg:flex lg:flex-col relative z-10"
            >
              {/* Logo visible only on large screens, in top-right corner */}
              <div className="flex justify-end items-center mb-4 relative z-10 px-6 pt-6">
                <h2 className="text-xl font-light text-white">
                  Enterprise <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-500 font-medium">AI</span> Platform
                </h2>
              </div>
              
              {/* Card component - Improved container dimensions */}
              <div className="flex-grow relative z-10 px-6 pb-6 h-[520px]">
                <ShufflingCards />
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </BeamsBackground>
  );
} 