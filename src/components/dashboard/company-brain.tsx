"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Brain, 
  Users, 
  Target, 
  Zap, 
  Database, 
  TrendingUp, 
  Bot,
  Building2,
  GitBranch,
  Search,
  Maximize2,
  Minimize2,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff
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

// Node types for the company brain
type NodeType = 
  | 'department' 
  | 'team' 
  | 'ai_agent' 
  | 'project' 
  | 'skill' 
  | 'data_source' 
  | 'metric' 
  | 'workflow' 
  | 'client'
  | 'insight';

interface BrainNode {
  id: string;
  label: string;
  type: NodeType;
  x: number;
  y: number;
  size: number;
  performance: number; // 0-100
  connections: string[];
  metadata: {
    status: 'active' | 'inactive' | 'pending' | 'critical';
    lastActivity: string;
    impact: 'high' | 'medium' | 'low';
    confidence: number;
    description: string;
    metrics?: {
      efficiency?: number;
      quality?: number;
      utilization?: number;
      cost?: number;
    };
  };
}

interface BrainConnection {
  id: string;
  source: string;
  target: string;
  type: 'reports_to' | 'collaborates' | 'depends_on' | 'influences' | 'generates' | 'utilizes';
  strength: number; // 0-1
  bidirectional: boolean;
}

