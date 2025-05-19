import * as React from 'react';
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { cva, type VariantProps } from "class-variance-authority";

const statVariants = cva(
  "inline-flex gap-1 items-center text-xs font-medium",
  {
    variants: {
      trend: {
        up: "text-green-600 dark:text-green-400",
        down: "text-red-600 dark:text-red-400",
        neutral: "text-muted-foreground",
      },
    },
    defaultVariants: {
      trend: "neutral",
    },
  }
);

interface StatsCardProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof statVariants> {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: "up" | "down" | "neutral";
  trendValue?: string | number;
  trendLabel?: string;
  isLoading?: boolean;
  valuePrefix?: string;
  valueSuffix?: string;
  valueSize?: "sm" | "md" | "lg";
  borderPosition?: "left" | "top" | "none";
}

export function StatsCard({
  title,
  value,
  icon,
  trend = "neutral",
  trendValue,
  trendLabel,
  isLoading = false,
  valuePrefix = "",
  valueSuffix = "",
  valueSize = "md",
  className,
  borderPosition = "left",
  ...props
}: StatsCardProps) {
  const trendIcon = {
    up: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="w-3 h-3"
      >
        <path 
          fillRule="evenodd" 
          d="M10 17a.75.75 0 01-.75-.75V5.612L5.29 9.77a.75.75 0 01-1.08-1.04l5.25-5.5a.75.75 0 011.08 0l5.25 5.5a.75.75 0 11-1.08 1.04l-3.96-4.158V16.25A.75.75 0 0110 17z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    down: (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 20 20" 
        fill="currentColor" 
        className="w-3 h-3"
      >
        <path 
          fillRule="evenodd" 
          d="M10 3a.75.75 0 01.75.75v10.638l3.96-4.158a.75.75 0 111.08 1.04l-5.25 5.5a.75.75 0 01-1.08 0l-5.25-5.5a.75.75 0 111.08-1.04l3.96 4.158V3.75A.75.75 0 0110 3z" 
          clipRule="evenodd" 
        />
      </svg>
    ),
    neutral: null,
  };

  const valueSizeClasses = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const borderClasses = {
    left: "border-l-4 pl-4",
    top: "border-t-4 pt-4",
    none: "",
  };

  const borderColors = {
    up: "border-green-500/30 dark:border-green-600/30",
    down: "border-red-500/30 dark:border-red-600/30",
    neutral: "border-primary/30",
  };

  return (
    <Card 
      className={cn(
        "p-6",
        borderPosition !== "none" && borderClasses[borderPosition],
        borderPosition !== "none" && borderColors[trend],
        className
      )} 
      {...props}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{title}</p>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      
      {isLoading ? (
        <div className="mt-2 h-9 w-24 animate-pulse rounded-md bg-muted" />
      ) : (
        <h3 className={cn("mt-2 font-semibold tracking-tight", valueSizeClasses[valueSize])}>
          {valuePrefix && <span className="text-muted-foreground text-sm mr-1">{valuePrefix}</span>}
          {value}
          {valueSuffix && <span className="text-muted-foreground text-sm ml-1">{valueSuffix}</span>}
        </h3>
      )}
      
      {(trendValue || trendLabel) && !isLoading && (
        <div className={cn(statVariants({ trend }), "mt-2")}>
          {trendIcon[trend]}
          {trendValue && <span>{trendValue}</span>}
          {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
        </div>
      )}
    </Card>
  );
} 