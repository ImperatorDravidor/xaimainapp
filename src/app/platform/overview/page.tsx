"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BarChart, ArrowUpRight, Users, ServerCog, RocketIcon, LayoutDashboard, Zap, Bookmark, Clock, RefreshCw } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import DashboardLayout from "@/components/dashboard/layout";

export default function OverviewPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [metrics, setMetrics] = useState([
    { name: "Active AI Teams", value: "8", change: "+2", icon: <Users size={18} className="text-blue-400" />, color: "from-blue-500/20 to-blue-600/20" },
    { name: "Data Integrations", value: "12", change: "+5", icon: <ServerCog size={18} className="text-purple-400" />, color: "from-purple-500/20 to-purple-600/20" },
    { name: "Weekly Tasks", value: "156", change: "+12%", icon: <LayoutDashboard size={18} className="text-emerald-400" />, color: "from-emerald-500/20 to-emerald-600/20" },
    { name: "AI Performance", value: "94%", change: "+3%", icon: <Zap size={18} className="text-amber-400" />, color: "from-amber-500/20 to-amber-600/20" }
  ]);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  const activities = [
    { user: "AI Team Alpha", action: "completed task", target: "Invoice Processing", time: "12 minutes ago" },
    { user: "Support Team", action: "generated report", target: "Q1 Customer Interactions", time: "43 minutes ago" },
    { user: "Engineering", action: "deployed model", target: "Document Analysis v2.4", time: "2 hours ago" },
    { user: "Sales Team", action: "identified lead", target: "Enterprise Solutions", time: "Yesterday at 4:32 PM" }
  ];

  const integrations = [
    { name: "Database Connection", status: "Connected", statusColor: "bg-green-500" },
    { name: "API Integration", status: "Connected", statusColor: "bg-green-500" },
    { name: "Document Storage", status: "Connected", statusColor: "bg-green-500" },
    { name: "Email Service", status: "Partial", statusColor: "bg-amber-500" },
    { name: "CRM Integration", status: "Disconnected", statusColor: "bg-neutral-500" }
  ];

  // Simulate data refresh
  const refreshData = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      // Update with new random data
      const updatedMetrics = metrics.map(metric => {
        const randomChange = Math.floor(Math.random() * 5) + 1;
        const changeDirection = Math.random() > 0.3 ? '+' : '-';
        
        let newValue;
        if (metric.name === "AI Performance") {
          const baseValue = parseInt(metric.value.replace('%', ''));
          const updatedValue = baseValue + (changeDirection === '+' ? randomChange : -randomChange);
          newValue = `${Math.min(100, Math.max(80, updatedValue))}%`;
        } else if (metric.name === "Weekly Tasks") {
          const baseValue = parseInt(metric.value);
          newValue = `${baseValue + (changeDirection === '+' ? randomChange * 10 : -randomChange * 5)}`;
        } else if (metric.name === "Data Integrations") {
          const baseValue = parseInt(metric.value);
          newValue = `${baseValue + (changeDirection === '+' ? 1 : 0)}`;
        } else {
          const baseValue = parseInt(metric.value);
          newValue = `${baseValue + (changeDirection === '+' ? 1 : -1)}`;
        }
        
        return {
          ...metric,
          value: newValue,
          change: `${changeDirection}${randomChange}${metric.name === "AI Performance" ? '%' : ''}`
        };
      });
      
      setMetrics(updatedMetrics);
      setLastUpdated(new Date());
      setIsLoading(false);
    }, 1500);
  };

  // Format the last updated time
  const formattedLastUpdated = lastUpdated.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <DashboardLayout>
      <div className="w-full h-full p-6">
        <motion.div 
          className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <div>
            <h1 className="text-2xl font-semibold text-white mb-2">Overview</h1>
            <p className="text-neutral-400">Your AI workforce at a glance</p>
          </div>
          <div className="mt-3 sm:mt-0 flex items-center gap-3">
            <div className="text-sm text-neutral-500">
              Last updated: <span className="text-neutral-400">{formattedLastUpdated}</span>
            </div>
            <Button 
              variant="outline" 
              size="sm"
              onClick={refreshData}
              disabled={isLoading}
              className="flex items-center gap-2 bg-black/30 border-neutral-800 hover:bg-black/50 hover:border-blue-600/50"
            >
              <RefreshCw size={14} className={`text-blue-400 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Updating...' : 'Refresh'}</span>
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <>
                {[0, 1, 2, 3].map((index) => (
                  <motion.div
                    key={`skeleton-${index}`}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 p-4 shadow-xl"
                  >
                    <div className="animate-pulse">
                      <div className="flex justify-between mb-2">
                        <div className="h-9 w-9 bg-neutral-800 rounded-lg"></div>
                        <div className="h-6 w-16 bg-neutral-800 rounded-md"></div>
                      </div>
                      <div className="h-4 w-24 bg-neutral-800 rounded mt-2"></div>
                      <div className="h-8 w-16 bg-neutral-800 rounded mt-3"></div>
                    </div>
                  </motion.div>
                ))}
              </>
            ) : (
              <>
                {metrics.map((metric, index) => (
                  <motion.div
                    key={index}
                    className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 p-4 shadow-xl"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className="flex justify-between mb-2">
                      <div className={`p-2 rounded-lg bg-gradient-to-br ${metric.color} border border-neutral-800`}>
                        {metric.icon}
                      </div>
                      <div className={`bg-neutral-900/50 px-2 py-1 rounded-md text-xs flex items-center gap-1 ${
                        metric.change.startsWith('+') ? 'text-green-400' : 'text-red-400'
                      }`}>
                        {metric.change} <ArrowUpRight size={12} />
                      </div>
                    </div>
                    <h3 className="text-neutral-400 text-sm mt-2">{metric.name}</h3>
                    <p className="text-white text-2xl font-semibold">{metric.value}</p>
                  </motion.div>
                ))}
              </>
            )}
          </AnimatePresence>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <motion.div 
            className="col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl h-full">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                <h2 className="text-white font-medium">Recent Activity</h2>
                <div className="text-neutral-500 text-xs flex items-center gap-1">
                  <Clock size={12} /> Last 24 hours
                </div>
              </div>
              <div className="p-0">
                {activities.map((activity, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center gap-3 p-4 border-b border-neutral-800/50 last:border-0"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + (index * 0.1) }}
                  >
                    <Avatar className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600">
                      <AvatarFallback>{activity.user.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="text-neutral-300 text-sm">
                        <span className="font-medium text-white">{activity.user}</span> {activity.action} <span className="text-blue-400">{activity.target}</span>
                      </p>
                      <p className="text-neutral-500 text-xs">{activity.time}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <div className="bg-black/70 backdrop-blur-md rounded-xl border border-neutral-800 shadow-xl h-full">
              <div className="p-4 border-b border-neutral-800 flex justify-between items-center">
                <h2 className="text-white font-medium">Integrations</h2>
                <div className="bg-blue-600/20 text-blue-400 text-xs px-2 py-1 rounded-full">
                  3/5 Connected
                </div>
              </div>
              <div className="p-4 space-y-3">
                {integrations.map((integration, index) => (
                  <motion.div 
                    key={index}
                    className="flex items-center justify-between"
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: 0.4 + (index * 0.1) }}
                  >
                    <div className="flex items-center gap-2">
                      <div className={`h-2 w-2 rounded-full ${integration.statusColor}`}></div>
                      <span className="text-neutral-300 text-sm">{integration.name}</span>
                    </div>
                    <span className="text-xs text-neutral-500">{integration.status}</span>
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
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <div className="p-4 border-b border-neutral-800 flex items-center justify-between">
            <h2 className="text-white font-medium">Weekly Performance</h2>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 text-neutral-400 text-xs">
                <div className="h-3 w-3 bg-blue-500/50 rounded"></div>
                <span>This Week</span>
              </div>
              <div className="flex items-center gap-1 text-neutral-400 text-xs">
                <div className="h-3 w-3 bg-neutral-600/50 rounded"></div>
                <span>Last Week</span>
              </div>
            </div>
          </div>
          <div className="p-8 h-[200px] flex items-center justify-center">
            <div className="text-neutral-400 text-sm flex flex-col items-center gap-3">
              <BarChart size={36} />
              <span>Performance metrics visualization coming soon</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
} 