// Mock data representing enterprise intelligence
const generateCompanyBrainData = (): { nodes: BrainNode[], connections: BrainConnection[] } => {
  const nodes: BrainNode[] = [
    // Departments
    {
      id: 'dept-sales',
      label: 'Sales',
      type: 'department',
      x: 300,
      y: 200,
      size: 60,
      performance: 87,
      connections: ['team-sales-1', 'team-sales-2', 'ai-sales-assistant'],
      metadata: {
        status: 'active',
        lastActivity: '2 minutes ago',
        impact: 'high',
        confidence: 92,
        description: 'Primary revenue generation department',
        metrics: { efficiency: 87, quality: 94, utilization: 78 }
      }
    },
    {
      id: 'dept-marketing',
      label: 'Marketing',
      type: 'department',
      x: 150,
      y: 300,
      size: 55,
      performance: 78,
      connections: ['team-content', 'team-digital', 'ai-content-creator'],
      metadata: {
        status: 'active',
        lastActivity: '5 minutes ago',
        impact: 'high',
        confidence: 85,
        description: 'Brand awareness and lead generation',
        metrics: { efficiency: 78, quality: 82, utilization: 85 }
      }
    },
    {
      id: 'dept-operations',
      label: 'Operations',
      type: 'department',
      x: 450,
      y: 150,
      size: 50,
      performance: 92,
      connections: ['team-ops-1', 'ai-process-optimizer'],
      metadata: {
        status: 'active',
        lastActivity: '1 minute ago',
        impact: 'high',
        confidence: 96,
        description: 'Operational efficiency and automation',
        metrics: { efficiency: 92, quality: 89, utilization: 94 }
      }
    },
    
    // Teams
    {
      id: 'team-sales-1',
      label: 'Enterprise Sales',
      type: 'team',
      x: 380,
      y: 120,
      size: 35,
      performance: 89,
      connections: ['ai-sales-assistant', 'project-q4-targets'],
      metadata: {
        status: 'active',
        lastActivity: '30 seconds ago',
        impact: 'high',
        confidence: 91,
        description: 'Large enterprise client acquisition',
        metrics: { efficiency: 89, quality: 95, utilization: 82 }
      }
    },
    {
      id: 'team-content',
      label: 'Content Team',
      type: 'team',
      x: 80,
      y: 250,
      size: 32,
      performance: 75,
      connections: ['ai-content-creator', 'skill-copywriting'],
      metadata: {
        status: 'active',
        lastActivity: '3 minutes ago',
        impact: 'medium',
        confidence: 78,
        description: 'Content creation and strategy',
        metrics: { efficiency: 75, quality: 88, utilization: 70 }
      }
    },
    
    // AI Agents
    {
      id: 'ai-sales-assistant',
      label: 'AI Sales Assistant',
      type: 'ai_agent',
      x: 320,
      y: 80,
      size: 28,
      performance: 94,
      connections: ['data-crm', 'skill-lead-qualification'],
      metadata: {
        status: 'active',
        lastActivity: 'Live',
        impact: 'high',
        confidence: 97,
        description: 'Automated lead qualification and follow-up',
        metrics: { efficiency: 94, quality: 96, utilization: 98, cost: 15 }
      }
    },
    {
      id: 'ai-content-creator',
      label: 'AI Content Generator',
      type: 'ai_agent',
      x: 120,
      y: 180,
      size: 26,
      performance: 88,
      connections: ['skill-copywriting', 'data-analytics'],
      metadata: {
        status: 'active',
        lastActivity: 'Live',
        impact: 'medium',
        confidence: 89,
        description: 'Automated content creation and optimization',
        metrics: { efficiency: 88, quality: 85, utilization: 92, cost: 8 }
      }
    },
    {
      id: 'ai-process-optimizer',
      label: 'Process AI',
      type: 'ai_agent',
      x: 480,
      y: 80,
      size: 30,
      performance: 96,
      connections: ['workflow-approval', 'metric-efficiency'],
      metadata: {
        status: 'active',
        lastActivity: 'Live',
        impact: 'high',
        confidence: 98,
        description: 'Workflow optimization and automation',
        metrics: { efficiency: 96, quality: 94, utilization: 99, cost: 12 }
      }
    },
    
    // Projects
    {
      id: 'project-q4-targets',
      label: 'Q4 Revenue Goals',
      type: 'project',
      x: 420,
      y: 250,
      size: 25,
      performance: 67,
      connections: ['metric-revenue', 'client-enterprise-a'],
      metadata: {
        status: 'active',
        lastActivity: '1 hour ago',
        impact: 'high',
        confidence: 73,
        description: 'Quarterly revenue milestone achievement',
        metrics: { efficiency: 67, quality: 85 }
      }
    },
    
    // Skills
    {
      id: 'skill-copywriting',
      label: 'Copywriting',
      type: 'skill',
      x: 50,
      y: 350,
      size: 20,
      performance: 82,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '15 minutes ago',
        impact: 'medium',
        confidence: 84,
        description: 'Content writing and communication skills'
      }
    },
    {
      id: 'skill-lead-qualification',
      label: 'Lead Qualification',
      type: 'skill',
      x: 250,
      y: 50,
      size: 22,
      performance: 91,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '2 minutes ago',
        impact: 'high',
        confidence: 93,
        description: 'Identifying and qualifying potential customers'
      }
    },
    
    // Data Sources
    {
      id: 'data-crm',
      label: 'CRM System',
      type: 'data_source',
      x: 200,
      y: 120,
      size: 24,
      performance: 98,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: 'Real-time',
        impact: 'high',
        confidence: 99,
        description: 'Customer relationship management data'
      }
    },
    {
      id: 'data-analytics',
      label: 'Analytics Hub',
      type: 'data_source',
      x: 180,
      y: 380,
      size: 26,
      performance: 85,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '5 minutes ago',
        impact: 'high',
        confidence: 87,
        description: 'Business intelligence and analytics platform'
      }
    },
    
    // Metrics
    {
      id: 'metric-revenue',
      label: 'Revenue Growth',
      type: 'metric',
      x: 500,
      y: 300,
      size: 18,
      performance: 78,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '10 minutes ago',
        impact: 'high',
        confidence: 82,
        description: 'Monthly recurring revenue tracking'
      }
    },
    {
      id: 'metric-efficiency',
      label: 'Operational Efficiency',
      type: 'metric',
      x: 550,
      y: 120,
      size: 19,
      performance: 93,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '1 minute ago',
        impact: 'high',
        confidence: 95,
        description: 'Process efficiency measurements'
      }
    },
    
    // Workflows
    {
      id: 'workflow-approval',
      label: 'Approval Process',
      type: 'workflow',
      x: 450,
      y: 350,
      size: 21,
      performance: 84,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '30 minutes ago',
        impact: 'medium',
        confidence: 86,
        description: 'Automated approval workflow system'
      }
    },
    
    // Clients
    {
      id: 'client-enterprise-a',
      label: 'Enterprise Client A',
      type: 'client',
      x: 350,
      y: 350,
      size: 23,
      performance: 89,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '2 hours ago',
        impact: 'high',
        confidence: 91,
        description: 'Major enterprise customer account'
      }
    },
    
    // Insights
    {
      id: 'insight-sales-trend',
      label: 'Sales Trend Analysis',
      type: 'insight',
      x: 100,
      y: 100,
      size: 16,
      performance: 86,
      connections: [],
      metadata: {
        status: 'active',
        lastActivity: '1 hour ago',
        impact: 'medium',
        confidence: 88,
        description: 'AI-generated sales performance insights'
      }
    }
  ];

  const connections: BrainConnection[] = [
    { id: 'conn-1', source: 'dept-sales', target: 'team-sales-1', type: 'reports_to', strength: 0.9, bidirectional: false },
    { id: 'conn-2', source: 'team-sales-1', target: 'ai-sales-assistant', type: 'utilizes', strength: 0.8, bidirectional: false },
    { id: 'conn-3', source: 'ai-sales-assistant', target: 'data-crm', type: 'depends_on', strength: 0.95, bidirectional: false },
    { id: 'conn-4', source: 'ai-sales-assistant', target: 'skill-lead-qualification', type: 'utilizes', strength: 0.7, bidirectional: false },
    { id: 'conn-5', source: 'team-sales-1', target: 'project-q4-targets', type: 'collaborates', strength: 0.85, bidirectional: true },
    { id: 'conn-6', source: 'project-q4-targets', target: 'metric-revenue', type: 'generates', strength: 0.9, bidirectional: false },
    { id: 'conn-7', source: 'dept-marketing', target: 'team-content', type: 'reports_to', strength: 0.9, bidirectional: false },
    { id: 'conn-8', source: 'team-content', target: 'ai-content-creator', type: 'utilizes', strength: 0.75, bidirectional: false },
    { id: 'conn-9', source: 'ai-content-creator', target: 'skill-copywriting', type: 'utilizes', strength: 0.8, bidirectional: false },
    { id: 'conn-10', source: 'ai-content-creator', target: 'data-analytics', type: 'depends_on', strength: 0.7, bidirectional: false },
    { id: 'conn-11', source: 'dept-operations', target: 'ai-process-optimizer', type: 'utilizes', strength: 0.95, bidirectional: false },
    { id: 'conn-12', source: 'ai-process-optimizer', target: 'workflow-approval', type: 'influences', strength: 0.9, bidirectional: false },
    { id: 'conn-13', source: 'ai-process-optimizer', target: 'metric-efficiency', type: 'generates', strength: 0.85, bidirectional: false },
    { id: 'conn-14', source: 'project-q4-targets', target: 'client-enterprise-a', type: 'influences', strength: 0.8, bidirectional: false },
    { id: 'conn-15', source: 'data-crm', target: 'insight-sales-trend', type: 'generates', strength: 0.75, bidirectional: false }
  ];

  return { nodes, connections };
};

