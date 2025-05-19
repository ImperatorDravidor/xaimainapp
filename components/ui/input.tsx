import * as React from "react";
import { cn } from "@/lib/utils";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: boolean;
  helpText?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, error, helpText, ...props }, ref) => {
    return (
      <div className="w-full">
        <div className="relative">
          {icon && (
            <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-muted-foreground">
              {icon}
            </div>
          )}
          <input
            type={type}
            className={cn(
              "flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-ios-sm transition-ios",
              "placeholder:text-muted-foreground/70",
              "focus:border-primary/40 focus:ring-1 focus:ring-primary/30 focus:outline-none",
              "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30",
              error && "border-destructive/50 focus:border-destructive focus:ring-destructive/30",
              icon && "pl-10",
              className
            )}
            ref={ref}
            {...props}
          />
        </div>
        {helpText && (
          <p className={cn(
            "mt-1 text-xs",
            error ? "text-destructive" : "text-muted-foreground"
          )}>
            {helpText}
          </p>
        )}
      </div>
    );
  }
);
Input.displayName = "Input";

export { Input }; 