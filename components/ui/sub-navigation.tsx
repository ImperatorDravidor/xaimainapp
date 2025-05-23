"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TabsList, Tabs, TabsTrigger } from "./tabs";

interface SubNavigationProps {
  className?: string;
  children?: React.ReactNode;
}

export function SubNavigation({ className, children }: SubNavigationProps) {
  return (
    <div className={cn(
      "flex items-center",
      className
    )}>
      {children}
    </div>
  );
}

interface SubNavigationTabsProps {
  tabs: { value: string; label: string; icon?: React.ReactNode }[];
  defaultValue?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export function SubNavigationTabs({ 
  tabs, 
  defaultValue, 
  onChange,
  className 
}: SubNavigationTabsProps) {
  return (
    <Tabs defaultValue={defaultValue} onValueChange={onChange} className="w-full">
      <TabsList className={cn("rounded-md bg-black/30 border border-neutral-800", className)}>
        {tabs.map((tab) => (
          <TabsTrigger 
            key={tab.value} 
            value={tab.value} 
            className="data-[state=active]:bg-blue-600 data-[state=active]:text-white text-sm font-medium"
          >
            {tab.icon && <span className="mr-1">{tab.icon}</span>}
            {tab.label}
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  );
} 