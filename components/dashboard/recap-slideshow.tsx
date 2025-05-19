"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart, 
  TrendingUp, 
  CheckCircle, 
  Calendar, 
  Clock, 
  BellRing,
  ChevronLeft,
  ChevronRight,
  X
} from "lucide-react";

interface RecapSlideshowProps {
  recapData: any;
  onComplete: () => void;
}

export function RecapSlideshow({ recapData, onComplete }: RecapSlideshowProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [progress, setProgress] = useState(0);
  
  const totalSlides = 6;
  
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
    setCurrentSlide(current => (current + 1) % totalSlides);
    setProgress(0);
  }, [totalSlides]);
  
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
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.4 },
        scale: { duration: 0.4 }
      }
    },
    exit: (direction: number) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
      transition: {
        x: { type: "spring", stiffness: 300, damping: 30 },
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
      transition: { duration: 0.1, ease: "linear" }
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
        Welcome back, {recapData.userName}!
      </h1>
      <p className="text-xl text-neutral-300 mb-8 max-w-lg">
        Here's what's happened since your last login. Xander has been hard at work managing your AI workforce.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-3xl">
        <Card className="bg-black/40 border-neutral-800 p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-blue-400" />
            </div>
            <span className="text-3xl font-bold text-white mb-1">{recapData.activeTeams}</span>
            <span className="text-neutral-400 text-sm">Active Teams</span>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <CheckCircle className="w-6 h-6 text-purple-400" />
            </div>
            <span className="text-3xl font-bold text-white mb-1">{recapData.tasks}</span>
            <span className="text-neutral-400 text-sm">Tasks Completed</span>
          </div>
        </Card>
        
        <Card className="bg-black/40 border-neutral-800 p-6">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center mb-4">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
            <span className="text-3xl font-bold text-green-400 mb-1">{recapData.costSavings}</span>
            <span className="text-neutral-400 text-sm">Cost Savings</span>
          </div>
        </Card>
      </div>
    </motion.div>,
    
    // Team Productivity slide
    <motion.div 
      key="slide-1" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-blue-600 text-white border-none mb-4">TEAM PRODUCTIVITY</Badge>
      <h2 className="text-4xl font-bold text-white mb-6">Your AI Teams are Delivering</h2>
      
      <div className="w-full max-w-4xl">
        <div className="relative h-80 w-full">
          {/* Productivity chart (simulated) */}
          <div className="absolute inset-0 flex items-end">
            {[65, 78, 90, 85, 95, 88, 92].map((value, i) => (
              <div key={i} className="flex-1 flex flex-col items-center">
                <motion.div 
                  className="w-full max-w-[40px] bg-gradient-to-t from-blue-600 to-purple-600 rounded-t-md mx-1"
                  initial={{ height: 0 }}
                  animate={{ height: `${value}%` }}
                  transition={{ delay: 0.2 + (i * 0.1), duration: 1, ease: "backOut" }}
                />
                <span className="text-xs text-neutral-500 mt-2">Day {i+1}</span>
              </div>
            ))}
          </div>
          
          {/* Horizontal gridlines */}
          {[0, 25, 50, 75, 100].map((line, i) => (
            <div 
              key={i} 
              className="absolute w-full h-px bg-neutral-800" 
              style={{ bottom: `${line}%` }}
            >
              <span className="absolute right-full mr-2 text-xs text-neutral-500">{line}%</span>
            </div>
          ))}
        </div>
        
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card className="bg-black/40 border-neutral-800 p-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center mr-4">
                <TrendingUp className="w-5 h-5 text-blue-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">Efficiency Rate</h3>
                <p className="text-neutral-400 text-sm">
                  Your AI teams are operating at 94% efficiency, 32% higher than human teams.
                </p>
              </div>
            </div>
          </Card>
          
          <Card className="bg-black/40 border-neutral-800 p-4">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center mr-4">
                <Clock className="w-5 h-5 text-purple-400" />
              </div>
              <div>
                <h3 className="text-white font-medium">24/7 Operations</h3>
                <p className="text-neutral-400 text-sm">
                  AI teams have maintained continuous operation with 99.9% uptime.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </motion.div>,
    
    // Cost savings slide
    <motion.div 
      key="slide-2" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-green-600 text-white border-none mb-4">FINANCIAL IMPACT</Badge>
      <h2 className="text-4xl font-bold text-white mb-2">Cost Savings Analysis</h2>
      <p className="text-neutral-400 mb-6 text-center max-w-lg">
        Your AI teams are generating significant cost savings compared to traditional workforce.
      </p>
      
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <Card className="bg-black/40 border-neutral-800 p-6 h-full">
            <h3 className="text-2xl font-bold text-white mb-4">Cost Comparison</h3>
            
            <div className="space-y-6">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">Traditional Workforce</span>
                  <span className="text-neutral-300">$190,000</span>
                </div>
                <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-red-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ delay: 0.4, duration: 1 }}
                  />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-neutral-400">XanderAI Workforce</span>
                  <span className="text-green-400">{recapData.costSavings}</span>
                </div>
                <div className="h-3 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: "25%" }}
                    transition={{ delay: 0.6, duration: 1 }}
                  />
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-green-900/20 border border-green-500/20 rounded-lg">
              <div className="flex items-center">
                <TrendingUp className="h-5 w-5 text-green-400 mr-2" />
                <span className="text-green-400 font-medium">75% Cost Reduction</span>
              </div>
              <p className="text-neutral-400 text-sm mt-1">
                Your AI teams have reduced operational costs by 75% while increasing productivity.
              </p>
            </div>
          </Card>
        </div>
        
        <div className="space-y-4">
          <Card className="bg-black/40 border-neutral-800 p-6">
            <h3 className="text-xl font-bold text-white mb-3">Annual Projections</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Q1 Savings</span>
                <span className="text-green-400">$47,500</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Q2 Projected</span>
                <span className="text-green-400">$58,200</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Q3 Projected</span>
                <span className="text-green-400">$64,800</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Q4 Projected</span>
                <span className="text-green-400">$71,500</span>
              </div>
              <div className="pt-3 mt-3 border-t border-neutral-800">
                <div className="flex justify-between items-center">
                  <span className="text-white font-medium">2023 Total Projected</span>
                  <span className="text-2xl font-bold text-green-400">$242,000</span>
                </div>
              </div>
            </div>
          </Card>
          
          <Card className="bg-black/40 border-neutral-800 p-6">
            <h3 className="text-white font-medium">Additional Benefits</h3>
            <ul className="mt-3 space-y-2">
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Eliminated hiring and training costs</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Reduced management overhead by 68%</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="h-5 w-5 text-green-400 mr-2 shrink-0 mt-0.5" />
                <span className="text-neutral-300 text-sm">Zero employee turnover and associated costs</span>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </motion.div>,
    
    // New Features slide
    <motion.div 
      key="slide-3" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-purple-600 text-white border-none mb-4">NEW CAPABILITIES</Badge>
      <h2 className="text-4xl font-bold text-white mb-2">AI Features Unlocked</h2>
      <p className="text-neutral-400 mb-8 text-center max-w-lg">
        XanderAI has evolved with new capabilities to enhance your AI workforce.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {recapData.newAIFeatures.map((feature: string, index: number) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 + (index * 0.2), duration: 0.5 }}
          >
            <Card className="bg-black/40 border-neutral-800 h-full">
              <div className="p-1 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                <div className="bg-black/90 p-6 rounded-lg h-full">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center mb-4">
                    {index === 0 && <BarChart className="w-6 h-6 text-white" />}
                    {index === 1 && <Flow className="w-6 h-6 text-white" />}
                    {index === 2 && <Lightbulb className="w-6 h-6 text-white" />}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{feature}</h3>
                  <p className="text-neutral-400 text-sm">
                    {index === 0 && "Get deeper insights into your AI workforce performance with interactive dashboards and custom reports."}
                    {index === 1 && "Create custom workflows to automate complex multi-step processes across your organization."}
                    {index === 2 && "Leverage predictive AI to anticipate needs, spot trends, and proactively solve problems."}
                  </p>
                  <Button
                    variant="ghost"
                    className="mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-900/20 p-0"
                  >
                    Explore Feature →
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-8 flex flex-col items-center">
        <p className="text-neutral-300 mb-2">Ready to upgrade your XanderAI capabilities?</p>
        <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white">
          View All Features
        </Button>
      </div>
    </motion.div>,
    
    // Upcoming Tasks slide
    <motion.div 
      key="slide-4" 
      className="flex flex-col items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <Badge className="bg-orange-600 text-white border-none mb-4">UPCOMING ACTIVITY</Badge>
      <h2 className="text-4xl font-bold text-white mb-2">This Week's Forecast</h2>
      <p className="text-neutral-400 mb-8 text-center max-w-lg">
        Here's what your AI teams have scheduled for the week ahead.
      </p>
      
      <div className="w-full max-w-4xl">
        <Card className="bg-black/40 border-neutral-800 p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white">Scheduled Tasks</h3>
            <Badge className="bg-blue-900/50 text-blue-300 border-blue-500/30">
              {recapData.pendingActions} Pending Actions
            </Badge>
          </div>
          
          <div className="space-y-4">
            {recapData.upcomingTasks.map((task: string, index: number) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + (index * 0.15), duration: 0.5 }}
                className="p-4 bg-black/40 border border-neutral-800 rounded-lg flex items-start"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center mr-4 shrink-0">
                  <Calendar className="w-5 h-5 text-orange-400" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-white">{task}</h4>
                    <Badge className="bg-neutral-800 text-neutral-400">
                      {["Monday", "Wednesday", "Friday"][index]}
                    </Badge>
                  </div>
                  <p className="text-neutral-400 text-sm mt-1">
                    {index === 0 && "AI team will compile data and generate comprehensive quarterly reports."}
                    {index === 1 && "Competitive analysis across 12 key metrics with actionable insights."}
                    {index === 2 && "Sentiment analysis of customer feedback with trend identification."}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </Card>
        
        <div className="flex items-center justify-center">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white">
            View Full Calendar
          </Button>
        </div>
      </div>
    </motion.div>,
    
    // Final slide
    <motion.div 
      key="slide-5" 
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.5 }}
    >
      <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
        <svg className="w-12 h-12 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-white mb-3">You're All Caught Up!</h1>
      <p className="text-xl text-neutral-300 mb-8 max-w-lg">
        Your AI workforce is running efficiently. Let's head to the dashboard to see more details.
      </p>
      
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white px-8 py-6 text-lg font-medium rounded-xl shadow-lg shadow-blue-600/10"
          onClick={onComplete}
        >
          Go to Dashboard
        </Button>
      </motion.div>
    </motion.div>
  ];
  
  return (
    <div className="w-full h-full relative overflow-hidden">
      {/* Navigation controls */}
      <div className="absolute top-4 right-4 z-50 flex gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 border-neutral-700 text-neutral-400"
          onClick={() => setAutoplay(!autoplay)}
        >
          {autoplay ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </Button>
        
        <Button 
          variant="outline" 
          size="sm" 
          className="h-8 w-8 p-0 border-neutral-700 text-neutral-400"
          onClick={onComplete}
        >
          <X className="h-4 w-4" />
        </Button>
      </div>
      
      {/* Slide counter */}
      <div className="absolute top-4 left-4 z-50">
        <Badge className="bg-neutral-800/70 text-neutral-400 backdrop-blur-sm">
          {currentSlide + 1} / {totalSlides}
        </Badge>
      </div>
      
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-neutral-800 z-20">
        <motion.div 
          className="h-full bg-blue-500"
          variants={progressBarVariants}
          initial="empty"
          animate="filling"
        />
      </div>
      
      {/* Slide navigation dots */}
      <div className="absolute bottom-8 left-0 right-0 flex justify-center gap-2 z-30">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            className={`w-2 h-2 rounded-full transition-all ${
              currentSlide === index 
                ? "bg-blue-500 w-8" 
                : "bg-neutral-700 hover:bg-neutral-600"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
      
      {/* Arrow navigation */}
      <button 
        className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center z-30 text-white hover:bg-black/80 transition-colors"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
      </button>
      
      <button 
        className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 border border-neutral-700 flex items-center justify-center z-30 text-white hover:bg-black/80 transition-colors"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-5 w-5" />
      </button>
      
      {/* Slides */}
      <div className="h-full w-full flex items-center justify-center px-4 py-16">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.div
            key={currentSlide}
            custom={currentSlide}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex items-center justify-center"
          >
            {slideContent[currentSlide]}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

// Additional icons needed
function Users(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function Flow(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M5 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM19 6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M19 18a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M5 12a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
      <path d="M8 12h6" />
      <path d="M8 6h6" />
      <path d="M8 18h6" />
    </svg>
  );
}

function Lightbulb(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5" />
      <path d="M9 18h6" />
      <path d="M10 22h4" />
    </svg>
  );
}

function Play(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
  );
}

function Pause(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <rect x="6" y="4" width="4" height="16" />
      <rect x="14" y="4" width="4" height="16" />
    </svg>
  );
} 