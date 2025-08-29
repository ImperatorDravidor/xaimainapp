import React, { useState, useEffect } from 'react';
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { 
  RiCheckboxCircleLine, 
  RiErrorWarningLine, 
  RiAlertLine, 
  RiWifiLine, 
  RiShieldCheckLine,
  RiShieldCrossLine,
  RiShutDownLine,
  RiTimeLine,
  RiDatabase2Line,
  RiCpuLine,
  RiBarChart2Line
} from '@remixicon/react';

// Type for system health status
type SystemHealthStatus = 'operational' | 'maintenance' | 'degraded' | 'major-incident';

interface SystemHealthProps {
  initialStatus?: SystemHealthStatus;
  className?: string;
}

interface SystemMetric {
  name: string;
  value: number;
  max: number;
  icon: React.ElementType;
  trend: 'up' | 'down' | 'stable';
}

export function SystemHealth({ 
  initialStatus = 'operational',
  className = ''
}: SystemHealthProps) {
  const [status, setStatus] = useState<SystemHealthStatus>(initialStatus);
  const [pulseActive, setPulseActive] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);
  const [metrics, setMetrics] = useState<SystemMetric[]>([
    { name: 'CPU', value: 24, max: 100, icon: RiCpuLine, trend: 'stable' },
    { name: 'Memory', value: 62, max: 100, icon: RiDatabase2Line, trend: 'up' },
    { name: 'Latency', value: 48, max: 200, icon: RiBarChart2Line, trend: 'down' }
  ]);

  // For demo purposes, randomly change the status every 30 seconds
  useEffect(() => {
    // This is just for demo - in production you'd use actual service monitoring
    const interval = setInterval(() => {
      const statuses: SystemHealthStatus[] = ['operational', 'maintenance', 'degraded', 'major-incident'];
      const weight = [0.7, 0.1, 0.1, 0.1]; // 70% chance for operational
      
      const random = Math.random();
      let selectedIndex = 0;
      let sum = 0;
      
      for (let i = 0; i < weight.length; i++) {
        sum += weight[i];
        if (random <= sum) {
          selectedIndex = i;
          break;
        }
      }
      
      const newStatus = statuses[selectedIndex];
      setStatus(newStatus);
      
      // Update metrics randomly
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.min(metric.max, Math.max(0, metric.value + (Math.random() > 0.5 ? 1 : -1) * Math.floor(Math.random() * 10))),
        trend: Math.random() > 0.66 ? 'up' : Math.random() > 0.33 ? 'down' : 'stable'
      })));
      
      // Trigger pulse animation
      setPulseActive(true);
      setTimeout(() => setPulseActive(false), 2000);
    }, 30000); // Change every 30 seconds

    return () => clearInterval(interval);
  }, []);

  // Map status to badge properties
  const statusConfig = {
    'operational': {
      icon: RiShieldCheckLine,
      color: 'text-emerald-500',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30',
      pulseColor: 'bg-emerald-500',
      label: 'Systems Operational'
    },
    'maintenance': {
      icon: RiTimeLine,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
      borderColor: 'border-blue-500/30',
      pulseColor: 'bg-blue-500',
      label: 'Scheduled Maintenance'
    },
    'degraded': {
      icon: RiAlertLine,
      color: 'text-amber-500',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30',
      pulseColor: 'bg-amber-500',
      label: 'Performance Degraded'
    },
    'major-incident': {
      icon: RiShieldCrossLine,
      color: 'text-red-500',
      bgColor: 'bg-red-500/10',
      borderColor: 'border-red-500/30',
      pulseColor: 'bg-red-500',
      label: 'Major Incident'
    }
  };

  const config = statusConfig[status];
  const Icon = config.icon;

  // Function to render the trend indicator
  const renderTrend = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up':
        return <div className="rotate-45 text-red-400">↗</div>;
      case 'down':
        return <div className="rotate-45 text-emerald-400">↙</div>;
      case 'stable':
        return <div className="text-neutral-400">→</div>;
    }
  };

  return (
    <div className={cn("py-2", className)}>
      <div className="flex items-center justify-center">
        <button 
          onClick={() => setShowDetailed(prev => !prev)}
          className={cn(
            "relative flex w-full items-center gap-2 py-1.5 px-3 rounded-md transition-ios",
            showDetailed ? 
              cn("bg-gradient-to-r from-black to-black/30 border-neutral-700/40") : 
              cn(config.bgColor, config.borderColor),
            "border"
          )}
        >
          <div className="relative flex-shrink-0">
            <Icon className={cn("size-3.5", config.color)} />
            
            {/* Pulsing dot */}
            <span className={cn(
              "absolute -top-0.5 -right-0.5 size-1.5 rounded-full border border-black/20",
              config.pulseColor,
              pulseActive && "animate-pulse-glow"
            )} />
          </div>
          
          <div className="flex items-center justify-between w-full">
            <span className={cn("text-[10px] font-medium", config.color)}>
              {config.label}
            </span>
            
            <div className="flex items-center gap-1.5">
              {/* Signal levels - aesthetic only */}
              <div className="flex items-end h-2.5 gap-0.5">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      "w-0.5 rounded-sm transition-all duration-300",
                      i === 0 && "h-1",
                      i === 1 && "h-1.5",
                      i === 2 && "h-2",
                      i === 3 && "h-2.5",
                      status === 'operational' ? 
                        (cn(config.color, "opacity-100")) : 
                        (i > 1 ? "bg-neutral-600 opacity-50" : cn(config.color, "opacity-100"))
                    )}
                  />
                ))}
              </div>
              
              {/* Expand/collapse indicator */}
              <div className={cn(
                "transition-transform duration-200",
                showDetailed ? "rotate-180" : ""
              )}>
                <ChevronDown className="h-3 w-3 text-neutral-500" />
              </div>
            </div>
          </div>
        </button>
      </div>

      {/* Expandable metrics section - more compact */}
      {showDetailed && (
        <div className={cn(
          "mx-4 mt-2 p-2 rounded-md border transition-ios",
          "border-neutral-800/70 bg-black/50"
        )}>
          <div className="flex justify-between gap-2">
            {metrics.map((metric, index) => (
              <div key={index} className="flex-1">
                <div className="flex items-center justify-between w-full mb-1">
                  <div className="flex items-center gap-1">
                    <metric.icon className="size-3 text-neutral-400" />
                    <span className="text-[9px] text-neutral-400">{metric.name}</span>
                  </div>
                  <div className="flex items-center">
                    <span className="text-[9px] text-neutral-300">{metric.value}</span>
                    <span className="text-[8px] text-neutral-500 ml-0.5">
                      {renderTrend(metric.trend)}
                    </span>
                  </div>
                </div>
                <div className="w-full h-1 bg-neutral-800/80 rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full rounded-full",
                      metric.value < metric.max * 0.6 ? "bg-emerald-500" : 
                      metric.value < metric.max * 0.8 ? "bg-amber-500" : "bg-red-500"
                    )} 
                    style={{ width: `${(metric.value / metric.max) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-1.5 pt-1.5 border-t border-neutral-800/50 flex items-center justify-between">
            <span className="text-[8px] text-neutral-500">Last update: {new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
            <span className="text-[8px] text-blue-400 hover:text-blue-300 cursor-pointer">View Status</span>
          </div>
        </div>
      )}
    </div>
  );
} 