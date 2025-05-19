"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Updated card data with marketing updates, industry news, and feature updates
const cardData = [
  {
    id: 1,
    title: "AI Workflow Automation",
    description: "Our latest update brings intelligent workflow automation that reduces task completion time by up to 67% across teams.",
    icon: (
      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    type: "Feature Update",
    gradient: "from-blue-600/50 via-indigo-600/45 to-cyan-600/50",
    highlight: "bg-blue-500/50",
    accent: "border-blue-500/60",
  },
  {
    id: 2,
    title: "AI Market Growth",
    description: "Enterprise AI adoption increased by 43% in Q2 2023, with workforce solutions leading the sector according to Gartner's latest report.",
    icon: (
      <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
    ),
    type: "Industry News",
    gradient: "from-purple-600/50 via-fuchsia-600/45 to-pink-600/50",
    highlight: "bg-purple-500/50",
    accent: "border-purple-500/60",
  },
  {
    id: 3,
    title: "Team Analytics Suite",
    description: "Introducing our advanced analytics dashboard with real-time performance metrics, team productivity insights, and custom reporting tools.",
    icon: (
      <svg className="w-10 h-10 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    type: "Platform Update",
    gradient: "from-emerald-600/50 via-green-600/45 to-teal-600/50",
    highlight: "bg-emerald-500/50",
    accent: "border-emerald-500/60",
  },
  {
    id: 4,
    title: "Gen AI Integration",
    description: "XanderAI now integrates natively with OpenAI, Anthropic, and other leading LLM providers for seamless AI-assisted workflows.",
    icon: (
      <svg className="w-10 h-10 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
      </svg>
    ),
    type: "Feature Update",
    gradient: "from-amber-600/50 via-yellow-600/45 to-orange-600/50",
    highlight: "bg-amber-500/50",
    accent: "border-amber-500/60",
  },
  {
    id: 5,
    title: "Enterprise AI Spending Up",
    description: "Global enterprise AI spending projected to reach $154 billion by 2024, with intelligent workforce solutions taking 37% market share.",
    icon: (
      <svg className="w-10 h-10 text-rose-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    type: "Industry News",
    gradient: "from-rose-600/50 via-red-600/45 to-pink-600/50",
    highlight: "bg-rose-500/50",
    accent: "border-rose-500/60",
  },
  {
    id: 6,
    title: "Multi-Modal AI Features",
    description: "New update enables AI processing of text, images, and structured data in a single workflow, increasing cross-functional collaboration.",
    icon: (
      <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    type: "Feature Update",
    gradient: "from-blue-600/50 via-cyan-600/45 to-teal-600/50",
    highlight: "bg-blue-500/50",
    accent: "border-blue-500/60",
  },
  {
    id: 7,
    title: "XanderAI Secures Series B",
    description: "We've secured $42M in Series B funding to accelerate our AI workforce platform development and international expansion.",
    icon: (
      <svg className="w-10 h-10 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    type: "Company News",
    gradient: "from-indigo-600/50 via-purple-600/45 to-violet-600/50",
    highlight: "bg-indigo-500/50",
    accent: "border-indigo-500/60",
  },
  {
    id: 8,
    title: "Regulatory AI Framework",
    description: "Our new compliance suite helps enterprises navigate emerging AI regulations while maintaining innovation and productivity.",
    icon: (
      <svg className="w-10 h-10 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    type: "Platform Update",
    gradient: "from-teal-600/50 via-green-600/45 to-emerald-600/50",
    highlight: "bg-teal-500/50",
    accent: "border-teal-500/60",
  },
];

export default function ShufflingCards() {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const [isManualChange, setIsManualChange] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Reset and start timer when manual interaction ends
  useEffect(() => {
    if (isManualChange) {
      const timer = setTimeout(() => {
        setIsManualChange(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [isManualChange]);

  // Auto-shuffle cards with pause during manual interaction
  useEffect(() => {
    if (!isManualChange) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      
      intervalRef.current = setInterval(() => {
        setActiveCardIndex((prev) => (prev + 1) % cardData.length);
      }, 5000); // Change card every 5 seconds
    }
    
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isManualChange]);

  const handleManualNavigation = (index: number) => {
    setIsManualChange(true);
    setActiveCardIndex(index);
  };
  
  const handlePrev = () => {
    setIsManualChange(true);
    setActiveCardIndex((prev) => (prev - 1 + cardData.length) % cardData.length);
  };
  
  const handleNext = () => {
    setIsManualChange(true);
    setActiveCardIndex((prev) => (prev + 1) % cardData.length);
  };

  return (
    <div className="h-full w-full flex flex-col">
      <motion.div 
        className="mb-8"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h2 className="text-3xl md:text-4xl font-light text-white mb-2">
          Intelligent Teams
        </h2>
        <div className="flex items-center">
          <h2 className="text-3xl md:text-4xl font-light text-white">
            for the Future of
          </h2>
          <div className="relative ml-3">
            <motion.span
              className="text-3xl md:text-4xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-violet-400"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              Work
            </motion.span>
            <motion.div 
              className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-blue-500 to-violet-500"
              initial={{ width: 0 }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.6, delay: 0.4 }}
            />
          </div>
        </div>
      </motion.div>

      {/* Progress Indicators */}
      <div className="flex space-x-2 mb-8 overflow-x-auto pb-2">
        {cardData.map((_, index) => (
          <button
            key={index}
            onClick={() => handleManualNavigation(index)}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              index === activeCardIndex 
                ? "w-8 bg-gradient-to-r from-blue-500 to-violet-500" 
                : "w-4 bg-white/20 hover:bg-white/30"
            }`}
            aria-label={`View card ${index + 1}`}
          />
        ))}
      </div>

      {/* Cards */}
      <div className="relative flex-grow w-full overflow-hidden rounded-2xl border border-white/10 shadow-2xl bg-black/40">
        {/* Improved glowing accent elements */}
        <div className="absolute -top-20 -left-20 w-60 h-60 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-violet-500/20 rounded-full blur-3xl pointer-events-none"></div>
        
        {/* Added dark overlay for better contrast */}
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        
        {/* Animated mesh background */}
        <div className="absolute inset-0 opacity-30 overflow-hidden z-5">
          <svg className="w-full h-full opacity-70" viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="mesh-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
                <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#EC4899" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <motion.path
              d="M0,50 Q25,30 50,50 T100,50 V100 H0 Z"
              fill="url(#mesh-gradient)"
              initial={{ d: "M0,50 Q25,30 50,50 T100,50 V100 H0 Z" }}
              animate={{
                d: [
                  "M0,50 Q25,30 50,50 T100,50 V100 H0 Z",
                  "M0,55 Q25,35 50,55 T100,55 V100 H0 Z",
                  "M0,45 Q25,25 50,45 T100,45 V100 H0 Z",
                  "M0,50 Q25,30 50,50 T100,50 V100 H0 Z",
                ],
              }}
              transition={{
                repeat: Infinity,
                repeatType: "loop",
                duration: 20,
                ease: "easeInOut",
              }}
            />
          </svg>
        </div>
        
        <AnimatePresence initial={false} mode="wait">
          {cardData.map((card, index) => (
            index === activeCardIndex && (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -30 }}
                transition={{ 
                  duration: 0.5, 
                  ease: [0.22, 1, 0.36, 1] // Custom easing curve for smoother motion
                }}
                className={`absolute inset-0 h-full rounded-2xl bg-gradient-to-br ${card.gradient} p-8 backdrop-blur-md flex flex-col z-30`}
              >
                {/* Floating particle effects */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                  {[...Array(6)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`absolute w-2 h-2 rounded-full ${card.highlight} opacity-80`}
                      initial={{ 
                        x: `${Math.random() * 100}%`, 
                        y: `${Math.random() * 100}%` 
                      }}
                      animate={{ 
                        x: [
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100}%`
                        ],
                        y: [
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100}%`,
                          `${Math.random() * 100}%`
                        ]
                      }}
                      transition={{
                        duration: 10 + Math.random() * 20,
                        repeat: Infinity,
                        repeatType: "reverse"
                      }}
                    />
                  ))}
                </div>

                <div className="flex flex-col mb-3 relative z-20">
                  <div className="text-xs font-semibold text-white/80 uppercase tracking-wider mb-1">
                    {card.type}
                  </div>
                  <div className="flex items-center">
                    <motion.div 
                      initial={{ scale: 0.9, opacity: 0.5 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className={`mr-4 p-3 rounded-xl ${card.highlight} backdrop-blur-sm border ${card.accent} shadow-lg`}
                    >
                      {card.icon}
                    </motion.div>
                    <motion.h3 
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                      className="text-2xl font-medium text-white"
                    >
                      {card.title}
                    </motion.h3>
                  </div>
                </div>
                
                <motion.p 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-white/90 text-lg leading-relaxed relative z-20"
                >
                  {card.description}
                </motion.p>
                
                {/* Pattern accent element */}
                <div className="relative h-px w-full mt-auto mb-6 overflow-hidden z-20">
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/40 to-white/0"></div>
                  <motion.div 
                    className="absolute inset-0 h-full w-6 bg-white/70"
                    initial={{ left: "0%" }}
                    animate={{ left: "100%" }}
                    transition={{ 
                      duration: 2.5, 
                      repeat: Infinity, 
                      repeatType: "loop",
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                <div className="flex justify-between items-center relative z-20">
                  <motion.span 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="text-white/80 text-sm font-medium"
                  >
                    {`${index + 1} of ${cardData.length}`}
                  </motion.span>
                  <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="flex space-x-3"
                  >
                    <button 
                      onClick={handlePrev}
                      className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-all"
                      aria-label="Previous card"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                    </button>
                    <button 
                      onClick={handleNext}
                      className="w-9 h-9 rounded-full border border-white/30 flex items-center justify-center text-white hover:bg-white/10 active:bg-white/20 transition-all"
                      aria-label="Next card"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
} 