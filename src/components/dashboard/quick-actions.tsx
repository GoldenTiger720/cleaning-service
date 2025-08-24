import { Plus, Calendar, Users, FileText, Package, DollarSign } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const quickActions = [
  {
    title: "New Job",
    description: "Schedule a cleaning job",
    icon: Plus,
    variant: "hero" as const,
    href: "/scheduling/new"
  },
  {
    title: "Add Employee",
    description: "Register new staff member",
    icon: Users,
    variant: "accent" as const,
    href: "/employees/new"
  },
  {
    title: "Create Invoice",
    description: "Generate customer invoice",
    icon: FileText,
    variant: "default" as const,
    href: "/invoices/new"
  },
  {
    title: "Check Inventory",
    description: "View supply levels",
    icon: Package,
    variant: "secondary" as const,
    href: "/inventory"
  },
  {
    title: "View Schedule",
    description: "Today's assignments",
    icon: Calendar,
    variant: "outline" as const,
    href: "/scheduling"
  },
  {
    title: "Payment Report",
    description: "Financial overview",
    icon: DollarSign,
    variant: "success" as const,
    href: "/payments"
  }
]

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-heading">Quick Actions</CardTitle>
        <CardDescription>Frequently used operations for daily management</CardDescription>
      </CardHeader>
      <CardContent className="p-4 sm:p-6">
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-2 gap-2 sm:gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-2.5 sm:p-3 flex flex-col items-start gap-1 sm:gap-1.5 text-left justify-start min-h-[70px] sm:min-h-[80px] overflow-hidden"
            >
              <action.icon className="h-3.5 w-3.5 sm:h-4 sm:w-4 flex-shrink-0" />
              <div className="min-w-0 w-full space-y-0.5">
                <div className="font-medium text-[11px] sm:text-xs truncate">{action.title}</div>
                <div className="text-[9px] sm:text-[10px] opacity-70 line-clamp-1 sm:line-clamp-2 leading-tight">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}