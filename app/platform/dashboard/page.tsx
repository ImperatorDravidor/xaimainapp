"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { StatsCard } from "@/components/ui/stats-card";
import { DataTable } from "@/components/ui/data-table";
import { useUser } from "@clerk/nextjs";
import { useTeamsStore } from "@/lib/data";
import { 
  Loader2,
  LayoutDashboard,
  Users,
  BookOpen,
  BarChart3,
  Shield,
  ArrowUpRight,
  ArrowDownRight,
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Bell,
  Calendar,
  FileText,
  RefreshCw,
  Info,
  ExternalLink
} from "lucide-react";

// Types for API responses
interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface Metric {
  id: string;
  name: string;
  value: number | string;
  change: number;
  isPositive: boolean;
  unit?: string;
}

interface Task {
  id: string;
  title: string;
  status: "completed" | "in-progress" | "pending" | "failed";
  priority: "low" | "medium" | "high" | "urgent";
  due: string;
  assignedTo: string;
  team: string;
}

interface Activity {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  timestamp: number;
}

interface Alert {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  timestamp: number;
  time?: string;
}

interface DashboardData {
  metrics: Metric[];
  charts: {
    weeklyTasks: { name: string; tasks: number; savings: number }[];
    monthlyPerformance: { name: string; value: number }[];
  };
  tasks: Task[];
  activities: Activity[];
  alerts: Alert[];
}

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);
  const [selectedTab, setSelectedTab] = useState("overview");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  const { teams } = useTeamsStore();

  // Fetch dashboard data
  const fetchDashboardData = useCallback(async () => {
    try {
      setIsRefreshing(true);
      
      // In a real application, this would be a fetch call to your API
      // For demo purposes, we'll simulate an API response with a timeout
      await new Promise(resolve => setTimeout(resolve, 1200));
      
      // Realistic mock data based on teams from store
      const mockDashboardData: DashboardData = {
        metrics: [
          { 
            id: "workflow-count", 
            name: "Active Workflows", 
            value: teams.length * 3 + 4, 
            change: 8.4, 
            isPositive: true 
          },
          { 
            id: "team-members", 
            name: "Team Members", 
            value: teams.reduce((sum, team) => sum + team.members, 0) || 5, 
            change: 0, 
            isPositive: true 
          },
          { 
            id: "resources", 
            name: "Resources", 
            value: teams.length * 35 + 110, 
            change: 5.2, 
            isPositive: true 
          },
          { 
            id: "efficiency", 
            name: "Efficiency Gain", 
            value: teams.length > 0 ? 34 : 27, 
            unit: "%", 
            change: 4.3, 
            isPositive: true 
          },
        ],
        charts: {
          weeklyTasks: [
            { name: 'Mon', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Tue', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Wed', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Thu', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Fri', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Sat', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
            { name: 'Sun', tasks: Math.floor(Math.random() * 30) + 50, savings: Math.floor(Math.random() * 1000) + 2000 },
          ],
          monthlyPerformance: [
            { name: 'Jan', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Feb', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Mar', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Apr', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'May', value: Math.floor(Math.random() * 20) + 80 },
            { name: 'Jun', value: Math.floor(Math.random() * 20) + 80 },
          ]
        },
        tasks: [
          {
            id: "task-1",
            title: "Review monthly performance metrics",
            status: "in-progress",
            priority: "high",
            due: "Today",
            assignedTo: "You",
            team: "Analytics"
          },
          {
            id: "task-2",
            title: "Optimize SEO for product pages",
            status: "pending",
            priority: "medium",
            due: "Tomorrow",
            assignedTo: "SEO Team",
            team: "Marketing"
          },
          {
            id: "task-3",
            title: "Update customer support knowledge base",
            status: "completed",
            priority: "medium",
            due: "Yesterday",
            assignedTo: "Support Team",
            team: "Support"
          },
          {
            id: "task-4",
            title: "Review failed processing jobs",
            status: "failed",
            priority: "urgent",
            due: "Overdue",
            assignedTo: "Tech Team",
            team: "Operations"
          },
          {
            id: "task-5",
            title: "Finalize quarterly business report",
            status: "pending",
            priority: "high",
            due: "Next week",
            assignedTo: "Finance Team",
            team: "Finance"
          }
        ],
        activities: [
          { 
            id: "act-1", 
            user: "Sarah Chen", 
            action: "Created new team", 
            target: "Sales Automation", 
            time: "10 min ago",
            timestamp: Date.now() - 10 * 60 * 1000
          },
          { 
            id: "act-2", 
            user: "Mark Johnson", 
            action: "Updated workflow", 
            target: "Customer Support", 
            time: "2 hours ago",
            timestamp: Date.now() - 2 * 60 * 60 * 1000
          },
          { 
            id: "act-3", 
            user: "AI Team Alpha", 
            action: "Generated document", 
            target: "Monthly Report", 
            time: "5 hours ago",
            timestamp: Date.now() - 5 * 60 * 60 * 1000
          },
          { 
            id: "act-4", 
            user: "Emily Wang", 
            action: "Modified permissions", 
            target: "Data Access", 
            time: "Yesterday",
            timestamp: Date.now() - 24 * 60 * 60 * 1000
          },
        ],
        alerts: [
          {
            id: "alert-1",
            title: "System Update Scheduled",
            message: "A system update is scheduled for tomorrow at 2 AM. Expect brief downtime.",
            type: "info",
            timestamp: Date.now() - 30 * 60 * 1000
          },
          {
            id: "alert-2",
            title: "Data Processing Delayed",
            message: "Weekly data processing is behind schedule. Expected completion in 2 hours.",
            type: "warning",
            timestamp: Date.now() - 45 * 60 * 1000
          },
          {
            id: "alert-3",
            title: "New Feature Available",
            message: "Team performance analytics dashboard is now available. Check it out!",
            type: "success",
            timestamp: Date.now() - 3 * 60 * 60 * 1000
          }
        ]
      };
      
      setData(mockDashboardData);
      setError(null);
    } catch (err) {
      console.error("Error fetching dashboard data:", err);
      setError("Failed to load dashboard data. Please try again.");
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  }, [teams]);

  // Initial data fetch
  useEffect(() => {
    fetchDashboardData();
  }, [fetchDashboardData]);

  if (!isLoaded) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Loading dashboard...</h2>
            <p className="text-muted-foreground">Please wait while we retrieve your information.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (!isSignedIn) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md">
            <h2 className="text-lg font-semibold mb-2">Authentication Required</h2>
            <p className="text-muted-foreground mb-4">Please sign in to view your dashboard.</p>
            <Button variant="default" onClick={() => window.location.href = "/authentication/login"}>
              Sign In
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  
  // Get first name from Clerk user
  const firstName = user?.firstName || user?.username || "User";

  // Activity data columns
  const activityColumns = [
    { 
      header: "User", 
      accessor: (row: Activity) => (
        <div className="flex items-center gap-2">
          <Avatar className="h-6 w-6">
            <AvatarFallback>{row.user.charAt(0)}</AvatarFallback>
          </Avatar>
          <span>{row.user}</span>
        </div>
      )
    },
    { header: "Action", accessor: "action" },
    { header: "Target", accessor: "target" },
    { header: "Time", accessor: "time", className: "text-right" },
  ];

  // Task data columns
  const taskColumns = [
    { 
      header: "Task", 
      accessor: (row: Task) => (
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${
            row.status === "completed" ? "bg-green-500" :
            row.status === "in-progress" ? "bg-blue-500" :
            row.status === "pending" ? "bg-yellow-500" :
            "bg-red-500"
          }`}></div>
          <span>{row.title}</span>
        </div>
      )
    },
    { 
      header: "Priority", 
      accessor: (row: Task) => (
        <Badge className={`
          ${row.priority === "urgent" ? "bg-red-500/20 text-red-500 border-red-500/30" :
            row.priority === "high" ? "bg-orange-500/20 text-orange-500 border-orange-500/30" :
            row.priority === "medium" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" :
            "bg-blue-500/20 text-blue-500 border-blue-500/30"}
        `}>
          {row.priority}
        </Badge>
      )
    },
    { header: "Due", accessor: "due" },
    { header: "Assigned To", accessor: "assignedTo" },
    { 
      header: "Status", 
      accessor: (row: Task) => (
        <Badge className={`
          ${row.status === "completed" ? "bg-green-500/20 text-green-500 border-green-500/30" :
            row.status === "in-progress" ? "bg-blue-500/20 text-blue-500 border-blue-500/30" :
            row.status === "pending" ? "bg-yellow-500/20 text-yellow-500 border-yellow-500/30" :
            "bg-red-500/20 text-red-500 border-red-500/30"}
        `}>
          {row.status}
        </Badge>
      ),
      className: "text-right"
    },
  ];

  if (isLoading && !data) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center">
            <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-primary" />
            <h2 className="text-lg font-semibold mb-2">Loading dashboard data...</h2>
            <p className="text-muted-foreground">Please wait while we retrieve your dashboard information.</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  if (error) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-[80vh]">
          <div className="text-center max-w-md">
            <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-semibold mb-2">Something went wrong</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <Button variant="default" onClick={fetchDashboardData}>
              Try Again
            </Button>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-[1800px] mx-auto">
        {/* Welcome Section with Refresh Button */}
        <div className="flex justify-between items-center border-b border-neutral-800/30 p-4">
          <div>
            <h1 className="text-xl font-semibold mb-1">Welcome back, {firstName}</h1>
            <p className="text-sm text-muted-foreground">Enterprise AI Workforce Platform</p>
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={fetchDashboardData} 
            disabled={isRefreshing}
            className="gap-2"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="h-3 w-3 animate-spin" />
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-3 w-3" />
                <span>Refresh Data</span>
              </>
            )}
          </Button>
        </div>

        {/* Dashboard Layout */}
        <div className="grid grid-cols-12 gap-4">
          {/* Left Panel - Static 8 columns */}
          <div className="col-span-12 lg:col-span-8 p-4 space-y-4">
            {/* Alerts Section */}
            {data?.alerts && data.alerts.length > 0 && (
              <div className="space-y-2">
                {data.alerts.map(alert => (
                  <Card key={alert.id} className={`
                    border ${
                      alert.type === 'info' ? 'border-blue-500/30 bg-blue-500/5' :
                      alert.type === 'warning' ? 'border-yellow-500/30 bg-yellow-500/5' :
                      alert.type === 'error' ? 'border-red-500/30 bg-red-500/5' :
                      'border-green-500/30 bg-green-500/5'
                    }
                  `}>
                    <CardContent className="p-3 flex items-start gap-3">
                      <div className={`mt-0.5 flex-shrink-0 ${
                        alert.type === 'info' ? 'text-blue-500' :
                        alert.type === 'warning' ? 'text-yellow-500' :
                        alert.type === 'error' ? 'text-red-500' :
                        'text-green-500'
                      }`}>
                        {alert.type === 'info' && <Info size={18} />}
                        {alert.type === 'warning' && <AlertCircle size={18} />}
                        {alert.type === 'error' && <AlertCircle size={18} />}
                        {alert.type === 'success' && <CheckCircle2 size={18} />}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{alert.title}</h3>
                        <p className="text-xs text-muted-foreground">{alert.message}</p>
                      </div>
                      <div className="text-[10px] text-muted-foreground self-start">
                        {alert.time || new Date(alert.timestamp).toLocaleString()}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Quick Stats - Top row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {data?.metrics.map((metric, index) => (
                <StatsCard
                  key={metric.id}
                  title={metric.name}
                  value={typeof metric.value === 'number' ? metric.value : parseInt(metric.value)}
                  valueSuffix={metric.unit}
                  trend={metric.isPositive ? "up" : metric.change === 0 ? "neutral" : "down"}
                  trendValue={`${metric.change}%`}
                  trendLabel={metric.isPositive ? "increase" : metric.change === 0 ? "no change" : "decrease"}
                  icon={[
                    <LayoutDashboard key="workflow" className="h-4 w-4" />,
                    <Users key="team" className="h-4 w-4" />,
                    <BookOpen key="resources" className="h-4 w-4" />,
                    <BarChart3 key="efficiency" className="h-4 w-4" />
                  ][index]}
                  valueSize="md"
                />
              ))}
            </div>

            {/* Main content - Tab sections */}
            <Tabs defaultValue="overview" className="mt-2">
              <TabsList>
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="space-y-4 mt-4">
                {/* Performance Chart */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex items-center justify-between">
                      <CardTitle>Weekly Performance</CardTitle>
                      <Badge variant="outline">Last 7 days</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="h-72">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data?.charts.weeklyTasks || []} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" vertical={false} />
                          <XAxis 
                            dataKey="name" 
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={false}
                          />
                          <YAxis 
                            tick={{ fontSize: 12, fill: 'var(--muted-foreground)' }}
                            axisLine={{ stroke: 'rgba(255,255,255,0.1)' }}
                            tickLine={false}
                          />
                          <RechartsTooltip
                            contentStyle={{ 
                              backgroundColor: 'var(--card)', 
                              borderColor: 'var(--border)',
                              borderRadius: '0.5rem',
                              color: 'var(--foreground)',
                              boxShadow: 'var(--shadow-md)'
                            }}
                            labelStyle={{ fontWeight: 'bold', marginBottom: '4px' }}
                          />
                          <Bar dataKey="tasks" name="Tasks Completed" fill="var(--primary)" radius={[4, 4, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>
                
                {/* Recent Tasks Preview */}
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Tasks</CardTitle>
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Link href="/company/tasks">View All</Link>
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable 
                      data={data?.tasks.slice(0, 3) || []}
                      columns={taskColumns as any}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>

                {/* Upcoming Events */}
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Upcoming</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[
                        {
                          icon: <Calendar className="h-4 w-4 text-blue-400" />,
                          title: "Weekly Team Sync",
                          time: "Tomorrow, 10:00 AM",
                          description: "Review team performance and upcoming tasks"
                        },
                        {
                          icon: <FileText className="h-4 w-4 text-purple-400" />,
                          title: "Monthly Report Due",
                          time: "Friday, 5:00 PM",
                          description: "All departments to submit monthly performance reports"
                        }
                      ].map((event, i) => (
                        <div key={i} className="flex items-start gap-3 p-2 rounded-md hover:bg-white/5 transition-ios">
                          <div className="mt-0.5">{event.icon}</div>
                          <div>
                            <div className="font-medium text-sm">{event.title}</div>
                            <div className="text-xs text-blue-400">{event.time}</div>
                            <p className="text-xs text-muted-foreground mt-1">{event.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="tasks" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Your Tasks</CardTitle>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          + Add Task
                        </Button>
                        <Button variant="outline" size="sm" className="flex items-center gap-1">
                          <Link href="/company/tasks">
                            Task Manager <ExternalLink className="ml-1 h-3 w-3" />
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable 
                      data={data?.tasks || []}
                      columns={taskColumns as any}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="activity" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-center">
                      <CardTitle>Recent Activity</CardTitle>
                      <Button variant="outline" size="sm">View All</Button>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <DataTable 
                      data={data?.activities || []}
                      columns={activityColumns as any}
                      className="mt-2"
                    />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Panel - Static 4 columns */}
          <div className="col-span-12 lg:col-span-4 p-4 space-y-4">
            {/* Teams Performance */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>AI Teams</CardTitle>
                <CardDescription>
                  {teams.length === 0 ? "No teams configured" : `${teams.length} team${teams.length > 1 ? 's' : ''} configured`}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {teams.length === 0 ? (
                  <div className="text-center p-4 border border-dashed border-neutral-700 rounded-md">
                    <Users className="h-8 w-8 text-neutral-500 mx-auto mb-2" />
                    <h3 className="text-sm font-medium">No AI Teams Configured</h3>
                    <p className="text-xs text-muted-foreground mt-1 mb-3">Configure your first AI team to get started</p>
                    <Button variant="default" size="sm">
                      <Link href="/company/teams">Configure Teams</Link>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {teams.map((team) => (
                      <div key={team.id} className="border border-neutral-800 rounded-md p-3 bg-black/20 hover:bg-black/30 transition-ios">
                        <div className="flex justify-between items-center mb-2">
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center">
                              <Users size={14} className="text-blue-400" />
                            </div>
                            <span className="font-medium text-sm">{team.name}</span>
                          </div>
                          <Badge 
                            className={`
                              ${team.status === "active" ? "bg-green-500/10 text-green-400 border-green-500/30" : 
                                team.status === "deploying" ? "bg-blue-500/10 text-blue-400 border-blue-500/30" :
                                team.status === "paused" ? "bg-amber-500/10 text-amber-400 border-amber-500/30" :
                                "bg-red-500/10 text-red-400 border-red-500/30"}
                            `}
                          >
                            {team.status.charAt(0).toUpperCase() + team.status.slice(1)}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-center mb-2">
                          <div className="bg-neutral-900/40 p-2 rounded-md">
                            <div className="text-xs text-neutral-400">Members</div>
                            <div className="text-sm font-medium">{team.members}</div>
                          </div>
                          <div className="bg-neutral-900/40 p-2 rounded-md">
                            <div className="text-xs text-neutral-400">Tasks</div>
                            <div className="text-sm font-medium">{team.metrics.tasksCompleted}</div>
                          </div>
                          <div className="bg-neutral-900/40 p-2 rounded-md">
                            <div className="text-xs text-neutral-400">Error Rate</div>
                            <div className="text-sm font-medium">{team.metrics.errorRate}</div>
                          </div>
                        </div>
                        <div className="text-right">
                          <Button variant="ghost" size="sm" className="text-xs flex items-center gap-1">
                            <Link href={`/company/teams/${team.id}`}>
                              View Details <ChevronRight size={12} className="ml-1" />
                            </Link>
                          </Button>
                        </div>
                      </div>
                    ))}
                    <div className="text-center pt-2">
                      <Button variant="outline" size="sm" className="flex items-center gap-1">
                        <Link href="/company/teams">Manage All Teams</Link>
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Resource Usage / Performance */}
            <Card>
              <CardHeader className="pb-0">
                <CardTitle>System Performance</CardTitle>
                <CardDescription>Real-time platform metrics</CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                <div className="space-y-4">
                  {[
                    { name: "API Requests", value: 94, max: 100, color: "bg-blue-500" },
                    { name: "CPU Usage", value: 62, max: 100, color: "bg-green-500" },
                    { name: "Memory", value: 78, max: 100, color: "bg-purple-500" }
                  ].map((metric, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-neutral-400">{metric.name}</span>
                        <span className="text-xs font-medium">{metric.value}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-neutral-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${metric.color}`} 
                          style={{ width: `${(metric.value / metric.max) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-4 border-t border-neutral-800">
                  <h3 className="text-sm font-medium mb-2">Monthly Trend</h3>
                  <div className="h-32">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={data?.charts.monthlyPerformance || []}>
                        <defs>
                          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="name" 
                          tick={{fontSize: 10, fill: 'var(--muted-foreground)'}}
                          axisLine={false}
                          tickLine={false}
                        />
                        <YAxis 
                          tick={{fontSize: 10, fill: 'var(--muted-foreground)'}}
                          axisLine={false}
                          tickLine={false}
                          domain={[0, 100]}
                        />
                        <Area 
                          type="monotone" 
                          dataKey="value" 
                          stroke="#3b82f6" 
                          fillOpacity={1}
                          fill="url(#colorValue)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Quick Actions */}
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-2">
                {[
                  {
                    title: "Create AI Team",
                    description: "Configure team parameters",
                    icon: <Users size={16} />,
                    href: "/company/teams"
                  },
                  {
                    title: "Knowledge Base",
                    description: "Manage training data",
                    icon: <BookOpen size={16} />,
                    href: "/intelligence/data-center"
                  },
                  {
                    title: "Security",
                    description: "Manage permissions",
                    icon: <Shield size={16} />,
                    href: "/administration/security"
                  },
                  {
                    title: "Analytics",
                    description: "View insights",
                    icon: <BarChart3 size={16} />,
                    href: "/intelligence/analytics"
                  }
                ].map((action, i) => (
                  <Link
                    key={i}
                    href={action.href}
                    className="flex items-center gap-3 p-3 rounded-lg border border-neutral-800 hover:bg-neutral-900/30 transition-ios group"
                  >
                    <div className="w-8 h-8 flex items-center justify-center rounded-md bg-blue-500/10 text-blue-400 border border-blue-500/20 group-hover:bg-blue-500/15 transition-ios">
                      {action.icon}
                    </div>
                    <div>
                      <div className="font-medium text-sm">{action.title}</div>
                      <p className="text-xs text-muted-foreground">{action.description}</p>
                    </div>
                  </Link>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
} 