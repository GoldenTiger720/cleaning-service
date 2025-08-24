import { Bell, Search, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useNavigate } from "react-router-dom"
import { useToast } from "@/hooks/use-toast"

export function Header() {
  const navigate = useNavigate()
  const { toast } = useToast()

  const handleSignOut = () => {
    localStorage.removeItem("currentUser")
    localStorage.removeItem("isAuthenticated")
    localStorage.removeItem("rememberMe")
    
    toast({
      title: "Signed out successfully",
      description: "You have been logged out of your account.",
    })
    
    navigate("/signin")
  }

  const currentUser = localStorage.getItem("currentUser")
  const userData = currentUser ? JSON.parse(currentUser) : null

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-16 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-full items-center justify-between px-6">
        {/* Logo and Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-primary">
            <span className="text-sm font-bold text-white">CP</span>
          </div>
          <div>
            <h1 className="text-lg font-bold font-heading">CleanPro</h1>
            <p className="text-xs text-muted-foreground">Management System</p>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative flex-1 max-w-md mx-8">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search employees, customers, schedules..."
            className="pl-10 bg-muted/50"
          />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-4 w-4" />
            <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-primary text-[10px] font-medium text-primary-foreground flex items-center justify-center">
              3
            </span>
          </Button>
          
          <ThemeToggle />
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>
                {userData ? `${userData.firstName} ${userData.lastName}` : "My Account"}
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => navigate("/settings")}>
                Settings
              </DropdownMenuItem>
              <DropdownMenuItem onClick={handleSignOut}>
                <LogOut className="mr-2 h-4 w-4" />
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}