import { LucideIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface StatsCardProps {
  title: string
  value: string | number
  change?: string
  changeType?: "positive" | "negative" | "neutral"
  icon: LucideIcon
  description?: string
  gradient?: boolean
}

export function StatsCard({ 
  title, 
  value, 
  change, 
  changeType = "neutral", 
  icon: Icon,
  description,
  gradient = false 
}: StatsCardProps) {
  return (
    <Card className={cn(
      "transition-smooth hover:shadow-medium",
      gradient && "bg-gradient-card"
    )}>
      <CardContent className="p-4 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-xs sm:text-sm font-medium text-muted-foreground truncate">{title}</p>
            <div className="flex flex-col sm:flex-row sm:items-baseline gap-0.5 sm:gap-2">
              <p className="text-xl sm:text-2xl font-bold font-heading truncate">{value}</p>
              {change && (
                <span className={cn(
                  "text-[10px] sm:text-xs font-medium whitespace-nowrap",
                  changeType === "positive" && "text-success",
                  changeType === "negative" && "text-destructive",
                  changeType === "neutral" && "text-muted-foreground"
                )}>
                  {change}
                </span>
              )}
            </div>
            {description && (
              <p className="text-[10px] sm:text-xs text-muted-foreground mt-1 truncate">{description}</p>
            )}
          </div>
          <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-lg bg-primary/10 flex-shrink-0">
            <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}