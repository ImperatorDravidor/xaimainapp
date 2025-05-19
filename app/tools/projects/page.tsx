import React from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { motion } from "framer-motion";
import { FolderKanban, PlusCircle, Folders, Calendar, Users, ClipboardList, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ProjectsPage() {
  const upcomingFeatures = [
    { name: "Project Templates", description: "Ready-to-use templates for common AI workflows", icon: <Folders size={18} /> },
    { name: "Team Collaboration", description: "Assign tasks and track project progress", icon: <Users size={18} /> },
    { name: "Release Planning", description: "Schedule and manage AI model releases", icon: <Calendar size={18} /> },
    { name: "Task Management", description: "Organize and prioritize project tasks", icon: <ClipboardList size={18} /> }
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
          <h1 className="text-2xl font-semibold text-white mb-2">Projects</h1>
          <p className="text-neutral-400">Organize, manage, and track your AI workforce initiatives</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl p-6">
              <div className="flex flex-col items-center text-center max-w-lg mx-auto py-8">
                <div className="bg-gradient-to-br from-blue-500/20 to-purple-500/20 p-5 rounded-full mb-6 border border-blue-500/20">
                  <FolderKanban size={32} className="text-blue-400" />
                </div>
                <h2 className="text-xl font-medium text-white mb-3">Project Management Coming Soon</h2>
                <p className="text-neutral-400 mb-6">
                  Organize all your AI initiatives in one place. Create projects, assign teams, track progress, and deliver results with our comprehensive project management tools.
                </p>
                <div className="flex gap-3">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    Join Waitlist
                  </Button>
                  <Button variant="outline" className="border-neutral-700 bg-neutral-900/50">
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl">
              <div className="p-4 border-b border-neutral-800">
                <h3 className="text-white font-medium">Launch Timeline</h3>
              </div>
              <div className="p-4">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Current</Badge>
                    <span className="text-neutral-300 text-sm">Development</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Q3 2025</Badge>
                    <span className="text-neutral-300 text-sm">Beta Access</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge className="bg-neutral-500/20 text-neutral-400 border-neutral-500/30">Q4 2025</Badge>
                    <span className="text-neutral-300 text-sm">General Release</span>
                  </div>
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
          <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
            <h3 className="text-white font-medium">Upcoming Features</h3>
            <Button variant="ghost" size="sm" className="text-neutral-400 text-xs hover:text-blue-400">
              View all <ArrowRight size={12} className="ml-1" />
            </Button>
          </div>
          <div className="p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {upcomingFeatures.map((feature, index) => (
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