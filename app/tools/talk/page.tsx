"use client";
import React from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { motion } from "framer-motion";
import { MessageSquare, Zap, ShieldCheck, MoveRight, Sparkles, Database, Brain, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TalkPage() {
  const features = [
    { name: "Smart Responses", description: "Get intelligent answers to your business questions", icon: <Brain size={16} /> },
    { name: "Data Integration", description: "Connect with your existing company data", icon: <Database size={16} /> },
    { name: "Secure Communication", description: "Enterprise-grade security for your conversations", icon: <ShieldCheck size={16} /> },
    { name: "Knowledge Sharing", description: "Share insights with your team members", icon: <Share2 size={16} /> }
  ];

  return (
    <DashboardLayout>
      <div className="w-full h-full space-y-6">
        <motion.div 
          className="mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-2xl font-semibold text-white mb-2">Talk to Xander</h1>
          <p className="text-neutral-400">Your AI assistant for enterprise intelligence</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl p-8 h-full">
              <div className="flex flex-col lg:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-5 rounded-full w-fit mb-6 border border-blue-500/20">
                    <MessageSquare size={28} className="text-blue-400" />
                  </div>
                  <h2 className="text-xl font-medium text-white mb-4">Your Enterprise AI Assistant</h2>
                  <p className="text-neutral-400 mb-6">
                    Talk to Xander is your intelligent enterprise assistant, designed to help you access information, 
                    automate tasks, and get insights from your company data. Coming soon to transform how you work.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      Join Early Access
                    </Button>
                    <Button variant="outline" className="border-neutral-700 bg-neutral-900/50">
                      See Demo
                    </Button>
                  </div>
                </div>
                <div className="bg-neutral-900/70 rounded-xl p-6 border border-neutral-800 w-full lg:w-80">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-neutral-300 text-sm">Xander Assistant</span>
                  </div>
                  <div className="bg-neutral-800/50 rounded-lg p-3 mb-3 max-w-xs text-sm text-neutral-300">
                    Hello! I'm Xander, your AI assistant. I can help you find information, analyze data, and automate tasks.
                  </div>
                  <div className="opacity-60 text-center text-xs text-neutral-500 mb-4">Coming Soon</div>
                  <div className="relative">
                    <input 
                      type="text" 
                      disabled
                      placeholder="Ask Xander something..."
                      className="w-full bg-neutral-900 border border-neutral-700 rounded-lg p-2 pl-3 pr-9 text-neutral-400 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    />
                    <Button disabled size="sm" className="absolute right-1 top-1 p-1 h-6 w-6">
                      <MoveRight size={14} />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl h-full">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-medium">Why Talk to Xander?</h3>
              </div>
              <div className="p-4 space-y-4">
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-blue-900/20 to-transparent rounded-lg border border-blue-900/20">
                  <div className="p-2 bg-blue-600/20 rounded-full">
                    <Zap size={14} className="text-blue-400" />
                  </div>
                  <span className="text-sm text-blue-300">10x faster insights</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-purple-900/20 to-transparent rounded-lg border border-purple-900/20">
                  <div className="p-2 bg-purple-600/20 rounded-full">
                    <Sparkles size={14} className="text-purple-400" />
                  </div>
                  <span className="text-sm text-purple-300">AI-powered answers</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-900/20 to-transparent rounded-lg border border-emerald-900/20">
                  <div className="p-2 bg-emerald-600/20 rounded-full">
                    <ShieldCheck size={14} className="text-emerald-400" />
                  </div>
                  <span className="text-sm text-emerald-300">Enterprise security</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div
          className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <div className="p-4 border-b border-neutral-800">
            <h3 className="text-white font-medium">Key Features</h3>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                >
                  <div className="p-2 rounded-md bg-blue-500/10 border border-blue-500/20 w-fit mb-3">
                    {feature.icon}
                  </div>
                  <h4 className="text-white font-medium mb-1">{feature.name}</h4>
                  <p className="text-neutral-400 text-sm">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 