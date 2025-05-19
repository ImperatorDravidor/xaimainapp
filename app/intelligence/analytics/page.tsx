"use client";

import { useState } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  ZAxis
} from "recharts";
import { Badge } from "@/components/ui/badge";
import { CalendarRange, Download, Filter, Users, Briefcase, DollarSign, Clock, TrendingUp, Clipboard, FileText, BarChart2, Database, Terminal, Zap, Brain } from "lucide-react";
import { EnhancedCard, AIInsightCard, WorkflowCard, ResourceCard } from "@/components/ui/enhanced-card";

// Sample data for analytics
const monthlyData = [
  { name: 'Jan', tasks: 400, savings: 12000, time: 240 },
  { name: 'Feb', tasks: 350, savings: 10500, time: 210 },
  { name: 'Mar', tasks: 510, savings: 15300, time: 280 },
  { name: 'Apr', tasks: 480, savings: 14400, time: 270 },
  { name: 'May', tasks: 450, savings: 13500, time: 250 },
  { name: 'Jun', tasks: 520, savings: 15600, time: 290 },
  { name: 'Jul', tasks: 590, savings: 17700, time: 310 },
  { name: 'Aug', tasks: 620, savings: 18600, time: 325 },
  { name: 'Sep', tasks: 560, savings: 16800, time: 300 },
  { name: 'Oct', tasks: 590, savings: 17700, time: 315 },
  { name: 'Nov', tasks: 610, savings: 18300, time: 320 },
  { name: 'Dec', tasks: 650, savings: 19500, time: 340 },
];

// Pie chart data
const teamPerformanceData = [
  { name: 'Customer Service', value: 30 },
  { name: 'Data Analysis', value: 25 },
  { name: 'Marketing', value: 20 },
  { name: 'Sales', value: 25 },
];

