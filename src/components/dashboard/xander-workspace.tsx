"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { 
  Brain, 
  MessageSquare, 
  Calendar, 
  CheckSquare, 
  Plus, 
  Send,
  Sparkles,
  Workflow,
  Users,
  Clock,
  Star,
  Lightbulb,
  Target,
  ArrowRight,
  Zap,
  Bot,
  Mic,
  MicOff,
  Image,
  Link,
  Trash2,
  Edit3,
  MoreVertical,
  Play,
  Pause,
  Save,
  Share2,
  PenTool,
  Layers,
  Network,
  Timer,
  ChevronDown,
  ChevronRight,
  Filter,
  Search,
  FileText,
  Settings2,
  ArrowLeft,
  ExternalLink,
  Minimize2,
  Maximize2,
  X,
  RefreshCw,
  Download,
  Upload,
  Copy,
  Bell,
  Eye,
  BarChart3
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

// Types for the workspace
interface BrainstormIdea {
  id: string;
  content: string;
  x: number;
  y: number;
  color: string;
  author: string;
  timestamp: Date;
  tags: string[];
  connections: string[];
  priority: 'low' | 'medium' | 'high';
  status: 'active' | 'archived' | 'in-progress';
}

interface TodoItem {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate?: Date;
  assignedTo: string;
  createdFrom?: string;
  estimatedHours?: number;
  progress: number;
}

interface ScheduleItem {
  id: string;
  title: string;
  date: Date;
  duration: number;
  type: 'meeting' | 'task' | 'brainstorm' | 'review';
  participants: string[];
  relatedFlow?: string;
  status: 'scheduled' | 'in-progress' | 'completed';
}

interface XanderMessage {
  id: string;
  content: string;
  type: 'user' | 'xander';
  timestamp: Date;
  attachments?: {
    type: 'flow' | 'todo' | 'schedule' | 'idea' | 'document';
    data: any;
  }[];
}

interface AIFlow {
  id: string;
  name: string;
  description: string;
  steps: FlowStep[];
  createdFrom: string[];
  status: 'draft' | 'active' | 'paused' | 'completed';
  metrics: {
    efficiency: number;
    success_rate: number;
    last_run: Date;
    total_runs: number;
  };
  category: 'automation' | 'analysis' | 'communication' | 'management';
}

interface FlowStep {
  id: string;
  title: string;
  type: 'human' | 'ai' | 'automation' | 'decision';
  description: string;
  estimatedTime: number;
  dependencies: string[];
  status: 'pending' | 'completed' | 'skipped';
}

