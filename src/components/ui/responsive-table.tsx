import { cn } from "@/lib/utils"
import { ReactNode } from "react"

interface ResponsiveTableProps {
  children: ReactNode
  className?: string
}

export function ResponsiveTable({ children, className }: ResponsiveTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <div className="min-w-[600px]">
        {children}
      </div>
    </div>
  )
}