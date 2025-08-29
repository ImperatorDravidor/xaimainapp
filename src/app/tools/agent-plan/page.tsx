"use client";

import Plan from "@/components/ui/agent-plan";
import { motion } from "framer-motion";
import { ArrowLeft, Bot, CheckCircle2, Clock, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useRouter } from "next/navigation";

export default function AgentPlanPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => router.back()}
                className="hover:bg-muted"
              >
                <ArrowLeft size={16} className="mr-2" />
                Back
              </Button>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                  <Bot size={20} className="text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold">Agent Plan</h1>
                  <p className="text-sm text-muted-foreground">
                    AI-powered task management and workflow planning
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                <Clock size={12} className="mr-1" />
                Real-time
              </Badge>
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                <CheckCircle2 size={12} className="mr-1" />
                Interactive
              </Badge>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="container mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar with info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Bot size={18} />
                  About Agent Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Agent Plan is an intelligent task management system that helps you organize, track, and execute complex projects with AI assistance.
                </p>
                
                <div className="space-y-3">
                  <h4 className="font-medium text-sm">Features:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      Interactive task management
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      Hierarchical subtasks
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                      MCP server integration
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                      Dependency tracking
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500" />
                      Status animations
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users size={18} />
                  How to Use
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="space-y-2">
                  <p className="text-sm font-medium">Click task icons to:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground ml-2">
                    <li>• Change task status</li>
                    <li>• Mark as completed</li>
                    <li>• Set to in-progress</li>
                    <li>• Flag for help</li>
                  </ul>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium">Click task titles to:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground ml-2">
                    <li>• Expand/collapse subtasks</li>
                    <li>• View task details</li>
                    <li>• See dependencies</li>
                  </ul>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium">Click subtasks to:</p>
                  <ul className="space-y-1 text-xs text-muted-foreground ml-2">
                    <li>• View descriptions</li>
                    <li>• See MCP tools</li>
                    <li>• Toggle completion</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main content area */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>Project Tasks & Workflow</span>
                  <Badge variant="outline" className="text-xs">
                    5 Tasks • 15 Subtasks
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[calc(100vh-300px)] overflow-hidden">
                  <Plan />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
} 