const nodeTypeConfig = {
  department: { color: '#3B82F6', icon: Building2, label: 'Department' },
  team: { color: '#10B981', icon: Users, label: 'Team' },
  ai_agent: { color: '#8B5CF6', icon: Bot, label: 'AI Agent' },
  project: { color: '#F59E0B', icon: Target, label: 'Project' },
  skill: { color: '#EF4444', icon: Zap, label: 'Skill' },
  data_source: { color: '#06B6D4', icon: Database, label: 'Data Source' },
  metric: { color: '#84CC16', icon: TrendingUp, label: 'Metric' },
  workflow: { color: '#F97316', icon: GitBranch, label: 'Workflow' },
  client: { color: '#EC4899', icon: Users, label: 'Client' },
  insight: { color: '#6366F1', icon: Brain, label: 'Insight' }
};

const connectionTypeConfig = {
  reports_to: { color: '#64748B', label: 'Reports To', strokeDasharray: '0' },
  collaborates: { color: '#10B981', label: 'Collaborates', strokeDasharray: '5,5' },
  depends_on: { color: '#EF4444', label: 'Depends On', strokeDasharray: '10,2' },
  influences: { color: '#F59E0B', label: 'Influences', strokeDasharray: '3,3' },
  generates: { color: '#8B5CF6', label: 'Generates', strokeDasharray: '0' },
  utilizes: { color: '#06B6D4', label: 'Utilizes', strokeDasharray: '8,4' }
};

