'use client'

import DashboardLayout from '@/components/dashboard/layout'
import XanderWorkspace from '@/components/dashboard/xander-workspace'
import { ChatWidget } from '@/components/dashboard/chat-widget'
import CompanyBrain from '@/components/dashboard/company-brain'
import { Card } from '@/components/ui/card'
import { OnboardingSlideshow } from '@/components/dashboard/onboarding-slideshow'
import { useEffect, useState } from 'react'
import { createClient } from '@/utils/supabase/client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { 
  Brain, 
  ArrowUpRight,
  TrendingUp,
  ChevronRight,
  Users,
  Activity,
  Calendar,
  MessageSquare,
  Target
} from 'lucide-react'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export default function DashboardPage() {
  const [user, setUser] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const supabase = createClient()
  
  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      setIsLoading(false)
    }
    fetchUser()
  }, [supabase])

  const getTimeOfDayGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return "Good morning"
    if (hour < 17) return "Good afternoon"
    return "Good evening"
  }

  const userName = user?.user_metadata?.full_name?.split(' ')[0] || user?.email?.split('@')[0] || 'there'
  const timeGreeting = getTimeOfDayGreeting()

  return (
    <DashboardLayout>
      <div className="min-h-screen">
        {/* Header Section */}
        <div className="mb-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-2"
          >
            <h1 className="text-3xl font-light text-white">
              {timeGreeting}, <span className="font-medium bg-gradient-to-r from-blue-400 to-violet-400 bg-clip-text text-transparent">{userName}</span>
            </h1>
            <p className="text-white/60">Welcome to your AI workforce command center</p>
          </motion.div>
        </div>

        {/* Quick Stats Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Active Agents</p>
                <p className="text-2xl font-semibold text-white mt-1">12</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +2 this week
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Tasks Completed</p>
                <p className="text-2xl font-semibold text-white mt-1">847</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  23% increase
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-violet-500/20 flex items-center justify-center">
                <Activity className="w-6 h-6 text-violet-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Efficiency Score</p>
                <p className="text-2xl font-semibold text-white mt-1">94%</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  +5% this month
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                <Target className="w-6 h-6 text-emerald-400" />
              </div>
            </div>
          </Card>

          <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-white/60 text-sm">Cost Savings</p>
                <p className="text-2xl font-semibold text-white mt-1">$47.2K</p>
                <p className="text-green-400 text-xs mt-1 flex items-center">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  This month
                </p>
              </div>
              <div className="w-12 h-12 rounded-lg bg-amber-500/20 flex items-center justify-center">
                <Brain className="w-6 h-6 text-amber-400" />
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Company Brain and Recent Activity */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-1 space-y-6"
          >
            <CompanyBrain />
            
            {/* Recent Activity Card */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-white">Recent Activity</h3>
                <Badge variant="secondary" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Live
                </Badge>
              </div>
              
              <div className="space-y-3">
                {[
                  { time: '5 min ago', action: 'Sales Agent closed deal #4521', status: 'success' },
                  { time: '12 min ago', action: 'Data Analyst completed Q4 report', status: 'completed' },
                  { time: '1 hour ago', action: 'Customer Support resolved 15 tickets', status: 'info' },
                  { time: '2 hours ago', action: 'Marketing Agent launched campaign', status: 'active' }
                ].map((item, index) => (
                  <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                    <div className="w-2 h-2 rounded-full bg-green-400 mt-1.5 animate-pulse" />
                    <div className="flex-1">
                      <p className="text-white/90 text-sm">{item.action}</p>
                      <p className="text-white/40 text-xs mt-1">{item.time}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <Link href="/intelligence/analytics">
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  View All Activity
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>

          {/* Center Column - Main Workspace */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <XanderWorkspace />
          </motion.div>

          {/* Right Column - Chat Widget and Performance */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="lg:col-span-1 space-y-6"
          >
            <ChatWidget />
            
            {/* Performance Metrics Card */}
            <Card className="bg-black/40 border-white/10 backdrop-blur-sm p-6">
              <h3 className="text-lg font-medium text-white mb-4">Agent Performance</h3>
              
              <div className="space-y-4">
                {[
                  { name: 'Sales Agent', progress: 92, color: 'blue' },
                  { name: 'Data Analyst', progress: 88, color: 'violet' },
                  { name: 'Support Agent', progress: 95, color: 'emerald' },
                  { name: 'Marketing Agent', progress: 79, color: 'amber' }
                ].map((agent, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-white/80 text-sm">{agent.name}</span>
                      <span className="text-white/60 text-xs">{agent.progress}%</span>
                    </div>
                    <Progress value={agent.progress} className="h-2 bg-white/10" />
                  </div>
                ))}
              </div>
              
              <Link href="/intelligence/team-reports">
                <Button 
                  variant="ghost" 
                  className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                >
                  View Detailed Reports
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section - Quick Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-8"
        >
          <Card className="bg-gradient-to-r from-blue-500/10 to-violet-500/10 border-white/10 backdrop-blur-sm p-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="text-lg font-medium text-white mb-2">Ready to scale your AI workforce?</h3>
                <p className="text-white/60 text-sm">Deploy new agents, create workflows, or explore advanced features.</p>
              </div>
              <div className="flex gap-3">
                <Link href="/tools/agent-plan">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    Create New Agent
                  </Button>
                </Link>
                <Link href="/company/workflows">
                  <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                    Build Workflow
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </DashboardLayout>
  )
}