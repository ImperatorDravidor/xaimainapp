"use client";

import { useState, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BeamsBackground } from "@/components/ui/beams-background";
import { RecapSlideshow } from "@/components/dashboard/recap-slideshow";
import { OnboardingSlideshow } from "@/components/dashboard/onboarding-slideshow";
import { createClient } from '@/utils/supabase/client';
import { UserNav } from "@/components/auth/UserNav";
import { ArrowRight, Terminal, ChevronRight, LogOut, Building, ShieldCheck, Server, Users, Lock } from "lucide-react";
import Link from "next/link";

const generateRecapData = (user: any) => {
  // This would fetch real data in a production app
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || "User";
  
  return {
    userName,
    companyName: "Acme Corporation",
    activeTeams: 4,
    totalLicenses: 25,
    activeLicenses: 18,
    deploymentStatus: "Active",
    securityLevel: "Enterprise",
    tasks: 1248,
    costSavings: "$147,500",
    implementationPhase: "Production",
    newAIFeatures: ["Advanced Enterprise Analytics", "Secure Workflow Automation", "Multi-Department Insights Engine"],
    pendingActions: 3,
    upcomingTasks: ["Executive dashboard deployment", "Cross-department workflow integration", "Customer success AI implementation"],
    recentActivity: [
      { id: 1, type: "system", description: "Enterprise security compliance check completed", date: "Today, 2:45 PM" },
      { id: 2, type: "insight", description: "Predictive analytics model deployed to finance department", date: "Yesterday" },
      { id: 3, type: "integration", description: "CRM data pipeline integration completed", date: "2 days ago" },
    ],
    performanceMetrics: [
      { name: "Enterprise Productivity", value: 87, change: "+12%" },
      { name: "Operational Efficiency", value: 92, change: "+18%" },
      { name: "Cost Reduction", value: 76, change: "+24%" },
      { name: "Customer Retention", value: 83, change: "+9%" },
    ]
  };
};

const generateOnboardingData = (user: any) => {
  // Generate data for a new enterprise client experience
  const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || "User";
  
  return {
    userName,
    companyName: "Acme Corporation",
    enterpriseId: "XAI-ENT-6723",
    securityTier: "Enterprise Plus",
    deploymentStatus: "Initializing",
    implementation: "Phase 1 of 3",
    administratorAccounts: 2,
    managerAccounts: 5,
    memberAccounts: 18,
    totalLicenses: 25,
    recommendedTeams: [
      { id: 1, name: "Executive Insights", description: "AI-powered business intelligence for leadership", icon: "📊" },
      { id: 2, name: "Operations Automation", description: "Streamline and automate core business processes", icon: "⚙️" },
      { id: 3, name: "Customer Intelligence", description: "AI-enhanced customer analytics and engagement", icon: "🤝" },
    ],
    enterpriseModules: [
      { id: 1, name: "Data Integration Hub", status: "Ready for setup", priority: "High" },
      { id: 2, name: "Workflow Automation Engine", status: "Ready for setup", priority: "High" },
      { id: 3, name: "Analytics & Reporting", status: "Ready for setup", priority: "Medium" },
      { id: 4, name: "Security & Compliance", status: "Ready for setup", priority: "Critical" },
    ],
    implementationSteps: [
      { id: 1, title: "Department Mapping & User Provisioning", status: "Pending" },
      { id: 2, title: "Data Source Integration", status: "Pending" },
      { id: 3, title: "Security Policy Configuration", status: "Pending" },
      { id: 4, title: "Initial AI Team Deployment", status: "Pending" },
    ],
    enterpriseSecurity: [
      "SOC 2 Type II compliant infrastructure",
      "End-to-end encryption for all data in transit and at rest",
      "Role-based access control with granular permissions",
      "Audit logging and compliance reporting"
    ]
  };
};

function RecapPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isNewUser = searchParams.get('new_user') === 'true';
  const [user, setUser] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const supabase = createClient();
  const [viewState, setViewState] = useState<"initializing" | "generating" | "ready" | "viewing">("initializing");
  const [progressPercentage, setProgressPercentage] = useState(0);
  const [userData, setUserData] = useState<any>(null);
  
  // Fetch user data
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
      setIsLoaded(true);
    };
    fetchUser();
  }, [supabase]);
  
  // Simulate the data generation process
  useEffect(() => {
    if (!isLoaded) return;
    
    // Initial delay before starting generation
    const initTimer = setTimeout(() => {
      setViewState("generating");
      
      // Simulate progress percentage increasing
      const progressInterval = setInterval(() => {
        setProgressPercentage(prev => {
          if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
          }
          return prev + 1;
        });
      }, 30);
      
      // After generation completes
      const generationTimer = setTimeout(() => {
        // Generate different data based on whether this is a new user or not
        if (isNewUser) {
          setUserData(generateOnboardingData(user));
        } else {
          setUserData(generateRecapData(user));
        }
        setViewState("ready");
        clearInterval(progressInterval);
      }, 3000);
      
      return () => {
        clearTimeout(generationTimer);
        clearInterval(progressInterval);
      };
    }, 1000);
    
    return () => clearTimeout(initTimer);
  }, [isLoaded, user, isNewUser]);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    router.push("/authentication/login");
  };
  
  return (
    <BeamsBackground intensity="strong">
      <div className="min-h-screen flex flex-col items-center justify-center px-4 py-12 relative">
        {/* User Navigation */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 right-6 z-10 flex items-center gap-4"
        >
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleSignOut}
            className="text-white/70 hover:text-white flex items-center gap-2"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </Button>
          <div className="hidden md:block">
            <UserNav />
          </div>
        </motion.div>

        {/* XanderAI Logo */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute top-6 left-6 z-10"
        >
          <Link href="/platform/dashboard">
            <div className="flex items-center">
              <Image
                src="/xanderai.svg"
                alt="XanderAI"
                width={150}
                height={50}
                className="h-auto"
                priority
              />
              <span className="ml-2 text-xs px-2 py-1 bg-blue-900/30 border border-blue-500/30 rounded-sm text-blue-400 font-medium">
                ENTERPRISE
              </span>
            </div>
          </Link>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {viewState === "initializing" && (
            <motion.div
              key="initializing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <Terminal className="w-12 h-12 text-blue-400 mb-4" />
              <h2 className="text-2xl font-bold text-white">
                {isNewUser ? "Preparing Enterprise Environment" : "Initializing Enterprise Analytics"}
              </h2>
              <p className="text-neutral-400 mt-2 mb-6 text-center max-w-md">
                {isNewUser 
                  ? "Setting up your secure enterprise AI platform..." 
                  : "Connecting to your organization's AI infrastructure..."}
              </p>
              
              <div className="flex items-center justify-center space-x-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: "150ms" }}></div>
                <div className="w-3 h-3 rounded-full bg-emerald-500 animate-bounce" style={{ animationDelay: "300ms" }}></div>
              </div>
            </motion.div>
          )}
          
          {viewState === "generating" && (
            <motion.div
              key="generating"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center"
            >
              <div className="w-64 h-64 relative mb-8">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                  <circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="rgba(59, 130, 246, 0.1)"
                    strokeWidth="8"
                  />
                  <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    fill="none"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeLinecap="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: progressPercentage / 100 }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                      strokeDasharray: "283",
                      strokeDashoffset: "283",
                      transformOrigin: "center",
                      rotate: -90,
                    }}
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#3B82F6" />
                      <stop offset="100%" stopColor="#8B5CF6" />
                    </linearGradient>
                  </defs>
                </svg>
                
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.05, 1],
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatType: "reverse"
                    }}
                    className="flex flex-col items-center"
                  >
                    <div className="text-3xl font-bold text-white">{progressPercentage}%</div>
                    <div className="text-sm text-neutral-400">
                      {isNewUser 
                        ? "Provisioning Enterprise Resources" 
                        : "Loading Enterprise Data"}
                    </div>
                  </motion.div>
                </div>
              </div>
              
              <div className="w-full max-w-md">
                <div className="flex justify-between text-sm text-neutral-400 mb-2">
                  <span>{isNewUser ? "Enterprise Setup" : "System Analysis"}</span>
                  <span>{progressPercentage}%</span>
                </div>
                <div className="h-1 w-full bg-neutral-800 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-blue-500 to-purple-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercentage}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <div className="mt-6 text-center">
                  <p className="text-neutral-500 text-sm">
                    {isNewUser
                      ? "Configuring enterprise security protocols and setting up your organization's dedicated AI instance..."
                      : "Analyzing organizational data and preparing personalized insights for your enterprise dashboard..."}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          
          {viewState === "ready" && (
            <motion.div
              key="ready"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center w-full max-w-3xl"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-600/20 flex items-center justify-center mb-6 border border-blue-500/30"
              >
                {isNewUser ? (
                  <Building className="w-12 h-12 text-blue-400" />
                ) : (
                  <ShieldCheck className="w-12 h-12 text-blue-400" />
                )}
              </motion.div>
              
              <motion.h1
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500"
              >
                {isNewUser
                  ? "Enterprise Onboarding Complete"
                  : "Enterprise Platform Ready"}
              </motion.h1>
              
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="mt-3 text-neutral-400 text-center max-w-xl"
              >
                {isNewUser
                  ? "Your organization's dedicated XanderAI instance has been successfully provisioned and is ready for enterprise-wide deployment."
                  : "Your enterprise AI platform has been updated with the latest enhancements and security protocols."}
              </motion.p>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mt-8 w-full"
              >
                <Card className="backdrop-blur-md bg-black/60 border border-neutral-800 rounded-xl overflow-hidden">
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6 mb-6">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-3">
                          {isNewUser ? "Enterprise Profile" : "Enterprise Status"}
                        </h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-neutral-500">Organization</div>
                              <div className="text-sm text-white">{userData?.companyName}</div>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-500">
                                {isNewUser ? "Enterprise ID" : "Deployment Status"}
                              </div>
                              <div className="text-sm text-white">
                                {isNewUser ? userData?.enterpriseId : userData?.deploymentStatus}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-500">Security Tier</div>
                              <div className="text-sm text-white flex items-center">
                                <Lock size={12} className="mr-1 text-blue-400" />
                                {isNewUser ? userData?.securityTier : userData?.securityLevel}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-500">Implementation</div>
                              <div className="text-sm text-white">
                                {isNewUser ? userData?.implementation : userData?.implementationPhase}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-white mb-3">License Allocation</h3>
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-3">
                            <div>
                              <div className="text-xs text-neutral-500">Total Licenses</div>
                              <div className="text-sm text-white">
                                {isNewUser ? userData?.totalLicenses : userData?.totalLicenses}
                              </div>
                            </div>
                            <div>
                              <div className="text-xs text-neutral-500">
                                {isNewUser ? "Administrator Accounts" : "Active Licenses"}
                              </div>
                              <div className="text-sm text-white">
                                {isNewUser ? userData?.administratorAccounts : userData?.activeLicenses}
                              </div>
                            </div>
                            {isNewUser && (
                              <>
                                <div>
                                  <div className="text-xs text-neutral-500">Manager Accounts</div>
                                  <div className="text-sm text-white">{userData?.managerAccounts}</div>
                                </div>
                                <div>
                                  <div className="text-xs text-neutral-500">Member Accounts</div>
                                  <div className="text-sm text-white">{userData?.memberAccounts}</div>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="mt-6">
                      <h3 className="text-lg font-medium text-white mb-3">
                        {isNewUser ? "Implementation Roadmap" : "Enterprise Analytics"}
                      </h3>
                      
                      {isNewUser ? (
                        <div className="space-y-3">
                          {userData?.implementationSteps.map((step: any, index: number) => (
                            <div key={step.id} className="flex items-center p-3 bg-black/30 border border-neutral-800 rounded-lg">
                              <div className="h-8 w-8 rounded-full flex items-center justify-center bg-blue-900/30 border border-blue-500/30">
                                <span className="text-sm font-medium text-blue-400">{index + 1}</span>
                              </div>
                              <div className="ml-3 flex-1">
                                <div className="text-sm text-white">{step.title}</div>
                                <div className="text-xs text-neutral-500">{step.status}</div>
                              </div>
                              <div>
                                <Button 
                                  variant="outline" 
                                  size="sm" 
                                  className="text-xs border-blue-500/30 text-blue-400 hover:bg-blue-900/20"
                                >
                                  Configure
                                </Button>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                          {userData?.performanceMetrics.map((metric: any) => (
                            <Card key={metric.name} className="bg-black/30 border border-neutral-800">
                              <div className="p-3">
                                <div className="text-xs text-neutral-500">{metric.name}</div>
                                <div className="mt-1 flex items-end justify-between">
                                  <div className="text-xl font-semibold text-white">{metric.value}%</div>
                                  <div className="text-xs text-emerald-400">{metric.change}</div>
                                </div>
                              </div>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="mt-8 flex flex-col items-center"
              >
                <Button 
                  onClick={() => router.push("/platform/dashboard")}
                  className="bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700 text-white px-8 py-6"
                >
                  <span className="text-base">
                    {isNewUser ? "Enter Enterprise Platform" : "Continue to Dashboard"}
                  </span>
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                
                <div className="mt-4 flex items-center text-xs text-neutral-500">
                  <Lock size={12} className="mr-1" />
                  <span>Enterprise-grade security enabled</span>
                </div>
              </motion.div>
            </motion.div>
          )}
          
          {viewState === "viewing" && (
            <div className="w-full max-w-6xl pt-20">
              {isNewUser ? (
                <OnboardingSlideshow 
                  onboardingData={userData} 
                  onComplete={() => router.push("/platform/dashboard")}
                />
              ) : (
                <RecapSlideshow 
                  recapData={userData} 
                  onComplete={() => router.push("/platform/dashboard")}
                />
              )}
            </div>
          )}
        </AnimatePresence>
      </div>
    </BeamsBackground>
  );
}

export default function RecapPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    }>
      <RecapPageContent />
    </Suspense>
  );
} 