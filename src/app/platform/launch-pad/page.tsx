"use client";

import { useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BadgeCheck, Users, BarChart2, MessageSquare, RocketIcon, LightbulbIcon, Briefcase, Zap } from "lucide-react";

export default function LaunchPadPage() {
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Launch Pad</h1>
          <p className="text-neutral-400">Your command center for XanderAI enterprise tools and resources</p>
        </div>
        
        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              title: "View Dashboard",
              description: "See your AI team performance metrics",
              icon: <BarChart2 size={24} className="text-blue-400" />,
              href: "/dashboard",
              color: "from-blue-500/20 to-blue-600/20 border-blue-500/30",
            },
            {
              title: "Manage Teams",
              description: "Configure and monitor your AI workforce",
              icon: <Users size={24} className="text-purple-400" />,
              href: "/teams",
              color: "from-purple-500/20 to-purple-600/20 border-purple-500/30",
            },
            {
              title: "Chat with Xander",
              description: "Get AI assistance for your tasks",
              icon: <MessageSquare size={24} className="text-green-400" />,
              href: "/talk",
              color: "from-green-500/20 to-green-600/20 border-green-500/30",
            },
            {
              title: "View Projects",
              description: "Track your ongoing AI projects",
              icon: <Briefcase size={24} className="text-amber-400" />,
              href: "/projects",
              color: "from-amber-500/20 to-amber-600/20 border-amber-500/30",
            },
          ].map((action, index) => (
            <Card key={index} className={`group cursor-pointer transition-all hover:shadow-lg bg-gradient-to-br ${action.color} backdrop-blur-xl border`}>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center gap-2">
                  <div className="h-12 w-12 rounded-lg bg-black/40 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                    {action.icon}
                  </div>
                  <h3 className="font-semibold text-white">{action.title}</h3>
                  <p className="text-sm text-neutral-400">{action.description}</p>
                  <Link href={action.href} className="w-full mt-2">
                    <Button variant="outline" className="w-full text-sm">
                      Launch
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Recent Activity */}
        <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
          <CardHeader>
            <CardTitle className="text-xl text-white">Recent Activity</CardTitle>
            <CardDescription>Your latest interactions with the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Data Analysis Complete",
                  description: "Your customer sentiment analysis has finished processing",
                  time: "2 hours ago",
                  icon: <BadgeCheck size={16} className="text-green-400" />,
                },
                {
                  title: "Team Performance Report",
                  description: "Monthly team metrics are now available",
                  time: "Yesterday",
                  icon: <BarChart2 size={16} className="text-blue-400" />,
                },
                {
                  title: "New AI Agent Deployed",
                  description: "Sales Assistant AI is now active in your workspace",
                  time: "2 days ago",
                  icon: <RocketIcon size={16} className="text-purple-400" />,
                },
              ].map((activity, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-neutral-800/30 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-black/40 flex items-center justify-center shrink-0">
                    {activity.icon}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-1">
                      <h4 className="font-medium text-sm text-white">{activity.title}</h4>
                      <span className="text-xs text-neutral-500">{activity.time}</span>
                    </div>
                    <p className="text-xs text-neutral-400">{activity.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        {/* Quick Tips */}
        <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
          <CardHeader>
            <CardTitle className="text-xl text-white">Getting Started</CardTitle>
            <CardDescription>Tips to maximize your XanderAI experience</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: "Configure Your First AI Team",
                  description: "Set up a team of AI agents to handle specific business processes",
                  icon: <Users size={18} />,
                },
                {
                  title: "Integrate with Your Tools",
                  description: "Connect XanderAI with your existing business applications",
                  icon: <Zap size={18} />,
                },
                {
                  title: "Train Custom AI Models",
                  description: "Create specialized AI models for your unique business needs",
                  icon: <LightbulbIcon size={18} />,
                },
                {
                  title: "Set Up Automated Workflows",
                  description: "Create processes that run automatically based on triggers",
                  icon: <RocketIcon size={18} />,
                },
              ].map((tip, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-black/20 hover:bg-black/40 transition-colors">
                  <div className="h-8 w-8 rounded-full bg-blue-900/30 text-blue-400 flex items-center justify-center shrink-0">
                    {tip.icon}
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-white mb-1">{tip.title}</h4>
                    <p className="text-xs text-neutral-400">{tip.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
} 