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
      <CardContent>
        <div className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => (
            <Button
              key={action.title}
              variant={action.variant}
              className="h-auto p-4 flex flex-col items-start gap-2 text-left"
            >
              <action.icon className="h-5 w-5" />
              <div>
                <div className="font-semibold text-sm">{action.title}</div>
                <div className="text-xs opacity-80">{action.description}</div>
              </div>
            </Button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}