const XanderWorkspace = () => {
  const router = useRouter();
  
  // Enhanced state management
  const [activeMode, setActiveMode] = useState<'brainstorm' | 'chat' | 'overview' | 'flows'>('overview');
  const [ideas, setIdeas] = useState<BrainstormIdea[]>([]);
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
  const [messages, setMessages] = useState<XanderMessage[]>([]);
  const [flows, setFlows] = useState<AIFlow[]>([]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [selectedIdeas, setSelectedIdeas] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [workspaceStats, setWorkspaceStats] = useState({
    totalIdeas: 0,
    activeFlows: 0,
    completedTasks: 0,
    teamProductivity: 87
  });
  
  // New states for enhanced functionality
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [workspaceSaved, setWorkspaceSaved] = useState(true);
  
  // Refs
  const brainstormCanvasRef = useRef<HTMLDivElement>(null);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Enhanced mock data initialization
  useEffect(() => {
    const mockIdeas = [
      {
        id: '1',
        content: 'AI-powered customer onboarding automation with personalized workflows',
        x: 320,
        y: 180,
        color: '#3B82F6',
        author: 'Sarah Chen',
        timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
        tags: ['automation', 'customer-experience', 'ai'],
        connections: ['2'],
        priority: 'high' as const,
        status: 'active' as const
      },
      {
        id: '2',
        content: 'Real-time sentiment analysis for support tickets using advanced NLP',
        x: 520,
        y: 140,
        color: '#10B981',
        author: 'Mike Johnson',
        timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000),
        tags: ['ai', 'support', 'analytics', 'nlp'],
        connections: ['1', '3'],
        priority: 'medium' as const,
        status: 'in-progress' as const
      },
      {
        id: '3',
        content: 'Predictive lead scoring system with machine learning models',
        x: 180,
        y: 320,
        color: '#8B5CF6',
        author: 'Emily Rodriguez',
        timestamp: new Date(Date.now() - 30 * 60 * 1000),
        tags: ['machine-learning', 'sales', 'analytics'],
        connections: ['2'],
        priority: 'high' as const,
        status: 'active' as const
      },
      {
        id: '4',
        content: 'Automated content generation for social media campaigns',
        x: 420,
        y: 280,
        color: '#F59E0B',
        author: 'David Park',
        timestamp: new Date(Date.now() - 45 * 60 * 1000),
        tags: ['content', 'social-media', 'automation'],
        connections: [],
        priority: 'medium' as const,
        status: 'active' as const
      }
    ];

    const mockTodos = [
      {
        id: '1',
        title: 'Design customer onboarding flow wireframes',
        description: 'Create comprehensive user journey maps for the AI-powered onboarding system',
        status: 'in-progress' as const,
        priority: 'high' as const,
        dueDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        assignedTo: 'Sarah Chen',
        createdFrom: '1',
        estimatedHours: 8,
        progress: 65
      },
      {
        id: '2',
        title: 'Set up sentiment analysis API integration',
        description: 'Configure ML models and API endpoints for real-time sentiment detection',
        status: 'pending' as const,
        priority: 'high' as const,
        dueDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
        assignedTo: 'Mike Johnson',
        createdFrom: '2',
        estimatedHours: 12,
        progress: 0
      },
      {
        id: '3',
        title: 'Implement lead scoring algorithm',
        description: 'Develop and test machine learning models for lead qualification',
        status: 'pending' as const,
        priority: 'medium' as const,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        assignedTo: 'Emily Rodriguez',
        createdFrom: '3',
        estimatedHours: 16,
        progress: 0
      },
      {
        id: '4',
        title: 'Content generation prototype testing',
        description: 'Test and validate automated content creation workflows',
        status: 'completed' as const,
        priority: 'low' as const,
        dueDate: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
        assignedTo: 'David Park',
        createdFrom: '4',
        estimatedHours: 6,
        progress: 100
      }
    ];

    const mockFlows = [
      {
        id: '1',
        name: 'Customer Onboarding Automation',
        description: 'End-to-end automated workflow for new customer acquisition and setup',
        steps: [],
        createdFrom: ['1'],
        status: 'active' as const,
        metrics: { 
          efficiency: 87, 
          success_rate: 94,
          last_run: new Date(Date.now() - 2 * 60 * 60 * 1000),
          total_runs: 156
        },
        category: 'automation' as const
      },
      {
        id: '2',
        name: 'Support Ticket Intelligence',
        description: 'Real-time analysis and routing of customer support requests',
        steps: [],
        createdFrom: ['2'],
        status: 'active' as const,
        metrics: { 
          efficiency: 92, 
          success_rate: 89,
          last_run: new Date(Date.now() - 15 * 60 * 1000),
          total_runs: 2847
        },
        category: 'analysis' as const
      }
    ];

    const mockSchedule = [
      {
        id: '1',
        title: 'Weekly AI Strategy Review',
        date: new Date(Date.now() + 24 * 60 * 60 * 1000),
        duration: 60,
        type: 'meeting' as const,
        participants: ['Sarah Chen', 'Mike Johnson', 'Emily Rodriguez'],
        status: 'scheduled' as const
      },
      {
        id: '2',
        title: 'Customer Onboarding Sprint Planning',
        date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
        duration: 90,
        type: 'brainstorm' as const,
        participants: ['Sarah Chen', 'David Park'],
        relatedFlow: '1',
        status: 'scheduled' as const
      }
    ];

    setIdeas(mockIdeas);
    setTodos(mockTodos);
    setFlows(mockFlows);
    setSchedule(mockSchedule);

    // Enhanced welcome message
    setMessages([
      {
        id: '1',
        content: 'Welcome to your Xander Workspace! 🚀 I\'m your AI workflow assistant, ready to help you transform ideas into actionable workflows. I can help you:\n\n• Convert brainstormed ideas into structured flows\n• Create and manage tasks with intelligent prioritization\n• Schedule team activities and optimize collaboration\n• Analyze workflow performance and suggest improvements\n\nWhat would you like to work on today?',
        type: 'xander',
        timestamp: new Date()
      }
    ]);

    // Update stats
    setWorkspaceStats({
      totalIdeas: mockIdeas.length,
      activeFlows: mockFlows.filter(f => f.status === 'active').length,
      completedTasks: mockTodos.filter(t => t.status === 'completed').length,
      teamProductivity: 87
    });
  }, []);

  // Live time update
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Enhanced message handler with more intelligent responses
  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    const userMessage: XanderMessage = {
      id: Date.now().toString(),
      content: currentMessage,
      type: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToProcess = currentMessage;
    setCurrentMessage('');
    setIsTyping(true);
    setWorkspaceSaved(false);

    // Enhanced typing simulation with more realistic delays
    setTimeout(() => {
      const xanderResponse: XanderMessage = {
        id: (Date.now() + 1).toString(),
        content: generateXanderResponse(messageToProcess),
        type: 'xander',
        timestamp: new Date(),
        attachments: generateAttachments(messageToProcess)
      };
      setMessages(prev => [...prev, xanderResponse]);
      setIsTyping(false);
    }, Math.random() * 1000 + 1500); // More realistic delay
  };

  const generateXanderResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('flow') || input.includes('workflow')) {
      return "Excellent! I can create a comprehensive workflow for you. Based on your brainstormed ideas, I suggest we start with an automated process that includes:\n\n• AI-powered initial analysis\n• Human review touchpoints\n• Automated task distribution\n• Performance monitoring\n\nWould you like me to create a detailed flow with specific steps, timelines, and team assignments?";
    }
    
    if (input.includes('todo') || input.includes('task')) {
      return "Perfect! I'll convert your ideas into actionable tasks with smart prioritization. I can:\n\n• Analyze complexity and effort required\n• Suggest appropriate team members\n• Set realistic timelines based on current workload\n• Create dependencies between related tasks\n\nWhich brainstormed idea would you like me to break down into specific todos?";
    }
    
    if (input.includes('schedule') || input.includes('meeting')) {
      return "I'll help optimize your team's schedule! Based on current workloads and availability patterns, I can:\n\n• Find optimal meeting times\n• Balance workload distribution\n• Schedule milestone reviews\n• Set up automated reminders\n\nWhat type of session would you like me to schedule?";
    }

    if (input.includes('analyze') || input.includes('performance')) {
      return "I'll provide detailed analytics on your workspace performance. Current insights:\n\n• Team productivity: 87% (above average)\n• Idea-to-completion rate: 73%\n• Average task completion time: 2.3 days\n• Most productive collaboration pattern: Morning brainstorms + afternoon implementation\n\nWould you like me to generate a detailed performance report?";
    }
    
    return "I understand what you're looking for! I can help you turn that concept into a structured approach. Let me suggest some options:\n\n• Create a step-by-step workflow\n• Break it into manageable tasks\n• Identify required team resources\n• Set up monitoring and feedback loops\n\nWhat aspect would you like to focus on first?";
  };

  const generateAttachments = (userInput: string) => {
    const input = userInput.toLowerCase();
    
    if (input.includes('flow') || input.includes('workflow')) {
      return [{
        type: 'flow' as const,
        data: {
          name: 'AI-Powered Customer Onboarding Flow',
          steps: 7,
          estimated_time: '3-4 hours',
          ai_agents: 3,
          human_touchpoints: 4,
          efficiency_rating: '92%',
          categories: ['automation', 'customer-experience']
        }
      }];
    }
    
    if (input.includes('analyze') || input.includes('performance')) {
      return [{
        type: 'document' as const,
        data: {
          name: 'Workspace Performance Analytics',
          type: 'Performance Report',
          pages: 12,
          insights: 8,
          recommendations: 5
        }
      }];
    }
    
    return undefined;
  };

  // Enhanced navigation functions
  const handleBackToDashboard = () => {
    if (!workspaceSaved) {
      if (confirm('You have unsaved changes. Are you sure you want to leave?')) {
        router.push('/platform/dashboard');
      }
    } else {
      router.push('/platform/dashboard');
    }
  };

  const saveWorkspace = () => {
    // Simulate save operation
    setWorkspaceSaved(true);
    // Could integrate with actual backend here
  };

  const addIdea = (x: number, y: number) => {
    const colors = ['#3B82F6', '#10B981', '#8B5CF6', '#F59E0B', '#EF4444', '#06B6D4'];
    const newIdea: BrainstormIdea = {
      id: Date.now().toString(),
      content: 'New idea...',
      x: x - 120,
      y: y - 50,
      color: colors[Math.floor(Math.random() * colors.length)],
      author: 'You',
      timestamp: new Date(),
      tags: [],
      connections: [],
      priority: 'medium',
      status: 'active'
    };
    setIdeas(prev => [...prev, newIdea]);
    setWorkspaceSaved(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeMode === 'brainstorm') {
      const rect = brainstormCanvasRef.current?.getBoundingClientRect();
      if (rect) {
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        addIdea(x, y);
      }
    }
  };

  const updateIdeaContent = (id: string, newContent: string) => {
    setIdeas(prev => prev.map(idea => 
      idea.id === id ? { ...idea, content: newContent } : idea
    ));
    setWorkspaceSaved(false);
  };

  const deleteIdea = (id: string) => {
    setIdeas(prev => prev.filter(idea => idea.id !== id));
    setWorkspaceSaved(false);
  };

  const toggleIdeaSelection = (id: string) => {
    setSelectedIdeas(prev => 
      prev.includes(id) 
        ? prev.filter(ideaId => ideaId !== id)
        : [...prev, id]
    );
  };

  // Auto-scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Enhanced workspace header with navigation
  const WorkspaceHeader = () => (
    <motion.div 
      className="border-b border-neutral-800/50 bg-black/30 backdrop-blur-md"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Back Navigation */}
            <div className="flex items-center gap-3">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleBackToDashboard}
                    className="h-9 px-3 border-neutral-700/50 hover:bg-neutral-800/50 text-neutral-300 hover:text-white"
                  >
                    <ArrowLeft size={16} className="mr-2" />
                    Back to Dashboard
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Return to main dashboard</TooltipContent>
              </Tooltip>
              
              <div className="w-px h-6 bg-neutral-700/50" />
            </div>
            
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Sparkles size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-semibold bg-gradient-to-r from-white to-neutral-300 bg-clip-text text-transparent">
                  Xander Workspace
                </h1>
                <div className="flex items-center gap-3 mt-1">
                  <p className="text-sm text-neutral-400">Brainstorm, plan, and create intelligent workflows</p>
                  <Badge 
                    variant="outline" 
                    className={`text-xs ${workspaceSaved ? 'border-green-500/30 text-green-400' : 'border-yellow-500/30 text-yellow-400'}`}
                  >
                    {workspaceSaved ? 'Saved' : 'Unsaved changes'}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            {/* Mode Selector */}
            <div className="flex items-center bg-black/30 rounded-lg border border-neutral-800/50 p-1">
              {[
                { mode: 'overview' as const, icon: Target, label: 'Overview' },
                { mode: 'brainstorm' as const, icon: Lightbulb, label: 'Brainstorm' },
                { mode: 'flows' as const, icon: Workflow, label: 'Flows' },
                { mode: 'chat' as const, icon: Bot, label: 'Chat' }
              ].map(({ mode, icon: Icon, label }) => (
                <Button
                  key={mode}
                  variant={activeMode === mode ? 'default' : 'ghost'}
                  onClick={() => setActiveMode(mode)}
                  size="sm"
                  className={`px-4 py-2 transition-all duration-200 ${
                    activeMode === mode 
                      ? 'bg-blue-600 text-white shadow-lg' 
                      : 'text-neutral-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <Icon size={16} className="mr-2" />
                  {label}
                </Button>
              ))}
            </div>
            
            {/* Workspace Actions */}
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 w-9 p-0"
                    onClick={saveWorkspace}
                    disabled={workspaceSaved}
                  >
                    <Save size={16} className={workspaceSaved ? 'text-green-400' : 'text-neutral-400'} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Save workspace</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <Share2 size={16} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Share workspace</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="h-9 w-9 p-0"
                    onClick={() => setIsFullscreen(!isFullscreen)}
                  >
                    {isFullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>{isFullscreen ? 'Exit fullscreen' : 'Enter fullscreen'}</TooltipContent>
              </Tooltip>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-9 w-9 p-0">
                    <MoreVertical size={16} />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-black/90 backdrop-blur-md border-neutral-700">
                  <DropdownMenuItem>
                    <Download size={14} className="mr-2" />
                    Export workspace
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Upload size={14} className="mr-2" />
                    Import data
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings2 size={14} className="mr-2" />
                    Workspace settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );

  return (
    <TooltipProvider>
      <div className={`${isFullscreen ? 'fixed inset-0 z-50' : 'h-screen'} bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-800 text-white overflow-hidden`}>
        <WorkspaceHeader />

        <div className="flex h-[calc(100vh-96px)]">
          {/* Main Content Area */}
          <div className="flex-1 flex flex-col relative">
            {/* Enhanced Overview Mode */}
            {activeMode === 'overview' && (
              <motion.div 
                className="p-8 space-y-8 overflow-y-auto max-w-7xl mx-auto"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Welcome Banner */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  <Card className="bg-gradient-to-r from-purple-900/30 via-blue-900/30 to-purple-900/30 border-purple-500/30">
                    <CardContent className="p-8">
                      <div className="flex items-center justify-between">
                        <div className="space-y-3">
                          <h2 className="text-2xl font-semibold text-white">Welcome back to your Workspace!</h2>
                          <p className="text-neutral-300 text-sm max-w-2xl">
                            You have {ideas.filter(i => i.status === 'active').length} active ideas, {flows.filter(f => f.status === 'active').length} running flows, and {todos.filter(t => t.status === 'pending').length} pending tasks.
                          </p>
                          <div className="flex items-center gap-3 pt-2">
                            <Badge className="bg-green-500/20 text-green-300 border-green-500/30 px-3 py-1">
                              Productivity: {workspaceStats.teamProductivity}%
                            </Badge>
                            <Badge variant="outline" className="border-blue-500/30 text-blue-400 px-3 py-1">
                              {currentTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right space-y-3">
                          <Button 
                            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-6 py-3"
                            onClick={() => setActiveMode('chat')}
                          >
                            <MessageSquare size={18} className="mr-2" />
                            Start with Xander
                          </Button>
                          <p className="text-xs text-neutral-400">AI-powered workflow creation</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>

                {/* Enhanced Stats Grid */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    { 
                      label: 'Active Ideas', 
                      value: ideas.filter(i => i.status === 'active').length, 
                      icon: Lightbulb, 
                      color: 'yellow', 
                      trend: '+12%',
                      description: 'Ideas ready for development'
                    },
                    { 
                      label: 'Active Tasks', 
                      value: todos.filter(t => t.status !== 'completed').length, 
                      icon: CheckSquare, 
                      color: 'blue', 
                      trend: '-5%',
                      description: 'Tasks in progress'
                    },
                    { 
                      label: 'Running Flows', 
                      value: flows.filter(f => f.status === 'active').length, 
                      icon: Workflow, 
                      color: 'purple', 
                      trend: '+8%',
                      description: 'Active AI workflows'
                    },
                    { 
                      label: 'Team Members', 
                      value: 4, 
                      icon: Users, 
                      color: 'green', 
                      trend: '+1',
                      description: 'Online now'
                    }
                  ].map((stat, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="bg-black/30 border-neutral-800/50 hover:bg-black/40 transition-all duration-200 group cursor-pointer">
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="space-y-3">
                              <p className="text-neutral-400 text-sm font-medium">{stat.label}</p>
                              <div className="flex items-center gap-3">
                                <p className="text-3xl font-bold text-white">{stat.value}</p>
                                <Badge 
                                  variant="outline" 
                                  className={`text-xs ${
                                    stat.trend.startsWith('+') ? 'text-green-400 border-green-500/30' : 'text-red-400 border-red-500/30'
                                  }`}
                                >
                                  {stat.trend}
                                </Badge>
                              </div>
                              <p className="text-xs text-neutral-500">{stat.description}</p>
                            </div>
                            <div className={`p-4 rounded-xl bg-${stat.color}-500/10 border border-${stat.color}-500/20 group-hover:bg-${stat.color}-500/20 transition-colors`}>
                              <stat.icon className={`text-${stat.color}-400`} size={26} />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Enhanced Activity Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Recent Ideas */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                  >
                    <Card className="bg-black/30 border-neutral-800/50 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl flex items-center gap-3">
                            <Lightbulb size={22} className="text-yellow-400" />
                            Recent Ideas
                          </CardTitle>
                          <Badge variant="outline" className="text-xs border-yellow-500/30 text-yellow-400 px-2 py-1">
                            {ideas.filter(i => i.status === 'active').length} active
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 px-6 pb-6">
                        {ideas.slice(0, 3).map((idea) => (
                          <motion.div 
                            key={idea.id} 
                            className="flex items-start gap-4 p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActiveMode('brainstorm')}
                          >
                            <div 
                              className="w-4 h-4 rounded-full shadow-sm mt-1 flex-shrink-0" 
                              style={{ backgroundColor: idea.color }} 
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-300 transition-colors leading-relaxed">
                                {idea.content}
                              </p>
                              <div className="flex items-center gap-2 mt-3">
                                <p className="text-xs text-neutral-400">{idea.author}</p>
                                <div className="w-1 h-1 bg-neutral-600 rounded-full" />
                                <p className="text-xs text-neutral-500">
                                  {Math.floor((Date.now() - idea.timestamp.getTime()) / (1000 * 60))}m ago
                                </p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 py-2"
                          onClick={() => setActiveMode('brainstorm')}
                        >
                          <Plus size={16} className="mr-2" />
                          Brainstorm New Ideas
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Active Tasks */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <Card className="bg-black/30 border-neutral-800/50 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl flex items-center gap-3">
                            <CheckSquare size={22} className="text-blue-400" />
                            Active Tasks
                          </CardTitle>
                          <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400 px-2 py-1">
                            {todos.filter(t => t.status !== 'completed').length} pending
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 px-6 pb-6">
                        {todos.filter(t => t.status !== 'completed').slice(0, 3).map((todo) => (
                          <motion.div 
                            key={todo.id} 
                            className="p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                          >
                            <div className="flex items-start gap-4">
                              <div className={`w-4 h-4 rounded-full mt-1 flex-shrink-0 ${
                                todo.priority === 'high' ? 'bg-red-500' :
                                todo.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white line-clamp-2 group-hover:text-blue-300 transition-colors leading-relaxed">
                                  {todo.title}
                                </p>
                                <div className="flex items-center gap-2 mt-3">
                                  <p className="text-xs text-neutral-400">{todo.assignedTo}</p>
                                  {todo.progress > 0 && (
                                    <>
                                      <div className="w-1 h-1 bg-neutral-600 rounded-full" />
                                      <div className="flex items-center gap-2">
                                        <div className="w-16 h-2 bg-neutral-700 rounded-full overflow-hidden">
                                          <div 
                                            className="h-full bg-blue-500 rounded-full transition-all duration-300"
                                            style={{ width: `${todo.progress}%` }}
                                          />
                                        </div>
                                        <span className="text-xs text-neutral-500">{todo.progress}%</span>
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 py-2"
                          onClick={() => setActiveMode('chat')}
                        >
                          <MessageSquare size={16} className="mr-2" />
                          Create with Xander
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>

                  {/* Active Flows */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <Card className="bg-black/30 border-neutral-800/50 h-full">
                      <CardHeader className="pb-4">
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl flex items-center gap-3">
                            <Workflow size={22} className="text-purple-400" />
                            AI Flows
                          </CardTitle>
                          <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400 px-2 py-1">
                            {flows.filter(f => f.status === 'active').length} running
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4 px-6 pb-6">
                        {flows.filter(f => f.status === 'active').map((flow) => (
                          <motion.div 
                            key={flow.id} 
                            className="p-4 rounded-lg bg-black/20 hover:bg-black/30 transition-all duration-200 cursor-pointer group"
                            whileHover={{ scale: 1.02 }}
                            onClick={() => setActiveMode('flows')}
                          >
                            <div className="space-y-3">
                              <p className="text-sm font-medium text-white group-hover:text-purple-300 transition-colors leading-relaxed">
                                {flow.name}
                              </p>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-4 text-xs">
                                  <div className="flex items-center gap-1">
                                    <span className="text-neutral-400">Efficiency:</span>
                                    <span className="text-green-400 font-medium">{flow.metrics.efficiency}%</span>
                                  </div>
                                  <div className="flex items-center gap-1">
                                    <span className="text-neutral-400">Success:</span>
                                    <span className="text-blue-400 font-medium">{flow.metrics.success_rate}%</span>
                                  </div>
                                </div>
                                <Badge 
                                  className={`text-xs px-2 py-1 ${
                                    flow.category === 'automation' ? 'bg-blue-500/20 text-blue-300 border-blue-500/30' :
                                    flow.category === 'analysis' ? 'bg-purple-500/20 text-purple-300 border-purple-500/30' :
                                    'bg-green-500/20 text-green-300 border-green-500/30'
                                  }`}
                                >
                                  {flow.category}
                                </Badge>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="w-full mt-4 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10 py-2"
                          onClick={() => setActiveMode('flows')}
                        >
                          <Workflow size={16} className="mr-2" />
                          Manage Flows
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </div>

                {/* Enhanced Xander Suggestions */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <Card className="bg-gradient-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 border-purple-500/30">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-2xl flex items-center gap-4">
                        <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 border border-purple-500/30">
                          <Sparkles size={24} className="text-purple-400" />
                        </div>
                        Xander's Smart Suggestions
                        <Badge className="bg-purple-500/20 text-purple-300 border-purple-500/30 px-3 py-1">AI Powered</Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6 px-8 pb-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <motion.div 
                          className="p-6 rounded-xl bg-gradient-to-br from-purple-500/10 to-blue-500/10 border border-purple-500/30 hover:border-purple-500/50 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-white text-lg">Automate Customer Onboarding</h4>
                              <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs px-2 py-1">Ready</Badge>
                            </div>
                            <p className="text-sm text-neutral-300 leading-relaxed">
                              Create a 7-step AI workflow based on your "customer onboarding" idea with automated touchpoints.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400 px-2 py-1">3-4 hours</Badge>
                              <Badge variant="outline" className="text-xs border-green-500/30 text-green-400 px-2 py-1">High Impact</Badge>
                              <Badge variant="outline" className="text-xs border-purple-500/30 text-purple-400 px-2 py-1">3 AI Agents</Badge>
                            </div>
                            <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white shadow-lg py-2">
                              <Play size={16} className="mr-2" />
                              Create Flow
                            </Button>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="p-6 rounded-xl bg-gradient-to-br from-blue-500/10 to-green-500/10 border border-blue-500/30 hover:border-blue-500/50 transition-all duration-200"
                          whileHover={{ scale: 1.02 }}
                        >
                          <div className="space-y-4">
                            <div className="flex items-center gap-3">
                              <h4 className="font-semibold text-white text-lg">Optimize Task Distribution</h4>
                              <Badge className="bg-yellow-500/20 text-yellow-300 border-yellow-500/30 text-xs px-2 py-1">Suggested</Badge>
                            </div>
                            <p className="text-sm text-neutral-300 leading-relaxed">
                              I noticed task clustering in your team. Let me suggest better workload distribution.
                            </p>
                            <div className="flex flex-wrap gap-2">
                              <Badge variant="outline" className="text-xs border-green-500/30 text-green-400 px-2 py-1">+15% Efficiency</Badge>
                              <Badge variant="outline" className="text-xs border-blue-500/30 text-blue-400 px-2 py-1">Team Balance</Badge>
                            </div>
                            <Button 
                              variant="outline" 
                              className="w-full border-blue-500/30 text-blue-400 hover:bg-blue-500/10 py-2"
                              onClick={() => setActiveMode('chat')}
                            >
                              <BarChart3 size={16} className="mr-2" />
                              Analyze & Optimize
                            </Button>
                          </div>
                        </motion.div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            )}

            {/* Enhanced Brainstorming Mode */}
            {activeMode === 'brainstorm' && (
              <motion.div 
                className="flex-1 relative"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                {/* Canvas Controls */}
                <div className="absolute top-4 left-4 z-20 space-y-3">
                  <Card className="bg-black/50 backdrop-blur-md border-neutral-800/50">
                    <CardContent className="p-4">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2">
                          <PenTool size={16} className="text-blue-400" />
                          <span className="text-sm font-medium text-white">Brainstorming Canvas</span>
                        </div>
                        <p className="text-xs text-neutral-400">Click anywhere to add ideas • Select multiple ideas to connect</p>
                        <div className="flex items-center gap-2 pt-2">
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Filter size={12} className="mr-1" />
                            Filter
                          </Button>
                          <Button variant="outline" size="sm" className="h-7 text-xs">
                            <Layers size={12} className="mr-1" />
                            Layers
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  {selectedIdeas.length > 0 && (
                    <Card className="bg-blue-950/50 backdrop-blur-md border-blue-500/30">
                      <CardContent className="p-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Network size={14} className="text-blue-400" />
                            <span className="text-xs font-medium text-white">{selectedIdeas.length} Ideas Selected</span>
                          </div>
                          <Button size="sm" className="w-full h-7 bg-blue-600 hover:bg-blue-700">
                            <ArrowRight size={12} className="mr-1" />
                            Create Flow
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
                
                {/* Enhanced Canvas */}
                <div 
                  ref={brainstormCanvasRef}
                  onClick={handleCanvasClick}
                  className="w-full h-full bg-gradient-to-br from-neutral-900/30 to-neutral-800/30 relative cursor-crosshair overflow-hidden"
                  style={{
                    backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                    backgroundSize: '30px 30px'
                  }}
                >
                  {/* Connection Lines */}
                  <svg className="absolute inset-0 w-full h-full pointer-events-none">
                    {ideas.map((idea) => 
                      idea.connections.map((connectionId) => {
                        const connectedIdea = ideas.find(i => i.id === connectionId);
                        if (!connectedIdea) return null;
                        
                        return (
                          <motion.line
                            key={`${idea.id}-${connectionId}`}
                            x1={idea.x + 100}
                            y1={idea.y + 50}
                            x2={connectedIdea.x + 100}
                            y2={connectedIdea.y + 50}
                            stroke="rgba(59, 130, 246, 0.3)"
                            strokeWidth="2"
                            strokeDasharray="5,5"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 1 }}
                          />
                        );
                      })
                    )}
                  </svg>

                  {/* Enhanced Idea Cards */}
                  <AnimatePresence>
                    {ideas.map((idea) => (
                      <motion.div
                        key={idea.id}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        className={`absolute cursor-pointer group ${selectedIdeas.includes(idea.id) ? 'z-10' : ''}`}
                        style={{ left: idea.x, top: idea.y }}
                        whileHover={{ scale: 1.05, zIndex: 20 }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleIdeaSelection(idea.id);
                        }}
                      >
                        <div 
                          className={`relative p-4 rounded-xl shadow-xl max-w-xs border-2 transition-all duration-200 ${
                            selectedIdeas.includes(idea.id) 
                              ? 'border-blue-500 shadow-blue-500/25' 
                              : 'border-transparent'
                          }`}
                          style={{ 
                            backgroundColor: idea.color + '15',
                            borderColor: selectedIdeas.includes(idea.id) ? '#3B82F6' : idea.color + '40'
                          }}
                        >
                          {/* Priority Indicator */}
                          <div className={`absolute -top-1 -left-1 w-3 h-3 rounded-full ${
                            idea.priority === 'high' ? 'bg-red-500' :
                            idea.priority === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                          }`} />
                          
                          {/* Actions Menu */}
                          <div className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 w-7 p-0 bg-black/50 backdrop-blur-sm">
                                  <MoreVertical size={12} />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-black/90 backdrop-blur-md border-neutral-700">
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                                  <Edit3 size={12} className="mr-2" />
                                  Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={(e) => { e.stopPropagation(); }}>
                                  <ArrowRight size={12} className="mr-2" />
                                  Create Todo
                                </DropdownMenuItem>
                                <DropdownMenuItem 
                                  className="text-red-400"
                                  onClick={(e) => { e.stopPropagation(); deleteIdea(idea.id); }}
                                >
                                  <Trash2 size={12} className="mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                          
                          <div className="space-y-3">
                            <p className="text-sm font-medium text-white leading-snug">{idea.content}</p>
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-neutral-300">{idea.author}</span>
                              <div className="flex gap-1">
                                {idea.tags.slice(0, 2).map((tag) => (
                                  <Badge key={tag} variant="outline" className="text-xs h-5 px-1.5">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}

            {/* Enhanced Chat Mode */}
            {activeMode === 'chat' && (
              <motion.div 
                className="flex-1 flex flex-col"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                {/* Chat Header */}
                <div className="border-b border-neutral-800/50 bg-black/20 p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                      <Bot size={20} className="text-white" />
                    </div>
                    <div>
                      <h3 className="font-medium text-white">Xander AI Assistant</h3>
                      <p className="text-xs text-neutral-400">
                        {isTyping ? 'Typing...' : 'Online • Ready to help with workflows'}
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Enhanced Chat Messages */}
                <div className="flex-1 p-6 overflow-y-auto">
                  <div className="space-y-6 max-w-4xl mx-auto">
                    <AnimatePresence>
                      {messages.map((message, index) => (
                        <motion.div 
                          key={message.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                          className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div className={`max-w-md p-4 rounded-2xl shadow-lg ${
                            message.type === 'user' 
                              ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white' 
                              : 'bg-black/40 border border-neutral-800/50 text-white backdrop-blur-sm'
                          }`}>
                            {message.type === 'xander' && (
                              <div className="flex items-center gap-2 mb-3">
                                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                                  <Bot size={12} className="text-white" />
                                </div>
                                <span className="text-sm font-medium text-blue-300">Xander AI</span>
                                <Badge className="text-xs bg-green-500/20 text-green-300 border-green-500/30">Online</Badge>
                              </div>
                            )}
                            <p className="text-sm leading-relaxed">{message.content}</p>
                            
                            {message.attachments && (
                              <div className="mt-4 space-y-3">
                                {message.attachments.map((attachment, index) => (
                                  <motion.div 
                                    key={index} 
                                    className="p-4 rounded-lg bg-black/30 border border-neutral-700/50"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ duration: 0.3, delay: 0.2 }}
                                  >
                                    <div className="flex items-center gap-3 mb-3">
                                      <div className="p-2 rounded-lg bg-purple-500/20 border border-purple-500/30">
                                        <Workflow size={16} className="text-purple-400" />
                                      </div>
                                      <div className="flex-1">
                                        <span className="text-sm font-medium text-white">{attachment.data.name}</span>
                                        <div className="flex gap-3 text-xs text-neutral-400 mt-1">
                                          <span>{attachment.data.steps} steps</span>
                                          <span>{attachment.data.estimated_time}</span>
                                          {attachment.data.ai_agents && <span>{attachment.data.ai_agents} AI agents</span>}
                                        </div>
                                      </div>
                                    </div>
                                    <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                                      <Plus size={12} className="mr-2" />
                                      Create Flow
                                    </Button>
                                  </motion.div>
                                ))}
                              </div>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                    
                    {isTyping && (
                      <motion.div 
                        className="flex justify-start"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        <div className="bg-black/40 border border-neutral-800/50 backdrop-blur-sm p-4 rounded-2xl">
                          <div className="flex items-center gap-2">
                            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                              <Bot size={12} className="text-white" />
                            </div>
                            <div className="flex space-x-1">
                              {[0, 1, 2].map((i) => (
                                <motion.div
                                  key={i}
                                  className="w-2 h-2 bg-blue-400 rounded-full"
                                  animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.5, 1, 0.5]
                                  }}
                                  transition={{
                                    duration: 1,
                                    repeat: Infinity,
                                    delay: i * 0.2
                                  }}
                                />
                              ))}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={chatEndRef} />
                  </div>
                </div>
                
                {/* Enhanced Chat Input */}
                <div className="border-t border-neutral-800/50 bg-black/20 p-4">
                  <div className="max-w-4xl mx-auto space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 relative">
                        <Input
                          value={currentMessage}
                          onChange={(e) => setCurrentMessage(e.target.value)}
                          onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                          placeholder="Ask Xander to create flows, convert ideas to todos, schedule meetings..."
                          className="pr-12 bg-black/30 border-neutral-700/50 focus:border-blue-500/50 text-white placeholder:text-neutral-500"
                          disabled={isTyping}
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 h-7 w-7 p-0"
                          onClick={() => setIsVoiceActive(!isVoiceActive)}
                        >
                          {isVoiceActive ? 
                            <MicOff size={14} className="text-red-400" /> : 
                            <Mic size={14} className="text-neutral-400" />
                          }
                        </Button>
                      </div>
                      <Button 
                        onClick={handleSendMessage} 
                        disabled={!currentMessage.trim() || isTyping}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        <Send size={16} />
                      </Button>
                    </div>
                    
                    {/* Enhanced Quick Actions */}
                    <div className="flex flex-wrap gap-2">
                      {[
                        { text: "Create a flow from my brainstormed ideas", icon: Workflow, color: "purple" },
                        { text: "Convert my ideas into actionable todos", icon: CheckSquare, color: "blue" },
                        { text: "Schedule a brainstorming session with my team", icon: Calendar, color: "green" }
                      ].map((action, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm" 
                          className={`border-${action.color}-500/30 text-${action.color}-400 hover:bg-${action.color}-500/10 h-8`}
                          onClick={() => setCurrentMessage(action.text)}
                        >
                          <action.icon size={12} className="mr-2" />
                          {action.text.split(' ').slice(0, 3).join(' ')}...
                        </Button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Flows Mode - New Enhanced Section */}
            {activeMode === 'flows' && (
              <motion.div 
                className="p-6 space-y-6 overflow-y-auto"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-white">AI Workflows</h2>
                    <p className="text-sm text-neutral-400 mt-1">Manage and monitor your intelligent workflows</p>
                  </div>
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    <Plus size={16} className="mr-2" />
                    Create New Flow
                  </Button>
                </div>
                
                <div className="grid gap-4">
                  {flows.map((flow) => (
                    <Card key={flow.id} className="bg-black/30 border-neutral-800/50 hover:bg-black/40 transition-all duration-200">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between">
                          <div className="space-y-3">
                            <div className="flex items-center gap-3">
                              <h3 className="font-semibold text-white">{flow.name}</h3>
                              <Badge className={`${
                                flow.status === 'active' ? 'bg-green-500/20 text-green-300 border-green-500/30' :
                                flow.status === 'draft' ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30' :
                                'bg-gray-500/20 text-gray-300 border-gray-500/30'
                              }`}>
                                {flow.status}
                              </Badge>
                            </div>
                            <p className="text-sm text-neutral-400">{flow.description}</p>
                            <div className="flex gap-4 text-sm">
                              <div className="flex items-center gap-1">
                                <span className="text-neutral-400">Efficiency:</span>
                                <span className="text-green-400 font-medium">{flow.metrics.efficiency}%</span>
                              </div>
                              <div className="flex items-center gap-1">
                                <span className="text-neutral-400">Success:</span>
                                <span className="text-blue-400 font-medium">{flow.metrics.success_rate}%</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm">
                              <Settings2 size={14} className="mr-2" />
                              Configure
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Play size={14} className="mr-2" />
                              Run
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Enhanced Right Sidebar */}
          <AnimatePresence>
            {!sidebarCollapsed && (
              <motion.div 
                className="w-80 border-l border-neutral-800/50 bg-black/20 backdrop-blur-sm"
                initial={{ x: 320, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: 320, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="p-4 space-y-6">
                  {/* Quick Actions */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <Zap size={16} className="text-yellow-400" />
                      Quick Actions
                    </h3>
                    <div className="space-y-2">
                      {[
                        { icon: Plus, label: "New Brainstorm Session", action: () => setActiveMode('brainstorm') },
                        { icon: Save, label: "Save Current State" },
                        { icon: Share2, label: "Share Workspace" }
                      ].map((action, index) => (
                        <Button 
                          key={index}
                          variant="outline" 
                          size="sm" 
                          className="w-full justify-start text-neutral-300 border-neutral-700/50 hover:bg-neutral-800/50"
                          onClick={action.action}
                        >
                          <action.icon size={14} className="mr-2" />
                          {action.label}
                        </Button>
                      ))}
                    </div>
                  </div>

                  {/* Team Members */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <Users size={16} className="text-green-400" />
                      Team Online
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30 text-xs">3</Badge>
                    </h3>
                    <div className="space-y-2">
                      {['Sarah Chen', 'Mike Johnson', 'Emily Rodriguez'].map((member, index) => (
                        <motion.div 
                          key={member}
                          className="flex items-center gap-3 p-2 rounded-lg bg-black/30 hover:bg-black/40 transition-colors"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-medium">
                            {member.split(' ').map(n => n[0]).join('')}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-white">{member}</p>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 rounded-full bg-green-500" />
                              <span className="text-xs text-neutral-400">Active now</span>
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div className="space-y-3">
                    <h3 className="font-medium text-white flex items-center gap-2">
                      <Clock size={16} className="text-blue-400" />
                      Recent Activity
                    </h3>
                    <div className="space-y-2">
                      {[
                        { action: "Created new idea", user: "Sarah", time: "2m ago", color: "yellow" },
                        { action: "Started flow", user: "Mike", time: "5m ago", color: "purple" },
                        { action: "Completed task", user: "Emily", time: "10m ago", color: "green" }
                      ].map((activity, index) => (
                        <div key={index} className="flex items-start gap-2 p-2 rounded-lg bg-black/20">
                          <div className={`w-2 h-2 rounded-full bg-${activity.color}-500 mt-2`} />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs text-white">{activity.action}</p>
                            <p className="text-xs text-neutral-400">{activity.user} • {activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Sidebar Toggle */}
          <Button
            variant="ghost"
            size="sm"
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-30 h-8 w-8 p-0 bg-black/50 backdrop-blur-sm border border-neutral-700/50"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            <ChevronRight size={14} className={`transform transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default XanderWorkspace; 