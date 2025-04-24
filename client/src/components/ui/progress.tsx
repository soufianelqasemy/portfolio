import * as React from "react"
import * as ProgressPrimitive from "@radix-ui/react-progress"

import { cn } from "@/lib/utils"

const Progress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
    indicator?: string;
  }
>(({ className, value, indicator, ...props }, ref) => (
  <div className="relative my-4">
    {indicator && (
      <div className="flex justify-between mb-2">
        <span className="text-foreground/80 font-medium text-sm md:text-base truncate pr-2">{indicator}</span>
        <span className="text-primary font-mono text-sm md:text-base flex-shrink-0">{value}%</span>
      </div>
    )}
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        "relative h-3 w-full overflow-hidden rounded-full bg-black/50 shadow-inner border border-primary/10",
        className
      )}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className="h-full w-full flex-1 bg-gradient-to-r from-primary/80 to-primary transition-all duration-1500 ease-out skill-progress relative"
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      >
        <div className="absolute inset-0 bg-white opacity-10 rounded-full animate-pulse"></div>
      </ProgressPrimitive.Indicator>
    </ProgressPrimitive.Root>
  </div>
))
Progress.displayName = ProgressPrimitive.Root.displayName

export { Progress }
