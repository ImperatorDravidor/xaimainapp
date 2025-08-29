"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Workflow, Play, Pause, ArrowRightLeft, Plus, Pencil, PlusCircle, 
  RotateCw, Server, CheckCircle, PlusSquare, FileBarChart, Settings,
  Keyboard, ChevronRight, Star, AlertCircle, X
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Tooltip, 
  TooltipContent, 
  TooltipProvider, 
  TooltipTrigger 
} from "@/components/ui/tooltip";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import DashboardLayout from "@/components/dashboard/layout";

export default function WorkflowsPage() {
  const [showKeyboardShortcuts, setShowKeyboardShortcuts] = useState(false);
  const [activeWorkflowIndex, setActiveWorkflowIndex] = useState<number | null>(null);
  
  const workflowTemplates = [
    { name: "Customer Onboarding", description: "Automate customer account setup and welcome sequences", category: "Customer Service" },
    { name: "Document Processing", description: "Extract, analyze and categorize documents", category: "Operations" },
    { name: "Lead Qualification", description: "Score and route leads to appropriate sales teams", category: "Sales" }
  ];
  
  const activeWorkflows = [
    { 
      name: "Support Ticket Analysis", 
      status: "Running", 
      steps: 5, 
      created: "Apr 12, 2025", 
      category: "Support",
      performance: 92,
      lastRun: "2 hours ago",
      runCount: 432,
      favorite: true
    },
    { 
      name: "Content Generation", 
      status: "Paused", 
      steps: 3, 
      created: "Mar 28, 2025", 
      category: "Marketing",
      performance: 78,
      lastRun: "3 days ago",
      runCount: 267,
      favorite: false
    }
  ];

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command/Ctrl + K to show keyboard shortcuts
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setShowKeyboardShortcuts(prev => !prev);
      }
      
      // Escape to close keyboard shortcuts dialog
      if (e.key === 'Escape') {
        setShowKeyboardShortcuts(false);
      }
      
      // Digit keys to select workflows (when they're focused)
      if (activeWorkflowIndex !== null && e.key === 'p') {
        // Toggle play/pause on the active workflow
        e.preventDefault();
        // This would toggle the workflow status in a real app
        console.log(`Toggled workflow ${activeWorkflowIndex} status`);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeWorkflowIndex]);
  
  const keyboardShortcuts = [
    { key: 'Ctrl+K', description: 'Show keyboard shortcuts' },
    { key: 'N', description: 'Create new workflow' },
    { key: '↑/↓', description: 'Navigate between workflows' },
    { key: 'P', description: 'Play/pause selected workflow' },
    { key: 'E', description: 'Edit selected workflow' },
    { key: 'S', description: 'Show workflow settings' },
  ];

  return (
    <DashboardLayout>
      <div className="w-full h-full p-6">
        <motion.div 
          className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Workflows</h1>
            <p className="text-neutral-400">Create and manage AI-powered business processes</p>
          </div>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setShowKeyboardShortcuts(true)}
                  className="h-9 w-9 p-0 bg-black/30 border-neutral-800 hover:bg-black/40"
                >
                  <Keyboard size={16} className="text-neutral-300" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>Show keyboard shortcuts (Ctrl+K)</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </motion.div>

        {/* Keyboard shortcuts dialog */}
        {showKeyboardShortcuts && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setShowKeyboardShortcuts(false)}
          >
            <div 
              className="bg-neutral-900 border border-neutral-700 rounded-lg p-6 w-full max-w-md shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-medium text-white flex items-center gap-2">
                  <Keyboard size={18} className="text-blue-400" />
                  Keyboard Shortcuts
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-8 w-8 p-0 rounded-full hover:bg-neutral-800"
                  onClick={() => setShowKeyboardShortcuts(false)}
                >
                  <X size={18} />
                </Button>
              </div>
              <div className="space-y-2">
                {keyboardShortcuts.map((shortcut, index) => (
                  <div 
                    key={index}
                    className="flex justify-between items-center py-2 px-3 rounded hover:bg-neutral-800/60 transition-colors"
                  >
                    <span className="text-neutral-300">{shortcut.description}</span>
                    <span className="bg-neutral-800 text-neutral-300 px-2 py-1 rounded text-xs font-medium">{shortcut.key}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-neutral-800 text-center">
                <p className="text-sm text-neutral-500">Press Esc to close</p>
              </div>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl h-full">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                <h2 className="text-white font-medium">Active Workflows</h2>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="outline" size="sm" className="bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/20">
                        <PlusCircle size={16} className="mr-2" />
                        New Workflow
                        <span className="ml-2 opacity-60 text-xs">(N)</span>
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p className="text-xs flex items-center">Create a new workflow <span className="ml-1 px-1.5 py-0.5 bg-neutral-800 rounded text-[10px]">N</span></p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
              <div className="divide-y divide-neutral-800/50">
                {activeWorkflows.length > 0 ? (
                  activeWorkflows.map((workflow, index) => (
                    <motion.div 
                      key={index}
                      className={`p-4 hover:bg-neutral-900/20 transition-colors cursor-pointer relative ${activeWorkflowIndex === index ? 'bg-blue-500/10 border-l-2 border-blue-500' : ''}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3, delay: 0.2 + (index * 0.1) }}
                      onClick={() => setActiveWorkflowIndex(index)}
                      tabIndex={0}
                      onKeyDown={(e) => {
                        // Handle keyboard navigation
                        if (e.key === 'ArrowDown') {
                          e.preventDefault();
                          setActiveWorkflowIndex(prev => 
                            prev !== null && prev < activeWorkflows.length - 1 ? prev + 1 : 0
                          );
                        } else if (e.key === 'ArrowUp') {
                          e.preventDefault();
                          setActiveWorkflowIndex(prev => 
                            prev !== null && prev > 0 ? prev - 1 : activeWorkflows.length - 1
                          );
                        }
                      }}
                    >
                      {workflow.favorite && (
                        <div className="absolute top-3 right-3">
                          <Star size={16} className="text-amber-400 fill-amber-400" />
                        </div>
                      )}
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-white font-medium flex items-center">
                              {workflow.name}
                              <ChevronRight size={16} className="ml-1 text-neutral-600" />
                            </h3>
                            <Badge className={`${
                              workflow.status === "Running" 
                                ? "bg-emerald-500/20 text-emerald-400 border-emerald-500/30" 
                                : "bg-amber-500/20 text-amber-400 border-amber-500/30"
                            }`}>
                              {workflow.status}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 mt-1 text-xs text-neutral-500">
                            <span className="flex items-center gap-1">
                              <RotateCw size={12} /> {workflow.steps} steps
                            </span>
                            <span className="flex items-center gap-1">
                              <Server size={12} /> {workflow.category}
                            </span>
                            <span>Created: {workflow.created}</span>
                          </div>
                          <div className="mt-3 flex items-center gap-3">
                            <div className="flex items-center">
                              <div className="w-20 h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full ${workflow.performance > 90 ? 'bg-emerald-500' : workflow.performance > 75 ? 'bg-amber-500' : 'bg-red-500'}`}
                                  style={{ width: `${workflow.performance}%` }}
                                />
                              </div>
                              <span className="ml-2 text-xs text-neutral-400">{workflow.performance}%</span>
                            </div>
                            <span className="text-xs text-neutral-500">Last run: {workflow.lastRun}</span>
                            <span className="text-xs text-neutral-500">{workflow.runCount} runs</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {workflow.status === "Running" ? (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Pause size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="flex items-center gap-1">
                                  <p>Pause workflow</p>
                                  <span className="px-1 py-0.5 bg-neutral-800 rounded text-[10px]">P</span>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          ) : (
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                    <Play size={16} />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className="flex items-center gap-1">
                                  <p>Start workflow</p>
                                  <span className="px-1 py-0.5 bg-neutral-800 rounded text-[10px]">P</span>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                          )}
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                  <Pencil size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="flex items-center gap-1">
                                <p>Edit workflow</p>
                                <span className="px-1 py-0.5 bg-neutral-800 rounded text-[10px]">E</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                  <FileBarChart size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom">
                                <p>View analytics</p>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                          <TooltipProvider>
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-8 w-8 p-0 text-neutral-400 hover:text-white hover:bg-neutral-800">
                                  <Settings size={16} />
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent side="bottom" className="flex items-center gap-1">
                                <p>Settings</p>
                                <span className="px-1 py-0.5 bg-neutral-800 rounded text-[10px]">S</span>
                              </TooltipContent>
                            </Tooltip>
                          </TooltipProvider>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-8 text-center">
                    <p className="text-neutral-400">No active workflows</p>
                  </div>
                )}
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
                <h2 className="text-white font-medium">Workflow Templates</h2>
              </div>
              <div className="p-4 space-y-4">
                {workflowTemplates.map((template, index) => (
                  <motion.div 
                    key={index}
                    className="bg-neutral-900/50 rounded-lg border border-neutral-800 p-4 hover:border-neutral-700 transition-colors cursor-pointer"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <div className="p-1.5 rounded-md bg-purple-500/20 text-purple-400">
                            <Workflow size={16} />
                          </div>
                          <h3 className="text-white font-medium">{template.name}</h3>
                        </div>
                        <p className="text-neutral-400 text-sm mb-3">{template.description}</p>
                        <Badge variant="outline" className="bg-neutral-800/50 text-neutral-400 border-neutral-700">
                          {template.category}
                        </Badge>
                      </div>
                      <HoverCard>
                        <HoverCardTrigger asChild>
                          <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-blue-400">
                            <PlusSquare size={16} />
                          </Button>
                        </HoverCardTrigger>
                        <HoverCardContent side="left" className="w-64 bg-neutral-900 border-neutral-800 text-white p-4">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-full bg-purple-500/20 text-purple-400">
                              <Workflow size={18} />
                            </div>
                            <div>
                              <h4 className="font-medium text-white">{template.name}</h4>
                              <p className="text-xs text-neutral-500">{template.category}</p>
                            </div>
                          </div>
                          <p className="text-sm text-neutral-400">{template.description}</p>
                          <div className="mt-3 pt-3 border-t border-neutral-800">
                            <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              <Plus size={14} className="mr-1" /> Create from template
                            </Button>
                          </div>
                        </HoverCardContent>
                      </HoverCard>
                    </div>
                  </motion.div>
                ))}
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
            <h2 className="text-white font-medium flex items-center gap-2">
              Workflow Builder
              <Badge variant="outline" className="bg-blue-500/10 text-blue-400 border-blue-500/30">
                Coming Soon
              </Badge>
            </h2>
          </div>
          <div className="p-6 flex flex-col items-center justify-center min-h-[300px]">
            <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-4 rounded-full mb-4 border border-blue-500/20">
              <ArrowRightLeft size={32} className="text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Workflow Builder Coming Soon</h3>
            <p className="text-neutral-500 text-sm text-center max-w-md mb-4">
              Design complex AI workflows with our visual builder. Connect AI agents, 
              data sources, and business processes in a seamless flow.
            </p>
            <div className="flex flex-col sm:flex-row justify-center items-center gap-3">
              <Button variant="outline" className="bg-blue-600/10 text-blue-400 border-blue-500/20 hover:bg-blue-600/20">
                <CheckCircle size={16} className="mr-2" /> Get Early Access
              </Button>
              <Button variant="ghost" className="text-neutral-400 hover:text-white">
                <AlertCircle size={16} className="mr-2" /> Learn More
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 