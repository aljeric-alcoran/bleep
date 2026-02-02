"use client";

import { Minus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface CounterPillProps {
   value: number;
   onChange: (value: number) => void;
   min?: number;
   max?: number;
   className?: string;
   isUpdating?: boolean;
}

export function CounterPill({
   value,
   onChange,
   min = 1,
   max = Infinity,
   className,
   isUpdating = false
}: CounterPillProps) {
   const increment = () => value < max && onChange(value + 1);
   const decrement = () => value > min && onChange(value - 1);

   return (
      <div
         className={cn(
            "flex items-center w-30 overflow-hidden rounded-sm border bg-background",
            className
         )}
      >
         <Button
            variant="ghost"
            size="icon"
            onClick={decrement}
            disabled={isUpdating || value <= min}
            className="rounded-none hover:bg-muted disabled:opacity-40"
         >
            <Minus className="h-2 w-2" />
         </Button>

         <div className="h-6 w-px bg-border" />

         <div className="flex items-center justify-center py-2 w-12 text-foreground select-none">
            {value}
         </div>

         <div className="h-6 w-px bg-border" />

         <Button
            variant="ghost"
            size="icon"
            onClick={increment}
            disabled={isUpdating || value >= max}
            className="rounded-none hover:bg-muted disabled:opacity-40"
         >
            <Plus className="h-2 w-2" />
         </Button>
      </div>
   );
}