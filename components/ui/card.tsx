import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  glass?: boolean;
  animate?: boolean;
  border?: boolean;
  floating?: boolean;
  gradient?: boolean;
  spotlight?: boolean;
  glow?: boolean;
  depth?: "none" | "low" | "medium" | "high";
  variant?: "default" | "dark" | "gradient" | "blur" | "outline" | "ios";
  children?: React.ReactNode;
}

const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ 
    className, 
    glass = false, 
    animate = false, 
    border = true, 
    floating = false,
    gradient = false,
    spotlight = false,
    glow = false,
    depth = "medium",
    variant = "ios",
    children, 
    ...props 
  }, ref) => {
    const [position, setPosition] = React.useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = React.useState(0);
    const cardRef = React.useRef<HTMLDivElement>(null);

    const depthClasses = {
      none: "",
      low: "shadow-ios",
      medium: "shadow-ios-md",
      high: "shadow-ios-lg"
    };

    const variantClasses = {
      default: glass ? "bg-black/60 backdrop-blur-xl" : "bg-neutral-900",
      dark: "bg-black/80 backdrop-blur-xl",
      gradient: "bg-gradient-to-br from-black/80 via-neutral-900/90 to-neutral-800/80 backdrop-blur-xl",
      blur: "bg-white/5 backdrop-blur-xl",
      outline: "bg-transparent backdrop-blur-md",
      ios: "bg-card text-card-foreground"
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
      if (!cardRef.current || !spotlight) return;
      const rect = cardRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setPosition({ x, y });
      setOpacity(1);
    };

    const handleMouseLeave = () => {
      if (spotlight) {
        setOpacity(0);
      }
    };

    const baseClasses = cn(
      "overflow-hidden",
      variant === "ios" ? "rounded-xl" : "rounded-2xl",
      depthClasses[depth],
      variantClasses[variant],
      border && variant === "outline" ? "border border-white/10" : 
      border && variant === "ios" ? "border border-border" : 
      border ? "border border-neutral-800/60" : "",
      floating && variant === "ios" ? "hover:translate-y-[-2px] transition-transform duration-200 ease-ios" : 
      floating ? "hover:translate-y-[-4px] transition-transform duration-300 ease-out" : "",
      glow && variant === "ios" ? "hover:shadow-ios-md transition-shadow duration-200 ease-ios" : 
      glow ? "hover:shadow-md hover:shadow-blue-500/20 transition-shadow duration-300" : "",
      className
    );

    const spotlightStyle = spotlight ? {
      position: 'absolute',
      background: 'radial-gradient(circle at center, rgb(59, 130, 246, 0.08) 0%, transparent 80%)',
      borderRadius: '9999px',
      height: '140px',
      width: '140px',
      opacity: opacity,
      transform: `translate(${position.x - 70}px, ${position.y - 70}px)`,
      pointerEvents: 'none',
      transition: 'opacity 0.15s ease'
    } as React.CSSProperties : {};

    const cardContent = (
      <div 
        className={cn("relative overflow-hidden group", spotlight && "transition-all duration-300")} 
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        ref={cardRef}
      >
        {spotlight && <div style={spotlightStyle} />}
        {glass && variant !== 'outline' && variant !== 'ios' && (
          <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        )}
        <div className="relative z-10">
          {children}
        </div>
        {variant === 'gradient' && (
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(45deg,theme(colors.blue.900/10),theme(colors.purple.900/10),theme(colors.blue.900/10))] bg-[length:200%_200%] animate-subtle-gradient"></div>
        )}
        {border && variant === 'outline' && (
          <div className="absolute inset-px rounded-2xl z-[-1] bg-gradient-to-b from-neutral-800/40 to-neutral-800/20 backdrop-blur-sm" />
        )}
      </div>
    );

    if (animate) {
      const motionProps = {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] },
        ...props
      } as any;

      return (
        <motion.div
          ref={ref}
          className={baseClasses}
          {...motionProps}
        >
          {cardContent}
        </motion.div>
      );
    }

    return (
      <div ref={ref} className={baseClasses} {...props}>
        {cardContent}
      </div>
    );
  }
);
Card.displayName = "Card";

interface CardHeaderProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  separated?: boolean;
  children?: React.ReactNode;
}

const CardHeader = React.forwardRef<HTMLDivElement, CardHeaderProps>(
  ({ className, separated = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 pt-6 pb-4", 
        separated && "border-b border-border/50", 
        "flex flex-col space-y-1.5",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardHeader.displayName = "CardHeader";

interface CardTitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  className?: string;
  gradient?: boolean;
  children?: React.ReactNode;
}

const CardTitle = React.forwardRef<HTMLHeadingElement, CardTitleProps>(
  ({ className, gradient = false, children, ...props }, ref) => (
    <h3
      ref={ref}
      className={cn(
        "text-lg font-semibold leading-none tracking-tight", 
        gradient ? "bg-clip-text text-transparent bg-gradient-to-br from-primary to-primary/70" : "text-foreground",
        className
      )}
      {...props}
    >
      {children}
    </h3>
  )
);
CardTitle.displayName = "CardTitle";

interface CardDescriptionProps extends React.HTMLAttributes<HTMLParagraphElement> {
  className?: string;
  children?: React.ReactNode;
}

const CardDescription = React.forwardRef<HTMLParagraphElement, CardDescriptionProps>(
  ({ className, children, ...props }, ref) => (
    <p
      ref={ref}
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    >
      {children}
    </p>
  )
);
CardDescription.displayName = "CardDescription";

interface CardContentProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  children?: React.ReactNode;
}

const CardContent = React.forwardRef<HTMLDivElement, CardContentProps>(
  ({ className, children, ...props }, ref) => (
    <div ref={ref} className={cn("px-6 py-4", className)} {...props}>
      {children}
    </div>
  )
);
CardContent.displayName = "CardContent";

interface CardFooterProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  separated?: boolean;
  children?: React.ReactNode;
}

const CardFooter = React.forwardRef<HTMLDivElement, CardFooterProps>(
  ({ className, separated = false, children, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "px-6 py-4", 
        separated && "border-t border-border/50", 
        "flex items-center",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
);
CardFooter.displayName = "CardFooter";

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter }; 