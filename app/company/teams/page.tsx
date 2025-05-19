"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle, Search, Filter, SlidersHorizontal, X, Activity, Cpu, ChevronRight, Database, Users, FileText, ArrowUpDown, Clock, LayoutGrid, LayoutList } from "lucide-react";
import { TeamCard, Team } from "@/components/dashboard/TeamCard";
import { TemplateSelector } from "@/components/dashboard/TemplateSelector";
import { AnimatePresence, motion } from "framer-motion";
import { useTeamsStore, INDUSTRY_TEMPLATES } from "@/lib/data";
import { Suspense } from "react";
import DashboardLayout from "@/components/dashboard/layout";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { EnhancedCard, WorkflowCard, ResourceCard, AIInsightCard } from "@/components/ui/enhanced-card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from "recharts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { Settings } from "lucide-react";
import { TooltipProvider } from "@/components/ui/tooltip";

export default function TeamsPage() {
  const { teams, addTeam, updateTeam } = useTeamsStore();
  const [showTemplateSelector, setShowTemplateSelector] = useState(false);
  const [deployingTemplate, setDeployingTemplate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>("newest");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  // Function to add a new team
  const handleAddTeam = (templateId: string) => {
    const template = INDUSTRY_TEMPLATES.find(t => t.id === templateId);
    if (!template) return;
    
    setDeployingTemplate(templateId);
    
    // Simulate deployment progress
    setTimeout(() => {
      const newTeam: Team = {
        id: `team-${Date.now()}`,
        name: `${template.name} Team`,
        description: template.description,
        template: template.name,
        status: "deploying",
        members: 0,
        metrics: {
          costSavings: "$0",
          errorRate: "0%",
          tasksCompleted: 0
        }
      };
      
      addTeam(newTeam);
      setShowTemplateSelector(false);
      setDeployingTemplate(null);
      
      // Simulate team becoming active after deployment
      setTimeout(() => {
        const activatedTeam = {
          ...newTeam,
          status: "active" as const,
          members: Math.floor(Math.random() * 5) + 1
        };
        updateTeam(activatedTeam);
      }, 3000);
    }, 2000);
  };

  // Filter and sort teams based on search, status filter and sort option
  const filteredAndSortedTeams = () => {
    let filtered = teams;
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(team => 
        team.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        team.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(team => team.status === statusFilter);
    }
    
    // Apply sorting
    return filtered.sort((a, b) => {
      switch(sortOption) {
        case "name":
          return a.name.localeCompare(b.name);
        case "members":
          return b.members - a.members;
        case "performance":
          return parseInt(b.metrics.errorRate) - parseInt(a.metrics.errorRate);
        case "newest":
        default:
          return parseInt(b.id.split('-')[1]) - parseInt(a.id.split('-')[1]);
      }
    });
  };

  const getStatusCounts = () => {
    const counts = { active: 0, deploying: 0, paused: 0, offline: 0 };
    teams.forEach(team => {
      counts[team.status as keyof typeof counts]++;
    });
    return counts;
  };

  const statusCounts = getStatusCounts();

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter(null);
    setSortOption("newest");
  };

  // Performance data for chart
  const teamsPerformanceData = [
    { name: 'Customer Service', tasks: 1240, efficiency: 92, errors: 3 },
    { name: 'Data Processing', tasks: 950, efficiency: 89, errors: 5 },
    { name: 'Content Gen', tasks: 1570, efficiency: 86, errors: 8 },
    { name: 'Sales Assist', tasks: 820, efficiency: 91, errors: 4 },
  ];

  // Team distribution data for pie chart
  const teamDistributionData = [
    { name: 'Marketing', value: 35 },
    { name: 'Sales', value: 25 },
    { name: 'Support', value: 20 },
    { name: 'Development', value: 20 }
  ];
  
  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 border-4 border-t-blue-600 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-400">Loading teams...</p>
          </div>
        </div>
      );
    }

    const filteredTeams = filteredAndSortedTeams();

    return (
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-white">AI Teams</h1>
            <p className="text-gray-400 mt-1">Manage your AI workforce across departments</p>
          </div>
          <Button
            onClick={() => setShowTemplateSelector(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Team
          </Button>
        </div>

        <Tabs defaultValue="teams" className="w-full">
          <TabsList className="grid grid-cols-2 w-full max-w-md mb-6">
            <TabsTrigger value="teams" className="rounded-l-md">Teams</TabsTrigger>
            <TabsTrigger value="analytics" className="rounded-r-md">Analytics</TabsTrigger>
          </TabsList>
          
          <TabsContent value="teams" className="space-y-6">
            {/* Search and Filter Section */}
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                <Input
                  placeholder="Search teams..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9 bg-black/20 border-neutral-800 text-white h-9"
                />
                {searchQuery && (
                  <Button
                    variant="ghost"
                    className="absolute right-1 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0 text-gray-500 hover:text-white"
                    onClick={() => setSearchQuery("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>

              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-black/20 border-neutral-800">
                      <SlidersHorizontal className="h-4 w-4" />
                      <span>Status</span>
                      {statusFilter && <Badge className="ml-1 bg-blue-500/30 text-blue-300">{statusFilter}</Badge>}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56 bg-neutral-900 border-neutral-800 text-white">
                    <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-800" />
                    <DropdownMenuItem 
                      className={`flex justify-between ${statusFilter === 'active' ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-neutral-800'}`}
                      onClick={() => setStatusFilter(statusFilter === 'active' ? null : 'active')}
                    >
                      <span>Active</span>
                      <Badge variant="outline" className="bg-green-500/20 text-green-400 border-green-500/30">
                        {statusCounts.active}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex justify-between ${statusFilter === 'deploying' ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-neutral-800'}`}
                      onClick={() => setStatusFilter(statusFilter === 'deploying' ? null : 'deploying')}
                    >
                      <span>Deploying</span>
                      <Badge variant="outline" className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                        {statusCounts.deploying}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex justify-between ${statusFilter === 'paused' ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-neutral-800'}`}
                      onClick={() => setStatusFilter(statusFilter === 'paused' ? null : 'paused')}
                    >
                      <span>Paused</span>
                      <Badge variant="outline" className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                        {statusCounts.paused}
                      </Badge>
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={`flex justify-between ${statusFilter === 'offline' ? 'bg-blue-500/20 text-blue-300' : 'hover:bg-neutral-800'}`}
                      onClick={() => setStatusFilter(statusFilter === 'offline' ? null : 'offline')}
                    >
                      <span>Offline</span>
                      <Badge variant="outline" className="bg-red-500/20 text-red-400 border-red-500/30">
                        {statusCounts.offline}
                      </Badge>
                    </DropdownMenuItem>
                    {(statusFilter || searchQuery || sortOption !== "newest") && (
                      <>
                        <DropdownMenuSeparator className="bg-neutral-800" />
                        <DropdownMenuItem 
                          className="text-neutral-400 hover:bg-neutral-800 hover:text-white"
                          onClick={clearFilters}
                        >
                          Clear all filters
                        </DropdownMenuItem>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2 bg-black/20 border-neutral-800">
                      <ArrowUpDown className="h-4 w-4" />
                      <span>Sort</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-48 bg-neutral-900 border-neutral-800 text-white">
                    <DropdownMenuLabel>Sort by</DropdownMenuLabel>
                    <DropdownMenuSeparator className="bg-neutral-800" />
                    <DropdownMenuItem 
                      className={sortOption === "newest" ? "bg-blue-500/20 text-blue-300" : "hover:bg-neutral-800"}
                      onClick={() => setSortOption("newest")}
                    >
                      Newest first
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortOption === "name" ? "bg-blue-500/20 text-blue-300" : "hover:bg-neutral-800"}
                      onClick={() => setSortOption("name")}
                    >
                      Name (A-Z)
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortOption === "members" ? "bg-blue-500/20 text-blue-300" : "hover:bg-neutral-800"}
                      onClick={() => setSortOption("members")}
                    >
                      Most members
                    </DropdownMenuItem>
                    <DropdownMenuItem 
                      className={sortOption === "performance" ? "bg-blue-500/20 text-blue-300" : "hover:bg-neutral-800"}
                      onClick={() => setSortOption("performance")}
                    >
                      Best performance
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                {/* View mode toggle */}
                <div className="flex rounded-md overflow-hidden border border-neutral-800">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-2 rounded-none ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'bg-black/20 text-gray-400'}`}
                    onClick={() => setViewMode('grid')}
                  >
                    <LayoutGrid className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`px-2 rounded-none ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'bg-black/20 text-gray-400'}`}
                    onClick={() => setViewMode('list')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <AnimatePresence>
              {showTemplateSelector && (
                <TemplateSelector
                  templates={INDUSTRY_TEMPLATES}
                  onSelect={handleAddTeam}
                  onCancel={() => setShowTemplateSelector(false)}
                  deployingTemplate={deployingTemplate}
                />
              )}
            </AnimatePresence>

            {/* Team Templates Section - Only show when no search/filters and there are teams */}
            {!searchQuery && !statusFilter && sortOption === "newest" && filteredTeams.length > 0 && (
              <div className="mb-8">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-white">Popular Team Templates</h2>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="text-sm text-neutral-400 hover:text-white gap-1"
                    onClick={() => setShowTemplateSelector(true)}
                  >
                    View All <ChevronRight size={16} />
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {INDUSTRY_TEMPLATES.slice(0, 4).map((template) => (
                    <ResourceCard
                      key={template.id}
                      title={template.name}
                      description={template.description}
                      resourceType={
                        template.id.includes("data") ? "dataset" :
                        template.id.includes("customer") ? "integration" :
                        template.id.includes("content") ? "service" : "model"
                      }
                      stats={[
                        { label: "Avg. Tasks/Day", value: Math.floor(Math.random() * 500) + 200 },
                        { label: "Typical Team Size", value: Math.floor(Math.random() * 5) + 1 }
                      ]}
                      detailsList={[
                        { label: "Setup Time", value: "2-3 days" },
                        { label: "Complexity", value: 
                          <Badge className={
                            template.id.includes("data") ? "bg-red-500/20 text-red-400 border-red-500/30" :
                            template.id.includes("customer") ? "bg-amber-500/20 text-amber-400 border-amber-500/30" :
                            "bg-green-500/20 text-green-400 border-green-500/30"
                          }>
                            {
                              template.id.includes("data") ? "Advanced" :
                              template.id.includes("customer") ? "Moderate" :
                              "Simple"
                            }
                          </Badge> 
                        }
                      ]}
                      actions={[
                        <Button 
                          key={`deploy-${template.id}`} 
                          size="sm"
                          onClick={() => handleAddTeam(template.id)}
                          disabled={deployingTemplate !== null}
                        >
                          Deploy
                        </Button>
                      ]}
                    />
                  ))}
                </div>
              </div>
            )}

            {teams.length === 0 ? (
              <div className="text-center py-16 bg-black/30 rounded-lg border border-gray-800">
                <h3 className="text-xl font-medium text-white mb-2">No Teams Yet</h3>
                <p className="text-gray-400 mb-6">Get started by adding your first AI team</p>
                <Button
                  onClick={() => setShowTemplateSelector(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Your First Team
                </Button>
              </div>
            ) : filteredTeams.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-12 bg-black/30 rounded-lg border border-gray-800"
              >
                <h3 className="text-xl font-medium text-white mb-2">No Matching Teams</h3>
                <p className="text-gray-400 mb-6">Try adjusting your search or filters</p>
                <Button
                  onClick={clearFilters}
                  variant="outline"
                  className="border-gray-700 text-white hover:bg-gray-800"
                >
                  <Filter className="mr-2 h-4 w-4" />
                  Clear Filters
                </Button>
              </motion.div>
            ) : (
              <Suspense fallback={<p>Loading teams...</p>}>
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTeams.map((team, index) => (
                      <TeamCard 
                        key={team.id} 
                        team={team} 
                        index={index}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredTeams.map((team, index) => (
                      <TeamListItem 
                        key={team.id} 
                        team={team} 
                        index={index}
                      />
                    ))}
                  </div>
                )}
              </Suspense>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            {filteredTeams.length > 0 ? (
              <div className="space-y-6">
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  <EnhancedCard
                    title="Team Performance Overview"
                    description="Real-time metrics across all active teams"
                    variant="deep"
                    glowColor="blue"
                    className="xl:col-span-2"
                    visualElement={
                      <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart
                            data={teamsPerformanceData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 70 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="name" stroke="#666" angle={-45} textAnchor="end" tick={{ dy: 10 }} />
                            <YAxis yAxisId="left" orientation="left" stroke="#3b82f6" />
                            <YAxis yAxisId="right" orientation="right" stroke="#10b981" />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: 'rgba(0,0,0,0.8)', 
                                border: '1px solid #444',
                                borderRadius: '4px' 
                              }} 
                            />
                            <Bar yAxisId="left" dataKey="tasks" fill="#3b82f6" name="Tasks Completed" />
                            <Bar yAxisId="right" dataKey="efficiency" fill="#10b981" name="Efficiency %" />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    }
                    metrics={[
                      { 
                        label: "Total Active Teams", 
                        value: statusCounts.active, 
                        progressPercentage: statusCounts.active > 0 ? (statusCounts.active / teams.length) * 100 : 0,
                        progressColor: "bg-gradient-to-r from-blue-500 to-blue-700"
                      },
                      { 
                        label: "Avg. Efficiency", 
                        value: "89%", 
                        change: { value: "3%", positive: true },
                        progressPercentage: 89,
                        progressColor: "bg-gradient-to-r from-green-500 to-green-700"
                      },
                      { 
                        label: "Error Rate", 
                        value: "5.2%", 
                        change: { value: "1.3%", positive: true },
                        progressPercentage: 5.2,
                        progressColor: "bg-gradient-to-r from-red-500 to-red-700"
                      }
                    ]}
                    footerButton={{
                      text: "View Detailed Analytics",
                      href: "/intelligence/analytics",
                      variant: "outline"
                    }}
                  />
                  
                  <WorkflowCard
                    title="Team Distribution"
                    status={deployingTemplate ? "on-track" : statusCounts.deploying > 0 ? "on-track" : "completed"}
                    deadline="Updated in real-time"
                    visualElement={
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <PieChart>
                            <Pie
                              data={teamDistributionData}
                              cx="50%"
                              cy="50%"
                              innerRadius={60}
                              outerRadius={80}
                              fill="#8884d8"
                              paddingAngle={5}
                              dataKey="value"
                              label={({name, percent}) => `${name} (${(percent * 100).toFixed(0)}%)`}
                            >
                              {teamDistributionData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                              ))}
                            </Pie>
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid #444',
                                borderRadius: '4px'
                              }}
                            />
                          </PieChart>
                        </ResponsiveContainer>
                      </div>
                    }
                    stages={[
                      { name: "Marketing", status: "completed", percentage: 100 },
                      { name: "Sales", status: "completed", percentage: 100 },
                      { name: "Support", status: "completed", percentage: 100 },
                      { name: "Development", status: "completed", percentage: 100 }
                    ]}
                    metrics={[
                      { 
                        label: "Total AI Workers", 
                        value: teams.reduce((total, team) => total + team.members, 0),
                        progressPercentage: 75,
                        progressColor: "bg-gradient-to-r from-purple-500 to-pink-500"
                      }
                    ]}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <WorkflowCard
                    title="Team Deployment Pipeline"
                    status={deployingTemplate ? "on-track" : statusCounts.deploying > 0 ? "on-track" : "completed"}
                    deadline={deployingTemplate ? "Estimating..." : "No active deployments"}
                    stages={[
                      { 
                        name: "Environment Setup", 
                        status: deployingTemplate ? "active" : "completed", 
                        percentage: deployingTemplate ? 35 : 100 
                      },
                      { 
                        name: "Model Training", 
                        status: deployingTemplate ? "pending" : "completed", 
                        percentage: deployingTemplate ? 0 : 100 
                      },
                      { 
                        name: "Integration Testing", 
                        status: "pending", 
                        percentage: 0 
                      },
                      { 
                        name: "User Acceptance", 
                        status: "pending", 
                        percentage: 0 
                      },
                      { 
                        name: "Production Deployment", 
                        status: "pending", 
                        percentage: 0 
                      }
                    ]}
                    metrics={[
                      { 
                        label: "Deployment Progress", 
                        value: deployingTemplate ? "35%" : statusCounts.deploying > 0 ? "In Progress" : "Complete", 
                        progressPercentage: deployingTemplate ? 35 : statusCounts.deploying > 0 ? 50 : 100,
                        progressColor: "bg-gradient-to-r from-blue-500 to-cyan-500"
                      }
                    ]}
                  />

                  <EnhancedCard
                    title="Team Efficiency Trends"
                    description="7-day performance trend"
                    variant="deep"
                    visualElement={
                      <div className="h-[200px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart
                            data={[
                              { day: 'Mon', efficiency: 85, errors: 12 },
                              { day: 'Tue', efficiency: 88, errors: 10 },
                              { day: 'Wed', efficiency: 87, errors: 11 },
                              { day: 'Thu', efficiency: 90, errors: 8 },
                              { day: 'Fri', efficiency: 91, errors: 7 },
                              { day: 'Sat', efficiency: 92, errors: 6 },
                              { day: 'Sun', efficiency: 93, errors: 5 },
                            ]}
                            margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
                          >
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                            <XAxis dataKey="day" stroke="#666" />
                            <YAxis stroke="#666" />
                            <Tooltip
                              contentStyle={{
                                backgroundColor: 'rgba(0,0,0,0.8)',
                                border: '1px solid #444',
                                borderRadius: '4px'
                              }}
                            />
                            <Line type="monotone" dataKey="efficiency" stroke="#3b82f6" strokeWidth={2} />
                            <Line type="monotone" dataKey="errors" stroke="#ef4444" strokeWidth={2} />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    }
                    metrics={[
                      { 
                        label: "Weekly Improvement", 
                        value: "8.2%", 
                        change: { value: "3.1%", positive: true },
                        progressPercentage: 82,
                        progressColor: "bg-gradient-to-r from-green-500 to-green-700"
                      }
                    ]}
                  />
                </div>
              </div>
            ) : (
              <AIInsightCard
                title="Recommendations for Your First AI Team"
                insights={[
                  "AI teams can reduce operational costs by an average of 35%.",
                  "Customer support teams typically see 42% faster response times after AI implementation.",
                  "Companies with AI data analysis teams report 28% better decision-making accuracy.",
                  "Sales teams augmented with AI assistants see 23% higher conversion rates on average."
                ]}
                recommendations={[
                  { text: "Start with a customer service AI team to handle routine inquiries and support tickets", priority: "high" },
                  { text: "Consider a data processing team to automate repetitive data tasks and analysis", priority: "medium" },
                  { text: "Implement content generation AI to scale your marketing efforts efficiently", priority: "medium" },
                  { text: "Deploy integration APIs to connect your AI teams with existing systems", priority: "low" }
                ]}
                footerButton={{
                  text: "Create Your First Team",
                  onClick: () => setShowTemplateSelector(true),
                  variant: "default"
                }}
              />
            )}
          </TabsContent>
        </Tabs>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="p-6">
        {renderContent()}
      </div>
    </DashboardLayout>
  );
}

// List view component for teams
function TeamListItem({ team, index }: { team: Team, index: number }) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/company/teams/${team.id}`);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className="w-full"
    >
      <div className="bg-black/20 border border-neutral-800 rounded-lg p-4 hover:bg-black/30 transition-colors">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h3 className="font-medium text-white">{team.name}</h3>
              <Badge
                variant={
                  team.status === "active" 
                    ? "default" 
                    : team.status === "deploying" 
                    ? "secondary" 
                    : "destructive"
                }
                className={
                  team.status === "deploying" 
                    ? "bg-blue-600 text-white" 
                    : team.status === "active" 
                    ? "bg-green-600 text-white"
                    : "bg-yellow-600 text-white"
                }
              >
                {team.status === "deploying" ? (
                  <span className="flex items-center">
                    <Clock className="animate-spin h-3 w-3 mr-1" />
                    Deploying
                  </span>
                ) : (
                  team.status.charAt(0).toUpperCase() + team.status.slice(1)
                )}
              </Badge>
            </div>
            <p className="text-sm text-gray-400 mb-2">{team.description}</p>
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-gray-300">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-400 mr-1" />
                <span>{team.members} AI workers</span>
              </div>
              <div className="flex items-center">
                <BarChart className="h-4 w-4 text-gray-400 mr-1" />
                <span>{team.metrics.tasksCompleted} tasks</span>
              </div>
              <div className="flex items-center">
                <Activity className="h-4 w-4 text-gray-400 mr-1" />
                <span>Error rate: {team.metrics.errorRate}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center">
            <Button 
              variant="outline" 
              size="sm" 
              className="text-gray-400 hover:text-white"
              onClick={handleViewDetails}
            >
              View Details
            </Button>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
              <Settings className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  );
} 