interface CompanyBrainProps {
  className?: string;
}

export default function CompanyBrain({ className = '' }: CompanyBrainProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState(generateCompanyBrainData());
  const [selectedNode, setSelectedNode] = useState<BrainNode | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<NodeType | 'all'>('all');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showConnections, setShowConnections] = useState(true);
  const [connectionOpacity, setConnectionOpacity] = useState([0.6]);
  const [animationSpeed, setAnimationSpeed] = useState([1.0]);
  const [viewBox, setViewBox] = useState({ x: 0, y: 0, width: 600, height: 400 });

  // Filter nodes based on search and type
  const filteredNodes = data.nodes.filter(node => {
    const matchesSearch = node.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         node.metadata.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || node.type === filterType;
    return matchesSearch && matchesType;
  });

  // Get connections for filtered nodes
  const filteredConnections = data.connections.filter(conn => 
    filteredNodes.some(n => n.id === conn.source) && 
    filteredNodes.some(n => n.id === conn.target)
  );

  // Animation simulation
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setData(prev => ({
        ...prev,
        nodes: prev.nodes.map(node => ({
          ...node,
          performance: Math.max(0, Math.min(100, 
            node.performance + (Math.random() - 0.5) * 2
          ))
        }))
      }));
    }, 2000 / animationSpeed[0]);

    return () => clearInterval(interval);
  }, [isPlaying, animationSpeed]);

  const handleNodeClick = (node: BrainNode) => {
    setSelectedNode(selectedNode?.id === node.id ? null : node);
  };

  const resetView = () => {
    setViewBox({ x: 0, y: 0, width: 600, height: 400 });
    setSelectedNode(null);
  };

  const getPerformanceColor = (performance: number) => {
    if (performance >= 90) return '#10B981';
    if (performance >= 70) return '#F59E0B';
    return '#EF4444';
  };

  return (
    <TooltipProvider>
      <Card className={`bg-black/50 backdrop-blur-sm border-neutral-800 ${className} ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
        <CardHeader className="p-4 border-b border-neutral-800">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-500 to-blue-600 flex items-center justify-center">
                <Brain size={16} className="text-white" />
              </div>
              <div>
                <CardTitle className="text-lg text-white">Company Intelligence Brain</CardTitle>
                <p className="text-xs text-neutral-400">Real-time organizational knowledge graph</p>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="h-8 w-8 p-0"
                  >
                    {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  {isPlaying ? 'Pause' : 'Play'} simulation
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetView}
                    className="h-8 w-8 p-0"
                  >
                    <RotateCcw size={14} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Reset view</TooltipContent>
              </Tooltip>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="h-8 w-8 p-0"
              >
                {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
              </Button>
            </div>
          </div>
          
          {/* Controls */}
          <div className="flex flex-col md:flex-row gap-3 pt-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" size={14} />
              <Input
                placeholder="Search nodes..."
                className="pl-9 h-8 bg-black/30 border-neutral-700 text-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as NodeType | 'all')}
              className="h-8 px-3 bg-black/30 border border-neutral-700 rounded-md text-sm text-white"
              aria-label="Filter nodes by type"
            >
              <option value="all">All Types</option>
              {Object.entries(nodeTypeConfig).map(([type, config]) => (
                <option key={type} value={type}>{config.label}</option>
              ))}
            </select>
            
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowConnections(!showConnections)}
                className="h-8 px-2"
              >
                {showConnections ? <Eye size={14} /> : <EyeOff size={14} />}
                <span className="ml-1 text-xs">Links</span>
              </Button>
            </div>
          </div>
          
          {/* Settings */}
          <div className="flex flex-col md:flex-row gap-4 pt-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Connection Opacity:</span>
              <input
                type="range"
                value={connectionOpacity[0]}
                onChange={(e) => setConnectionOpacity([parseFloat(e.target.value)])}
                max={1}
                min={0.1}
                step={0.1}
                aria-label="Connection opacity slider"
                className="w-20 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Animation Speed:</span>
              <input
                type="range"
                value={animationSpeed[0]}
                onChange={(e) => setAnimationSpeed([parseFloat(e.target.value)])}
                max={3}
                min={0.1}
                step={0.1}
                aria-label="Animation speed slider"
                className="w-20 h-2 bg-neutral-700 rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:cursor-pointer"
              />
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-neutral-400">Nodes:</span>
              <Badge variant="outline" className="text-xs">
                {filteredNodes.length}
              </Badge>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="p-0 relative">
          <div className="flex">
            {/* Main Brain Visualization */}
            <div className="flex-1 relative">
              <svg
                ref={svgRef}
                viewBox={`${viewBox.x} ${viewBox.y} ${viewBox.width} ${viewBox.height}`}
                className="w-full h-96 bg-gradient-to-br from-neutral-950 to-neutral-900"
              >
                {/* Grid Background */}
                <defs>
                  <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
                    <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#374151" strokeWidth="0.5" opacity="0.2"/>
                  </pattern>
                  
                  {/* Glow filters for nodes */}
                  <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                    <feMerge> 
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                <rect width="100%" height="100%" fill="url(#grid)" />
                
                {/* Connections */}
                {showConnections && filteredConnections.map((connection) => {
                  const sourceNode = filteredNodes.find(n => n.id === connection.source);
                  const targetNode = filteredNodes.find(n => n.id === connection.target);
                  
                  if (!sourceNode || !targetNode) return null;
                  
                  const config = connectionTypeConfig[connection.type];
                  
                  return (
                    <motion.line
                      key={connection.id}
                      x1={sourceNode.x}
                      y1={sourceNode.y}
                      x2={targetNode.x}
                      y2={targetNode.y}
                      stroke={config.color}
                      strokeWidth={Math.max(1, connection.strength * 3)}
                      strokeDasharray={config.strokeDasharray}
                      opacity={connectionOpacity[0]}
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: connectionOpacity[0] }}
                      transition={{ duration: 1, delay: Math.random() * 0.5 }}
                    />
                  );
                })}
                
                {/* Nodes */}
                {filteredNodes.map((node) => {
                  const config = nodeTypeConfig[node.type];
                  const IconComponent = config.icon;
                  const isSelected = selectedNode?.id === node.id;
                  
                  return (
                    <g key={node.id}>
                      {/* Node Glow Effect */}
                      {isSelected && (
                        <circle
                          cx={node.x}
                          cy={node.y}
                          r={node.size + 5}
                          fill={config.color}
                          opacity="0.3"
                          filter="url(#glow)"
                        />
                      )}
                      
                      {/* Performance Ring */}
                      <circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size + 2}
                        fill="none"
                        stroke={getPerformanceColor(node.performance)}
                        strokeWidth="2"
                        opacity="0.6"
                        strokeDasharray={`${(node.performance / 100) * 2 * Math.PI * (node.size + 2)} ${2 * Math.PI * (node.size + 2)}`}
                        transform={`rotate(-90 ${node.x} ${node.y})`}
                      />
                      
                      {/* Main Node */}
                      <motion.circle
                        cx={node.x}
                        cy={node.y}
                        r={node.size}
                        fill={config.color}
                        stroke={isSelected ? '#FFFFFF' : config.color}
                        strokeWidth={isSelected ? 2 : 1}
                        className="cursor-pointer"
                        onClick={() => handleNodeClick(node)}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ 
                          scale: isSelected ? 1.2 : 1, 
                          opacity: 1 
                        }}
                        transition={{ duration: 0.3 }}
                        whileHover={{ scale: 1.1 }}
                      />
                      
                      {/* Node Icon */}
                      <foreignObject
                        x={node.x - 8}
                        y={node.y - 8}
                        width="16"
                        height="16"
                        className="pointer-events-none"
                      >
                        <IconComponent size={16} className="text-white" />
                      </foreignObject>
                      
                      {/* Node Label */}
                      <text
                        x={node.x}
                        y={node.y + node.size + 15}
                        textAnchor="middle"
                        fontSize="10"
                        fill="white"
                        className="font-medium"
                      >
                        {node.label}
                      </text>
                      
                      {/* Performance Text */}
                      <text
                        x={node.x}
                        y={node.y + node.size + 26}
                        textAnchor="middle"
                        fontSize="8"
                        fill={getPerformanceColor(node.performance)}
                        className="font-mono"
                      >
                        {node.performance.toFixed(0)}%
                      </text>
                    </g>
                  );
                })}
              </svg>
              
              {/* Status Overlay */}
              <div className="absolute top-4 left-4 flex items-center gap-2">
                <div className={`w-2 h-2 rounded-full ${isPlaying ? 'bg-green-500' : 'bg-yellow-500'} animate-pulse`} />
                <span className="text-xs text-neutral-400">
                  {isPlaying ? 'Live Simulation' : 'Paused'}
                </span>
              </div>
              
              {/* Legend */}
              <div className="absolute bottom-4 left-4 bg-black/80 rounded-lg p-3 text-xs">
                <div className="text-white font-medium mb-2">Node Types</div>
                <div className="grid grid-cols-2 gap-1">
                  {Object.entries(nodeTypeConfig).slice(0, 6).map(([type, config]) => (
                    <div key={type} className="flex items-center gap-1">
                      <div className={`w-2 h-2 rounded-full`} style={{ backgroundColor: config.color }} />
                      <span className="text-neutral-300">{config.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Node Details Sidebar */}
            <AnimatePresence>
              {selectedNode && (
                <motion.div
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 300, opacity: 0 }}
                  className="w-80 border-l border-neutral-800 bg-black/30 p-4 overflow-y-auto"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: nodeTypeConfig[selectedNode.type].color }}
                        />
                        <h3 className="font-medium text-white">{selectedNode.label}</h3>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setSelectedNode(null)}
                        className="h-6 w-6 p-0"
                      >
                        ×
                      </Button>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Type</div>
                        <Badge variant="outline" className="text-xs">
                          {nodeTypeConfig[selectedNode.type].label}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Performance</div>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 bg-neutral-800 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${selectedNode.performance}%`,
                                backgroundColor: getPerformanceColor(selectedNode.performance)
                              }}
                            />
                          </div>
                          <span className="text-xs text-white font-mono">
                            {selectedNode.performance.toFixed(1)}%
                          </span>
                        </div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Status</div>
                        <Badge variant="outline" className={
                          selectedNode.metadata.status === 'active' ? 'border-green-500/40 text-green-400' :
                          selectedNode.metadata.status === 'pending' ? 'border-yellow-500/40 text-yellow-400' :
                          selectedNode.metadata.status === 'critical' ? 'border-red-500/40 text-red-400' :
                          'border-neutral-500/40 text-neutral-400'
                        }>
                          {selectedNode.metadata.status}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Last Activity</div>
                        <div className="text-xs text-white">{selectedNode.metadata.lastActivity}</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Impact Level</div>
                        <Badge variant="outline" className={
                          selectedNode.metadata.impact === 'high' ? 'border-red-500/40 text-red-400' :
                          selectedNode.metadata.impact === 'medium' ? 'border-yellow-500/40 text-yellow-400' :
                          'border-green-500/40 text-green-400'
                        }>
                          {selectedNode.metadata.impact}
                        </Badge>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Confidence Score</div>
                        <div className="text-xs text-white font-mono">{selectedNode.metadata.confidence}%</div>
                      </div>
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Description</div>
                        <div className="text-xs text-neutral-300">{selectedNode.metadata.description}</div>
                      </div>
                      
                      {selectedNode.metadata.metrics && (
                        <div>
                          <div className="text-xs text-neutral-400 mb-2">Metrics</div>
                          <div className="space-y-2">
                            {Object.entries(selectedNode.metadata.metrics).map(([key, value]) => (
                              <div key={key} className="flex justify-between items-center">
                                <span className="text-xs text-neutral-300 capitalize">
                                  {key.replace('_', ' ')}
                                </span>
                                <span className="text-xs text-white font-mono">
                                  {typeof value === 'number' ? `${value}${key === 'cost' ? '$' : '%'}` : value}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div>
                        <div className="text-xs text-neutral-400 mb-1">Connections</div>
                        <div className="text-xs text-white">{selectedNode.connections.length} connected nodes</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
} 