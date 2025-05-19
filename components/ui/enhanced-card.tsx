import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface EnhancedCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  description?: string;
  headerBadge?: {
    text: string;
    variant?: "default" | "outline" | "secondary";
    color?: string;
  };
  footerText?: string;
  footerButton?: {
    text: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "outline" | "ghost" | "link";
  };
  variant?: "blur" | "gradient" | "spotlight" | "deep";
  metrics?: {
    label: string;
    value: string | number;
    change?: {
      value: string | number;
      positive?: boolean;
    };
    progressPercentage?: number;
    progressColor?: string;
  }[];
  visualElement?: React.ReactNode;
  actions?: React.ReactNode[];
  glowColor?: string;
  animate?: boolean;
  delay?: number;
}

export function EnhancedCard({
  title,
  description,
  headerBadge,
  footerText,
  footerButton,
  variant = "blur",
  metrics,
  visualElement,
  actions,
  glowColor = "blue",
  animate = true,
  delay = 0,
  className,
  children,
  ...props
}: EnhancedCardProps) {
  // Map variants to card props
  const cardVariantProps = {
    blur: {
      variant: "blur" as const,
      glass: true,
      border: true,
      spotlight: false,
      glow: true,
      depth: "medium" as const,
    },
    gradient: {
      variant: "gradient" as const,
      glass: true,
      border: true,
      spotlight: false,
      glow: true,
      depth: "medium" as const,
    },
    spotlight: {
      variant: "default" as const,
      glass: true,
      border: true,
      spotlight: true,
      glow: false,
      depth: "medium" as const,
    },
    deep: {
      variant: "dark" as const,
      glass: true,
      border: true,
      spotlight: false,
      glow: true,
      depth: "high" as const,
    },
  };

  const glowColorMap: Record<string, string> = {
    blue: "hover:shadow-blue-600/20",
    purple: "hover:shadow-purple-600/20",
    green: "hover:shadow-green-600/20",
    red: "hover:shadow-red-600/20",
    cyan: "hover:shadow-cyan-600/20",
    amber: "hover:shadow-amber-600/20",
  };

  const cardClass = cn(
    "overflow-hidden w-full",
    glowColorMap[glowColor] || glowColorMap.blue,
    className
  );

  const content = (
    <Card
      {...cardVariantProps[variant]}
      className={cardClass}
      {...props}
    >
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle gradient={true} className="text-xl mb-1">
              {title}
            </CardTitle>
            {description && (
              <CardDescription>{description}</CardDescription>
            )}
          </div>
          {headerBadge && (
            <Badge 
              variant={headerBadge.variant || "outline"} 
              className={headerBadge.color || "text-green-400 border-green-400/30 bg-green-400/10"}
            >
              {headerBadge.text}
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Metrics Grid */}
        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
            {metrics.map((metric, idx) => (
              <div 
                key={idx} 
                className="border border-neutral-800 rounded-xl p-5 bg-black/30 hover:bg-black/40 transition-all duration-300 hover:border-blue-600/30 backdrop-blur-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-neutral-400 text-sm">{metric.label}</span>
                  {metric.change && (
                    <span className={`flex items-center text-sm ${metric.change.positive ? 'text-green-400' : 'text-red-400'}`}>
                      <svg 
                        className="w-3 h-3 mr-1" 
                        xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 384 512"
                      >
                        <path 
                          fill="currentColor" 
                          d={metric.change.positive 
                            ? "M214.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L160 141.2V448c0 17.7 14.3 32 32 32s32-14.3 32-32V141.2L329.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160z"
                            : "M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
                          }
                        />
                      </svg>
                      {metric.change.value}
                    </span>
                  )}
                </div>
                <div className="flex items-end gap-2">
                  <span className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-200">
                    {metric.value}
                  </span>
                </div>
                {metric.progressPercentage !== undefined && (
                  <div className="mt-3 h-2 w-full bg-neutral-800/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${metric.progressColor || "bg-gradient-to-r from-blue-500 to-purple-600"} rounded-full`}
                      style={{ width: `${metric.progressPercentage}%` }}
                    ></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Visual Element (Chart, etc.) */}
        {visualElement && (
          <div className="border border-neutral-800 rounded-xl p-4 bg-black/30 mb-4">
            {visualElement}
          </div>
        )}

        {/* Additional Content */}
        {children}

        {/* Action Buttons */}
        {actions && actions.length > 0 && (
          <div className="flex flex-wrap gap-3 mt-4">
            {actions}
          </div>
        )}
      </CardContent>
      
      {(footerText || footerButton) && (
        <CardFooter className="flex justify-between items-center">
          {footerText && <p className="text-sm text-neutral-400">{footerText}</p>}
          {footerButton && (
            footerButton.href ? (
              <Link href={footerButton.href} className="ml-auto">
                <Button 
                  variant={footerButton.variant || "default"}
                >
                  {footerButton.text}
                </Button>
              </Link>
            ) : (
              <Button 
                variant={footerButton.variant || "default"}
                onClick={footerButton.onClick}
                className="ml-auto"
              >
                {footerButton.text}
              </Button>
            )
          )}
        </CardFooter>
      )}
    </Card>
  );

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: delay }}
      >
        {content}
      </motion.div>
    );
  }

  return content;
}

// Advanced variants of enhanced card components

export function AIInsightCard({
  title,
  insights,
  recommendations,
  metrics,
  footerButton,
  className,
  ...props
}: {
  title: string;
  insights: string[];
  recommendations: { text: string; priority: "high" | "medium" | "low" }[];
  metrics?: EnhancedCardProps["metrics"];
  footerButton?: EnhancedCardProps["footerButton"];
  className?: string;
} & Omit<EnhancedCardProps, "title" | "metrics" | "footerButton">) {
  const priorityColors = {
    high: "text-red-400 border-red-400/30 bg-red-400/10",
    medium: "text-amber-400 border-amber-400/30 bg-amber-400/10",
    low: "text-green-400 border-green-400/30 bg-green-400/10",
  };

  return (
    <EnhancedCard
      title={title}
      description="AI-Generated Analysis"
      variant="deep"
      glowColor="purple"
      headerBadge={{
        text: "AI Powered",
        color: "text-purple-400 border-purple-400/30 bg-purple-400/10"
      }}
      metrics={metrics}
      footerButton={footerButton}
      className={className}
      {...props}
    >
      {insights.length > 0 && (
        <div className="border border-neutral-800 rounded-xl p-5 bg-black/30 mb-4">
          <h3 className="text-white text-lg font-medium mb-3">Key Insights</h3>
          <ul className="space-y-2">
            {insights.map((insight, idx) => (
              <li key={idx} className="flex items-start">
                <div className="mt-1 mr-3 p-1 rounded-full bg-purple-500/20 text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2a9.96 9.96 0 0 0-7.071 2.929 9.96 9.96 0 0 0 0 14.142A9.96 9.96 0 0 0 12 22a9.96 9.96 0 0 0 7.071-2.929 9.96 9.96 0 0 0 0-14.142A9.96 9.96 0 0 0 12 2Z"/>
                    <path d="m9 12 2 2 4-4"/>
                  </svg>
                </div>
                <span className="text-neutral-300">{insight}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {recommendations.length > 0 && (
        <div className="border border-neutral-800 rounded-xl p-5 bg-black/30">
          <h3 className="text-white text-lg font-medium mb-3">Recommendations</h3>
          <ul className="space-y-3">
            {recommendations.map((rec, idx) => (
              <li key={idx} className="flex items-start">
                <Badge className={`mt-0.5 mr-3 ${priorityColors[rec.priority]}`}>
                  {rec.priority}
                </Badge>
                <span className="text-neutral-300">{rec.text}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </EnhancedCard>
  );
}

export function WorkflowCard({
  title,
  stages,
  metrics,
  status,
  deadline,
  users,
  className,
  ...props
}: {
  title: string;
  stages: { name: string; status: "completed" | "active" | "pending"; percentage?: number }[];
  metrics?: EnhancedCardProps["metrics"];
  status: "on-track" | "at-risk" | "delayed" | "completed";
  deadline?: string;
  users?: { name: string; avatar?: string; role?: string }[];
  className?: string;
} & Omit<EnhancedCardProps, "title" | "metrics">) {
  const statusColors = {
    "on-track": "text-green-400 border-green-400/30 bg-green-400/10",
    "at-risk": "text-amber-400 border-amber-400/30 bg-amber-400/10",
    "delayed": "text-red-400 border-red-400/30 bg-red-400/10",
    "completed": "text-blue-400 border-blue-400/30 bg-blue-400/10",
  };
  
  const stageStatusColors = {
    completed: "bg-green-500/20 text-green-400 border-green-500/30",
    active: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    pending: "bg-neutral-500/20 text-neutral-400 border-neutral-500/30",
  };

  return (
    <EnhancedCard
      title={title}
      variant="blur"
      glowColor="blue"
      headerBadge={{
        text: status.charAt(0).toUpperCase() + status.slice(1).replace('-', ' '),
        color: statusColors[status]
      }}
      metrics={metrics}
      className={className}
      {...props}
    >
      {stages.length > 0 && (
        <div className="border border-neutral-800 rounded-xl p-5 bg-black/30 mb-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-white font-medium">Workflow Stages</h3>
            {deadline && (
              <div className="text-sm text-neutral-400">
                Deadline: <span className="text-white">{deadline}</span>
              </div>
            )}
          </div>
          
          <div className="space-y-4">
            {stages.map((stage, idx) => (
              <div key={idx} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Badge className={stageStatusColors[stage.status]}>
                      {stage.status === "completed" ? "✓" : stage.status === "active" ? "→" : "○"}
                    </Badge>
                    <span className="ml-2 text-neutral-300">{stage.name}</span>
                  </div>
                  {stage.percentage !== undefined && (
                    <span className="text-sm text-neutral-400">{stage.percentage}%</span>
                  )}
                </div>
                {stage.percentage !== undefined && (
                  <div className="h-1.5 w-full bg-neutral-800/50 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${
                        stage.status === "completed" 
                          ? "bg-green-500" 
                          : stage.status === "active" 
                            ? "bg-blue-500" 
                            : "bg-neutral-700"
                      }`}
                      style={{ width: `${stage.percentage}%` }}
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {users && users.length > 0 && (
        <div className="border border-neutral-800 rounded-xl p-5 bg-black/30">
          <h3 className="text-white font-medium mb-3">Team Members</h3>
          <div className="space-y-3">
            {users.map((user, idx) => (
              <div key={idx} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-neutral-800 overflow-hidden mr-3 flex items-center justify-center text-xs text-white">
                    {user.avatar ? (
                      <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                    ) : (
                      user.name.charAt(0).toUpperCase()
                    )}
                  </div>
                  <div>
                    <div className="text-white text-sm">{user.name}</div>
                    {user.role && <div className="text-neutral-500 text-xs">{user.role}</div>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </EnhancedCard>
  );
}

export function ResourceCard({
  title,
  description,
  resourceType,
  stats,
  detailsList,
  actions,
  className,
  ...props
}: {
  title: string;
  description?: string;
  resourceType: "model" | "dataset" | "service" | "integration";
  stats?: { label: string; value: string | number }[];
  detailsList?: { label: string; value: string | React.ReactNode }[];
  actions?: React.ReactNode[];
  className?: string;
} & Omit<EnhancedCardProps, "title" | "description" | "actions">) {
  const resourceTypeInfo = {
    model: {
      color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
      label: "AI Model"
    },
    dataset: {
      color: "text-green-400 border-green-400/30 bg-green-400/10",
      label: "Dataset"
    },
    service: {
      color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
      label: "Service"
    },
    integration: {
      color: "text-amber-400 border-amber-400/30 bg-amber-400/10",
      label: "Integration"
    }
  };

  return (
    <EnhancedCard
      title={title}
      description={description}
      variant="spotlight"
      glowColor={
        resourceType === "model" ? "blue" :
        resourceType === "dataset" ? "green" :
        resourceType === "service" ? "purple" : "amber"
      }
      headerBadge={{
        text: resourceTypeInfo[resourceType].label,
        color: resourceTypeInfo[resourceType].color
      }}
      actions={actions}
      className={className}
      {...props}
    >
      {stats && stats.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {stats.map((stat, idx) => (
            <div key={idx} className="border border-neutral-800 rounded-lg p-3 bg-black/30">
              <div className="text-sm text-neutral-400 mb-1">{stat.label}</div>
              <div className="text-lg font-medium text-white">{stat.value}</div>
            </div>
          ))}
        </div>
      )}
      
      {detailsList && detailsList.length > 0 && (
        <div className="border border-neutral-800 rounded-xl p-5 bg-black/30">
          <div className="space-y-3">
            {detailsList.map((detail, idx) => (
              <div key={idx} className="flex justify-between items-center">
                <div className="text-sm text-neutral-400">{detail.label}</div>
                <div className="text-sm text-white">{detail.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </EnhancedCard>
  );
} 