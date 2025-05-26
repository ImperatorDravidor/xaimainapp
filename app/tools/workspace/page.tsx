"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { 
  Sparkles, 
  Lightbulb, 
  Workflow, 
  Bot, 
  Users, 
  Target, 
  ArrowRight, 
  Play,
  Brain,
  MessageSquare,
  Calendar,
  CheckSquare,
  Zap,
  Network,
  BarChart3,
  Clock,
  Shield,
  Rocket,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import XanderWorkspace from "@/components/dashboard/xander-workspace";

export default function WorkspacePage() {
  const router = useRouter();
  const [showPortal, setShowPortal] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);

  const handleLaunchPortal = () => {
    setIsLaunching(true);
    setTimeout(() => {
      setShowPortal(true);
      setIsLaunching(false);
    }, 1500); // Smooth transition animation
  };

  // If portal is active, show the full workspace
  if (showPortal) {
    return <XanderWorkspace />;
  }

  return (
    <div className="p-6 space-y-8 max-w-7xl mx-auto">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="space-y-4"
      >
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-xl">
            <Sparkles size={32} className="text-white" />
          </div>
          <div className="space-y-2">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
              Xander Workspace
            </h1>
            <p className="text-lg text-neutral-400 max-w-2xl">
              Transform ideas into intelligent workflows with AI-powered brainstorming, task management, and automated process creation.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">
            AI-Powered
          </Badge>
          <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-3 py-1">
            Team Collaboration
          </Badge>
          <Badge variant="outline" className="border-green-500/30 text-green-400 px-3 py-1">
            Workflow Automation
          </Badge>
        </div>
      </motion.div>

      {/* What is Xander Workspace */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
          <CardContent className="p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-white">What is Xander Workspace?</h2>
                  <p className="text-neutral-300 leading-relaxed">
                    Xander Workspace is your AI-powered collaborative environment where ideas transform into actionable workflows. 
                    It combines visual brainstorming, intelligent task management, and automated process creation in one seamless platform.
                  </p>
                </div>

                <div className="space-y-3">
                  <h3 className="text-lg font-medium text-white">Perfect for:</h3>
                  <div className="grid grid-cols-1 gap-2">
                    {[
                      "Product teams planning new features",
                      "Marketing teams creating campaign workflows", 
                      "Operations teams optimizing processes",
                      "Leadership teams strategic planning"
                    ].map((item, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 rounded-full bg-blue-400" />
                        <span className="text-sm text-neutral-300">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="relative">
                <div className="aspect-video rounded-xl bg-gradient-to-br from-black/40 to-black/20 border border-neutral-800/50 flex items-center justify-center">
                  <div className="text-center space-y-4">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/30 to-blue-500/30 border border-purple-500/50 flex items-center justify-center mx-auto">
                      <Brain size={40} className="text-purple-400" />
                    </div>
                    <p className="text-neutral-400 text-sm">Interactive workspace preview</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Key Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Key Features</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              icon: Lightbulb,
              title: "Visual Brainstorming",
              description: "Interactive canvas for idea generation with connections and priority mapping",
              color: "yellow"
            },
            {
              icon: Bot,
              title: "AI Chat Assistant", 
              description: "Xander AI helps convert ideas into structured workflows and actionable tasks",
              color: "purple"
            },
            {
              icon: Workflow,
              title: "Smart Workflows",
              description: "Auto-generate intelligent processes with AI agents and human touchpoints",
              color: "blue"
            },
            {
              icon: Users,
              title: "Team Collaboration",
              description: "Real-time collaboration with team presence and activity tracking",
              color: "green"
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
            >
              <Card className="bg-black/30 border-neutral-800/50 hover:bg-black/40 transition-all duration-200 group h-full">
                <CardContent className="p-6 space-y-4">
                  <div className={`w-12 h-12 rounded-xl bg-${feature.color}-500/10 border border-${feature.color}-500/20 flex items-center justify-center group-hover:bg-${feature.color}-500/20 transition-colors`}>
                    <feature.icon className={`text-${feature.color}-400`} size={24} />
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-white">{feature.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{feature.description}</p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Workflow Modes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="space-y-6"
      >
        <h2 className="text-2xl font-semibold text-white">Workspace Modes</h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {[
            {
              mode: "Overview",
              icon: Target,
              description: "Get insights into your team's productivity, active projects, and AI-powered suggestions for optimization.",
              features: ["Team productivity metrics", "Active project tracking", "AI recommendations", "Quick action shortcuts"]
            },
            {
              mode: "Brainstorm",
              icon: Lightbulb,
              description: "Visual ideation canvas where you can create, connect, and prioritize ideas with your team in real-time.",
              features: ["Click-to-add ideas", "Visual connections", "Priority tagging", "Multi-select operations"]
            },
            {
              mode: "Flows",
              icon: Workflow,
              description: "Design and manage AI-powered workflows with automated processes and human touchpoints.",
              features: ["Flow visualization", "Performance metrics", "AI agent integration", "Process automation"]
            },
            {
              mode: "Chat",
              icon: MessageSquare,
              description: "Collaborate with Xander AI to transform ideas into actionable workflows and intelligent task assignments.",
              features: ["Natural language workflow creation", "Smart task generation", "Team scheduling", "Context-aware assistance"]
            }
          ].map((mode, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: 0.5 + index * 0.1 }}
            >
              <Card className="bg-black/30 border-neutral-800/50 hover:bg-black/40 transition-all duration-200">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                        <mode.icon className="text-blue-400" size={20} />
                      </div>
                      <h3 className="text-xl font-semibold text-white">{mode.mode} Mode</h3>
                    </div>
                    <p className="text-neutral-400 leading-relaxed">{mode.description}</p>
                    <div className="space-y-2">
                      {mode.features.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                          <span className="text-sm text-neutral-300">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
      >
        <Card className="bg-gradient-to-r from-blue-900/20 via-purple-900/20 to-blue-900/20 border-blue-500/30">
          <CardContent className="p-8">
            <div className="text-center space-y-6">
              <h2 className="text-2xl font-semibold text-white">Why Use Xander Workspace?</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {[
                  {
                    icon: Zap,
                    title: "3x Faster Ideation",
                    description: "Transform brainstorming sessions into actionable workflows in minutes, not hours."
                  },
                  {
                    icon: Network,
                    title: "Seamless Collaboration", 
                    description: "Real-time team collaboration with AI assistance for optimal productivity."
                  },
                  {
                    icon: BarChart3,
                    title: "Data-Driven Insights",
                    description: "Get intelligent recommendations based on team performance and workflow analytics."
                  }
                ].map((benefit, index) => (
                  <div key={index} className="text-center space-y-3">
                    <div className="w-14 h-14 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center mx-auto">
                      <benefit.icon className="text-blue-400" size={24} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">{benefit.title}</h3>
                    <p className="text-sm text-neutral-400 leading-relaxed">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Launch Portal Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="text-center space-y-6"
      >
        <Card className="bg-gradient-to-br from-purple-900/30 via-blue-900/30 to-purple-900/30 border-purple-500/30 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5" />
          <CardContent className="p-12 relative">
            <div className="space-y-8">
              <div className="space-y-4">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mx-auto">
                  <Rocket size={40} className="text-purple-400" />
                </div>
                <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent">
                  Ready to Launch Your Workspace?
                </h2>
                <p className="text-lg text-neutral-300 max-w-2xl mx-auto">
                  Enter the full Xander Workspace portal for an immersive brainstorming and workflow creation experience.
                </p>
              </div>

              <div className="space-y-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg font-semibold shadow-xl hover:shadow-2xl transition-all duration-300"
                  onClick={handleLaunchPortal}
                  disabled={isLaunching}
                >
                  {isLaunching ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-3" />
                      Launching Portal...
                    </>
                  ) : (
                    <>
                      <ExternalLink size={20} className="mr-3" />
                      Launch Xander Workspace Portal
                    </>
                  )}
                </Button>
                
                <p className="text-sm text-neutral-500">
                  This will open the full workspace experience in a dedicated environment
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
} 