const COLORS = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  const [timeframe, setTimeframe] = useState("monthly");
  
  return (
    <DashboardLayout>
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
            <p className="text-neutral-400">Monitor performance metrics across your AI workforce</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-black/40 border border-neutral-800 rounded-md p-1">
              <Button 
                variant={timeframe === "weekly" ? "ghost" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("weekly")}
                className="text-xs"
              >
                Weekly
              </Button>
              <Button 
                variant={timeframe === "monthly" ? "ghost" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("monthly")}
                className="text-xs"
              >
                Monthly
              </Button>
              <Button 
                variant={timeframe === "quarterly" ? "ghost" : "ghost"} 
                size="sm"
                onClick={() => setTimeframe("quarterly")}
                className="text-xs"
              >
                Quarterly
              </Button>
            </div>
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <CalendarRange size={14} />
              <span>Date Range</span>
            </Button>
            <Button variant="outline" size="sm" className="text-xs gap-1.5">
              <Download size={14} />
              <span>Export</span>
            </Button>
          </div>
        </div>
        
        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { 
              title: 'Total Tasks Completed', 
              value: '6,340', 
              change: '+12.5%', 
              trend: 'up',
              icon: <Clipboard className="text-blue-400" size={20} />,
              color: 'from-blue-500/20 to-blue-600/20 border-blue-500/30'
            },
            { 
              title: 'Cost Savings', 
              value: '$189,900', 
              change: '+23.1%', 
              trend: 'up',
              icon: <DollarSign className="text-green-400" size={20} />,
              color: 'from-green-500/20 to-green-600/20 border-green-500/30'
            },
            { 
              title: 'Time Saved (hours)', 
              value: '3,150', 
              change: '+18.7%', 
              trend: 'up',
              icon: <Clock className="text-amber-400" size={20} />,
              color: 'from-amber-500/20 to-amber-600/20 border-amber-500/30'
            },
            { 
              title: 'AI Teams Deployed', 
              value: '4', 
              change: 'Same', 
              trend: 'neutral',
              icon: <Users className="text-purple-400" size={20} />,
              color: 'from-purple-500/20 to-purple-600/20 border-purple-500/30'
            }
          ].map((metric, index) => (
            <Card key={index} className={`bg-gradient-to-br ${metric.color} backdrop-blur-xl border`}>
              <CardContent className="pt-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm text-neutral-400">{metric.title}</p>
                    <p className="text-3xl font-bold text-white mt-1">{metric.value}</p>
                  </div>
                  <div className="h-10 w-10 rounded-full bg-black/40 flex items-center justify-center">
                    {metric.icon}
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs">
                  {metric.trend === 'up' ? (
                    <Badge className="text-green-400 bg-green-500/10 border-green-500/30 text-[10px]">
                      <TrendingUp size={10} className="mr-0.5" /> {metric.change}
                    </Badge>
                  ) : (
                    <Badge className="text-blue-400 bg-blue-500/10 border-blue-500/30 text-[10px]">
                      {metric.change}
                    </Badge>
                  )}
                  <span className="text-neutral-500 ml-2">vs previous period</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Analytics Tabs */}
        <Tabs defaultValue="performance" className="w-full">
          <TabsList className="bg-black/40 border border-neutral-800">
            <TabsTrigger value="performance" className="data-[state=active]:bg-blue-600">
              <BarChart2 size={14} className="mr-1" /> Performance
            </TabsTrigger>
            <TabsTrigger value="savings" className="data-[state=active]:bg-blue-600">
              <DollarSign size={14} className="mr-1" /> Cost Savings
            </TabsTrigger>
            <TabsTrigger value="teams" className="data-[state=active]:bg-blue-600">
              <Users size={14} className="mr-1" /> Teams
            </TabsTrigger>
            <TabsTrigger value="reports" className="data-[state=active]:bg-blue-600">
              <FileText size={14} className="mr-1" /> Reports
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="performance" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-black/50 backdrop-blur-xl border-neutral-800 md:col-span-2">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <div>
                      <CardTitle className="text-xl text-white">Task Completion Trends</CardTitle>
                      <CardDescription>Monthly task completion across all AI teams</CardDescription>
                    </div>
                    <Button variant="outline" size="sm" className="text-xs flex gap-1.5">
                      <Filter size={12} /> Filter
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="h-80 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart
                        data={monthlyData}
                        margin={{
                          top: 10,
                          right: 30,
                          left: 0,
                          bottom: 0,
                        }}
                      >
                        <defs>
                          <linearGradient id="colorTasks" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                        <XAxis dataKey="name" stroke="#666" />
                        <YAxis stroke="#666" />
                        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                        <Area 
                          type="monotone" 
                          dataKey="tasks" 
                          stroke="#3b82f6" 
                          fillOpacity={1} 
                          fill="url(#colorTasks)" 
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-black/50 backdrop-blur-xl border-neutral-800">
                <CardHeader>
                  <CardTitle className="text-xl text-white">Team Distribution</CardTitle>
                  <CardDescription>Performance distribution by team</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={teamPerformanceData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {teamPerformanceData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Legend />
                        <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="savings" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800 p-4">
              <CardTitle className="text-xl text-white mb-4">Cost Savings Analytics</CardTitle>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={monthlyData}
                    margin={{
                      top: 20,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                    <XAxis dataKey="name" stroke="#666" />
                    <YAxis stroke="#666" />
                    <Tooltip contentStyle={{ backgroundColor: '#111', borderColor: '#333' }} />
                    <Legend />
                    <Bar dataKey="savings" name="Cost Savings ($)" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </Card>
          </TabsContent>
          
          <TabsContent value="teams" className="mt-6">
            <Card className="bg-black/50 backdrop-blur-xl border-neutral-800 p-4">
              <CardTitle className="text-xl text-white mb-4">Team Performance Analysis</CardTitle>
              <p className="text-neutral-400">Detailed AI team performance metrics coming soon.</p>
            </Card>
          </TabsContent>
          
          <TabsContent value="reports" className="mt-6">
            <div className="space-y-6">
              {/* Predictive Analytics Enhanced Card */}
              <AIInsightCard
                title="Predictive Performance Analysis"
                insights={[
                  "Based on current trends, your AI workforce efficiency will increase by 28% in the next quarter.",
                  "Customer satisfaction ratings are projected to improve by 15% with planned AI enhancements.",
                  "Your data processing capacity utilization is expected to reach 85% by end of quarter.",
                  "Projected ROI for current AI investments shows a 3.4x return by next fiscal year."
                ]}
                recommendations={[
                  { text: "Increase compute resources allocation for data processing teams by 20%", priority: "high" },
                  { text: "Implement cross-training between customer service and sales AI models", priority: "medium" },
                  { text: "Consider early adoption of upcoming LLM architecture for 35% performance gains", priority: "medium" },
                  { text: "Optimize prompt engineering for existing workflows before scaling", priority: "low" }
                ]}
                metrics={[
                  { 
                    label: "Projected Growth", 
                    value: "28%", 
                    change: { value: "8%", positive: true },
                    progressPercentage: 28,
                    progressColor: "bg-gradient-to-r from-purple-500 to-indigo-600"
                  },
                  { 
                    label: "Confidence Score", 
                    value: "92%", 
                    progressPercentage: 92,
                    progressColor: "bg-gradient-to-r from-blue-500 to-cyan-600"
                  },
                  { 
                    label: "Data Points Analyzed", 
                    value: "1.2M", 
                    change: { value: "300K", positive: true }
                  }
                ]}
                footerButton={{
                  text: "Generate Full Report",
                  href: "#",
                  variant: "default"
                }}
              />

              {/* Data-Driven Insights Card */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <EnhancedCard
                  title="Advanced Correlation Analysis"
                  description="Multi-dimensional performance metrics correlation"
                  variant="gradient"
                  glowColor="blue"
                  headerBadge={{
                    text: "Real-Time Data",
                    color: "text-blue-400 border-blue-400/30 bg-blue-400/10"
                  }}
                  visualElement={
                    <div className="h-[300px] w-full">
                      <ResponsiveContainer width="100%" height="100%">
                        <ScatterChart
                          margin={{
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 20,
                          }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                          <XAxis 
                            type="number" 
                            dataKey="tasks" 
                            name="Tasks" 
                            unit="" 
                            stroke="#666"
                            label={{ value: 'Tasks Completed', position: 'bottom', fill: '#666' }}
                          />
                          <YAxis 
                            type="number" 
                            dataKey="savings" 
                            name="Savings" 
                            unit="$" 
                            stroke="#666"
                            label={{ value: 'Cost Savings ($)', angle: -90, position: 'left', fill: '#666' }}
                          />
                          <ZAxis 
                            type="number" 
                            dataKey="time" 
                            range={[60, 400]} 
                            name="Time Saved" 
                            unit="h" 
                          />
                          <Tooltip 
                            contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', borderColor: '#333' }}
                            formatter={(value, name) => {
                              if (name === 'Savings') return [`$${value}`, name];
                              if (name === 'Time Saved') return [`${value}h`, name];
                              return [value, name];
                            }}
                          />
                          <Scatter 
                            name="Performance Metrics" 
                            data={monthlyData} 
                            fill="#3b82f6" 
                            shape="circle"
                          />
                        </ScatterChart>
                      </ResponsiveContainer>
                    </div>
                  }
                  footerButton={{
                    text: "Export Analysis",
                    href: "#",
                    variant: "outline"
                  }}
                />
                
                <ResourceCard
                  title="AI Model Performance Breakdown"
                  description="Comparative analysis of deployed AI models"
                  resourceType="dataset"
                  stats={[
                    { label: "Models Analyzed", value: "8" },
                    { label: "Metrics Tracked", value: "32" },
                    { label: "Time Period", value: "12 months" },
                  ]}
                  detailsList={[
                    { label: "Top Performer", value: "GPT-4 Turbo" },
                    { label: "Efficiency Leader", value: "Custom NER Model" },
                    { label: "Cost-Effective", value: "Llama-3-8B" },
                    { label: "Accuracy Leader", value: "Claude Sonnet" },
                    { label: "Last Analysis", value: "Today, 9:45 AM" },
                  ]}
                  actions={[
                    <Button key="1" size="sm">Full Report</Button>,
                    <Button key="2" variant="outline" size="sm">Compare Models</Button>
                  ]}
                />
              </div>
              
              {/* Team Performance Card with Detailed Metrics */}
              <EnhancedCard
                title="Cross-Team AI Performance Matrix"
                description="Comprehensive view of AI teams' performance across key metrics"
                variant="deep"
                glowColor="purple"
                visualElement={
                  <div className="overflow-x-auto">
                    <table className="w-full min-w-[640px] text-sm">
                      <thead>
                        <tr className="border-b border-neutral-800">
                          <th className="text-left py-3 px-4 text-neutral-400 font-medium">Team</th>
                          <th className="text-center py-3 px-4 text-neutral-400 font-medium">Tasks</th>
                          <th className="text-center py-3 px-4 text-neutral-400 font-medium">Accuracy</th>
                          <th className="text-center py-3 px-4 text-neutral-400 font-medium">Speed</th>
                          <th className="text-center py-3 px-4 text-neutral-400 font-medium">Cost Efficiency</th>
                          <th className="text-center py-3 px-4 text-neutral-400 font-medium">Overall</th>
                        </tr>
                      </thead>
                      <tbody>
                        {[
                          { 
                            team: "Customer Service AI", 
                            tasks: 2450, 
                            accuracy: "96%", 
                            speed: "98%", 
                            costEfficiency: "92%", 
                            overall: "95%",
                            trending: "up"
                          },
                          { 
                            team: "Data Analysis Team", 
                            tasks: 1890, 
                            accuracy: "99%", 
                            speed: "85%", 
                            costEfficiency: "96%", 
                            overall: "93%",
                            trending: "up"
                          },
                          { 
                            team: "Content Generation", 
                            tasks: 3200, 
                            accuracy: "92%", 
                            speed: "97%", 
                            costEfficiency: "86%", 
                            overall: "91%",
                            trending: "flat"
                          },
                          { 
                            team: "Sales Assistant AI", 
                            tasks: 1450, 
                            accuracy: "94%", 
                            speed: "91%", 
                            costEfficiency: "94%", 
                            overall: "93%",
                            trending: "up"
                          },
                        ].map((team, idx) => (
                          <tr key={idx} className="border-b border-neutral-800">
                            <td className="py-3 px-4">
                              <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30 flex items-center justify-center mr-3">
                                  {idx === 0 ? <Users size={16} className="text-purple-400" /> :
                                   idx === 1 ? <Database size={16} className="text-blue-400" /> :
                                   idx === 2 ? <FileText size={16} className="text-green-400" /> :
                                   <Briefcase size={16} className="text-amber-400" />}
                                </div>
                                <span className="text-white">{team.team}</span>
                              </div>
                            </td>
                            <td className="text-center py-3 px-4 text-neutral-200">{team.tasks.toLocaleString()}</td>
                            <td className="text-center py-3 px-4">
                              <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">
                                {team.accuracy}
                              </Badge>
                            </td>
                            <td className="text-center py-3 px-4">
                              <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                                {team.speed}
                              </Badge>
                            </td>
                            <td className="text-center py-3 px-4">
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                {team.costEfficiency}
                              </Badge>
                            </td>
                            <td className="text-center py-3 px-4">
                              <div className="flex items-center justify-center">
                                <span className="text-white font-medium mr-2">{team.overall}</span>
                                {team.trending === "up" ? (
                                  <Badge className="h-5 px-1 bg-green-500/20 text-green-400 border-green-500/30">
                                    <TrendingUp size={12} />
                                  </Badge>
                                ) : (
                                  <Badge className="h-5 px-1 bg-blue-500/20 text-blue-400 border-blue-500/30">
                                    ―
                                  </Badge>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                }
                footerButton={{
                  text: "View Team Details",
                  href: "/company/teams",
                  variant: "default"
                }}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
} 