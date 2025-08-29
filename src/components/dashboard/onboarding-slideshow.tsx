"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { 
  BarChart, 
  TrendingUp, 
  CheckCircle, 
  Calendar, 
  Clock, 
  BellRing,
  ChevronLeft,
  ChevronRight,
  X,
  ArrowRight,
  Users,
  Zap,
  BookOpen,
  Lightbulb,
  Settings,
  Play,
  Pause
} from "lucide-react";

interface OnboardingSlideshowProps {
  onboardingData: any;
  onComplete: () => void;
}

export function OnboardingSlideshow({ onboardingData, onComplete }: OnboardingSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const totalSlides = 5;
  
  // Autoplay timer
  useEffect(() => {
    if (!autoplay) return;
    
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          // Move to next slide when progress reaches 100%
          setCurrentSlide(current => (current + 1) % totalSlides);
          return 0;
        }
        return prev + 0.5; // Increment by 0.5% every 50ms
      });
    }, 50);
    
    return () => clearInterval(progressInterval);
  }, [autoplay, totalSlides]);
  
  // Navigation functions
  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
    setProgress(0);
  }, []);
  
  const goToNextSlide = useCallback(() => {
    if (currentSlide === totalSlides - 1) {
      onComplete();
    } else {
      setCurrentSlide(current => (current + 1) % totalSlides);
      setProgress(0);
    }
  }, [currentSlide, totalSlides, onComplete]);
  
  const goToPrevSlide = useCallback(() => {
    setCurrentSlide(current => (current - 1 + totalSlides) % totalSlides);
    setProgress(0);
  }, [totalSlides]);
  
  // Handle key navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        goToNextSlide();
      } else if (e.key === "ArrowLeft") {
        goToPrevSlide();
      }
    };
    
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNextSlide, goToPrevSlide]);
  
  // Slide animations
  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring" as const, stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    }),
  };
  
  // Progress bar animation
  const progressBarVariants = {
    empty: { width: "0%" },
    filling: {
      width: `${progress}%`,
      transition: { duration: 0.1, ease: "linear" as const }
    }
  };
  
  const slideContent = [
    // Welcome slide
    <motion.div 
      key="slide-0" 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <h1 className="text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
        Welcome, {onboardingData.userName}!
      </h1>
      <p className="text-xl text-neutral-300 mb-8 max-w-lg">
        We're excited to have you join XanderAI. Let's get your AI workforce set up and running.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-3xl mb-8">
        <Card className="bg-black/40 border-neutral-800 p-6 flex items-start">
          <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mr-4 shrink-0">
            <Zap className="w-6 h-6 text-blue-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">24/7 Productivity</h3>
            <p className="text-neutral-400 text-sm">
              Your AI teams work around the clock, handling tasks even when you're offline.
            </p>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6 flex items-start">
          <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mr-4 shrink-0">
            <Users className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-white mb-2">Custom AI Teams</h3>
            <p className="text-neutral-400 text-sm">
              Create specialized teams for different functions across your organization.
            </p>
          </div>
        </Card>
      </div>
      
      <Button 
        onClick={goToNextSlide} 
        className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium text-lg group hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
      >
        Let's Get Started
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>,
    
    // AI Teams slide
    <motion.div 
      key="slide-1" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-blue-600 text-white border-none mb-4">RECOMMENDED AI TEAMS</Badge>
      <h2 className="text-4xl font-bold text-white mb-4">Build Your AI Workforce</h2>
      <p className="text-neutral-400 text-center max-w-xl mb-8">
        We've selected these recommended AI teams based on your profile. Each team serves a specific function to help your business grow.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl mb-8">
        {onboardingData.recommendedTeams.map((team: any, index: number) => (
          <motion.div
            key={team.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (index * 0.2) }}
            className="h-full"
          >
            <Card className="bg-black/40 backdrop-blur-sm border border-neutral-800 p-6 h-full hover:border-blue-500/50 hover:shadow-lg hover:shadow-blue-600/10 transition-all duration-300 group">
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-2xl">
                  {team.icon}
                </div>
                <Badge variant="outline" className="text-blue-400 border-blue-500/30 bg-blue-500/5">
                  Recommended
                </Badge>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-blue-300 transition-colors">
                {team.name}
              </h3>
              <p className="text-neutral-400 text-sm group-hover:text-neutral-300 transition-colors">
                {team.description}
              </p>
              <div className="mt-6">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-neutral-700 text-white hover:border-blue-500/50 hover:text-blue-300 group-hover:border-blue-500/50"
                >
                  Create Team
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="w-full max-w-5xl">
        <Link href="/platform/teams" className="text-blue-400 hover:text-blue-300 flex items-center transition-colors">
          <span>Browse all available team templates</span>
          <ChevronRight className="w-4 h-4 ml-1" />
        </Link>
      </div>
    </motion.div>,
    
    // Quick Start Guides slide
    <motion.div 
      key="slide-2" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-purple-600 text-white border-none mb-4">QUICK START GUIDES</Badge>
      <h2 className="text-4xl font-bold text-white mb-4">Learn the Essentials</h2>
      <p className="text-neutral-400 text-center max-w-xl mb-8">
        Get up to speed quickly with these essential guides to make the most of your AI workforce.
      </p>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card className="bg-black/40 border-neutral-800 p-6 h-full">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-white mb-2">Interactive Tutorials</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Follow these step-by-step guides to learn the platform basics.
            </p>
            
            <div className="space-y-3">
              {onboardingData.quickStartGuides.map((guide: any, index: number) => (
                <motion.div
                  key={guide.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + (index * 0.2) }}
                >
                  <Link 
                    href={guide.link} 
                    className="flex items-center p-3 rounded-lg bg-black/30 border border-neutral-800 hover:border-purple-500/40 hover:bg-black/50 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center mr-3">
                      <Play className="w-4 h-4 text-purple-400" />
                    </div>
                    <span className="text-white group-hover:text-purple-300 transition-colors">{guide.title}</span>
                    <ChevronRight className="w-4 h-4 ml-auto text-neutral-500 group-hover:text-purple-400 transition-colors" />
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6 h-full">
          <div className="mb-4">
            <h3 className="text-xl font-medium text-white mb-2">Pro Tips</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Expert advice to get the most value from your AI workforce.
            </p>
            
            <div className="space-y-4">
              {onboardingData.welcomeTips.map((tip: string, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + (index * 0.2) }}
                  className="flex items-start"
                >
                  <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5 mr-3 shrink-0">
                    <Lightbulb className="w-3 h-3 text-blue-400" />
                  </div>
                  <p className="text-neutral-300 text-sm">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </motion.div>,
    
    // Project Templates slide
    <motion.div 
      key="slide-3" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-emerald-600 text-white border-none mb-4">TEMPLATES & WORKFLOWS</Badge>
      <h2 className="text-4xl font-bold text-white mb-4">Ready-to-Use Solutions</h2>
      <p className="text-neutral-400 text-center max-w-xl mb-8">
        Get a head start with these pre-built templates designed for immediate value.
      </p>
      
      <div className="w-full max-w-5xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {onboardingData.suggestedTemplates.map((template: any, index: number) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + (index * 0.2) }}
            >
              <Card className="bg-black/40 border-neutral-800 p-5 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-600/10 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-3">
                  <Badge className="bg-black/70 text-white/80 border border-neutral-700">
                    {template.category}
                  </Badge>
                  <Badge variant="outline" className={`
                    ${template.complexity === 'Easy' ? 'text-green-400 border-green-500/30 bg-green-500/5' : ''}
                    ${template.complexity === 'Medium' ? 'text-amber-400 border-amber-500/30 bg-amber-500/5' : ''}
                    ${template.complexity === 'Advanced' ? 'text-blue-400 border-blue-500/30 bg-blue-500/5' : ''}
                  `}>
                    {template.complexity}
                  </Badge>
                </div>
                <h3 className="text-lg font-medium text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {template.name}
                </h3>
                <div className="text-neutral-400 text-sm group-hover:text-neutral-300 mb-4 transition-colors">
                  Pre-configured workflow with automated tasks and reports.
                </div>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full border-neutral-700 text-white hover:border-emerald-500/50 hover:text-emerald-300 group-hover:border-emerald-500/50"
                >
                  Use Template
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="w-full rounded-xl p-4 bg-gradient-to-r from-blue-950/50 to-purple-950/50 border border-blue-800/30"
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 rounded-full bg-blue-500/30 flex items-center justify-center mr-4">
                <Settings className="w-6 h-6 text-blue-300" />
              </div>
              <div>
                <h3 className="text-lg font-medium text-white">Need a custom solution?</h3>
                <p className="text-neutral-300">We can build custom AI workflows tailored to your needs</p>
              </div>
            </div>
            <Button className="bg-white text-black hover:bg-white/90 md:ml-4 whitespace-nowrap">
              Contact Sales
            </Button>
          </div>
        </motion.div>
      </div>
    </motion.div>,
    
    // Final slide
    <motion.div 
      key="slide-4" 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
        <CheckCircle className="w-12 h-12 text-white" />
      </div>
      
      <h1 className="text-5xl font-bold text-white mb-4">You're All Set!</h1>
      <p className="text-xl text-neutral-300 mb-8 max-w-lg">
        You're ready to explore the XanderAI platform and start building your AI workforce.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-10">
        <Card className="bg-black/40 border-neutral-800 p-6 relative overflow-hidden group hover:border-blue-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-blue-800/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Create Teams</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Build your first AI team to start automating tasks and workflows.
            </p>
            <Button variant="outline" size="sm" className="w-full border-neutral-700 text-white hover:border-blue-500/50 hover:text-blue-300 group-hover:border-blue-500/50">
              Create Team
            </Button>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6 relative overflow-hidden group hover:border-purple-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-purple-800/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6 text-purple-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Explore Guides</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Learn more about platform features and best practices.
            </p>
            <Button variant="outline" size="sm" className="w-full border-neutral-700 text-white hover:border-purple-500/50 hover:text-purple-300 group-hover:border-purple-500/50">
              View Guides
            </Button>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6 relative overflow-hidden group hover:border-emerald-500/50 transition-all duration-300">
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/5 to-emerald-800/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative z-10">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center mb-4">
              <Zap className="w-6 h-6 text-emerald-400" />
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Start Launch Pad</h3>
            <p className="text-neutral-400 text-sm mb-4">
              Quick access to the most common tasks and workflows.
            </p>
            <Button variant="outline" size="sm" className="w-full border-neutral-700 text-white hover:border-emerald-500/50 hover:text-emerald-300 group-hover:border-emerald-500/50">
              Open Launch Pad
            </Button>
          </div>
        </Card>
      </div>
      
      <Button 
        onClick={onComplete} 
        className="px-8 py-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-xl font-medium text-lg group hover:shadow-lg hover:shadow-blue-600/20 transition-all duration-300"
      >
        Go to Dashboard
        <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
      </Button>
    </motion.div>,
  ];

  return (
    <div className="h-full w-full flex flex-col">
      {/* Top bar with controls and indicators */}
      <div className="flex items-center justify-between py-4 px-6">
        <div className="flex items-center">
          <button
            onClick={goToPrevSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={currentSlide === 0}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <span className="text-white/70 mx-4">
            {currentSlide + 1} / {totalSlides}
          </span>
          <button
            onClick={goToNextSlide}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={() => setAutoplay(!autoplay)}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            {autoplay ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          </button>
          <button
            onClick={onComplete}
            className="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="h-1 w-full bg-neutral-800/50 overflow-hidden">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
          variants={progressBarVariants}
          initial="empty"
          animate="filling"
        />
      </div>
      
      {/* Main content area */}
      <div className="flex-1 flex items-center justify-center p-6 relative">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={currentSlide}
            custom={0}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full flex items-center justify-center"
          >
            {slideContent[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>
      
      {/* Navigation dots */}
      <div className="flex justify-center pb-6">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full mx-1.5 transition-all ${
              currentSlide === index
                ? "bg-blue-500 w-6"
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
          />
        ))}
      </div>
    </div>
  );
} 