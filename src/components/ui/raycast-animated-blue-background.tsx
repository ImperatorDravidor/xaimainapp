"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import UnicornScene from "unicornstudio-react";

export const useWindowSize = () => {
  const [windowSize, setWindowSize] = useState({
    width: 1920,  // Default width
    height: 1080, // Default height
  });

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();
    
    window.addEventListener('resize', handleResize);
    
    // Remove event listener on cleanup
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export const Component = () => {
  const { width, height } = useWindowSize();

  return (
    <div className={cn("absolute inset-0 w-full h-full overflow-hidden")}>
      <UnicornScene 
        production={true} 
        projectId="ed7SJMvTJEVxfqzypOOQ" 
        width={width} 
        height={height} 
      />
    </div>
  );
};

