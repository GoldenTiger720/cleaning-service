import { 
  Home, 
  Users, 
  Calendar, 
  Package, 
  DollarSign, 
  Clock, 
  FileText, 
  Settings, 
  Building,
  UserCheck
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Dashboard", href: "/", icon: Home },
  { name: "Employees", href: "/employees", icon: UserCheck },
  { name: "Customers", href: "/customers", icon: Building },
  { name: "Scheduling", href: "/scheduling", icon: Calendar },
  { name: "Inventory", href: "/inventory", icon: Package },
  { name: "Payments", href: "/payments", icon: DollarSign },
  { name: "Time Tracking", href: "/time-tracking", icon: Clock },
  { name: "Invoices", href: "/invoices", icon: FileText },
  { name: "Settings", href: "/settings", icon: Settings },
]

export function Sidebar() {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-card border-r border-border">
      <div className="flex h-full flex-col">
        <nav className="flex-1 space-y-1 p-4">
          {navigation.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              end={item.href === "/"}
              className={({ isActive }) =>
                cn(
                  "group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-smooth",
                  isActive
                    ? "bg-primary text-primary-foreground shadow-soft"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                )
              }
            >
              <item.icon className="h-4 w-4 flex-shrink-0" />
              {item.name}
            </NavLink>
          ))}
        </nav>

        {/* Quick Stats */}
        <div className="border-t border-border p-4 space-y-3">
          <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            Quick Stats
          </div>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Active Jobs</span>
              <span className="font-medium text-primary">12</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Employees</span>
              <span className="font-medium text-accent">24</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Revenue Today</span>
              <span className="font-medium text-success">$2,450</span>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}