"use client";

import { 
  Card, 
  CardHeader, 
  CardTitle, 
  CardDescription, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, BarChart, Clock, Settings, Eye, ChevronRight, Activity, Gauge, MoreHorizontal } from "lucide-react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Team interface
export interface Team {
  id: string;
  name: string;
  description: string;
  template: string;
  status: "active" | "deploying" | "paused" | "offline";
  members: number;
  metrics: {
    costSavings: string;
    errorRate: string;
    tasksCompleted: number;
  };
}

interface TeamCardProps {
  team: Team;
  index: number;
}

export function TeamCard({ team, index }: TeamCardProps) {
  const router = useRouter();

  const handleViewDetails = () => {
    router.push(`/company/teams/${team.id}`);
  };

  // Calculate a brightness value based on team stats for visual indication
  const performanceScore = Math.min(100, Math.max(0, 100 - parseInt(team.metrics.errorRate)));
  const getPerformanceColor = () => {
    if (performanceScore >= 90) return "bg-gradient-to-br from-green-500 to-green-700";
    if (performanceScore >= 75) return "bg-gradient-to-br from-blue-500 to-blue-700";
    if (performanceScore >= 50) return "bg-gradient-to-br from-yellow-500 to-yellow-700";
    return "bg-gradient-to-br from-red-500 to-red-700";
  };

  const renderStatusBadge = () => (
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
          : team.status === "paused"
          ? "bg-yellow-600 text-white"
          : "bg-red-600 text-white"
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
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="h-full overflow-hidden border-neutral-800 bg-black/20 relative">
        {/* Colored top border based on performance */}
        <div className={`h-1 w-full ${getPerformanceColor()}`} />
        
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <CardTitle className="text-white">{team.name}</CardTitle>
            {renderStatusBadge()}
          </div>
          <CardDescription className="line-clamp-2 text-gray-400">{team.description}</CardDescription>
        </CardHeader>
        
        <CardContent className="pb-2">
          <div className="space-y-4">
            <div className="flex justify-between">
              <div className="flex items-center">
                <Users className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">{team.members} AI workers</span>
              </div>
              <div className="flex items-center">
                <BarChart className="h-4 w-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-300">
                  {team.metrics.tasksCompleted} tasks
                </span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-gray-800 space-y-3">
              {/* Performance gauge */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-gray-400 flex items-center">
                    <Gauge className="h-3 w-3 mr-1" />
                    Performance Score
                  </span>
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <span className="text-xs font-medium text-gray-300">{performanceScore}%</span>
                      </TooltipTrigger>
                      <TooltipContent side="top">
                        <p>Based on error rate and task efficiency</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
                <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                  <div 
                    className={`h-full ${getPerformanceColor()}`}
                    style={{ width: `${performanceScore}%` }}
                  />
                </div>
              </div>
              
              <div className="flex justify-between mb-1">
                <span className="text-xs text-gray-400">Cost Savings</span>
                <span className="text-xs font-medium text-green-400">{team.metrics.costSavings}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-xs text-gray-400">Error Rate</span>
                <span className="text-xs font-medium text-gray-300">{team.metrics.errorRate}</span>
              </div>
            </div>
          </div>
        </CardContent>
        
        <CardFooter className="flex justify-between">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-gray-400 hover:text-white gap-1"
            onClick={handleViewDetails}
          >
            Details <ChevronRight className="h-3 w-3" />
          </Button>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white p-0 h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-40 bg-neutral-900 border-neutral-800 text-white">
              <DropdownMenuLabel>Team Options</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-neutral-800" />
              <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800" onClick={handleViewDetails}>
                <Eye className="h-4 w-4 mr-2" /> View Details
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800">
                <Settings className="h-4 w-4 mr-2" /> Configure
              </DropdownMenuItem>
              <DropdownMenuItem className="cursor-pointer hover:bg-neutral-800">
                <Activity className="h-4 w-4 mr-2" /> Analytics
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardFooter>
      </Card>
    </motion.div>
  );
} 