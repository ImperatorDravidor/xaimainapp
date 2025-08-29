import { cn } from "@/lib/utils"

function Skeleton({
  className,
  rounded = "lg",
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { rounded?: "sm" | "md" | "lg" | "full" }) {
  const roundedClass = {
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full"
  }

  return (
    <div
      className={cn(
        "animate-pulse bg-muted/60", 
        roundedClass[rounded],
        className
      )}
      {...props}
    />
  )
}

export { Skeleton }

// Additional skeleton components for specific use cases
export function AvatarSkeleton({ size = "md", ...props }: { size?: "sm" | "md" | "lg" } & React.HTMLAttributes<HTMLDivElement>) {
  const sizeClass = {
    sm: "h-8 w-8",
    md: "h-10 w-10",
    lg: "h-12 w-12"
  }

  return (
    <Skeleton
      rounded="full"
      className={cn(sizeClass[size])}
      {...props}
    />
  )
}

export function TextSkeleton({ width = "full", height = "md", ...props }: { 
  width?: "sm" | "md" | "lg" | "full" | "auto", 
  height?: "sm" | "md" | "lg" 
} & React.HTMLAttributes<HTMLDivElement>) {
  const widthClass = {
    sm: "w-20",
    md: "w-40",
    lg: "w-60",
    full: "w-full",
    auto: "w-auto"
  }

  const heightClass = {
    sm: "h-3",
    md: "h-4",
    lg: "h-6"
  }

  return (
    <Skeleton
      className={cn(widthClass[width], heightClass[height])}
      {...props}
    />
  )
}

export function CardSkeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className={cn(
        "p-6 bg-card rounded-xl border border-border shadow-ios-sm", 
        className
      )}
      {...props}
    >
      <div className="space-y-4">
        <TextSkeleton width="md" height="lg" />
        <div className="space-y-2 pt-2">
          <TextSkeleton />
          <TextSkeleton width="lg" />
          <TextSkeleton width="md" />
        </div>
      </div>
    </div>
  )
}

export function TableRowSkeleton({ columns = 3, ...props }: { columns?: number } & React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div 
      className="flex items-center space-x-4 py-3"
      {...props}
    >
      {Array(columns).fill(0).map((_, i) => (
        <TextSkeleton 
          key={i} 
          width={i === 0 ? "sm" : i === columns - 1 ? "lg" : "md"} 
        />
      ))}
    </div>
  )
} 