"use client";

import * as React from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useOnClickOutside } from "usehooks-ts";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface Tab {
  title: string;
  icon: LucideIcon;
  badge?: number;
  type?: never;
  onClick?: () => void;
}

interface Separator {
  type: "separator";
  title?: never;
  icon?: never;
  badge?: never;
  onClick?: never;
}

type TabItem = Tab | Separator;

interface ExpandableTabsProps {
  tabs: TabItem[];
  className?: string;
  buttonClassName?: string;
  defaultSelected?: number | null;
  activeColor?: string;
  variant?: "default" | "pill" | "minimal" | "glass";
  size?: "sm" | "md" | "lg";
  persistent?: boolean;
  onChange?: (index: number | null) => void;
}

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

// Improved transitions
const transition = { 
  type: "spring" as const, 
  stiffness: 400, 
  damping: 30, 
  mass: 1 
};

// Badge animations
const badgeVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 }
};

export function ExpandableTabs({
  tabs,
  className,
  buttonClassName,
  defaultSelected = null,
  activeColor = "text-blue-400",
  variant = "default",
  size = "md",
  persistent = false,
  onChange,
}: ExpandableTabsProps) {
  const [selected, setSelected] = React.useState<number | null>(defaultSelected);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const outsideClickRef = React.useRef<HTMLDivElement>(null);

  // Custom handler for outside clicks to avoid type issues
  React.useEffect(() => {
    if (persistent) return;
    
    const handleClickOutside = (event: MouseEvent) => {
      if (
        outsideClickRef.current && 
        !outsideClickRef.current.contains(event.target as Node)
      ) {
        setSelected(null);
        onChange?.(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [persistent, onChange]);

  const handleSelect = (index: number) => {
    const tab = tabs[index];
    if ('onClick' in tab && tab.onClick) {
      tab.onClick();
    }
    
    setSelected((prev: number | null) => prev === index ? null : index);
    if (onChange) {
      onChange(selected === index ? null : index);
    }
  };

  // Size variants
  const sizeClasses = {
    sm: "p-0.5 gap-1",
    md: "p-1 gap-2",
    lg: "p-1.5 gap-3"
  };

  // Button size variants
  const buttonSizeClasses = {
    sm: "text-xs py-1.5",
    md: "text-sm py-2",
    lg: "text-base py-2.5"
  };

  // Icon size variants
  const iconSizeMap = {
    sm: 16,
    md: 20,
    lg: 24
  };

  // Variant styles
  const variantClasses = {
    default: "rounded-2xl border bg-background/80 shadow-sm backdrop-blur-sm",
    pill: "rounded-full border-none bg-black/20 shadow-inner backdrop-blur-md",
    minimal: "rounded-none border-none bg-transparent shadow-none",
    glass: "rounded-2xl border border-white/10 bg-white/5 shadow-md backdrop-blur-md"
  };

  // Button variant styles 
  const buttonVariantClasses = {
    default: "rounded-xl bg-muted/50 hover:bg-muted",
    pill: "rounded-full bg-black/30 hover:bg-black/50 backdrop-blur-sm",
    minimal: "rounded-md hover:bg-black/10",
    glass: "rounded-xl bg-white/5 hover:bg-white/10 backdrop-blur-sm border border-white/5"
  };

  const Separator = () => (
    <div 
      className={cn(
        "h-[24px] w-[1.2px]",
        variant === "minimal" ? "bg-neutral-800/50" : "bg-neutral-700/30"
      )} 
      aria-hidden="true" 
    />
  );

  return (
    <div
      ref={outsideClickRef}
      className={cn(
        "flex flex-wrap items-center",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
    >
      {tabs.map((tab, index) => {
        if (tab.type === "separator") {
          return <Separator key={`separator-${index}`} />;
        }

        const Icon = tab.icon;
        const isSelected = selected === index;
        const isHovered = hovered === index;
        
        return (
          <motion.button
            key={tab.title}
            variants={buttonVariants}
            initial={false}
            animate="animate"
            custom={isSelected}
            onClick={() => handleSelect(index)}
            onHoverStart={() => setHovered(index)}
            onHoverEnd={() => setHovered(null)}
            transition={transition}
            className={cn(
              "relative flex items-center px-4",
              buttonSizeClasses[size],
              buttonVariantClasses[variant],
              "font-medium transition-all duration-300",
              isSelected
                ? cn("bg-opacity-100", activeColor)
                : "text-neutral-400 hover:text-neutral-200",
              buttonClassName
            )}
          >
            <div className="relative">
              <Icon size={iconSizeMap[size]} />
              
              {/* Badge indicator */}
              {tab.badge && tab.badge > 0 && (
                <motion.div
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={badgeVariants}
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white"
                >
                  {tab.badge > 9 ? '9+' : tab.badge}
                </motion.div>
              )}
            </div>
            
            <AnimatePresence initial={false}>
              {(isSelected || isHovered) && (
                <motion.span
                  variants={spanVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={transition}
                  className="overflow-hidden whitespace-nowrap"
                >
                  {tab.title}
                </motion.span>
              )}
            </AnimatePresence>
            
            {/* Active indicator for the glass variant */}
            {isSelected && variant === "glass" && (
              <motion.div
                layoutId="active-pill-indicator"
                className="absolute inset-0 -z-10 rounded-xl border border-blue-500/20 bg-blue-500/10"
                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
} 