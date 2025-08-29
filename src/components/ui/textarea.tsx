import * as React from "react";
import { cn } from "@/lib/utils";

export interface TextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  error?: boolean;
  helpText?: string;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, error, helpText, ...props }, ref) => {
    return (
      <div className="w-full">
        <textarea
          className={cn(
            "flex min-h-[80px] w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-ios-sm transition-ios",
            "placeholder:text-muted-foreground/70",
            "focus:border-primary/40 focus:ring-1 focus:ring-primary/30 focus:outline-none",
            "disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted/30",
            "resize-vertical",
            error && "border-destructive/50 focus:border-destructive focus:ring-destructive/30",
            className
          )}
          ref={ref}
          {...props}
        />
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
Textarea.displayName = "Textarea";

export { Textarea }; 